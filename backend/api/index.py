# ============================================================================================
# 🔗 backend/api/index.py — Ponte Serverless entre a FastAPI do Agroverso e o runtime da Vercel
# ============================================================================================
# 📌 Função:
#   - Adaptar a aplicação FastAPI para rodar como função serverless (compatível com Vercel)
#   - Servir como ponto de entrada único da API no ambiente de nuvem
#   - Garantir performance, segurança e compatibilidade com deploy CI/CD GitHub + Vercel
# --------------------------------------------------------------------------------------------
# ✨ Desenvolvido com sabedoria (clareza arquitetural), força (robustez técnica)
#    e beleza (elegância de estrutura) para alcançar excelência regenerativa.
# ============================================================================================

# ============================================================================================
# 📦 Importações fundamentais
# --------------------------------------------------------------------------------------------
# Mangum: Adaptador universal ASGI → Lambda (Vercel usa esse padrão internamente)
# app.main.app: Instância central da FastAPI configurada com rotas, CORS e documentação
# ============================================================================================

from mangum import Mangum
from app.main import app  # Importa o núcleo da aplicação FastAPI Agroverso

# ============================================================================================
# 🎯 Handler Serverless
# --------------------------------------------------------------------------------------------
# Esta função será automaticamente chamada pela Vercel sempre que uma requisição atingir
# qualquer rota da API configurada em /api. Representa a ponte viva entre nuvem e backend.
# ============================================================================================

handler = Mangum(app)
