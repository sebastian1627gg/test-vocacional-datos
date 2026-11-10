const TUTOR_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEKo92OsT7R02T62Oo56cQcLCoDtpigNxOJqq46nUG5mKlVhrrLDRcIMa3u4IfjEvxGA/exec";

function actualizarContador() {
  const input = document.getElementById('interes');
  const counter = document.getElementById('counter');
  counter.innerText = input.value.length;
}

function enviarTutor() {
  // Existing fields
  const correo = document.getElementById('correo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const genero = document.getElementById('genero').value;
  const telefono = document.getElementById('telefono').value.trim();
  const area = document.getElementById('area').value;
  const disponibilidad = document.getElementById('disponibilidad').value.trim();
  const interes = document.getElementById('interes').value.trim();
  const autorizacion = document.getElementById('autorizacion').checked;

  // New public profile fields
  const public_name = document.getElementById('public_name').value.trim();
  const public_email = document.getElementById('public_email').value.trim();
  const public_linkedin = document.getElementById('public_linkedin').value.trim();
  const public_github = document.getElementById('public_github').value.trim();

  // New private internal fields
  const private_fullname = document.getElementById('private_fullname').value.trim();
  const private_city = document.getElementById('private_city').value;
  const private_personal_email = document.getElementById('private_personal_email').value.trim();
  const private_phone = document.getElementById('private_phone').value.trim();
  const contact_prefs = [];
  if (document.getElementById('pref_email').checked) contact_prefs.push('Correo electrónico');
  if (document.getElementById('pref_whatsapp').checked) contact_prefs.push('WhatsApp');
  if (document.getElementById('pref_discord').checked) contact_prefs.push('Discord/Slack');

  // Professional profile fields
  const professional_experience = document.getElementById('professional_experience').value;
  const tutor_topics = [];
  if (document.getElementById('tutor_topic_python').checked) tutor_topics.push('Python');
  if (document.getElementById('tutor_topic_github').checked) tutor_topics.push('GitHub');
  if (document.getElementById('tutor_topic_vscode').checked) tutor_topics.push('Visual Studio Code');
  if (document.getElementById('tutor_topic_colab').checked) tutor_topics.push('Google Colab');
  if (document.getElementById('tutor_topic_sql').checked) tutor_topics.push('SQL');
  if (document.getElementById('tutor_topic_aws').checked) tutor_topics.push('AWS');
  if (document.getElementById('tutor_topic_databricks').checked) tutor_topics.push('Databricks');
  if (document.getElementById('tutor_topic_azure').checked) tutor_topics.push('Microsoft Azure');
  if (document.getElementById('tutor_topic_analitica').checked) tutor_topics.push('Analítica de datos');
  if (document.getElementById('tutor_topic_cienciadatos').checked) tutor_topics.push('Ciencia de datos');

  const extra_roles = [];
  if (document.getElementById('extra_eventos').checked) extra_roles.push('Organización y logística de eventos (meetups)');
  if (document.getElementById('extra_contenido').checked) extra_roles.push('Creación de contenido / Redes sociales');
  if (document.getElementById('extra_moderacion').checked) extra_roles.push('Moderación de canales (Discord/Telegram)');
  if (document.getElementById('extra_patrocinios').checked) extra_roles.push('Búsqueda de patrocinios / Alianzas');
  if (document.getElementById('extra_solo').checked) extra_roles.push('Solo me interesan las tutorías por ahora');

  const availability = document.getElementById('availability').value;
  const motivation = document.getElementById('motivation').value.trim();
  const code_of_conduct = document.getElementById('code_of_conduct').checked;

  // Validation for new required fields
  if (!public_name || !private_fullname || !private_city || !private_personal_email || !professional_experience || !tutor_topics.length || !availability || !motivation) {
    alert('Por favor completa todos los campos obligatorios de las nuevas secciones.');
    return;
  }

  if (!correo || !nombre || !genero || !area || !disponibilidad) {
    alert('Por favor completa los campos obligatorios.');
    return;
  }

  if (!autorizacion) {
    alert('Debes aceptar el tratamiento de datos para continuar.');
    return;
  }

  if (!code_of_conduct) {
    alert('Debes aceptar el Código de Conducta para continuar.');
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
    autorizacion: "Aceptado",
    // New fields
    public_name: public_name,
    public_email: public_email ? public_email : "No registra",
    public_linkedin: public_linkedin ? public_linkedin : "No registra",
    public_github: public_github ? public_github : "No registra",
    private_fullname: private_fullname,
    private_city: private_city,
    private_personal_email: private_personal_email,
    private_phone: private_phone ? private_phone : "No registra",
    contact_preferences: contact_prefs.length ? contact_prefs.join(', ') : "No registra",
    professional_experience: professional_experience,
    tutor_topics: tutor_topics.join(', '),
    extra_roles: extra_roles.length ? extra_roles.join(', ') : "No registra",
    availability: availability,
    motivation: motivation,
    code_of_conduct: code_of_conduct ? "Aceptado" : "Rechazado"
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
