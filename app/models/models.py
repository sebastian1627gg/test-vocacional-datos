from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

# Clase base de la que heredarán todos los modelos
Base = declarative_base()

class User(Base):
    """Tabla de usuarios que realizan el test vocacional"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=True)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    respuestas = relationship("UserResponse", back_populates="usuario")
    resultados = relationship("TestResult", back_populates="usuario")


class Question(Base):
    """Tabla de preguntas del test vocacional"""
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    texto_pregunta = Column(Text, nullable=False)
    orden = Column(Integer, nullable=False)

    # Relaciones
    opciones = relationship("Option", back_populates="pregunta")
    respuestas_usuarios = relationship("UserResponse", back_populates="pregunta")


class Option(Base):
    """Tabla de opciones de respuesta asociadas a cada pregunta"""
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    texto_opcion = Column(Text, nullable=False)
    
    # Categoría o rol al que suma puntos (ej: 'Ingeniero de Datos', 'Científico de Datos', 'Analista de Datos')
    categoria_rol = Column(String(50), nullable=False)

    # Relaciones
    pregunta = relationship("Question", back_populates="opciones")
    respuestas_usuarios = relationship("UserResponse", back_populates="opcion")


class UserResponse(Base):
    """
    TABLA CLAVE PARA MACHINE LEARNING:
    Registra el evento individual de cada respuesta seleccionada por el usuario.
    Permite analizar patrones de elección pregunta por pregunta.
    """
    __tablename__ = "user_responses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    option_id = Column(Integer, ForeignKey("options.id"), nullable=False)
    fecha_respuesta = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    usuario = relationship("User", back_populates="respuestas")
    pregunta = relationship("Question", back_populates="respuestas_usuarios")
    opcion = relationship("Option", back_populates="respuestas_usuarios")


class TestResult(Base):
    """Tabla que almacena el perfil resultante calculado para el usuario"""
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Puntajes obtenidos por categoría
    puntaje_ingeniero = Column(Integer, default=0)
    puntaje_cientifico = Column(Integer, default=0)
    puntaje_analista = Column(Integer, default=0)
    
    # Perfil final predominante
    perfil_ganador = Column(String(50), nullable=False)
    fecha_evaluacion = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    usuario = relationship("User", back_populates="resultados")