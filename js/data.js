/* Davie Academy curriculum data. ONE weekly entry feeds teacher view, parent view, fridge card,
   parent message and materials roll-up. Add weeks by appending to MONTHS[n].weeks. */
window.DA_CONFIG = {
  schoolName: "Davie Academy",
  // QR codes and parent links. Hosted under the GitHub Pages /curriculum/ path.
  PARENT_BASE_URL: "https://clawnick1295.github.io/curriculum/parent.html",
  // Week 1 is the week that contains this date (Monday–Friday). Change only this date to move the school year.
  SCHOOL_YEAR_START: "2026-08-10",
  donationsSignupUrl: "#signup-coming-soon",
  // Amazon Associates tag (e.g. "davieacademy-20"). Leave empty for plain search links.
  AMAZON_TAG: ""
};
window.DA_DOMAINS = ["Physical Development","Approaches to Learning","Social and Emotional Development",
 "Language and Literacy","Mathematical Thinking","Scientific Inquiry","Social Studies","Creative Expression Through the Arts"];
window.DA_AGES = [
 {id:"ones",  name:"Ones",  sub:"12–24 months", color:"#ff8a65", tier:"baby"},
 {id:"twos",  name:"Twos",  sub:"2-year-olds",  color:"#ffb300", tier:"toddler"},
 {id:"threes",name:"3 Year Olds",sub:"Room 11",  color:"#66bb6a", tier:"toddler"},
 {id:"vpk", name:"VPK", sub:"Room 7", color:"#F7931E", tier:"prek"},
 {id:"fours", name:"Fours", sub:"4-year-olds", color:"#29b6f6", tier:"prek"},
 {id:"fives", name:"Fives (Pre-K/VPK)", sub:"5-year-olds", color:"#ab47bc", tier:"prek"}
];
/* Helper: activity = {title, steps, materials:[], video:"", standards:""}
   standards is a Florida Early Learning / VPK code. Leave "" when unknown — the page shows TBD. Do not invent codes. */
function A(title, steps, materials, video, standards){ return {title, steps, materials, video: video||"", standards: standards||""}; }

