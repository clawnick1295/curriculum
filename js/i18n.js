/* Family-view language. Teacher pages stay English. Missing Spanish falls back to English. */
(function(){
  const KEY = "da-lang";
  window.DA = window.DA || {};
  DA.lang = {
    surface: "teacher",
    get(){ try { return localStorage.getItem(KEY) === "es" ? "es" : "en"; } catch (e) { return "en"; } },
    set(code){ try { localStorage.setItem(KEY, code === "es" ? "es" : "en"); } catch (e) {} },
    family(){ return this.surface === "family" && this.get() === "es"; }
  };
  const UI = {
    familyBrand: ["Family Page", "Página para la familia"],
    thisWeekHome: ["This week at home", "Esta semana en casa"],
    learningAbout: ["This week we're learning about", "Esta semana aprendemos sobre"],
    letter: ["Letter", "Letra"],
    number: ["Number", "Número"],
    shape: ["Shape", "Figura"],
    color: ["Color", "Color"],
    word: ["Word of the week", "Palabra de la semana"],
    ask: ["Ask me about…", "Pregúntame sobre…"],
    home3: ["3 five-minute home activities", "3 actividades de cinco minutos en casa"],
    home: ["Five-minute home activities", "Actividades de cinco minutos en casa"],
    song: ["Theme song", "Canción del tema"],
    songSoon: ["Theme song video coming soon", "El video de la canción llega pronto"],
    sign: ["Sign of the week", "Seña de la semana"],
    signHow: ["How to sign it", "Cómo hacer la seña"],
    sampsonSoon: ["Sampson video coming soon", "El video de Sampson llega pronto"],
    heart: ["Davie Heart", "Davie Heart"],
    heartLead: ["Kindness this month", "Bondad de este mes"],
    spanishWord: ["Spanish word of the week", "Palabra en español de la semana"],
    soundsLike: ["Sounds like", "Suena como"],
    means: ["means", "significa"],
    songEs: ["Canción en español", "Canción en español"],
    songEsSoon: ["Coming soon", "Pronto"],
    challenge: ["Home challenge", "Reto en casa"],
    feelings: ["Feelings & manners with", "Sentimientos y modales con"],
    grows: ["How your child grows with us", "Cómo crece tu hijo con nosotros"],
    growsLead: ["From our youngest ones through VPK, each room has a focus and a character who shows up every week.", "Desde los más pequeños hasta VPK, cada salón tiene un enfoque y un personaje que llega cada semana."],
    programs: ["Character programs", "Programas de personajes"],
    roomFocus: ["Room focus", "Enfoque del salón"],
    send: ["Send this to families", "Enviar a las familias"],
    share: ["Share", "Compartir"],
    copyLink: ["Copy link", "Copiar enlace"],
    textMsg: ["Text", "Mensaje"],
    email: ["Email", "Correo"],
    copied: ["Link copied", "Enlace copiado"],
    fromTeacher: ["From your child's teacher at", "De la maestra o el maestro en"],
    comingSoon: ["Coming soon", "Pronto"],
    week: ["Week", "Semana"],
    soonBody: ["This week's family page isn't ready yet. Your teacher will share the word, home activities, and song when this week is posted.", "La página de esta semana todavía no está lista. La maestra compartirá la palabra, las actividades de casa y la canción cuando se publique."],
    character: ["Character", "Personaje"],
    readiness: ["Kindergarten readiness", "Preparación para el kínder"],
    readinessLead: ["These are the Florida early-learning areas for VPK. Checks show what our class explores together, week by week. This is not a record of any one child.", "Estas son las áreas de aprendizaje temprano de Florida para VPK. Las marcas muestran lo que explora nuestro grupo, semana a semana. No es un registro de un niño en particular."],
    soFar: ["skill areas so far", "áreas de aprendizaje hasta ahora"],
    notYet: ["Not yet this year", "Todavía no este año"],
    coveredIn: ["Covered in", "Lo vemos en"],
    wave: ["Hi!", "¡Hola!"],
    tourKicker: ["Tour day", "Día de recorrido"],
    tourTitle: ["Come see how we learn", "Ven a ver cómo aprendemos"],
    tourLead: ["A week in our classrooms: a theme, a song, play for every age, and a page families can share.", "Una semana en nuestros salones: un tema, una canción, juego para cada edad y una página que las familias pueden compartir."],
    sampleWeek: ["Sample week", "Semana de muestra"],
    openFamily: ["Open this week's family page", "Abrir la página familiar de esta semana"],
    special: ["What makes it special", "Qué lo hace especial"],
    meet: ["Meet our characters", "Conoce a los personajes"],
    scan: ["Scan to open the family site", "Escanea para abrir el sitio familiar"],
    schedule: ["Schedule a tour", "Agenda un recorrido"],
    scheduleBody: ["We would love to walk you through a classroom. Online booking is coming soon — please call the front desk and we will find a time.", "Nos encantaría mostrarte un salón. La reserva en línea llega pronto: llama a la recepción y buscamos un horario."],
    forFamilies: ["For families", "Para las familias"],
    tourBlurb: ["See a sample week, our characters, and the family song.", "Mira una semana de muestra, los personajes y la canción familiar."],
    agesThisWeek: ["Every age has its own Week 11", "Cada edad tiene su Semana 11"]
  };
  DA.pick = function(pair){
    if (pair == null || pair === "") return "";
    if (typeof pair === "string") return pair;
    const en = pair.en || "";
    const es = pair.es || "";
    return DA.lang.family() && es ? es : (en || es);
  };
  DA.t = function(key){
    const pair = UI[key];
    if (!pair) return key;
    return DA.lang.family() ? pair[1] : pair[0];
  };
  DA.ageLabel = function(age){
    if (!age) return "";
    if (!DA.lang.family()) return age.name;
    return ({
      ones: "De 1 año",
      twos: "De 2 años",
      threes: "De 3 años",
      vpk: "VPK",
      fours: "De 4 años",
      fives: "De 5 años (Prekínder)"
    })[age.id] || age.name;
  };
  DA.domainLabel = function(name){
    const es = {
      "Physical Development": "Desarrollo físico",
      "Approaches to Learning": "Enfoques de aprendizaje",
      "Social and Emotional Development": "Desarrollo social y emocional",
      "Language and Literacy": "Lenguaje y alfabetización",
      "Mathematical Thinking": "Pensamiento matemático",
      "Scientific Inquiry": "Indagación científica",
      "Social Studies": "Estudios sociales",
      "Creative Expression Through the Arts": "Expresión creativa a través de las artes"
    };
    return DA.lang.family() && es[name] ? es[name] : name;
  };
  DA.domainBlurb = function(name){
    const blurbs = {
      "Physical Development": ["Moving, balancing, and using hands and fingers.", "Moverse, equilibrarse y usar las manos y los dedos."],
      "Approaches to Learning": ["Curiosity, focus, and trying again.", "Curiosidad, atención y volver a intentar."],
      "Social and Emotional Development": ["Feelings, friendships, and getting along.", "Sentimientos, amistades y llevarse bien."],
      "Language and Literacy": ["Talking, listening, letters, and love of books.", "Hablar, escuchar, las letras y el gusto por los libros."],
      "Mathematical Thinking": ["Counting, comparing, shapes, and patterns.", "Contar, comparar, figuras y patrones."],
      "Scientific Inquiry": ["Asking questions and trying things out.", "Hacer preguntas y probar ideas."],
      "Social Studies": ["Family, community, and how people live together.", "La familia, la comunidad y cómo vivimos juntos."],
      "Creative Expression Through the Arts": ["Art, music, movement, and pretend play.", "Arte, música, movimiento y juego de imaginación."]
    };
    const pair = blurbs[name] || ["", ""];
    return DA.lang.family() ? pair[1] : pair[0];
  };

  const FALL_ES = "¡Patea las hojas! (Otoño · Letra K) — canto original, Davie Academy\n\nESTRIBILLO:\n¡Patea, patea, patea las hojas!\nLa K dice \"kuh, kuh, kuh\".\n\nEstrofa 1:\nCaen las hojas crujientes,\nrojas y anaranjadas por todos lados.\n¡Patea, patea, patea las hojas!\nLa K dice \"kuh, kuh, kuh\".\n\nEstrofa 2:\nLas calabazas están grandes y redondas,\nlas bellotas ruedan por el suelo.\n¡Patea, patea, patea las hojas!\nLa K dice \"kuh, kuh, kuh\".\n\nEstrofa 3:\nVuela una cometa con la brisa,\nlos niños saltan entre las hojas.\n¡Patea, patea, patea las hojas!\nLa K dice \"kuh, kuh, kuh\".\n\nFinal:\n¡K es de patear! ¡K es de cometa!\n¡K es de niños! ¡Kuh, kuh, kuh!";
  const PUMPKIN_ES = "Pumpkin Patch Pop! — ¡Pop en el huerto! (Letra P)\n\nESTRIBILLO: ¡P, p, calabaza — pop, pop, pop!\nElige una calabaza, ¡plop, plop, plop!\n\nEstrofa 1: Sampson rueda una calabaza.\nLa P dice \"p\" sin voz… ¡solo aire!\nEstrofa 2: La pantera se asoma al huerto,\nmorado, rosado y anaranjado, lado a lado.\n\nFinal: P es de calabaza, P es de jugar.\n¡Diversión en el huerto todos los días!";

  window.DA_ES = {
    "room7-vpk-fall": {
      theme: "Otoño",
      song: FALL_ES,
      home: [["Colores de otoño", "En un paseo, nombra los colores que ves: rojo, anaranjado, amarillo y café."], ["Sonido de la K", "Di palabras que empiezan con K: kite, key, kick. Pide una más."], ["Cuenta semillas", "Cuenten juntos un puñado de semillas, cereal o frijoles."]],
      ask: ["las señales del otoño", "la letra Kk", "contar semillas"]
    },
    "room11-3s-fall": {
      theme: "Otoño",
      song: FALL_ES,
      home: [["Paseo de otoño", "En un paseo, señala hojas que cambian de color, hojas en el suelo y el aire más fresco."], ["Búsqueda de la K", "Encuentren tres cosas en casa que empiecen con K, como una llave (key), una cometa (kite) o ketchup."], ["Partes de la calabaza", "Miren una calabaza juntos. Nombren el tallo, el color y las semillas."]],
      ask: ["las señales del otoño", "la letra K", "las partes de la calabaza"]
    },
    "room11-3s-hygiene": {
      theme: "Higiene personal",
      home: [["Enséñame", "Pide que te enseñe cómo se lava las manos o cómo se cepilla los dientes."], ["Búsqueda de la M", "Encuentren tres cosas en casa que empiecen con M, como leche (milk), luna (moon) o manoplas (mittens)."], ["El poder del jabón", "Lávense las manos juntos y hablen de cómo el jabón ayuda a que los gérmenes se vayan."]],
      ask: ["lavarse las manos", "cepillarse los dientes", "la letra M"]
    },
    "w11-ones-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "Los más pequeños exploran las calabazas con las manos, los ojos y los oídos: aplastan, ruedan y encuentran calabazas escondidas.",
      song: PUMPKIN_ES,
      home: [["Calabaza, ¿dónde estás?", "Esconde un juguete pequeño bajo una toalla y deja que tu bebé lo encuentre."], ["Texturas de la cocina", "Deja que toque una calabaza o una naranja mientras la nombras."], ["Juego de rodar", "Rueden una pelota de un lado a otro y di \"¡rueda!\""]],
      ask: ["las calabazas", "aplastar", "rodar", "el juego de esconder"]
    },
    "w11-twos-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "Los de dos años lavan, clasifican y saltan en el huerto mientras aprenden el color anaranjado y el sonido /p/.",
      song: PUMPKIN_ES,
      home: [["Búsqueda de colores", "Encuentren juntos 3 cosas anaranjadas en casa."], ["Esponja en el baño", "Deja que lave un juguete con una esponja a la hora del baño."], ["Juego de saltos", "Salten sobre cojines o cuadros de cinta y digan \"¡pop!\""]],
      ask: ["lavar calabazas", "el color anaranjado", "saltar", "la canción de la calabaza"]
    },
    "w11-threes-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "Los de tres años predicen, cuentan y clasifican. ¿La calabaza se hunde o flota? ¿Cuántas semillas hay? ¿Qué empieza con P?",
      song: PUMPKIN_ES,
      home: [["¿Se hunde o flota?", "A la hora del baño, prueben 3 juguetes: ¿se hunden o flotan?"], ["Búsqueda de la P", "Encuentren 3 cosas en casa que empiecen con P."], ["Cuenta la merienda", "Cuenten juntos 5 galletas."]],
      ask: ["hundirse o flotar", "contar semillas", "la letra P", "manualidades de calabaza"]
    },
    "w11-vpk-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "En VPK pesan y miden calabazas, aplauden sílabas y juegan a cubrir números. Así practican matemáticas y el sonido de las palabras.",
      song: PUMPKIN_ES,
      home: [["¿Más pesado o más ligero?", "Sostengan dos frutas, adivinen cuál pesa más y luego comprueben."], ["Aplaude los nombres", "Aplaudan las sílabas del nombre de cada persona de la familia."], ["Merienda con P", "Preparen juntos una merienda con P: pretzels, peras o palomitas."]],
      ask: ["cuál calabaza pesaba más", "aplaudir sílabas", "tirar el dado y cubrir", "palabras con P"]
    },
    "w11-fours-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "Los de cuatro años aprenden cómo crece una calabaza, de la semilla a la enredadera, miden con cubos y buscan la letra Pp.",
      song: PUMPKIN_ES,
      home: [["Vigilamos la semilla", "Siembren un frijol o una semilla en un vaso y mírenlo cada día."], ["Medir con cucharas", "¿Cuántas cucharas mide tu zapato?"], ["Pp en los letreros", "Busquen la letra P en cajas de cereal o en letreros."]],
      ask: ["cómo crecen las calabazas", "medir con cubos", "la búsqueda de Pp", "calabazas con las huellas"]
    },
    "w11-fives-pumpkin": {
      theme: "El huerto de calabazas",
      overview: "Los de cinco años hacen un experimento de burbujas, forman palabras con P, suman con marcos de diez y dibujan un mapa del huerto: habilidades de kínder a través del juego.",
      song: PUMPKIN_ES,
      home: [["Burbujas en la cocina", "Mezclen bicarbonato y vinagre en un vaso y hablen de las burbujas."], ["Suma con cereal", "Usen 10 piezas de cereal para inventar sumas."], ["Dibuja un mapa", "Dibujen juntos un mapa de la recámara o de la calle."]],
      ask: ["el volcán de calabaza", "sumar con el marco de diez", "las palabras con P", "nuestro mapa del huerto"]
    }
  };

  DA.tourPoints = function(){
    const en = [
      ["A fresh theme every week", "Children sing it, play it, and tell you about it at pickup."],
      ["Play matched to each age", "Ones through VPK share the theme, with activities that fit their hands and words."],
      ["Florida early-learning areas", "We name the skill areas in plain language. No mystery codes on the family page."],
      ["A page you can share", "Ask-me-about prompts, five-minute play at home, and the theme song — in English or Spanish."],
      ["Play, not worksheets", "Nothing for little ones to fill out. The home ideas take about five minutes."]
    ];
    const es = [
      ["Un tema nuevo cada semana", "Lo cantan, lo juegan y te lo cuentan a la salida."],
      ["Juego a la medida de cada edad", "De un año hasta VPK comparten el tema, con actividades para sus manos y sus palabras."],
      ["Áreas de aprendizaje de Florida", "Nombramos las áreas con palabras claras. En la página familiar no hay códigos raros."],
      ["Una página para compartir", "Preguntas, juego de cinco minutos en casa y la canción del tema, en inglés o en español."],
      ["Juego, no hojas de trabajo", "Nada que rellenar para los pequeños. Las ideas de casa toman unos cinco minutos."]
    ];
    return DA.lang.family() ? es : en;
  };
})();
