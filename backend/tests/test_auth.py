# ============================================================================================
# 🧪 test_auth.py – Testes Automatizados de Autenticação JWT • Agroverso
# ============================================================================================
# 📌 Verifica a robustez, segurança e consistência dos fluxos de autenticação:
#   - Login válido e inválido
#   - Uso correto do token JWT
#   - Proteção de rotas RESTful
# --------------------------------------------------------------------------------------------
# ✨ Construído com sabedoria (validação de credenciais), força (proteção de acesso) e beleza
#     (respostas previsíveis, testáveis e seguras).
# ============================================================================================

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# ============================================================================================
# ✅ Teste de login com credenciais válidas
# ============================================================================================

def test_login_valido():
    response = client.post("/api/auth/login", json={
        "email": "admin@agroverso.com",
        "senha": "senha_segura123"
    })

    assert response.status_code == 200
    dados = response.json()
    assert "access_token" in dados
    assert dados["token_type"].lower() == "bearer"

# ============================================================================================
# ❌ Teste de login com credenciais inválidas
# ============================================================================================

def test_login_invalido():
    response = client.post("/api/auth/login", json={
        "email": "usuario_inexistente@dominio.com",
        "senha": "senha_incorreta"
    })

    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciais inválidas"

# ============================================================================================
# 🔐 Teste de rota protegida com token válido (verificação de autenticação)
# ============================================================================================

def test_protecao_de_rota_com_token_valido():
    # 1. Login para obter o token
    login_resp = client.post("/api/auth/login", json={
        "email": "admin@agroverso.com",
        "senha": "senha_segura123"
    })

    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]

    # 2. Acessar rota protegida com o token
    resp = client.get("/api/usuarios/me", headers={
        "Authorization": f"Bearer {token}"
    })

    assert resp.status_code == 200
    dados = resp.json()
    assert dados["email"] == "admin@agroverso.com"
    assert "id" in dados

# ============================================================================================
# 🛡️ Teste de rota protegida sem token JWT
# ============================================================================================

def test_protecao_de_rota_sem_token():
    resp = client.get("/api/usuarios/me")

    assert resp.status_code == 401
    assert resp.json()["detail"] == "Não autorizado. Token inválido ou expirado."
