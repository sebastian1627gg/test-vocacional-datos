const TUTOR_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEKo92OsT7R02T62Oo56cQcLCoDtpigNxOJqq46nUG5mKlVhrrLDRcIMa3u4IfjEvxGA/exec";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let enviando = false;

function esEmailValido(valor) {
  return EMAIL_RE.test(valor);
}

function enviarTutor() {
  if (enviando) return;

  // ── Sección 1: Perfil público ──
  const public_name   = document.getElementById('public_name').value.trim();
  const public_email  = document.getElementById('public_email').value.trim();
  const public_linkedin = document.getElementById('public_linkedin').value.trim();
  const public_github = document.getElementById('public_github').value.trim();

  // ── Sección 2: Datos internos ──
  const private_fullname       = document.getElementById('private_fullname').value.trim();
  const private_gender         = document.getElementById('private_gender').value;
  const private_city           = document.getElementById('private_city').value;
  const private_personal_email = document.getElementById('private_personal_email').value.trim();
  const private_phone          = document.getElementById('private_phone').value.trim();

  const contact_prefs = [];
  if (document.getElementById('pref_email').checked)    contact_prefs.push('Correo electrónico');
  if (document.getElementById('pref_whatsapp').checked) contact_prefs.push('Teléfono / WhatsApp');
  if (document.getElementById('pref_discord').checked)  contact_prefs.push('Discord/Slack');

  // ── Sección 3: Perfil profesional ──
  const work_area               = document.getElementById('work_area').value;
  const professional_experience = document.getElementById('professional_experience').value;

  const tutor_topics = [];
  if (document.getElementById('tutor_topic_python').checked)      tutor_topics.push('Python');
  if (document.getElementById('tutor_topic_github').checked)      tutor_topics.push('GitHub');
  if (document.getElementById('tutor_topic_vscode').checked)      tutor_topics.push('Visual Studio Code');
  if (document.getElementById('tutor_topic_colab').checked)       tutor_topics.push('Google Colab');
  if (document.getElementById('tutor_topic_sql').checked)         tutor_topics.push('SQL');
  if (document.getElementById('tutor_topic_aws').checked)         tutor_topics.push('AWS');
  if (document.getElementById('tutor_topic_databricks').checked)  tutor_topics.push('Databricks');
  if (document.getElementById('tutor_topic_azure').checked)       tutor_topics.push('Microsoft Azure');
  if (document.getElementById('tutor_topic_analitica').checked)   tutor_topics.push('Analítica de datos');
  if (document.getElementById('tutor_topic_cienciadatos').checked) tutor_topics.push('Ciencia de datos');

  const extra_roles = [];
  if (document.getElementById('extra_eventos').checked)     extra_roles.push('Organización y logística de eventos (meetups)');
  if (document.getElementById('extra_contenido').checked)   extra_roles.push('Creación de contenido / Redes sociales');
  if (document.getElementById('extra_moderacion').checked)  extra_roles.push('Moderación de canales (Discord/Telegram)');
  if (document.getElementById('extra_patrocinios').checked) extra_roles.push('Búsqueda de patrocinios / Alianzas');
  if (document.getElementById('extra_solo').checked)        extra_roles.push('Solo me interesan las tutorías por ahora');

  const availability = document.getElementById('availability').value;
  const motivation   = document.getElementById('motivation').value.trim();

  // ── Sección 4: Compromiso ──
  const code_of_conduct = document.getElementById('code_of_conduct').checked;
  const autorizacion    = document.getElementById('autorizacion').checked;

  // ── Validaciones ──
  if (!public_name) {
    alert('Por favor indica cómo te llamamos en la comunidad (Sección 1).');
    return;
  }
  if (public_email && !esEmailValido(public_email)) {
    alert('El correo público no tiene un formato válido (Sección 1).');
    return;
  }
  if (!private_fullname || !private_gender || !private_city || !private_personal_email) {
    alert('Por favor completa todos los campos obligatorios de la Sección 2 (Datos internos).');
    return;
  }
  if (!esEmailValido(private_personal_email)) {
    alert('El correo personal no tiene un formato válido (Sección 2).');
    return;
  }
  if (contact_prefs.length === 0) {
    alert('Por favor selecciona al menos una preferencia de comunicación (Sección 2).');
    return;
  }
  if (!work_area || !professional_experience) {
    alert('Por favor completa tu área de trabajo y nivel de experiencia (Sección 3).');
    return;
  }
  if (tutor_topics.length === 0) {
    alert('Por favor selecciona al menos un área de tutoría (Sección 3).');
    return;
  }
  if (!availability || !motivation) {
    alert('Por favor completa la disponibilidad y la motivación (Sección 3).');
    return;
  }
  if (!code_of_conduct) {
    alert('Debes aceptar el Código de Conducta para continuar (Sección 4).');
    return;
  }
  if (!autorizacion) {
    alert('Debes aceptar el tratamiento de datos para continuar (Sección 4).');
    return;
  }

  // ── Payload ──
  const datos = {
    // Sección 1
    public_name:     public_name,
    public_email:    public_email    || 'No registra',
    public_linkedin: public_linkedin || 'No registra',
    public_github:   public_github   || 'No registra',
    // Sección 2
    private_fullname:       private_fullname,
    private_gender:         private_gender,
    private_city:           private_city,
    private_personal_email: private_personal_email,
    private_phone:          private_phone || 'No registra',
    contact_preferences:    contact_prefs.join(', '),
    // Sección 3
    work_area:               work_area,
    professional_experience: professional_experience,
    tutor_topics:            tutor_topics.join(', '),
    extra_roles:             extra_roles.length ? extra_roles.join(', ') : 'No registra',
    availability:            availability,
    motivation:              motivation,
    // Sección 4
    code_of_conduct: 'Aceptado',
    autorizacion:    'Aceptado'
  };

  const botonEnviar = document.querySelector('#step-tutor-form .btn-green');

  async function enviar() {
    enviando = true;
    if (botonEnviar) {
      botonEnviar.disabled = true;
      botonEnviar.textContent = 'Enviando…';
    }

    try {
      if (TUTOR_SCRIPT_URL) {
        await fetch(TUTOR_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(datos)
        });
      }

      document.getElementById('step-tutor-form').style.display = 'none';
      document.getElementById('thanks-container').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error al enviar:', err);
      alert('No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      enviando = false;
      if (botonEnviar) {
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar';
      }
    }
  }

  enviar();
}

