// URL de conexión con Google Sheets
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz12En-xuqeBZPZcriZBYgz1DUIpRjaYa5JwE1fUaJP3e3AZw2CuskYXZq8d-rwb3Nq/exec";

const preguntas = [
  {
    id: 1,
    texto: "1. ¿Cómo te enfrentas a un problema repetitivo en tu día a día?",
    opciones: [
      { categoria: "⚙️", texto: "⚙️ Busco la manera de crear un sistema o una regla para que, la próxima vez, el problema se resuelva solo o en automático." },
      { categoria: "🔮", texto: "🔮 Empiezo a buscar el \"por qué\". Me gusta probar diferentes hipótesis hasta encontrar la lógica oculta que causó el problema." },
      { categoria: "🎨", texto: "🎨 Hago un resumen de lo que pasó. Prefiero dibujar un esquema o hacer una lista clara para que los demás entiendan el problema y no lo repitan." }
    ]
  },
  {
    id: 2,
    texto: "2. Piensa en tu aplicación favorita (como Spotify, Netflix o tu banco). ¿Qué es lo que más te asombra de ella?",
    opciones: [
      { categoria: "⚙️", texto: "⚙️ Que nunca se caiga ni se trabe, incluso cuando millones de personas están conectadas buscando cosas al mismo tiempo." },
      { categoria: "🔮", texto: "🔮 La forma en que parece leerme la mente y me recomienda exactamente la canción o película que quería, aprendiendo de mis gustos." },
      { categoria: "🎨", texto: "🎨 Lo limpia y fácil que es la pantalla. Me encanta que con un solo vistazo a sus gráficas o botones entiendo perfectamente mi información." }
    ]
  },
  {
    id: 3,
    texto: "3. Si te dieran a elegir un \"superpoder\" para trabajar en equipo, ¿cuál pedirías?",
    opciones: [
      { categoria: "⚙️", texto: "⚙️ Ser el arquitecto invisible: el que conecta todas las tuberías de información para que el equipo tenga lo que necesita sin darse cuenta de cómo llegó ahí." },
      { categoria: "🔮", texto: "🔮 Ser el visionario: el que puede tomar un montón de información desordenada, aplicarle lógica pura y predecir qué va a pasar el próximo mes." },
      { categoria: "🎨", texto: "🎨 Ser el traductor: el que agarra un tema aburridísimo o muy técnico y lo convierte en una historia visual que cualquiera puede entender en cinco minutos." }
    ]
  },
  {
    id: 4,
    texto: "4. ¿Qué situación te frustra más cuando estás haciendo un trabajo o proyecto?",
    opciones: [
      { categoria: "⚙️", texto: "⚙️ Hacer las cosas de forma manual una y otra vez. Si hay una forma de conectar los puntos para que fluya solo, me molesta no usarla." },
      { categoria: "🔮", texto: "🔮 Que la gente tome decisiones por \"intuición\" o corazonadas, en lugar de sentarse a analizar las pruebas y hacer cálculos reales." },
      { categoria: "🎨", texto: "🎨 Que me presenten un informe lleno de texto y números amontonados donde es imposible saber qué es lo importante o qué decisión hay que tomar." }
    ]
  },
  {
    id: 5,
    texto: "5. Cuando tienes en tus manos mucha información desordenada, ¿cuál es tu primer instinto?",
    opciones: [
      { categoria: "⚙️", texto: "⚙️ Limpiar, filtrar y clasificar todo en carpetas o cajas donde cada cosa tenga su lugar exacto para que sea fácil de encontrar después." },
      { categoria: "🔮", texto: "🔮 Empezar a cruzar la información. Me gusta ver si al mezclar un dato con otro descubro una tendencia que nadie más había notado." },
      { categoria: "🎨", texto: "🎨 Buscar los tres o cuatro puntos clave y pensar en cómo dibujarlos o graficarlos para que resalten y cuenten la historia por sí solos." }
    ]
  }
];

function actualizarContador() {
  const input = document.getElementById('sobre_ti');
  const counter = document.getElementById('counter');
  counter.innerText = input.value.length;
}

function renderizarTest() {
  let html = '';
  preguntas.forEach((q) => {
    html += `<div class="question"><p>${q.texto}</p>`;
    q.opciones.forEach((opt) => {
      html += `<label class="option"><input type="radio" name="q_${q.id}" value="${opt.categoria}"> ${opt.texto}</label>`;
    });
    html += `</div>`;
  });
  document.getElementById('test-container').innerHTML = html;
}