window.DA_MONTHS = [{
 id:"under-the-sea", title:"Under the Sea in South Florida", month:"Sample Month",
 summary:"Our friends from Florida's waters — manatees, sea turtles, coral reef fish and beach creatures.",
 weeks:[
 { n:1, theme:"Manatee Mornings", icon:"🐋",
   overview:"Meet the gentle manatee! We explore slow and fast, big and small, and how we care for Florida's waterways.",
   words:[["manatee","manatí"],["water","agua"],["slow","lento"],["big","grande"],["gentle","suave"]],
   song:"Count with Sampson (call-and-response chant)\n\nTeacher: Splash, splash! Who's that swimming?\nKids: Sampson the manatee!\nTeacher: Count with Sampson!\nAll: ONE!\nAll: Slow and gentle wins the day!\n\n(repeat, counting up)\nVerse 2: ONE … TWO!\nVerse 3: ONE … TWO … THREE!\nVerse 4: Count with Sampson, everyone — counting to four! ONE … TWO … THREE … FOUR!\nVerse 5: Count with Sampson, everyone — counting to five! ONE … TWO … THREE … FOUR … FIVE!\n\nKids: Bye-bye, Sampson!",
   songVideo:"media/sampson_song.mp4", songPoster:"media/sampson_song_poster.jpg",
   character:{name:"Sampson the Manatee", image:"media/sampson_character.jpg"},
   challenge:"Move slowly like a manatee across a room together — then fast like a fish! Take a photo.",
   ask:["the gentle manatee","slow and fast","what manatees eat","big and small","how we keep water clean"],
   byTier:{
    baby:{ focus:["Physical Development","Social and Emotional Development"], of:{color:"Gray"},
      circle:A("Hello Manatee","Show a manatee picture/plush. Say 'manatee' and pat it gently. Sing hello to each child by name.",["Manatee plush or picture","Hello song"]),
      story:A("Hello, Ocean (board-style read)","Read 'Hello Ocean' by Pam Muñoz Ryan, pointing to pictures and naming 1–2 animals.",["Hello Ocean — Pam Muñoz Ryan"]),
      art:A("Gray Paint Bag","Seal gray paint in a zip bag, tape to table; babies squish and pat.",["Zip bags","Gray washable paint","Tape"]),
      sensory:A("Water Splash Bin","Shallow warm water with sponges and toy sea animals; supervise closely.",["Shallow bin","Sponges","Toy sea animals","Towels"]),
      movement:A("Slow & Fast Crawl","Crawl slowly like a manatee, then quickly; adults model.",["Soft mat"],"media/activity_movement_slow_fast.mp4")},
    toddler:{ focus:["Scientific Inquiry","Language and Literacy","Physical Development"], of:{color:"Gray",shape:"Circle"},
      circle:A("Manatee Visit","Show real manatee photos. Ask: Is it big or small? Where does it live? Count its flippers.",["Manatee photos","Map of Florida"]),
      story:A("Manatee Winter","Read 'Manatee Winter' by Kathleen Weidner Zoehfeld. Ask why the baby needs warm water.",["Manatee Winter — Kathleen Weidner Zoehfeld"]),
      art:A("Paper Plate Manatee","Paint a plate gray, add paper flippers and a dot-sticker eye.",["Paper plates","Gray paint","Construction paper","Dot stickers","Glue sticks"]),
      sensory:A("Sea Grass Snack Bin","Green crinkle paper 'sea grass' with toy manatees; kids 'feed' them with tongs.",["Bin","Green crinkle paper","Toy manatees","Tongs"]),
      movement:A("Manatee Freeze","Move slow like manatees to music; freeze when music stops.",["Music player"],"media/activity_movement_slow_fast.mp4")},
    prek:{ focus:["Scientific Inquiry","Language and Literacy","Mathematical Thinking","Social Studies"], of:{letter:"Mm",number:"1–5",shape:"Circle",color:"Gray"},
      circle:A("Manatee Fact Chart","KWL chart: what do we Know / Want to know about manatees? Find words starting with M.",["Chart paper","Markers","Manatee photos"]),
      story:A("Manatee Winter","Read 'Manatee Winter' by Kathleen Weidner Zoehfeld. Retell beginning/middle/end with picture cards.",["Manatee Winter — Kathleen Weidner Zoehfeld","Sequence cards"]),
      art:A("Letter M Manatee","Turn a large letter M into a manatee with paint and paper flippers; write name on back.",["Letter M printouts","Gray paint","Construction paper","Glue","Pencils"],"media/activity_art_letter_m.mp4"),
      sensory:A("Sink or Float","Predict, then test which objects sink or float; tally results on a chart.",["Water tub","Small objects (cork, rock, spoon, leaf)","Tally chart"]),
      movement:A("Manatee Measuring","Lie in a line to measure a 10-foot manatee with tape; count kids.",["Masking tape","Measuring tape"],"media/activity_movement_slow_fast.mp4")}
   }},
 { n:2, theme:"Sea Turtle Beach", icon:"🐢",
   overview:"Sea turtles nest on Florida beaches! We learn about shells, eggs, sand and helping hatchlings reach the sea.",
   words:[["turtle","tortuga"],["shell","caparazón"],["sand","arena"],["egg","huevo"],["beach","playa"]],
   song:"(Theme song lyrics coming soon — 'Little Turtle, Find the Sea')",
   challenge:"Build a 'turtle nest' with pillows or a towel and count pretend eggs (socks or balls) together.",
   ask:["sea turtles","turtle shells","the beach and sand","turtle eggs","helping baby turtles"],
   byTier:{
    baby:{ focus:["Physical Development","Approaches to Learning"], of:{color:"Green"},
      circle:A("Peek-a-Boo Turtle","Hide a toy turtle under a cloth 'shell'; peek-a-boo and say 'turtle'.",["Toy turtle","Small cloth"]),
      story:A("One Tiny Turtle","Read 'One Tiny Turtle' by Nicola Davies; show pictures, simplify words.",["One Tiny Turtle — Nicola Davies"]),
      art:A("Green Hand Shell","Help babies make a green handprint 'turtle shell'.",["Green washable paint","Cardstock","Wipes"]),
      sensory:A("Sand Bag Squish","Sealed bag with sand and a toy turtle; or supervised sand tray (no mouthing).",["Zip bags","Play sand","Small turtle toy","Tape"]),
      movement:A("Turtle Tummy Time","Tummy time / crawl under a 'shell' blanket tunnel.",["Blanket","Soft tunnel"])},
    toddler:{ focus:["Scientific Inquiry","Mathematical Thinking","Physical Development"], of:{color:"Green",shape:"Oval"},
      circle:A("What's in the Shell?","Pass around a real or toy turtle shell. Feel bumpy/smooth; count eggs in a pretend nest.",["Toy turtle","Ping-pong balls","Basket"]),
      story:A("One Tiny Turtle","Read 'One Tiny Turtle' by Nicola Davies. Act out hatchlings crawling to the sea.",["One Tiny Turtle — Nicola Davies"]),
      art:A("Paper Bowl Turtle","Paint a paper bowl green, add tissue squares on top for shell pattern.",["Paper bowls","Green paint","Tissue paper squares","Glue"]),
      sensory:A("Turtle Egg Dig","Hide ping-pong 'eggs' in the sand table; dig and count them.",["Sand table","Ping-pong balls","Shovels"]),
      movement:A("Hatchling Race","Crawl from the 'nest' to a blue blanket 'ocean'.",["Blue blanket","Cones"])},
    prek:{ focus:["Scientific Inquiry","Mathematical Thinking","Language and Literacy","Social Studies"], of:{letter:"Tt",number:"6–10",shape:"Oval",color:"Green"},
      circle:A("Turtle Life Cycle","Order life-cycle cards: egg, hatchling, juvenile, adult. Talk about beach lights-out rules.",["Life cycle cards","Pocket chart"]),
      story:A("One Tiny Turtle","Read 'One Tiny Turtle' by Nicola Davies. Find and count Tt words on the page.",["One Tiny Turtle — Nicola Davies"]),
      art:A("Shell Pattern Turtles","Create AB/ABC patterns on a turtle shell outline with stamps or stickers.",["Turtle outlines","Stampers or stickers","Crayons"]),
      sensory:A("Egg Count Sand Dig","Dig numbered eggs from sand, put in order 1–10, match to number cards.",["Sand table","Numbered plastic eggs","Number cards"]),
      movement:A("Turtle Obstacle Course","Crawl, tiptoe on 'beach' line, hop over 'waves' to the sea.",["Tape line","Hoops","Blue mat"])}
   }},
 { n:3, theme:"Coral Reef Colors", icon:"🐠",
   overview:"Florida's coral reef is full of colorful fish! We explore colors, sorting and being kind friends like a reef community.",
   words:[["fish","pez"],["reef","arrecife"],["color","color"],["friend","amigo"],["share","compartir"]],
   song:"(Theme song lyrics coming soon — 'Rainbow on the Reef')",
   challenge:"Go on a color hunt at home: find 5 things that are the colors of reef fish. Take a photo of your rainbow!",
   ask:["the coral reef","colors of fish","sharing with friends","Rainbow Fish","how fish swim"],
   byTier:{
    baby:{ focus:["Creative Expression Through the Arts","Social and Emotional Development"], of:{color:"Blue"},
      circle:A("Colorful Fish Song","Hold up colorful felt fish while singing; let babies touch each.",["Felt fish","Song card"]),
      story:A("Rainbow Fish (simplified)","Read 'The Rainbow Fish' by Marcus Pfister, focus on shiny scales.",["The Rainbow Fish — Marcus Pfister"]),
      art:A("Shiny Scale Collage","Sticky contact paper with foil and tissue squares; babies pat them on.",["Contact paper","Foil squares","Tissue squares"]),
      sensory:A("Ocean Sensory Bottle","Bottle with water, glitter, small fish (glued shut).",["Plastic bottles","Water","Glitter","Strong glue"]),
      movement:A("Scarf Swim","Wave colorful scarves like swimming fish to music.",["Play scarves","Music"])},
    toddler:{ focus:["Mathematical Thinking","Social and Emotional Development","Creative Expression Through the Arts"], of:{color:"Blue",shape:"Triangle"},
      circle:A("Fish Color Sort","Sort felt fish by color into matching 'reef' baskets. Name each color.",["Felt fish","Colored baskets"]),
      story:A("The Rainbow Fish","Read 'The Rainbow Fish' by Marcus Pfister. Talk: how does sharing feel?",["The Rainbow Fish — Marcus Pfister"]),
      art:A("Sharing Scales Fish","Each child adds one shiny scale to every friend's fish.",["Fish outlines","Foil squares","Glue sticks"]),
      sensory:A("Fishing for Colors","Magnetic fishing poles in the water table; name the color caught.",["Magnetic fishing set","Water table"]),
      movement:A("Swim to the Color","Call a color; children 'swim' to the matching hoop.",["Colored hoops","Music"])},
    prek:{ focus:["Mathematical Thinking","Social and Emotional Development","Language and Literacy","Creative Expression Through the Arts"], of:{letter:"Ff",number:"11–15",shape:"Triangle",color:"Blue"},
      circle:A("Reef Graph","Each child picks a favorite fish color; build a class bar graph and compare more/less.",["Graph poster","Fish cutouts","Tape"]),
      story:A("The Rainbow Fish","Read 'The Rainbow Fish' by Marcus Pfister. Discuss feelings; write one way we can share.",["The Rainbow Fish — Marcus Pfister","Sentence strips"]),
      art:A("Swimmy School Mural","After 'Swimmy' by Leo Lionni, make a big fish from many small fish prints.",["Swimmy — Leo Lionni","Butcher paper","Paint","Fish sponges"]),
      sensory:A("Color Mixing Reef","Mix primary colors with droppers to make reef colors; record results.",["Droppers","Colored water","Ice cube trays","Recording sheet"]),
      movement:A("Fish Count Jumps","Draw a number card, do that many fish jumps; Ff word for each jump.",["Number cards 11–15"])}
   }},
 { n:4, theme:"Beach Buddies & Hermit Crabs", icon:"🦀",
   overview:"At the beach we find crabs, shells and seabirds. We learn about homes, growing, and keeping beaches clean.",
   words:[["crab","cangrejo"],["home","casa"],["shell","concha"],["clean","limpio"],["sun","sol"]],
   song:"(Theme song lyrics coming soon — 'Hermit Crab Finds a Home')",
   challenge:"Do a 10-minute 'beach clean-up' of a room or yard together and count what you pick up.",
   ask:["hermit crabs","shells at the beach","animal homes","keeping beaches clean","the sun and sand"],
   byTier:{
    baby:{ focus:["Physical Development","Approaches to Learning"], of:{color:"Yellow"},
      circle:A("Crab Walk Hello","Show a crab toy; wiggle fingers like crab claws on babies' arms.",["Crab toy"]),
      story:A("A House for Hermit Crab","Read 'A House for Hermit Crab' by Eric Carle; point to bright pictures.",["A House for Hermit Crab — Eric Carle"]),
      art:A("Yellow Sun Stickers","Stick large yellow circles on paper for a sunny beach.",["Yellow circle stickers","Paper"]),
      sensory:A("Big Shell Basket","Treasure basket with large (non-choking) shells and textures.",["Large shells","Basket"]),
      movement:A("Bucket Fill & Dump","Fill and dump a sand bucket with soft balls.",["Bucket","Soft balls"])},
    toddler:{ focus:["Scientific Inquiry","Social Studies","Physical Development"], of:{color:"Yellow",shape:"Square"},
      circle:A("Whose Home?","Match animals to homes (crab–shell, bird–nest, fish–reef).",["Animal & home picture cards"]),
      story:A("A House for Hermit Crab","Read 'A House for Hermit Crab' by Eric Carle. Count friends he adds to his shell.",["A House for Hermit Crab — Eric Carle"]),
      art:A("Decorate a Crab Shell","Decorate a shell shape with stickers and paint.",["Shell cutouts","Stickers","Paint"]),
      sensory:A("Beach Clean-Up Bin","Pick 'trash' from the sand bin with tongs and sort into a bucket.",["Sand bin","Clean paper scraps","Tongs","Buckets"]),
      movement:A("Crab Walk Race","Sideways crab walk across the room.",["Open floor","Tape lines"])},
    prek:{ focus:["Scientific Inquiry","Social Studies","Language and Literacy","Mathematical Thinking"], of:{letter:"Cc",number:"16–20",shape:"Square",color:"Yellow"},
      circle:A("Beach Helpers","Discuss how people keep beaches clean; make a class 'Beach Rules' list and sign names.",["Chart paper","Markers"]),
      story:A("A House for Hermit Crab","Read 'A House for Hermit Crab' by Eric Carle. Track months on a calendar as the crab grows.",["A House for Hermit Crab — Eric Carle","Calendar"]),
      art:A("Shell Sort & Draw","Sort shells by size/shape, then draw and label a favorite.",["Assorted shells","Paper","Crayons"]),
      sensory:A("Measure the Shells","Measure shells with linking cubes; record biggest and smallest.",["Shells","Linking cubes","Recording sheet"]),
      movement:A("Crab Count Relay","Crab walk to a bucket, pick a numbered shell, bring it back; order 16–20.",["Buckets","Numbered shells/cards"])}
   }}
 ]}];
