# ============================================================================================
# 🔐 POST /api/auth/login — Autenticação JWT Assinada com Segurança Regenerativa
# ============================================================================================
# 🌱 Entrada: JSON com email e senha
# 🔍 Verificação contra banco e status ativo
# 🔐 Senha protegida com bcrypt (hash comparado com segurança)
# 🧾 Retorno: access_token + tipo + nome + perfil + email
# ❌ Erros: 401 para credenciais inválidas, 422 para payload malformado (via Pydantic)
# ============================================================================================

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.schemas.auth_schema import LoginSchema, TokenResponse
from app.models.user import User
from app.core.security import verificar_senha
from app.services.auth_service import criar_token_jwt
from app.core.database import get_db

router = APIRouter()

@router.post("/login", response_model=TokenResponse, tags=["🔐 Autenticação"])
def login(dados: LoginSchema, db: Session = Depends(get_db)):
    """
    Endpoint oficial de login JWT Agroverso.
    Valida usuário, verifica hash e retorna token assinado com payload seguro.
    """

    # 🔎 Consulta por e-mail (caso-insensível se configurado no banco)
    usuario = db.query(User).filter(User.email == dados.email).first()

    if not usuario or not usuario.ativo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas"
        )

    if not verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas"
        )

    # ========================================================================================
    # 🔐 Geração do Token JWT Assinado
    # ----------------------------------------------------------------------------------------
    # Payload contém apenas informações necessárias e controladas:
    #   - sub: identificador único do usuário (email)
    #   - perfil: controle de RBAC (nível de acesso)
    #   - nome, email: dados úteis para frontend
    #   - exp: expiração automática definida na camada de serviço
    # ========================================================================================

    token_payload = {
        "sub": usuario.email,
        "perfil": usuario.perfil,
        "nome": usuario.nome,
        "email": usuario.email
    }

    token_jwt = criar_token_jwt(payload=token_payload)

    # ========================================================================================
    # 📤 Retorno Padronizado
    # ----------------------------------------------------------------------------------------
    # Resposta 200 OK com:
    #   - access_token: JWT assinado (Authorization: Bearer ...)
    #   - token_type: padrão OAuth2
    #   - perfil, nome, email: dados úteis ao frontend
    # ========================================================================================

    return {
        "access_token": token_jwt,
        "token_type": "bearer",
        "perfil": usuario.perfil,
        "nome": usuario.nome,
        "email": usuario.email
    }
