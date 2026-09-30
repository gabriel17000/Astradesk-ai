import io

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
TestSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)


@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    def override_get_db():
        db = TestSession()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_upload_list_and_delete_document(client):
    response = client.post("/api/documents", files={"file": ("contrato.txt", b"O prazo de pagamento e de 30 dias.", "text/plain")})
    assert response.status_code == 201
    document = response.json()
    assert document["filename"] == "contrato.txt"
    assert client.get("/api/documents").json()[0]["id"] == document["id"]
    assert client.delete(f"/api/documents/{document['id']}").status_code == 204
    assert client.get("/api/documents").json() == []


def test_upload_rejects_pdf(client):
    response = client.post("/api/documents", files={"file": ("contrato.pdf", b"%PDF", "application/pdf")})
    assert response.status_code == 400


def test_chat_uses_demo_and_returns_source(client, monkeypatch):
    from app.services import ai_service
    monkeypatch.setattr(ai_service.settings, "openai_api_key", "")
    client.post("/api/documents", files={"file": ("contrato.txt", io.BytesIO("O prazo de pagamento é de 30 dias.".encode()), "text/plain")})
    response = client.post("/api/chat", json={"question": "Qual prazo de pagamento?"})
    assert response.status_code == 200
    assert response.json()["mode"] == "demo"
    assert response.json()["source"]["filename"] == "contrato.txt"
    assert client.get("/api/questions").json()[0]["question"] == "Qual prazo de pagamento?"


def test_text_is_split_with_overlap():
    from app.services.document_service import split_into_chunks
    chunks = split_into_chunks("palavra " * 200, chunk_size=100, overlap=15)
    assert len(chunks) > 1
    assert all(chunks)
