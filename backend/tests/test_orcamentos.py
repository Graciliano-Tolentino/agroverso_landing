# ============================================================================================
# 🧪 test_orcamentos.py – Testes de Submissão e Validação de Orçamentos • Agroverso
# ============================================================================================
# 📌 Testa:
#   - Submissão de orçamentos válidos
#   - Rejeição de campos inválidos ou ausentes
#   - Validação de tipos (ex: EmailStr, max_length)
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (validação segura), força (resposta consistente)
#     e beleza (clareza de cobertura e previsibilidade de resultados).
# ============================================================================================

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# ============================================================================================
# ✅ Teste 1 – Submissão válida de orçamento
# ============================================================================================

def test_submissao_valida_orcamento():
    payload = {
        "nome": "Lucas Almeida",
        "email": "lucas@exemplo.com",
        "mensagem": "Tenho interesse em hidroponia inteligente"
    }

    response = client.post("/api/orcamentos", json=payload)

    assert response.status_code == 201
    dados = response.json()
    assert dados["nome"] == payload["nome"]
    assert dados["email"] == payload["email"]
    assert "id" in dados

# ============================================================================================
# ❌ Teste 2 – Campos obrigatórios ausentes
# ============================================================================================

def test_orcamento_campos_ausentes():
    payload = {
        "email": "lucas@exemplo.com"
        # falta 'nome' e 'mensagem'
    }

    response = client.post("/api/orcamentos", json=payload)

    assert response.status_code == 422
    erros = response.json()["detail"]
    assert any(e["loc"][-1] == "nome" for e in erros)
    assert any(e["loc"][-1] == "mensagem" for e in erros)

# ============================================================================================
# ❌ Teste 3 – Email malformado (formato inválido)
# ============================================================================================

def test_orcamento_email_invalido():
    payload = {
        "nome": "Lucas Almeida",
        "email": "lucas[arroba]exemplo",  # email inválido
        "mensagem": "Solicito informações sobre energia solar inteligente"
    }

    response = client.post("/api/orcamentos", json=payload)

    assert response.status_code == 422
    erros = response.json()["detail"]
    assert any("email" in e["loc"] for e in erros)

# ============================================================================================
# 🛑 Teste 4 – Nome com tamanho excessivo (caso haja max_length no schema)
# ============================================================================================

def test_orcamento_nome_muito_longo():
    payload = {
        "nome": "A" * 300,  # mais que 120 caracteres permitidos, se max_length estiver definido
        "email": "lucas@exemplo.com",
        "mensagem": "Mensagem plausível para teste de campo longo"
    }

    response = client.post("/api/orcamentos", json=payload)

    assert response.status_code == 422
    assert any("nome" in e["loc"] for e in response.json()["detail"])

