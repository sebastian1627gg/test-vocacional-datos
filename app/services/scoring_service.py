from sqlalchemy.orm import Session
from app.models.models import User, Option, UserResponse, TestResult
from app.schemas.schemas import TestSubmission

def procesar_test_vocacional(submission: TestSubmission, db: Session) -> TestResult:
    # 1. Crear el registro del usuario en la base de datos
    nuevo_usuario = User(
        nombre=submission.nombre_usuario,
        email=submission.email_usuario
    )
    db.add(nuevo_usuario)
    db.flush()  # Asigna un ID al usuario antes de hacer commit definitivo

    # Contador de puntajes por perfil
    puntajes = {
        "Ingeniero de Datos": 0,
        "Científico de Datos": 0,
        "Analista de Datos": 0
    }

    # 2. Registrar cada respuesta individual (para Machine Learning) y calcular puntajes
    for resp in submission.respuestas:
        # Consultar la opción seleccionada para conocer la categoría a la que pertenece
        opcion = db.query(Option).filter(Option.id == resp.option_id).first()
        
        if opcion:
            # Guardar el registro detallado en user_responses
            respuesta_registro = UserResponse(
                user_id=nuevo_usuario.id,
                question_id=resp.question_id,
                option_id=resp.option_id
            )
            db.add(respuesta_registro)

            # Sumar el voto a la categoría del perfil correspondiente
            categoria = opcion.categoria_rol
            if categoria in puntajes:
                puntajes[categoria] += 1

    # 3. Determinar el perfil ganador (el que acumule más respuestas)
    perfil_ganador = max(puntajes, key=puntajes.get)

    # 4. Guardar el resumen final en la tabla test_results
    resultado_final = TestResult(
        user_id=nuevo_usuario.id,
        puntaje_ingeniero=puntajes["Ingeniero de Datos"],
        puntaje_cientifico=puntajes["Científico de Datos"],
        puntaje_analista=puntajes["Analista de Datos"],
        perfil_ganador=perfil_ganador
    )
    db.add(resultado_final)
    db.commit()
    db.refresh(resultado_final)

    return resultado_final