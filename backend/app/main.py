from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 — register models before creating tables.
from app.config import settings
from app.database import Base, engine
from app.routers import chat, documents
from app.schemas.api import HealthOut

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Servix Knowledge API", version="1.0.0", description="Base de conhecimento e consultas assistidas do Servix.")
app.add_middleware(CORSMiddleware, allow_origins=[origin.strip() for origin in settings.cors_origins.split(",")], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(documents.router)
app.include_router(chat.router)


@app.get("/api/health", response_model=HealthOut, tags=["system"])
def health():
    return {"status": "ok", "ai_mode": "ai" if settings.openai_api_key else "demo"}
