# ============================================================================================
# 🌐 cors.py – Middleware de Compartilhamento de Recursos entre Origens • Agroverso
# ============================================================================================
# 📌 Configura o CORS (Cross-Origin Resource Sharing), permitindo que o frontend do Agroverso,
#     hospedado em domínio distinto (Vercel), acesse com segurança os serviços REST do backend.
# --------------------------------------------------------------------------------------------
# ✨ Construído com sabedoria (controle granular de permissão), força (defesa contra injeções)
#     e beleza (modularidade, reuso e legibilidade absoluta).
# ============================================================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ============================================================================================
# 🔧 Função configurar_cors(app) – Configuração modular e segura do CORS
# ============================================================================================

def configurar_cors(app: FastAPI) -> None:
    """
    🔐 Aplica o middleware CORSMiddleware à instância da aplicação FastAPI.
    🌐 Permite a comunicação segura entre domínios distintos (ex: frontend Vercel e backend).
    
    ⚠️ Somente domínios explicitamente autorizados devem constar no allow_origins.
    """

    # ========================================================================================
    # 🌍 Origens permitidas — Lista expansível para múltiplos ambientes (produção, testes)
    # ========================================================================================
    origens_autorizadas = [
        "https://agroverso.vercel.app",     # Produção
        "http://localhost:3000",            # Ambiente local (desenvolvimento React)
        "http://127.0.0.1:3000"             # Fallback local
    ]

    # ========================================================================================
    # 🔒 Adição do middleware CORS com configuração robusta e compatível com autenticação
    # ========================================================================================
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origens_autorizadas,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# ============================================================================================
# 🚀 main.py – Ponto de entrada do backend FastAPI • Agroverso
# ============================================================================================
# 📌 Este arquivo inicializa a aplicação, aplica middlewares, carrega rotas e configurações.
# --------------------------------------------------------------------------------------------
# ✨ Estruturado com sabedoria (ciclo de inicialização claro), força (modularidade extensiva)
#     e beleza (separação nítida entre infraestrutura, domínio e interfaces).
# ============================================================================================

from fastapi import FastAPI

from app.middleware.cors import configurar_cors
from app.routes import usuarios, auth, orcamentos  # ⬅️ Exemplo de rotas reais

# ============================================================================================
# 🧠 Inicialização da aplicação FastAPI com documentação clara e inteligente
# ============================================================================================

app = FastAPI(
    title="Agroverso API",
    version="1.0.0",
    description="API Backend Inteligente para o Ecossistema Agroverso – Sabedoria, Força e Beleza"
)

# ============================================================================================
# 🔄 Middleware CORS — Proteção e integração cross-origin
# ============================================================================================
configurar_cors(app)

# ============================================================================================
# 🔗 Inclusão das Rotas
# ============================================================================================
app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(orcamentos.router)
