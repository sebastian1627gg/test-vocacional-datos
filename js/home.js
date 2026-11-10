// Directorio de tutores de la página inicial: búsqueda y filtro por área.
// Datos de ejemplo del mockup; reemplazar por los tutores aprobados.
const CONTACT_EMAIL = "colombiapython@gmail.com";

const tutores = [
  {
    usuario: "@ana.restrepo", iniciales: "AR", ciudad: "Medellín", color: "blue",
    rol: "Backend Developer", area: "backend",
    bio: "Doce años construyendo APIs. Me gusta explicar por qué una función existe antes de escribirla.",
    tecnologias: ["Python", "Django", "SQL"], fases: "Fases 2 y 4"
  },
  {
    usuario: "@juanca.data", iniciales: "JC", ciudad: "Bogotá", color: "green",
    rol: "Analista de datos", area: "datos",
    bio: "Vengo de contabilidad y aprendí Python para dejar de pelear con Excel. Buen punto de partida si no eres de sistemas.",
    tecnologias: ["Pandas", "Jupyter", "SQL"], fases: "Fase 4"
  },
  {
    usuario: "@lauramb", iniciales: "LM", ciudad: "Cali", color: "yellow",
    rol: "Programación visual", area: "fundamentos",
    bio: "Diseñadora que programa. Enseño bucles y condicionales dibujando con Turtle y Processing.",
    tecnologias: ["Turtle", "Processing", "Python"], fases: "Fases 1 a 3"
  },
  {
    usuario: "@sgomez.qa", iniciales: "SG", ciudad: "Barranquilla", color: "purple",
    rol: "QA / Testing", area: "qa",
    bio: "Automatizo pruebas desde 2018. Te muestro cómo saber si tu código hace lo que creíste que hacía.",
    tecnologias: ["Pytest", "Selenium", "Git"], fases: "Fase 4"
  },
  {
    usuario: "@dpaz.ml", iniciales: "DP", ciudad: "Bucaramanga", color: "red",
    rol: "Machine Learning Engineer", area: "datos",
    bio: "Entreno y despliego modelos. Prefiero empezar por los datos y no por el modelo de moda.",
    tecnologias: ["Scikit-learn", "PyTorch", "Airflow"], fases: "Fase 4"
  },
  {
    usuario: "@mariar.devops", iniciales: "MR", ciudad: "Pereira", color: "orange",
    rol: "DevOps", area: "infra",
    bio: "Contenedores, pipelines y scripts que ahorran horas. Acompaño automatización de tareas cotidianas.",
    tecnologias: ["Docker", "Git", "Python"], fases: "Fase 4"
  }
];

let filtroActual = "todas";

function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function tarjetaTutor(t) {
  const asunto = encodeURIComponent(`Quiero contactar a ${t.usuario}`);
  const tags = t.tecnologias.map(tec => `<li>${escaparHTML(tec)}</li>`).join("");
  return `
    <article class="tutor-card">
      <div class="tutor-head">
        <span class="avatar c-${t.color}" aria-hidden="true">${escaparHTML(t.iniciales)}</span>
        <div>
          <h3>${escaparHTML(t.usuario)}</h3>
          <p class="tutor-loc">${escaparHTML(t.ciudad)} · UTC-5</p>
        </div>
      </div>
      <span class="role-badge c-${t.color}">${escaparHTML(t.rol)}</span>
      <p class="tutor-bio">${escaparHTML(t.bio)}</p>
      <ul class="tech-tags">${tags}</ul>
      <div class="tutor-foot">
        <span>${escaparHTML(t.fases)}</span>
        <a href="mailto:${CONTACT_EMAIL}?subject=${asunto}">Contactar ↗</a>
      </div>
    </article>`;
}

function renderTutores() {
  const consulta = normalizar(document.getElementById("tutor-search").value.trim());
  const visibles = tutores.filter(t => {
    if (filtroActual !== "todas" && t.area !== filtroActual) return false;
    if (!consulta) return true;
    const texto = normalizar([t.usuario, t.ciudad, t.rol, t.bio, ...t.tecnologias].join(" "));
    return texto.includes(consulta);
  });

  document.getElementById("tutor-grid").innerHTML = visibles.map(tarjetaTutor).join("");
  document.getElementById("tutor-count").textContent =
    `${visibles.length} ${visibles.length === 1 ? "tutor" : "tutores"}`;
  document.getElementById("empty-state").hidden = visibles.length > 0;
}

document.getElementById("tutor-search").addEventListener("input", renderTutores);

document.querySelectorAll(".filter").forEach(boton => {
  boton.addEventListener("click", evento => {
    evento.preventDefault();
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    boton.classList.add("active");
    boton.setAttribute("aria-pressed", "true");
    filtroActual = boton.dataset.filter;
    renderTutores();
  });
});

renderTutores();
