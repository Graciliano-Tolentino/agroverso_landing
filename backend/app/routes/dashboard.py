# ============================================================================================
# 📊 dashboard.py – Rotas Protegidas por JWT para Painel Administrativo • Agroverso
# ============================================================================================
# 📌 Este módulo fornece endpoints REST para visualização e gestão de orçamentos:
#   - Listagem por setor
#   - Filtros por status
#   - Atualização de status
# 🔐 Todos os acessos são protegidos por autenticação JWT (get_current_user).
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (semântica clara), força (segurança robusta) e beleza
#     (interface REST modular, extensível e integrada ao ecossistema Agroverso).
# ============================================================================================

from fastapi import APIRouter, Depends, HTTPException, status, Path, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.orcamento import Orcamento
from app.schemas.orcamento import OrcamentoResponse, OrcamentoStatusUpdate
from app.models.usuario import Usuario

# ============================================================================================
# 🔒 Inicialização do Router com proteção JWT global
# ============================================================================================

router = APIRouter(
    prefix="/api/dashboard",
    tags=["📊 Dashboard"],
    dependencies=[Depends(get_current_user)]
)

# ============================================================================================
# 📥 GET /setor/{setor} – Listar Orçamentos por Setor
# ============================================================================================
# 🎯 Retorna todos os orçamentos do setor especificado (ex: "hidroponia", "energia").
# ============================================================================================

@router.get("/setor/{setor}", response_model=List[OrcamentoResponse])
def listar_orcamentos_por_setor(
    setor: str,
    db: Session = Depends(get_db)
):
    orcamentos = db.query(Orcamento).filter(Orcamento.setor == setor).all()

    if not orcamentos:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Nenhum orçamento encontrado para o setor '{setor}'."
        )

    return orcamentos

# ============================================================================================
# 🔍 GET /filtro – Filtrar Orçamentos por Status
# ============================================================================================
# 🎯 Retorna orçamentos que correspondem ao status fornecido (opcional).
# ============================================================================================

@router.get("/filtro", response_model=List[OrcamentoResponse])
def filtrar_orcamentos_por_status(
    status: Optional[str] = Query(None, description="Status do orçamento (ex: pendente)"),
    db: Session = Depends(get_db)
):
    query = db.query(Orcamento)
    if status:
        query = query.filter(Orcamento.status == status)

    resultados = query.all()

    if not resultados:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Nenhum orçamento encontrado com os critérios informados."
        )

    return resultados

# ============================================================================================
# 🛠 PATCH /orcamentos/{id} – Atualizar Status de um Orçamento
# ============================================================================================
# 🎯 Atualiza o campo `status` de um orçamento existente com base no ID informado.
# ============================================================================================

@router.patch("/orcamentos/{id}", response_model=OrcamentoResponse)
def atualizar_status_orcamento(
    id: int = Path(..., title="ID do orçamento", gt=0),
    dados: OrcamentoStatusUpdate = Body(...),
    db: Session = Depends(get_db)
):
    orcamento = db.query(Orcamento).filter(Orcamento.id == id).first()

    if not orcamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Orçamento com ID {id} não encontrado."
        )

    orcamento.status = dados.status
    db.commit()
    db.refresh(orcamento)

    return orcamento

