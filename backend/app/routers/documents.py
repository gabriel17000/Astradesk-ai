from pathlib import PurePath

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Document, DocumentChunk
from app.schemas.api import DocumentOut
from app.services.document_service import split_into_chunks

router = APIRouter(prefix="/api/documents", tags=["documents"])
ALLOWED_EXTENSIONS = {".txt", ".md"}


@router.get("", response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db)):
    return db.scalars(select(Document).order_by(Document.created_at.desc())).all()


@router.post("", response_model=DocumentOut, status_code=status.HTTP_201_CREATED)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    filename = PurePath(file.filename or "").name
    extension = PurePath(filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Formato não suportado. Envie um arquivo .txt ou .md.")
    raw = await file.read(settings.max_upload_mb * 1024 * 1024 + 1)
    if len(raw) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(413, f"O arquivo excede o limite de {settings.max_upload_mb} MB.")
    try:
        content = raw.decode("utf-8-sig").strip()
    except UnicodeDecodeError:
        raise HTTPException(400, "Não foi possível ler o arquivo. Use texto codificado em UTF-8.")
    if not content:
        raise HTTPException(400, "O documento está vazio.")
    document = Document(filename=filename, file_type=extension[1:], file_size=len(raw))
    document.chunks = [DocumentChunk(content=chunk, chunk_index=index) for index, chunk in enumerate(split_into_chunks(content))]
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    document = db.get(Document, document_id)
    if not document:
        raise HTTPException(404, "Documento não encontrado.")
    db.delete(document)
    db.commit()
