# ============================================================================================
# 📬 backend/app/routes/orcamentos.py — Rota de Criação de Orçamentos Agroverso
# ============================================================================================
# 🔰 Endpoint RESTful: POST /api/orcamentos
# 🔎 Valida os dados do formulário enviados pelo frontend
# 💾 Persiste a solicitação na base de dados SQL (tabela "orcamentos")
# 📤 Retorna resposta completa no padrão OrcamentoResponse
# ============================================================================================

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.schemas.orcamento_schema import OrcamentoCreate, OrcamentoResponse
from app.models.orcamento import Orcamento
from app.core.database import get_db

router = APIRouter()

@router.post(
    "/orcamentos",
    response_model=OrcamentoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["📬 Orçamentos"]
)
def criar_orcamento(dados: OrcamentoCreate, db: Session = Depends(get_db)):
    """
    Recebe dados de orçamento do frontend,
    salva na base e retorna confirmação completa ao usuário.
    """

    # ========================================================================================
    # 🏗️ Criação do objeto ORM com os dados recebidos
    # ----------------------------------------------------------------------------------------
    # ⚠️ Campo 'status' e 'criado_em' são atribuídos automaticamente conforme o modelo
    # ========================================================================================

    novo_orcamento = Orcamento(
        nome=dados.nome,
        email=dados.email,
        mensagem=dados.mensagem,
        produto="hidroponia",  # 🔁 opcionalmente alterar para aceitar frontend dinâmico
        status="novo"          # pode ser omitido se já for o default do modelo
    )

    # ========================================================================================
    # 💾 Persistência no banco de dados com SQLAlchemy
    # ----------------------------------------------------------------------------------------
    # ✅ Commit efetiva a transação e injeta o ID automaticamente
    # ========================================================================================

    db.add(novo_orcamento)
    db.commit()
    db.refresh(novo_orcamento)  # necessário para acessar ID e timestamps após o commit

    # ========================================================================================
    # 📤 Conversão ORM → Pydantic (resposta JSON padrão Agroverso)
    # ========================================================================================

    return OrcamentoResponse.from_orm(novo_orcamento)
