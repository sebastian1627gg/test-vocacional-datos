import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URL de conexión desde el archivo .env
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://usuario:password@localhost:5432/test_vocacional_db")

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL)

# Crear la fábrica de sesiones para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Función de dependencia para obtener la sesión de BD en las rutas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()