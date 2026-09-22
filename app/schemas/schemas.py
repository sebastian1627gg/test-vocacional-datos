from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# --- ESQUEMAS PARA OPCIONES DE RESPUESTA ---
class OptionBase(BaseModel):
    texto_opcion: str
    categoria_rol: str

class OptionResponse(OptionBase):
    id: int

    class Config:
        from_attributes = True


# --- ESQUEMAS PARA PREGUNTAS ---
class QuestionResponse(BaseModel):
    id: int
    texto_pregunta: str
    orden: int
    opciones: List[OptionResponse]

    class Config:
        from_attributes = True


# --- ESQUEMAS PARA EL ENVÍO DEL TEST (PAYLOAD DEL FRONTEND) ---
class AnswerSubmission(BaseModel):
    question_id: int
    option_id: int

class TestSubmission(BaseModel):
    nombre_usuario: str
    email_usuario: Optional[EmailStr] = None
    respuestas: List[AnswerSubmission]


# --- ESQUEMAS PARA MOSTRAR EL RESULTADO FINAL ---
class TestResultResponse(BaseModel):
    id: int
    user_id: int
    puntaje_ingeniero: int
    puntaje_cientifico: int
    puntaje_analista: int
    perfil_ganador: str
    fecha_evaluacion: datetime

    class Config:
        from_attributes = True