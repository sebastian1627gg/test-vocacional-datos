from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import test_router

app = FastAPI(
    title="API Test Vocacional - Roles de Datos",
    description="Backend para evaluación vocacional preparado para Machine Learning."
)

# Configuración de CORS para permitir peticiones desde el navegador/frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(test_router.router, tags=["Test Vocacional"])