/* 3 ten-minute home activities per week (household items). Optional per-age overrides: week.byAge[ageId] = {...same keys as tier...} */
(function(){ const H={
 1:[["Bathtub Manatee","Float a toy or cup in the bath; push it slowly, then fast. Say 'slow' and 'fast'."],
    ["Big & Small Hunt","Find one big and one small thing in the kitchen and compare."],
    ["Clean Water Helper","Pour water between cups together and talk about keeping water clean."]],
 2:[["Pillow Nest","Make a nest from pillows and count 'eggs' (rolled socks)."],
    ["Sand… or Sugar Writing","Spread salt or sugar on a tray and draw shells with a finger."],
    ["Turtle Crawl","Put a laundry basket on your back like a shell and crawl to the 'ocean' (a towel)."]],
 3:[["Color Hunt","Find 5 things in the house that match reef colors."],
    ["Sock Fish","Draw a fish face on an old sock; make it swim and say how it feels."],
    ["Share-a-Snack","Share a snack and talk about how sharing feels, like Rainbow Fish."]],
 4:[["Living Room Clean-Up","Set a 10-minute timer and 'clean the beach' — count what you pick up."],
    ["Shell Sort","Sort pasta, buttons or spoons by size like shells."],
    ["Crab Walk Race","Race sideways like crabs down the hallway."]]};
 DA_MONTHS[0].weeks.forEach(w=>w.home=H[w.n]); })();

