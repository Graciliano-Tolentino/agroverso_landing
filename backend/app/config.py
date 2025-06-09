# ============================================================================================
# ⚙️ backend/app/config.py – Núcleo de Configuração da Infraestrutura Agroverso
# ============================================================================================
# 📌 Função:
#   - Centraliza variáveis sensíveis e estratégicas
#   - Define padrões de segurança, persistência e contexto de execução
#   - Suporta múltiplos ambientes (local, CI/CD, Vercel)
#   - Tipagem forte, fallback seguro e compatibilidade total com Clean Architecture
# --------------------------------------------------------------------------------------------
# ✨ Criado com sabedoria (clareza), força (resiliência) e beleza (semântica).
# ============================================================================================

import os
from pydantic import BaseSettings, Field
from dotenv import load_dotenv

# ============================================================================================
# 🔍 Carregamento condicional do .env local
# ============================================================================================

load_dotenv()  # Executado somente em ambiente local

# ============================================================================================
# 🧰 Fallback externo – utilitário complementar (não usado por Pydantic)
# ============================================================================================

def from_env_or_default(var_name: str, default: str) -> str:
    """
    Busca variável de ambiente com fallback seguro.
    Útil para scripts auxiliares ou integração com ferramentas externas.
    """
    return os.environ.get(var_name, default)

# ============================================================================================
# 🧾 Classe Settings – Configurações validadas via Pydantic
# ============================================================================================

class Settings(BaseSettings):
    # 🔐 JWT
    JWT_SECRET: str = Field(
        default="segredo-padrao-inseguro",
        description="Chave secreta para geração e validação de tokens JWT"
    )
    JWT_EXPIRE_MINUTES: int = Field(
        default=60,
        description="Tempo de expiração do token JWT (em minutos)"
    )

    # 🛢️ Banco de Dados
    DATABASE_URL: str = Field(
        default="sqlite:///./agroverso.db",
        description="String de conexão com o banco (ex: PostgreSQL, SQLite)"
    )

    # 🌎 Ambiente
    APP_ENV: str = Field(
        default="development",
        description="Identifica o ambiente atual: development, production ou staging"
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# ============================================================================================
# 📦 Instância única de settings – acesso global e seguro
# ============================================================================================

settings = Settings()
