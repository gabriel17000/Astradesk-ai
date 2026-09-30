from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Question
from app.schemas.api import ChatRequest, ChatResponse, QuestionOut, SourceOut
from app.services.ai_service import answer_question
from app.services.retrieval_service import find_relevant_chunks

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    matches = find_relevant_chunks(db, payload.question)
    context = "\n".join(chunk.content for chunk, _ in matches)
    answer, mode = answer_question(payload.question, context)
    question = Question(question=payload.question, answer=answer)
    db.add(question)
    db.commit()
    db.refresh(question)
    source = None
    if matches:
        chunk, document = matches[0]
        source = SourceOut(document_id=document.id, filename=document.filename, excerpt=chunk.content[:240])
    return ChatResponse(answer=answer, source=source, mode=mode, question_id=question.id)


@router.get("/questions", response_model=list[QuestionOut])
def list_questions(db: Session = Depends(get_db)):
    return db.scalars(select(Question).order_by(Question.created_at.desc()).limit(50)).all()