/* 52-week theme names, one array per age (index 0 = week 1).
   Edit the week numbers below. A blank week shows "Coming soon". */
function daWeekThemes(byWeek){
  const a = Array(52).fill("");
  Object.keys(byWeek).forEach(n => { a[Number(n) - 1] = byWeek[n]; });
  return a;
}
const DA_SEA_THEMES = {
  1: "Manatee Mornings",
  2: "Sea Turtle Beach",
  3: "Coral Reef Colors",
  4: "Beach Buddies & Hermit Crabs"
};
function daSeaLinks(){
  return {
    1: {sample: ["under-the-sea", 1]},
    2: {sample: ["under-the-sea", 2]},
    3: {sample: ["under-the-sea", 3]},
    4: {sample: ["under-the-sea", 4]}
  };
}
window.DA_WEEK_THEMES = {
  ones: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {11: "Pumpkin Patch"})),
  twos: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {11: "Pumpkin Patch"})),
  threes: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {9: "Fall", 10: "Personal Hygiene", 11: "Pumpkin Patch"})),
  vpk: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {9: "Fall", 11: "Pumpkin Patch"})),
  fours: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {11: "Pumpkin Patch"})),
  fives: daWeekThemes(Object.assign({}, DA_SEA_THEMES, {11: "Pumpkin Patch"}))
};
/* Week content. sample: [monthId, week n in that month]. plan: a DA_PLANS id.
   With SCHOOL_YEAR_START 2026-08-10, weeks 1–4 are August and weeks 9–12 are October. */