function enviarOtro() {
  // Sección 1
  ['public_name','public_email','public_linkedin','public_github'].forEach(id => {
    document.getElementById(id).value = '';
  });
  // Sección 2
  ['private_fullname','private_personal_email','private_phone'].forEach(id => {
    document.getElementById(id).value = '';
  });
  ['private_gender','private_city'].forEach(id => {
    document.getElementById(id).value = '';
  });
  ['pref_email','pref_whatsapp','pref_discord'].forEach(id => {
    document.getElementById(id).checked = false;
  });
  // Sección 3
  ['work_area','professional_experience','availability'].forEach(id => {
    document.getElementById(id).value = '';
  });
  ['tutor_topic_python','tutor_topic_github','tutor_topic_vscode','tutor_topic_colab',
   'tutor_topic_sql','tutor_topic_aws','tutor_topic_databricks','tutor_topic_azure',
   'tutor_topic_analitica','tutor_topic_cienciadatos',
   'extra_eventos','extra_contenido','extra_moderacion','extra_patrocinios','extra_solo'
  ].forEach(id => { document.getElementById(id).checked = false; });
  document.getElementById('motivation').value = '';
  // Sección 4
  document.getElementById('code_of_conduct').checked = false;
  document.getElementById('autorizacion').checked = false;

  document.getElementById('thanks-container').style.display = 'none';
  document.getElementById('step-tutor-form').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