function irAlTest() {
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const genero = document.getElementById('genero').value;
  const edad = document.getElementById('edad').value;
  const perfil = document.getElementById('perfil').value;
  const experiencia = document.getElementById('experiencia').value;
  const autorizacion = document.getElementById('autorizacion').checked;

  if (!nombre || !correo || !genero || !edad || !perfil || !experiencia) {
    alert("Por favor completa todos los campos obligatorios del formulario.");
    return;
  }

  if (!autorizacion) {
    alert("Debes aceptar la autorización de tratamiento de datos para continuar.");
    return;
  }

  document.getElementById('step-form').style.display = 'none';
  document.getElementById('step-test').style.display = 'block';
  renderizarTest();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function regresarAlFormulario() {
  document.getElementById('step-test').style.display = 'none';
  document.getElementById('step-form').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcularResultado() {
  const conteo = { "⚙️": 0, "🔮": 0, "🎨": 0 };
  let respondidas = 0;

  preguntas.forEach(q => {
    const seleccionada = document.querySelector(`input[name="q_${q.id}"]:checked`);
    if (seleccionada) {
      conteo[seleccionada.value]++;
      respondidas++;
    }
  });

  if (respondidas < preguntas.length) {
    alert("Por favor responde las 5 preguntas antes de finalizar el test.");
    return;
  }

  let ganador = "⚙️";
  if (conteo["🔮"] > conteo[ganador]) ganador = "🔮";
  if (conteo["🎨"] > conteo[ganador]) ganador = "🎨";

  let rolResultado = "";
  let textoResultado = "";

  if (ganador === "⚙️") {
    rolResultado = "Ingeniero de Datos";
    textoResultado = `<div class="role-title">⚙️ Tu perfil se asocia más a un Ingeniero de Datos</div>
    <p>Tienes mente de arquitecto. Te incomoda lo manual y disfrutas creando estructuras y conexiones para que la información fluya sin romperse. Eres el candidato ideal para aprender a automatizar procesos, usar lenguajes que construyen soluciones por detrás (como Python) y gestionar los grandes almacenes donde vive la información (bases de datos).</p>`;
  } else if (ganador === "🔮") {
    rolResultado = "Científico de Datos";
    textoResultado = `<div class="role-title">🔮 Tu perfil se asocia más a un Científico de Datos</div>
    <p>Tienes alma de investigador y te mueve la lógica. No te conformas con ver lo que pasó; quieres saber por qué y qué pasará mañana. Tu curiosidad es perfecta para entrar al mundo de los algoritmos, donde usarás matemáticas y programación para enseñarle a los sistemas a encontrar patrones y predecir el futuro (Machine Learning).</p>`;
  } else {
    rolResultado = "Analista de Datos";
    textoResultado = `<div class="role-title">🎨 Tu perfil se asocia más a un Analista de Datos</div>
    <p>Eres un traductor nato y un comunicador visual. Tienes la habilidad de tomar lo complejo y volverlo simple y útil para tomar decisiones. Tu camino brilla en dominar herramientas que transforman números aburridos en tableros interactivos (como Power BI o Tableau) y en saber hacerle las preguntas correctas a la información.</p>`;
  }

  // Prepara los datos a enviar a Google Sheets
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    genero: document.getElementById('genero').value,
    edad: document.getElementById('edad').value,
    perfil: document.getElementById('perfil').value,
    experiencia: document.getElementById('experiencia').value,
    sobre_ti: document.getElementById('sobre_ti').value.trim(),
    resultado: rolResultado
  };

  // Envía la información a Google Sheets
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  }).catch(error => console.error('Error al enviar los datos:', error));

  document.getElementById('step-test').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('result').innerHTML = textoResultado;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function reiniciarTest() {
  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('perfil').value = '';
  document.getElementById('experiencia').value = '';
  document.getElementById('sobre_ti').value = '';
  document.getElementById('autorizacion').checked = false;
  document.getElementById('counter').innerText = '0';

  document.getElementById('result-container').style.display = 'none';
  document.getElementById('thanks-container').style.display = 'none';
  document.getElementById('step-test').style.display = 'none';
  document.getElementById('step-form').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function finalizarTest() {
  document.getElementById('result-container').style.display = 'none';
  document.getElementById('thanks-container').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
