# ============================================================================================
# 📬 backend/app/models/orcamento.py — Modelo ORM de Solicitação de Orçamento Agroverso
# ============================================================================================
# 📌 Representa formalmente um pedido de orçamento recebido via formulário institucional
# 🌐 Base para automação de resposta, análise de interesse por produto e histórico de contato
# 🔁 Permite status dinâmico de atendimento e classificação posterior
# ============================================================================================

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

# ============================================================================================
# 🧾 Classe Orcamento — Representação Persistente da Intenção de Compra
# ============================================================================================
# Tabela `orcamentos` — projetada com integridade semântica, legibilidade e flexibilidade
# ============================================================================================

class Orcamento(Base):
    __tablename__ = "orcamentos"

    # 🔑 Identificador único incremental
    id = Column(Integer, primary_key=True, index=True)

    # 🧍 Nome completo do solicitante
    nome = Column(String(120), nullable=False)

    # 📧 Email de contato para envio de retorno ou automação
    email = Column(String(255), nullable=False, index=True)

    # 📝 Mensagem personalizada enviada pelo solicitante (desejos, dúvidas, necessidades)
    mensagem = Column(Text, nullable=False)

    # 🧪 Produto de interesse (ex: 'hidroponia', 'energia', 'irrigacao')
    produto = Column(String(50), nullable=False)

    # 🔄 Status interno para controle de atendimento ('novo', 'em_andamento', 'respondido', etc.)
    status = Column(String(20), default="novo")

    # 🕒 Timestamp de criação automática (UTC)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
