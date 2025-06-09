# ============================================================================================
# 🔐 auth.py – Dependência de Autenticação JWT para FastAPI • Agroverso
# ============================================================================================
# 📌 Função principal:
#   - Extrai e valida o token JWT do header Authorization
#   - Decodifica o token e recupera o usuário autenticado no banco de dados
#   - Serve como dependência (Depends) para proteger rotas sensíveis
# --------------------------------------------------------------------------------------------
# ✨ Construído com sabedoria (validação robusta), força (tratamento rigoroso de falhas)
#     e beleza (estrutura limpa, clara, modular e escalável).
# ============================================================================================

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.models.usuario import Usuario
from app.database import get_db
from app.config import settings

# ============================================================================================
# 🔐 OAuth2PasswordBearer – Extrator de Token via Header HTTP Authorization
# ============================================================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login",  # 🔁 URL do endpoint que fornece o token JWT
    description="Token JWT necessário para acessar esta rota. Use: Bearer <token>"
)

# ============================================================================================
# 🧩 Função Principal – get_current_user()
# ============================================================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Usuario:
    """
    🔐 Autenticação via token JWT extraído do header Authorization.
    ⏳ Valida assinatura, expiração e integridade.
    🧑 Retorna o usuário autenticado com base no payload do token.
    """

    # Exceção padrão para qualquer falha de autenticação
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não autorizado. Token inválido, expirado ou ausente.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # ====================================================================================
        # 📜 Decodificação do JWT — Segurança Criptográfica
        # ====================================================================================
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
            options={"verify_aud": False}  # 🔐 Evita falha em tokens sem campo 'aud'
        )

        # 🎯 Extração do ID do usuário (campo 'sub' = subject)
        user_id: str | None = payload.get("sub")

        if not user_id:
            raise credentials_exception

    except JWTError as jwt_erro:
        # 🛡️ Captura de falhas de decodificação, assinatura ou estrutura
        raise credentials_exception from jwt_erro

    # ========================================================================================
    # 🗃️ Consulta ao banco de dados – Verificação da identidade no domínio persistente
    # ========================================================================================

    user: Usuario | None = db.query(Usuario).filter(Usuario.id == user_id).first()

    if user is None:
        # ⛔ Token válido, mas usuário não encontrado (excluído ou inexistente)
        raise credentials_exception

    # ✅ Identidade validada com sucesso – usuário autenticado
    return user

# ============================================================================================
# 🧭 Exemplo de Uso – Aplicação da dependência get_current_user em rota protegida
# ============================================================================================

from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.models.usuario import Usuario
from app.schemas.usuario import UsuarioResponse  # 🔁 Schema de resposta tipado

router = APIRouter(
    prefix="/api/usuarios",
    tags=["Usuários"]
)

@router.get("/me", response_model=UsuarioResponse)
def read_logged_user(current_user: Usuario = Depends(get_current_user)):
    """
    🔒 Rota protegida. Retorna os dados do usuário autenticado.
    📥 Requer token válido no header Authorization: Bearer <token>.
    """
    return current_user