window.DA_WEEK_LINKS = {
  ones: Object.assign(daSeaLinks(), {11: {plan: "w11-ones-pumpkin"}}),
  twos: Object.assign(daSeaLinks(), {11: {plan: "w11-twos-pumpkin"}}),
  threes: Object.assign(daSeaLinks(), {9: {plan: "room11-3s-fall"}, 10: {plan: "room11-3s-hygiene"}, 11: {plan: "w11-threes-pumpkin"}}),
  vpk: Object.assign(daSeaLinks(), {9: {plan: "room7-vpk-fall"}, 11: {plan: "w11-vpk-pumpkin"}}),
  fours: Object.assign(daSeaLinks(), {11: {plan: "w11-fours-pumpkin"}}),
  fives: Object.assign(daSeaLinks(), {11: {plan: "w11-fives-pumpkin"}})
};
/* Optional text after the calendar month, keyed by month number (10 = October → "October: Fall"). */
window.DA_MONTH_THEMES = {
  8: "Under the Sea",
  10: "Fall"
};
/* Which plan activities are Movement instead of Centers. Index matches DA_PLANS[].activities. */
window.DA_PLAN_SLOTS = {
  "room7-vpk-fall": {activities: ["centers", "movement", "centers", "centers"]},
  "w11-ones-pumpkin": {activities: ["movement", "centers"]},
  "w11-twos-pumpkin": {activities: ["centers", "movement"]},
  "w11-vpk-pumpkin": {activities: ["movement", "centers"]}
};
/* Owl name-slot. Manners and feelings character. Edit this name in one place. */
window.DA_OLLIE_NAME = "Ollie the Owl";
/* ASL sign of the week, keyed by school week. video: "" shows the Sampson placeholder. */
window.DA_SIGNS = {
  9: {
    word: { en: "leaf", es: "hoja" },
    how: {
      en: "Point one finger up. That is the stem. Rest your other hand flat on the fingertip, fingers together. Let that hand flutter down, like a leaf falling off.",
      es: "Apunta un dedo hacia arriba. Ese es el tallo. Apoya la otra mano, abierta y con los dedos juntos, sobre la punta. Deja que esa mano baje revoloteando, como una hoja que se cae."
    },
    video: ""
  },
  10: {
    word: { en: "wash", es: "lavar" },
    how: {
      en: "Rub your palms together in small circles, the way you wash your hands with soap.",
      es: "Frota las palmas en círculos pequeños, como cuando te lavas las manos con jabón."
    },
    video: ""
  },
  11: {
    word: { en: "pumpkin", es: "calabaza" },
    how: {
      en: "Make a fist with one hand. That fist is the pumpkin. With your other hand, flick your thumb off your middle finger onto the back of the fist, like a little thump on a pumpkin.",
      es: "Cierra una mano en puño. Ese puño es la calabaza. Con la otra mano, suelta el pulgar desde el dedo del medio contra el dorso del puño, como un golpecito a la calabaza."
    },
    video: ""
  }
};
/* One kindness act per calendar month (1 = January … 10 = October). Leave a month out, or set en/es to "", to hide it. */
window.DA_HEART = {
  10: {
    en: "Canned food drive for a local pantry. Send one can of food to share.",
    es: "Colecta de comida enlatada para una despensa local. Envía una lata para compartir."
  }
};
/* Spanish word of the week. say is a pronunciation hint. */
window.DA_SPANISH_WORDS = {
  1: { word: "manatí", en: "manatee", say: "mah-nah-TEE" },
  2: { word: "tortuga", en: "turtle", say: "tor-TOO-gah" },
  3: { word: "color", en: "color", say: "koh-LOR" },
  4: { word: "playa", en: "beach", say: "PLAH-yah" },
  9: { word: "hoja", en: "leaf", say: "OH-hah" },
  10: { word: "lavar", en: "to wash", say: "lah-VAHR" },
  11: { word: "calabaza", en: "pumpkin", say: "kah-lah-BAH-sah" }
};
/* Screen-free home challenge for weeks that are not already on a sample week. */
window.DA_CHALLENGES = {
  9: { en: "On a walk, find 3 leaves that are different colors.", es: "En un paseo, encuentra 3 hojas de colores distintos." },
  10: { en: "Wash your hands together and count to 10 while you scrub.", es: "Lávense las manos juntos y cuenten hasta 10 mientras se tallan." },
  11: { en: "Find 3 things at home that start with P.", es: "Encuentra 3 cosas en casa que empiecen con P." }
};
/* Spanish lines for the sample-week challenges already written in English. */
window.DA_CHALLENGE_ES = {
  1: "Muévanse despacio como un manatí por la sala, y luego rápido como un pez.",
  2: "Armen un nido de tortuga con cojines o una toalla y cuenten huevos de mentira (calcetines o pelotas).",
  3: "Busquen en casa 5 cosas de los colores de los peces del arrecife.",
  4: "Hagan una limpieza de playa de 10 minutos en un cuarto o en el patio y cuenten lo que recogen."
};
/* Feelings & manners with the owl, one item per school week, shown on that week's plans. */
window.DA_OLLIE = {
  9: {
    en: "Look at a leaf with Ollie and say how you feel. Practice please when you want a turn to hold it.",
    es: "Mira una hoja con Ollie y di cómo te sientes. Practica por favor cuando quieras un turno para tomarla."
  },
  10: {
    en: "Wash hands with Ollie and wait for a turn at the sink. Practice excuse me and thank you.",
    es: "Lávate las manos con Ollie y espera tu turno en el lavabo. Practica con permiso y gracias."
  },
  11: {
    en: "Use gentle hands on the pumpkin with Ollie. Practice your turn and please.",
    es: "Con Ollie, usa manos suaves con la calabaza. Practica te toca y por favor."
  }
};
/* Growth ladder. {owl} is replaced with DA_OLLIE_NAME. */
window.DA_GROWTH = [
  { ageId: "ones", focus: { en: "Hello routines, gentle touch, and moving at their own pace.", es: "Rutinas de saludo, tacto suave y moverse a su propio ritmo." }, program: { en: "Sampson the Manatee leads water play and calm movement.", es: "Sampson el manatí guía el juego con agua y el movimiento tranquilo." } },
  { ageId: "twos", focus: { en: "Names, colors, and big-body play.", es: "Nombres, colores y juego con todo el cuerpo." }, program: { en: "Frog leads movement: stop and go, hop, and simple words.", es: "La rana guía el movimiento: parar y seguir, saltar y palabras simples." } },
  { ageId: "threes", focus: { en: "Room 11: questions, letters, and small-group play.", es: "Salón 11: preguntas, letras y juego en grupo pequeño." }, program: { en: "Sea turtle leads science play, like sink, float, and seeds.", es: "La tortuga guía el juego de ciencia, como hundirse, flotar y las semillas." } },
  { ageId: "vpk", focus: { en: "Room 7: talking, letters, counting, and kindergarten-ready habits.", es: "Salón 7: hablar, letras, contar y hábitos para el kínder." }, program: { en: "{owl} is this room's manners and feelings character.", es: "{owl} es el personaje de modales y sentimientos de este salón." } },
  { ageId: "fours", focus: { en: "Stories, letters in print, and measuring the world.", es: "Cuentos, letras en los letreros y medir el mundo." }, program: { en: "Panther leads literacy: stories, letters, and words.", es: "La pantera guía la lectura: cuentos, letras y palabras." } },
  { ageId: "fives", focus: { en: "Sounds in words, adding, and simple maps.", es: "Sonidos en las palabras, sumar y mapas simples." }, program: { en: "Crab leads math play: count, add, and compare.", es: "El cangrejo guía el juego de matemáticas: contar, sumar y comparar." } }
];
window.DA_CAST = [
  { img: "owl", name: "", role: { en: "Manners and feelings", es: "Modales y sentimientos" } },
  { img: "sampson", name: "Sampson the Manatee", role: { en: "Florida nature", es: "Naturaleza de Florida" } },
  { img: "music", name: "Parrot", role: { en: "Music", es: "Música" } },
  { img: "art", name: "Flamingo", role: { en: "Art", es: "Arte" } },
  { img: "movement", name: "Frog", role: { en: "Movement", es: "Movimiento" } },
  { img: "science", name: "Sea turtle", role: { en: "Science", es: "Ciencia" } },
  { img: "literacy", name: "Panther", role: { en: "Literacy", es: "Lectura" } },
  { img: "math", name: "Crab", role: { en: "Math", es: "Matemáticas" } }
];
