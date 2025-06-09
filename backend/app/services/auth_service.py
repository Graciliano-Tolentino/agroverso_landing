# ============================================================================================
# 🛡️ backend/app/services/auth_service.py — Serviço de Autenticação e Tokens JWT do Agroverso
# ============================================================================================
# 📌 Responsável por:
#   - Validar credenciais fornecidas no login
#   - Gerar tokens JWT seguros e temporizados
#   - Verificar tokens e retornar identidade ativa do usuário
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (clareza de propósito), força (criptografia bcrypt + JWT)
#     e beleza (acoplamento limpo e fluidez de uso por múltiplas interfaces frontend).
# ============================================================================================

from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status

from app.config import settings
from app.core.database import SessionLocal
from app.models.user import User

# ============================================================================================
# 🔐 autenticar_usuario(email, senha)
# --------------------------------------------------------------------------------------------
# Realiza:
#   - Busca segura do usuário pelo e-mail
#   - Validação da senha fornecida com a hash armazenada (bcrypt)
#   - Geração de um token JWT assinado contendo:
#       • sub: e-mail do usuário
#       • perfil: perfil de acesso (RBAC)
#       • exp: expiração baseada em settings
# Retorna:
#   - O objeto `User` com um atributo `token` dinâmico (não persistido no banco)
# ============================================================================================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def autenticar_usuario(email: str, senha: str) -> User:
    db = SessionLocal()
    usuario = db.query(User).filter(User.email == email).first()

    if not usuario:
        return None

    if not pwd_context.verify(senha, usuario.senha_hash):
        return None

    payload = {
        "sub": usuario.email,
        "perfil": usuario.perfil,
        "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    }

    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

    # Atributo transitório que será usado apenas no retorno do login
    usuario.token = token

    return usuario

# ============================================================================================
# 🧠 verificar_token(token)
# --------------------------------------------------------------------------------------------
# Recebe um token JWT como string:
#   - Decodifica e valida a assinatura com `settings.JWT_SECRET`
#   - Verifica o campo `sub` (e-mail)
#   - Retorna o objeto `User` correspondente, se existir
#   - Lança exceções claras se o token estiver expirado, malformado ou inválido
# ============================================================================================

def verificar_token(token: str) -> User:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        email = payload.get("sub")

        if not email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido: e-mail ausente."
            )

        db = SessionLocal()
        usuario = db.query(User).filter(User.email == email).first()

        return usuario

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado, inválido ou malformado."
        )
