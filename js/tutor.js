const TUTOR_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEKo92OsT7R02T62Oo56cQcLCoDtpigNxOJqq46nUG5mKlVhrrLDRcIMa3u4IfjEvxGA/exec";

function actualizarContador() {
  const input = document.getElementById('interes');
  const counter = document.getElementById('counter');
  counter.innerText = input.value.length;
}

function enviarTutor() {
  const correo = document.getElementById('correo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const genero = document.getElementById('genero').value;
  const telefono = document.getElementById('telefono').value.trim();
  const area = document.getElementById('area').value;
  const disponibilidad = document.getElementById('disponibilidad').value.trim();
  const interes = document.getElementById('interes').value.trim();
  const autorizacion = document.getElementById('autorizacion').checked;

  if (!correo || !nombre || !genero || !area || !disponibilidad) {
    alert("Por favor completa los campos obligatorios.");
    return;
  }

  if (!autorizacion) {
    alert("Debes aceptar el tratamiento de datos para continuar.");
    return;
  }

  const datos = {
    correo: correo,
    nombre: nombre,
    genero: genero,
    telefono: telefono ? telefono : "No registra",
    area: area,
    disponibilidad: disponibilidad,
    interes: interes ? interes : "No registra",
    autorizacion: "Aceptado"
  };

  if (TUTOR_SCRIPT_URL) {
    fetch(TUTOR_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(datos)
    }).catch(err => console.error("Error al enviar:", err));
  }

  document.getElementById('step-tutor-form').style.display = 'none';
  document.getElementById('thanks-container').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enviarOtro() {
  document.getElementById('correo').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('area').value = '';
  document.getElementById('disponibilidad').value = '';
  document.getElementById('interes').value = '';
  document.getElementById('autorizacion').checked = false;
  document.getElementById('counter').innerText = '0';

  document.getElementById('thanks-container').style.display = 'none';
  document.getElementById('step-tutor-form').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
