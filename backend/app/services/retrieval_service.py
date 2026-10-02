import re

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Document, DocumentChunk


def find_relevant_chunks(db: Session, question: str, limit: int = 3) -> list[tuple[DocumentChunk, Document]]:
    """V1 lexical retrieval; the service boundary can later host vector search."""
    terms = set(re.findall(r"[\wÀ-ÿ]+", question.lower()))
    rows = db.execute(select(DocumentChunk, Document).join(Document)).all()

    def score(row):
        chunk, _ = row
        content_terms = set(re.findall(r"[\wÀ-ÿ]+", chunk.content.lower()))
        return len(terms & content_terms)

    ranked = sorted((row for row in rows if score(row) > 0), key=score, reverse=True)
    return ranked[:limit]
