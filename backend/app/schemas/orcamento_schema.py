# ============================================================================================
# 📜 backend/app/schemas/orcamento_schema.py — Schemas Pydantic para Solicitações de Orçamento
# ============================================================================================
# 🎯 Estrutura de entrada e saída para operações CRUD RESTful (FastAPI)
# 🔐 Validação rigorosa com tipos seguros e exemplos orientativos
# 📦 Integrado aos modelos ORM do SQLAlchemy com `orm_mode=True`
# ============================================================================================

from pydantic import BaseModel, EmailStr, Field, constr
from datetime import datetime

# ============================================================================================
# 📝 OrcamentoCreate — Schema para criação de nova solicitação (POST)
# --------------------------------------------------------------------------------------------
# 🔒 Nome: até 120 caracteres
# 🔒 Email: validado automaticamente com padrão RFC
# 🔒 Mensagem: texto descritivo, obrigatório
# ============================================================================================

class OrcamentoCreate(BaseModel):
    nome: constr(min_length=3, max_length=120) = Field(..., example="Lucas Almeida")
    email: EmailStr = Field(..., example="lucas@exemplo.com")
    mensagem: str = Field(..., example="Tenho interesse em irrigação solar inteligente")

# ============================================================================================
# 📤 OrcamentoResponse — Schema para resposta de API (GET, POST retorno, listagem)
# --------------------------------------------------------------------------------------------
# ✅ Inclui ID primário
# ✅ Campo `criado_em` (substitui `data`) para clareza semântica
# ✅ Status de atendimento com valor padrão "novo"
# ============================================================================================

class OrcamentoResponse(OrcamentoCreate):
    id: int = Field(..., example=1)
    criado_em: datetime = Field(..., example="2025-06-09T14:00:00.000Z")
    status: str = Field(..., example="novo")

    class Config:
        orm_mode = True
