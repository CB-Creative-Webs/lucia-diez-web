const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const langButtons = document.querySelectorAll("[data-lang-switch]");

const homeTranslations = {
  es: {
    lang: "es-AR",
    title: "Lucía Diez · Psicóloga",
    selectorText: {
      ".skip-link": "Saltar al contenido",
      ".brand": "Inicio Lucía Diez",
      ".nav a[href='#inicio']": "Inicio",
      ".nav a[href='#sobre-lucia']": "Sobre mí",
      ".nav a[href='#acompanamientos']": "Cómo puedo acompañarte",
      ".nav .nav-reserve": "Reserva tu sesión",
      ".nav a[href='#ebooks']": "E-books",
      ".nav a[href='#faq']": "Preguntas",
      ".nav .nav-contact": "Contacto",
      ".hero .eyebrow": "Lucía Diez · Lic. en Psicología | EMDR | Psicotrauma",
      ".hero h1": "Psicoterapia integrativa para volver a vos",
      ".hero-copy > p:not(.eyebrow)": "Te acompaño en procesos de ansiedad, crisis vitales, duelos, vínculos, dependencia emocional, regulación emocional, autoestima y crecimiento personal.",
      ".hero-tags span:nth-child(1)": "Trauma y sistema nervioso",
      ".hero-tags span:nth-child(2)": "Regulación emocional",
      ".hero-tags span:nth-child(3)": "Aceptación radical",
      ".hero-actions .primary": "Conocé cómo puedo acompañarte",
      ".hero-actions .secondary": "Ver e-books y recursos",
      ".intro-line p": "Mi enfoque es integrativo. Entiendo que el bienestar no depende únicamente de lo que pensamos o sentimos, sino también de cómo habitamos nuestro cuerpo, nuestros vínculos y nuestra vida cotidiana.",
      ".about .section-heading .eyebrow": "Sobre Lucía",
      ".about .section-heading h2": "Una mirada clínica sensible, clara y profesional.",
      ".about .prose > p:nth-of-type(1)": "Soy especialista en Psicotrauma (CPT I y II - Newman Institute) y Terapeuta EMDR certificada (CIPSE - EMDR Iberoamérica). Además, cuento con formación en ACT, DBT y terapias orientadas a la regulación del sistema nervioso.",
      ".about .prose > p:nth-of-type(2)": "Trabajo desde la integración mente-cuerpo, la regulación emocional y la aceptación radical, acompañando a comprender capas de protección con respeto y a fortalecer recursos personales.",
      ".about-note p": "Acompañar con claridad, sostén y respeto por el ritmo de cada proceso.",
      ".credentials article:nth-child(1) h3": "Clínica y psicotrauma",
      ".credentials article:nth-child(1) p": "Experiencia en consultorio particular, trauma complejo, ansiedad, desregulación emocional y vínculos.",
      ".credentials article:nth-child(2) h3": "Hospital y salud pública",
      ".credentials article:nth-child(2) p": "Atención clínica en hospital público, guardia, dispositivos hospitalarios e interconsulta.",
      ".credentials article:nth-child(3) h3": "Docencia universitaria",
      ".credentials article:nth-child(3) p": "Docente Universitaria en Universidad de Morón (UM).",
      ".support .section-heading .eyebrow": "Cómo puede acompañarte",
      ".support .section-heading h2": "Procesos con sostén, recursos y ritmo propio.",
      ".support-grid article:nth-child(1) h3": "Ansiedad y crisis vitales",
      ".support-grid article:nth-child(1) p": "Ordenar lo que sucede, recuperar regulación y construir pasos posibles.",
      ".support-grid article:nth-child(2) h3": "Duelos y cambios",
      ".support-grid article:nth-child(2) p": "Acompañar procesos de pérdida, transición y reconstrucción personal.",
      ".support-grid article:nth-child(3) h3": "Dificultades vinculares",
      ".support-grid article:nth-child(3) p": "Trabajar límites, patrones relacionales, dependencia emocional y autoestima.",
      ".support-grid article:nth-child(4) h3": "Trauma y sistema nervioso",
      ".support-grid article:nth-child(4) p": "Abordar respuestas de protección desde una mirada informada en trauma.",
      ".support-grid article:nth-child(5) h3": "Regulación emocional",
      ".support-grid article:nth-child(5) p": "Desarrollar herramientas para habitar emociones intensas con más recursos.",
      ".support-grid article:nth-child(6) h3": "Crecimiento personal",
      ".support-grid article:nth-child(6) p": "Volver a una vida más alineada con vos, sin convertirte en alguien diferente.",
      ".services .section-heading .eyebrow": "Acompañamientos",
      ".services .section-heading h2": "Cómo puedo acompañarte",
      ".services .section-heading > p:not(.eyebrow)": "Cada proceso es único. Por eso, podés elegir el tipo de acompañamiento que mejor se adapte a tu momento, tus necesidades y tus posibilidades.",
      ".service-option:nth-child(1) > span": "01 · Programa destacado",
      ".service-option:nth-child(1) h3": "Programa R.A.Í.Z. · 12 semanas",
      ".service-option:nth-child(1) p": "Un recorrido intensivo y estructurado para comenzar a trabajar en la recuperación del trauma psicológico, recuperar seguridad y desarrollar recursos internos.",
      ".service-option:nth-child(1) .service-meta li:nth-child(1)": "12 semanas",
      ".service-option:nth-child(1) .service-meta li:nth-child(2)": "6 sesiones individuales",
      ".service-option:nth-child(1) .service-meta li:nth-child(3)": "Materiales y recursos",
      ".service-option:nth-child(1) .service-meta li:nth-child(4)": "Tareas, ejercicios guiados y seguimiento profesional",
      ".service-option:nth-child(1) .button": "Conocer el programa",
      ".service-option:nth-child(1) .price-row strong": "Argentina $240.000 ARS",
      ".service-option:nth-child(1) .price-row small": "Exterior USD 260 · se desarrolla durante 3 meses",
      ".service-option:nth-child(2) > span": "02 · Consultorio",
      ".service-option:nth-child(2) h3": "Psicoterapia individual",
      ".service-option:nth-child(2) p": "Un espacio personal y confidencial para comprender lo que te pasa, trabajar experiencias difíciles y avanzar a tu propio ritmo.",
      ".service-option:nth-child(2) .service-meta li:nth-child(1)": "Duración: 50 minutos",
      ".service-option:nth-child(2) .button": "Consultar por sesiones individuales",
      ".service-option:nth-child(2) .price-row strong": "Argentina $60.000 ARS",
      ".service-option:nth-child(2) .price-row small": "Exterior USD 65 · por sesión",
      ".service-option:nth-child(3) > span": "03 · Espacio grupal",
      ".service-option:nth-child(3) h3": "Terapia grupal",
      ".service-option:nth-child(3) p": "Un espacio de acompañamiento enfocado en trauma vincular, donde compartir, comprender y construir recursos junto a otras personas.",
      ".service-option:nth-child(3) .service-meta li:nth-child(1)": "Jueves 14:30 hs (ARG)",
      ".service-option:nth-child(3) .service-meta li:nth-child(2)": "Duración: 60 minutos",
      ".service-option:nth-child(3) .button": "Consultar por el grupo",
      ".service-option:nth-child(3) .price-row strong": "Argentina $40.000 ARS",
      ".service-option:nth-child(3) .price-row small": "Exterior USD 50 · por encuentro",
      ".conditions-title": "Encuadre de atención",
      ".service-conditions p:nth-child(2) strong": "Pago anticipado",
      ".service-conditions p:nth-child(2) span": "Reserva el espacio.",
      ".service-conditions p:nth-child(3) strong": "Tolerancia 15 min",
      ".service-conditions p:nth-child(3) span": "Para el inicio de sesión.",
      ".service-conditions p:nth-child(4) strong": "Cancelación menor a 48 hs",
      ".service-conditions p:nth-child(4) span": "Se cobra igualmente.",
      ".service-conditions p:nth-child(5) strong": "Sesión online",
      ".service-conditions p:nth-child(5) span": "Espacio privado y auriculares en lo posible.",
      ".ebook-feature .section-heading .eyebrow": "E-books y recursos",
      ".ebook-feature .section-heading h2": "E-book R.A.Í.Z. para acompañar tu proceso.",
      ".ebook-feature .section-heading p:not(.eyebrow)": "Psicoeducación y actividades para comprender el trauma, regular emociones y volver a vos.",
      ".ebook-flip-hint": "Tocá para ver la contratapa",
      ".ebook-buy-card .eyebrow": "Compra y descarga",
      ".ebook-buy-name": "E-book R.A.Í.Z.",
      ".ebook-buy-card p:not(.eyebrow)": "Exterior USD 25 · entrega privada por email al confirmar el pago.",
      ".ebook-buy-card small": "Acceso digital. La descarga se envía al confirmar el pago.",
      ".ebook-flow-card span": "Cómo recibís el material",
      ".ebook-flow-card li:nth-child(1)": "Elegís Argentina o exterior.",
      ".ebook-flow-card li:nth-child(2)": "Pagás desde Mercado Pago o PayPal.",
      ".ebook-flow-card li:nth-child(3)": "Recibís el enlace privado de descarga por email.",
      ".quote-section blockquote p": "Porque reparar no es convertirte en alguien diferente. A veces es volver a tu esencia.",
      ".faq .section-heading .eyebrow": "Preguntas frecuentes",
      ".faq .section-heading h2": "Encuadre clínico y condiciones de trabajo.",
      ".contact-copy .eyebrow": "Contacto",
      ".contact-copy h2": "Coordinemos un primer contacto.",
      ".contact-copy > p:not(.eyebrow)": "Dejame tus datos y una breve idea de lo que estás necesitando. Te voy a responder para acordar modalidad, disponibilidad y próximos pasos.",
      ".contact-card span": "Antes de comenzar",
      ".contact-card p": "El primer intercambio sirve para orientar la consulta y ver si este espacio es adecuado para vos.",
      ".contact-actions .primary": "Escribir por WhatsApp",
      "[data-field-label='name']": "Nombre",
      "[data-field-label='email']": "Email",
      "[data-field-label='message']": "Mensaje",
      ".contact-form button": "Enviar consulta"
    },
    faq: [
      ["¿Cuánto dura cada sesión?", "Las sesiones individuales duran 50 minutos."],
      ["¿Hay tolerancia de llegada?", "La tolerancia es de 15 minutos. Pasado ese tiempo, la sesión puede considerarse ausente."],
      ["¿Cómo se abonan las sesiones?", "El pago es anticipado para reservar el espacio. Preguntar a Lu: medios de pago disponibles."],
      ["¿Qué pasa si cancelo con menos de 48 horas?", "Las cancelaciones con menos de 48 horas de anticipación se cobran igualmente."],
      ["¿Qué necesito para una sesión online?", "Un espacio privado y cuidado, buena conexión, y auriculares en lo posible para preservar la confidencialidad."],
      ["¿La atención es presencial u online?", "Preguntar a Lu: modalidad actual, zona de atención presencial y disponibilidad horaria."],
      ["¿El Método R.A.Í.Z. reemplaza una terapia individual?", "Preguntar a Lu: cómo desea explicar el alcance clínico del programa, criterios de admisión y evaluación inicial."],
      ["¿Qué incluye el programa R.A.Í.Z.?", "Según la información disponible: 12 semanas, 6 sesiones individuales, materiales, recursos, tareas, ejercicios y seguimiento profesional."],
      ["¿Cuándo se ven cambios?", "Cada proceso es único. La recuperación del trauma es gradual, respetuosa y posible; no se prometen cambios rápidos ni soluciones instantáneas."],
      ["¿Es un espacio para urgencias?", "Preguntar a Lu: cómo quiere comunicar el protocolo ante crisis o urgencias, y qué canales indicar fuera del horario de atención."],
      ["¿Cómo se entregarían los recursos digitales?", "Cuando la compra esté aprobada, el sistema enviará un enlace privado y temporal al email informado."]
    ]
  },
  en: {
    lang: "en",
    title: "Lucía Diez · Psychologist",
    selectorText: {
      ".skip-link": "Skip to content",
      ".brand": "Lucía Diez home",
      ".nav a[href='#inicio']": "Home",
      ".nav a[href='#sobre-lucia']": "About me",
      ".nav a[href='#acompanamientos']": "How I can support you",
      ".nav .nav-reserve": "Book a session",
      ".nav a[href='#ebooks']": "E-books",
      ".nav a[href='#faq']": "Questions",
      ".nav .nav-contact": "Contact",
      ".hero .eyebrow": "Lucía Diez · Licensed Psychologist | EMDR | Psychotrauma",
      ".hero h1": "Integrative psychotherapy to come back to yourself",
      ".hero-copy > p:not(.eyebrow)": "I support people through anxiety, life crises, grief, relationships, emotional dependence, emotional regulation, self-esteem and personal growth.",
      ".hero-tags span:nth-child(1)": "Trauma and nervous system",
      ".hero-tags span:nth-child(2)": "Emotional regulation",
      ".hero-tags span:nth-child(3)": "Radical acceptance",
      ".hero-actions .primary": "See how I can support you",
      ".hero-actions .secondary": "View e-books and resources",
      ".intro-line p": "My approach is integrative. Well-being is not only about what we think or feel, but also about how we inhabit our body, our relationships and our everyday life.",
      ".about .section-heading .eyebrow": "About Lucía",
      ".about .section-heading h2": "A sensitive, clear and professional clinical perspective.",
      ".about .prose > p:nth-of-type(1)": "I specialize in Psychotrauma (CPT I and II - Newman Institute) and I am a certified EMDR therapist (CIPSE - EMDR Iberoamérica). I also have training in ACT, DBT and therapies oriented toward nervous-system regulation.",
      ".about .prose > p:nth-of-type(2)": "I work from mind-body integration, emotional regulation and radical acceptance, supporting people in understanding protective layers with respect and strengthening personal resources.",
      ".about-note p": "Support with clarity, steadiness and respect for the pace of each process.",
      ".credentials article:nth-child(1) h3": "Clinical work and psychotrauma",
      ".credentials article:nth-child(1) p": "Experience in private practice, complex trauma, anxiety, emotional dysregulation and relationships.",
      ".credentials article:nth-child(2) h3": "Hospital and public health",
      ".credentials article:nth-child(2) p": "Clinical care in public hospital settings, emergency care, hospital units and liaison work.",
      ".credentials article:nth-child(3) h3": "University teaching",
      ".credentials article:nth-child(3) p": "University lecturer at Universidad de Morón (UM).",
      ".support .section-heading .eyebrow": "How I can support you",
      ".support .section-heading h2": "Processes with support, resources and your own rhythm.",
      ".support-grid article:nth-child(1) h3": "Anxiety and life crises",
      ".support-grid article:nth-child(1) p": "Making sense of what is happening, recovering regulation and building possible next steps.",
      ".support-grid article:nth-child(2) h3": "Grief and transitions",
      ".support-grid article:nth-child(2) p": "Support through loss, change and personal reconstruction.",
      ".support-grid article:nth-child(3) h3": "Relationship difficulties",
      ".support-grid article:nth-child(3) p": "Working on boundaries, relationship patterns, emotional dependence and self-esteem.",
      ".support-grid article:nth-child(4) h3": "Trauma and nervous system",
      ".support-grid article:nth-child(4) p": "Approaching protective responses from a trauma-informed perspective.",
      ".support-grid article:nth-child(5) h3": "Emotional regulation",
      ".support-grid article:nth-child(5) p": "Developing tools to move through intense emotions with more resources.",
      ".support-grid article:nth-child(6) h3": "Personal growth",
      ".support-grid article:nth-child(6) p": "Returning to a life that feels more aligned with who you are, without becoming someone else.",
      ".services .section-heading .eyebrow": "Care options",
      ".services .section-heading h2": "How I can support you",
      ".services .section-heading > p:not(.eyebrow)": "Every process is unique. You can choose the type of support that best fits your moment, needs and possibilities.",
      ".service-option:nth-child(1) > span": "01 · Featured program",
      ".service-option:nth-child(1) h3": "R.A.Í.Z. Program · 12 weeks",
      ".service-option:nth-child(1) p": "An intensive and structured path to begin working on psychological trauma recovery, rebuild safety and develop internal resources.",
      ".service-option:nth-child(1) .service-meta li:nth-child(1)": "12 weeks",
      ".service-option:nth-child(1) .service-meta li:nth-child(2)": "6 individual sessions",
      ".service-option:nth-child(1) .service-meta li:nth-child(3)": "Materials and resources",
      ".service-option:nth-child(1) .service-meta li:nth-child(4)": "Tasks, guided exercises and professional follow-up",
      ".service-option:nth-child(1) .button": "Explore the program",
      ".service-option:nth-child(1) .price-row strong": "Argentina ARS $240,000",
      ".service-option:nth-child(1) .price-row small": "International USD 260 · runs over 3 months",
      ".service-option:nth-child(2) > span": "02 · Private practice",
      ".service-option:nth-child(2) h3": "Individual psychotherapy",
      ".service-option:nth-child(2) p": "A personal and confidential space to understand what is happening, work through difficult experiences and move at your own pace.",
      ".service-option:nth-child(2) .service-meta li:nth-child(1)": "Duration: 50 minutes",
      ".service-option:nth-child(2) .button": "Ask about individual sessions",
      ".service-option:nth-child(2) .price-row strong": "Argentina ARS $60,000",
      ".service-option:nth-child(2) .price-row small": "International USD 65 · per session",
      ".service-option:nth-child(3) > span": "03 · Group space",
      ".service-option:nth-child(3) h3": "Group therapy",
      ".service-option:nth-child(3) p": "A support space focused on relational trauma, where people can share, understand and build resources with others.",
      ".service-option:nth-child(3) .service-meta li:nth-child(1)": "Thursdays 2:30 pm (ARG)",
      ".service-option:nth-child(3) .service-meta li:nth-child(2)": "Duration: 60 minutes",
      ".service-option:nth-child(3) .button": "Ask about the group",
      ".service-option:nth-child(3) .price-row strong": "Argentina ARS $40,000",
      ".service-option:nth-child(3) .price-row small": "International USD 50 · per meeting",
      ".conditions-title": "Care framework",
      ".service-conditions p:nth-child(2) strong": "Advance payment",
      ".service-conditions p:nth-child(2) span": "Reserves the space.",
      ".service-conditions p:nth-child(3) strong": "15 min tolerance",
      ".service-conditions p:nth-child(3) span": "For the start of the session.",
      ".service-conditions p:nth-child(4) strong": "Cancellation under 48 h",
      ".service-conditions p:nth-child(4) span": "It is charged anyway.",
      ".service-conditions p:nth-child(5) strong": "Online session",
      ".service-conditions p:nth-child(5) span": "Private space and headphones if possible.",
      ".ebook-feature .section-heading .eyebrow": "E-books and resources",
      ".ebook-feature .section-heading h2": "R.A.Í.Z. e-book to support your process.",
      ".ebook-feature .section-heading p:not(.eyebrow)": "Psychoeducation and activities to understand trauma, regulate emotions and come back to yourself.",
      ".ebook-flip-hint": "Tap to see the back",
      ".ebook-buy-card .eyebrow": "Purchase and download",
      ".ebook-buy-name": "R.A.Í.Z. e-book",
      ".ebook-buy-card p:not(.eyebrow)": "International USD 25 · private delivery by email after payment confirmation.",
      ".ebook-buy-card small": "Digital access. The download is sent after payment confirmation.",
      ".ebook-flow-card span": "How you receive it",
      ".ebook-flow-card li:nth-child(1)": "Choose Argentina or international payment.",
      ".ebook-flow-card li:nth-child(2)": "Pay through Mercado Pago or PayPal.",
      ".ebook-flow-card li:nth-child(3)": "Receive a private download link by email.",
      ".quote-section blockquote p": "Repairing does not mean becoming someone different. Sometimes it means returning to your essence.",
      ".faq .section-heading .eyebrow": "Frequently asked questions",
      ".faq .section-heading h2": "Clinical framework and working conditions.",
      ".contact-copy .eyebrow": "Contact",
      ".contact-copy h2": "Let's coordinate a first contact.",
      ".contact-copy > p:not(.eyebrow)": "Leave your details and a brief idea of what you need. I will reply to coordinate modality, availability and next steps.",
      ".contact-card span": "Before beginning",
      ".contact-card p": "The first exchange helps orient the consultation and see whether this space is appropriate for you.",
      ".contact-actions .primary": "Write on WhatsApp",
      "[data-field-label='name']": "Name",
      "[data-field-label='email']": "Email",
      "[data-field-label='message']": "Message",
      ".contact-form button": "Send inquiry"
    },
    faq: [
      ["How long does each session last?", "Individual sessions last 50 minutes."],
      ["Is there an arrival tolerance?", "There is a 15-minute tolerance. After that, the session may be considered missed."],
      ["How are sessions paid?", "Payment is made in advance to reserve the space. Ask Lucía: available payment methods."],
      ["What happens if I cancel with less than 48 hours notice?", "Cancellations made with less than 48 hours notice are charged anyway."],
      ["What do I need for an online session?", "A private and calm space, a stable connection, and headphones if possible to preserve confidentiality."],
      ["Is care available online or in person?", "Ask Lucía: current modality, in-person location and schedule availability."],
      ["Does the R.A.Í.Z. Method replace individual therapy?", "Ask Lucía: how she wants to explain the clinical scope of the program, admission criteria and initial evaluation."],
      ["What does the R.A.Í.Z. program include?", "According to the available information: 12 weeks, 6 individual sessions, materials, resources, tasks, exercises and professional follow-up."],
      ["When can changes be noticed?", "Each process is unique. Trauma recovery is gradual, respectful and possible; quick changes or instant solutions are not promised."],
      ["Is this a space for emergencies?", "Ask Lucía: how she wants to communicate the protocol for crises or emergencies, and which channels to indicate outside working hours."],
      ["How would digital resources be delivered?", "Once the purchase is approved, the system will send a private temporary link to the email provided."]
    ]
  }
};

