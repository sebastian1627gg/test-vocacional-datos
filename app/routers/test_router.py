from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.models.database import get_db
from app.models.models import Question
from app.schemas.schemas import QuestionResponse, TestSubmission, TestResultResponse
from app.services.scoring_service import procesar_test_vocacional

router = APIRouter(
    prefix="/api/v1/test",
    tags=["Test Vocacional"]
)

@router.get("/questions", response_model=List[QuestionResponse])
def obtener_preguntas(db: Session = Depends(get_db)):
    """
    Ruta para obtener la lista completa de preguntas con sus opciones.
    El frontend llamará a esta ruta para armar la interfaz del test.
    """
    preguntas = db.query(Question).order_by(Question.orden).all()
    return preguntas


@router.post("/submit", response_model=TestResultResponse, status_code=status.HTTP_201_CREATED)
def enviar_respuestas_test(submission: TestSubmission, db: Session = Depends(get_db)):
    """
    Ruta para enviar el test completado.
    Calcula los puntajes por rol, registra eventos de ML y retorna el resultado.
    """
    try:
        resultado = procesar_test_vocacional(submission, db)
        return resultado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error al procesar el test: {str(e)}"
        )