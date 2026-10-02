from datetime import datetime

from pydantic import BaseModel, Field


class DocumentOut(BaseModel):
    id: int
    filename: str
    file_type: str
    file_size: int
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatRequest(BaseModel):
    question: str = Field(min_length=2, max_length=2000)


class SourceOut(BaseModel):
    document_id: int
    filename: str
    excerpt: str


class ChatResponse(BaseModel):
    answer: str
    source: SourceOut | None
    mode: str
    question_id: int


class QuestionOut(BaseModel):
    id: int
    question: str
    answer: str
    created_at: datetime

    model_config = {"from_attributes": True}


class HealthOut(BaseModel):
    status: str
    ai_mode: str