const setText = (selector, text) => {
  const element = document.querySelector(selector);
  if (!element) return;
  if (selector === ".brand") {
    element.setAttribute("aria-label", text);
    return;
  }
  element.textContent = text;
};

const applyLanguage = (lang) => {
  const copy = homeTranslations[lang] || homeTranslations.es;
  document.documentElement.lang = copy.lang;
  document.title = copy.title;
  Object.entries(copy.selectorText).forEach(([selector, text]) => setText(selector, text));
  document.querySelectorAll(".faq-list details").forEach((detail, index) => {
    const item = copy.faq[index];
    if (!item) return;
    const summary = detail.querySelector("summary");
    const paragraph = detail.querySelector("p");
    if (summary) summary.textContent = item[0];
    if (paragraph) paragraph.textContent = item[1];
  });
  langButtons.forEach((button) => {
    const active = button.dataset.langSwitch === lang;
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem("lucia-site-lang", lang);
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch || "es"));
});

if (document.body.dataset.page === "home") {
  const savedLang = localStorage.getItem("lucia-site-lang");
  applyLanguage(savedLang === "en" ? "en" : "es");
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const updateHeaderSoftness = () => {
  const hero = document.querySelector("#inicio");
  if (!hero) return;
  const threshold = Math.max(120, hero.getBoundingClientRect().height * 0.45);
  const pastHero = window.scrollY > threshold;
  body.classList.toggle("header-soft", pastHero);
  if (!pastHero) body.classList.remove("header-idle");
};

window.addEventListener("load", updateHeaderSoftness);

let headerIdleTimer;
const showHeaderWhileScrolling = () => {
  body.classList.remove("header-idle");
  body.classList.add("header-scrolling");
  updateHeaderSoftness();
  window.clearTimeout(headerIdleTimer);
  headerIdleTimer = window.setTimeout(() => {
    body.classList.remove("header-scrolling");
    if (body.classList.contains("header-soft")) {
      body.classList.add("header-idle");
    }
  }, 850);
};

window.addEventListener("scroll", showHeaderWhileScrolling, { passive: true });

const scrollToCurrentHash = () => {
  if (!window.location.hash) return;
  if (window.location.hash === "#inicio") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(updateHeaderSoftness, 260);
    return;
  }
  const target = document.querySelector(window.location.hash);
  if (target) {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const sectionOffset = window.location.hash === "#acompanamientos" ? 24 : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + sectionOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    window.setTimeout(updateHeaderSoftness, 260);
  }
};

