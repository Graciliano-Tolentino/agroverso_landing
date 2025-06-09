# ============================================================================================
# 👤 backend/app/models/user.py — Modelo ORM de Usuário do Agroverso
# ============================================================================================
# 📌 Responsável por:
#   - Representar a entidade "usuário" no banco de dados relacional
#   - Viabilizar autenticação e controle de acesso via perfil (RBAC)
#   - Servir como núcleo de segurança e identidade do sistema
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (clareza semântica), força (integridade relacional)
#    e beleza (modelo legível, extensível e pronto para produção)
# ============================================================================================

from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

# ============================================================================================
# 🧾 Classe User – Modelo de Usuário com Perfis, Acesso e Auditoria
# ============================================================================================
# Define a estrutura da tabela `usuarios`, usada para autenticação via JWT, controle RBAC e
# dashboard segmentado por perfil. Compatível com segurança moderna e boas práticas de ORM.
# ============================================================================================

class User(Base):
    __tablename__ = "usuarios"

    # 🔑 Identificador único primário
    id = Column(Integer, primary_key=True, index=True)

    # 🧍 Nome completo do usuário (exibido no painel)
    nome = Column(String(120), nullable=False)

    # 📧 E-mail único – chave para autenticação
    email = Column(String(180), unique=True, nullable=False, index=True)

    # 🔒 Hash da senha criptografada (bcrypt)
    senha_hash = Column(String(255), nullable=False)

    # 🧠 Perfil de acesso (RBAC): administrador, gerente, lider, tecnico
    perfil = Column(String(50), nullable=False, default="tecnico")

    # ✅ Campo lógico para ativação/desativação
    ativo = Column(Boolean, default=True)

    # 🕓 Registro de criação (automatizado pelo banco)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())

