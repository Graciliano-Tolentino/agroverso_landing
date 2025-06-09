# ============================================================================================
# 🌱 backend/app/main.py — Núcleo Backend Oficial do Agroverso
# ============================================================================================
# 📌 Responsável por:
#   - Inicializar a aplicação FastAPI
#   - Aplicar middlewares estratégicos (CORS, segurança)
#   - Registrar rotas RESTful por domínio funcional
#   - Expor um ponto de entrada compatível com Vercel (exporta `app`)
# --------------------------------------------------------------------------------------------
# ✨ Arquitetado com sabedoria (modularidade e clareza), força (compatibilidade cloud-native)
#     e beleza (documentação viva, escalável e regenerativa).
# ============================================================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🔌 Rotas organizadas por domínio funcional
from app.routes import auth, usuarios, orcamentos

# ============================================================================================
# 🚀 Instância FastAPI (reconhecida automaticamente pelo Vercel)
# ============================================================================================

app = FastAPI(
    title="🌿 Agroverso API",
    version="1.0.0",
    description=(
        "🔐 API oficial do Agroverso – autenticação JWT, controle de perfis, gestão de usuários "
        "e orçamentos inteligentes. Construída sobre uma arquitetura regenerativa e modular."
    ),
    docs_url="/docs",      # Interface Swagger UI
    redoc_url="/redoc"     # Interface alternativa com foco analítico
)

# ============================================================================================
# 🌐 Middleware CORS – Compartilhamento entre domínios de forma segura
# ============================================================================================
# Permite que o frontend (React, HTML, etc.) hospedado em Vercel, GitHub Pages ou localmente
# consuma os serviços REST da API do Agroverso sem bloqueios de navegador.
# ============================================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agroverso.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================================
# 🔗 Registro de Rotas Modulares – Organização por responsabilidade RESTful
# ============================================================================================
# Cada grupo de rotas representa um domínio funcional:
# - Autenticação (JWT, login, refresh)
# - Usuários (CRUD, RBAC)
# - Orçamentos (recepção e notificação)
# ============================================================================================

app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["🔐 Autenticação"]
)

app.include_router(
    usuarios.router,
    prefix="/api/usuarios",
    tags=["👥 Usuários"]
)

app.include_router(
    orcamentos.router,
    prefix="/api/orcamentos",
    tags=["📬 Orçamentos"]
)

# ============================================================================================
# 🏁 Rota Raiz (`/`) – Diagnóstico da API Agroverso
# ============================================================================================
# Verifica a saúde do backend, identifica a versão do sistema e fornece links diretos para
# a documentação Swagger e ReDoc. Ideal para monitoração automatizada e testes CI/CD.
# ============================================================================================

@app.get("/", tags=["🌐 Sistema"])
def raiz():
    return {
        "mensagem": "🎉 Backend do Agroverso em operação com excelência regenerativa.",
        "versao": "1.0.0",
        "documentacao": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        },
        "ambiente": "vercel",
        "estado": "🟢 ativo"
    }