window.addEventListener("load", scrollToCurrentHash);
window.addEventListener("hashchange", scrollToCurrentHash);

document.querySelectorAll(".brand, .nav a[href='#inicio']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    if (window.location.hash !== "#inicio") {
      history.pushState(null, "", "#inicio");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(updateHeaderSoftness, 260);
  });
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("mensaje") || "").trim();
    const status = form.querySelector("[data-form-status]");
    const text = [
      "Hola Lucía, quiero hacer una consulta.",
      name ? `Mi nombre es ${name}.` : "",
      email ? `Mi email es ${email}.` : "",
      message ? `Mensaje: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/5491167015721?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    if (status) {
      const currentLang = localStorage.getItem("lucia-site-lang") === "en" ? "en" : "es";
      status.textContent =
        currentLang === "en"
          ? "WhatsApp opened with your prepared message."
          : "Se abrió WhatsApp con tu mensaje preparado.";
    }
  });
});

document.querySelectorAll("[data-checkout-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const gateway = data.get("gateway");
    const name = encodeURIComponent(String(data.get("name") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    const target = gateway === "paypal" ? "../pages/pago-pendiente.html" : "../pages/pago-aprobado.html";
    window.location.href = `${target}?test=1&name=${name}&email=${email}`;
  });
});

const ebookFlipLabels = {
  es: {
    front: "Tocá para ver la contratapa",
    back: "Tocá para ver la tapa",
  },
  en: {
    front: "Tap to see the back",
    back: "Tap to see the cover",
  },
};

const currentFlipLanguage = () => {
  const saved = localStorage.getItem("lucia-site-lang");
  return saved === "en" || document.documentElement.lang === "en" ? "en" : "es";
};

const ebookFlipItems = [];

document.querySelectorAll("[data-ebook-flip]").forEach((button) => {
  const container = button.closest(".real-ebook-cover, .ebook-visual");
  const hint = container ? container.querySelector("[data-flip-hint]") : null;
  const setFlipHint = (flipped) => {
    if (!hint) return;
    const labels = ebookFlipLabels[currentFlipLanguage()];
    hint.textContent = flipped ? labels.back : labels.front;
  };

  button.classList.remove("is-flipped");
  button.setAttribute("aria-pressed", "false");
  setFlipHint(false);
  ebookFlipItems.push({ button, setFlipHint });

  const toggleFlip = () => {
    if (button.dataset.flipping === "true") return;
    button.dataset.flipping = "true";
    button.classList.remove("is-turning");
    void button.offsetWidth;
    button.classList.add("is-turning");

    window.setTimeout(() => {
      const flipped = button.classList.toggle("is-flipped");
      button.setAttribute("aria-pressed", String(flipped));
      setFlipHint(flipped);
    }, 220);

    window.setTimeout(() => {
      button.classList.remove("is-turning");
      delete button.dataset.flipping;
    }, 540);
  };

  button.addEventListener("click", toggleFlip);

  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  });
});

const resetEbookFlips = () => {
  ebookFlipItems.forEach(({ button, setFlipHint }) => {
    button.classList.remove("is-turning");
    button.classList.remove("is-flipped");
    button.setAttribute("aria-pressed", "false");
    delete button.dataset.flipping;
    setFlipHint(false);
  });
};

window.addEventListener("pageshow", resetEbookFlips);
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#ebooks") resetEbookFlips();
});
