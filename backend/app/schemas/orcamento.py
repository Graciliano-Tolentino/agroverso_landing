# ============================================================================================
# 📄 schemas/orcamento.py – Schema Pydantic • Atualização de Status de Orçamento • Agroverso
# ============================================================================================
# 📌 Finalidade:
#   - Validar o corpo da requisição PATCH /api/dashboard/orcamentos/{id}
#   - Garantir estrutura, tipagem e documentação automática para novos status
# --------------------------------------------------------------------------------------------
# ✨ Projetado com sabedoria (tipagem segura), força (validação precisa) e beleza (clareza semântica).
# ============================================================================================

from pydantic import BaseModel, Field, constr

class OrcamentoStatusUpdate(BaseModel):
    status: constr(strip_whitespace=True, min_length=3, max_length=50) = Field(
        ...,
        example="finalizado",
        title="Novo status do orçamento",
        description="Status atualizado do orçamento. Exemplos: pendente, em análise, finalizado."
    )
