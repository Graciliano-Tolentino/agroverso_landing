# ============================================================================================
# 🛢️ backend/app/core/database.py — Camada de Persistência Regenerativa do Agroverso
# ============================================================================================
# 📌 Objetivo:
#   - Estabelecer conexão resiliente com o banco de dados
#   - Centralizar a engine e sessão SQLAlchemy
#   - Permitir alternância fluida entre SQLite (desenvolvimento) e PostgreSQL (produção)
#   - Fornecer `Base` para todos os modelos ORM com desacoplamento e padronização
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (clareza e legibilidade),
#    força (resiliência e compatibilidade) e beleza (semântica e harmonia).
# ============================================================================================

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

# ============================================================================================
# 🔌 Criação Dinâmica da Engine SQLAlchemy
# --------------------------------------------------------------------------------------------
# A URL é extraída de settings.DATABASE_URL e analisada para identificar o tipo de banco.
# - Para SQLite: aplica `check_same_thread=False` para compatibilidade multithread.
# - Para PostgreSQL (ou outros): usa engine padrão.
# A flag `future=True` ativa o estilo moderno da SQLAlchemy 2.0 (mais limpo e explícito).
# ============================================================================================

IS_SQLITE = settings.DATABASE_URL.startswith("sqlite")

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if IS_SQLITE else {},
    future=True,
    echo=False  # Pode ser `True` para debug detalhado em desenvolvimento
)

# ============================================================================================
# 🧠 SessionLocal – Fábrica de Sessões para Transações SQL Seguras
# --------------------------------------------------------------------------------------------
# Cada transação com o banco deve usar uma sessão exclusiva via:
#     db = SessionLocal()
#     try:
#         ...
#     finally:
#         db.close()
# --------------------------------------------------------------------------------------------
# Configuração:
# - autocommit=False → evita gravações automáticas sem controle
# - autoflush=False  → desativa flush implícito (maior previsibilidade)
# - future=True      → SQLAlchemy 2.0-style session
# ============================================================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    future=True
)

# ============================================================================================
# 🧱 Base ORM – Superclasse Global para Todos os Modelos de Banco de Dados
# --------------------------------------------------------------------------------------------
# Deve ser herdada por todos os modelos ORM da aplicação:
#
#     from app.core.database import Base
#
#     class Usuario(Base):
#         __tablename__ = "usuarios"
#         id = Column(Integer, primary_key=True)
#         ...
#
# Permite que a criação das tabelas seja feita de forma unificada:
#     Base.metadata.create_all(bind=engine)
# ============================================================================================

Base = declarative_base()
