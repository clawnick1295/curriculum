/* Lesson plans transcribed from teacher PDFs (Oct 2026). Text kept as written (light spelling fixes only).
   ageId links a plan to a dashboard age group; null = not stated on the PDF. */
const FALL_K_SONG = "Kick the Leaves! (Fall · Letter K) — original chant, Davie Academy\n\nHOOK (everyone):\nKick, kick, kick the leaves!\nK says \"kuh, kuh, kuh!\"\n\nVerse 1:\nCrunchy leaves are falling down,\nred and orange all around.\nKick, kick, kick the leaves!\nK says \"kuh, kuh, kuh!\"\n\nVerse 2:\nPumpkins sitting big and round,\nacorns tumble to the ground.\nKick, kick, kick the leaves!\nK says \"kuh, kuh, kuh!\"\n\nVerse 3:\nFly a kite up in the breeze,\nkids go jumping in the leaves.\nKick, kick, kick the leaves!\nK says \"kuh, kuh, kuh!\"\n\nEnding:\nK is for kick! K is for kite!\nK is for kids! Kuh, kuh, kuh!";
const FALL_K_SONG_VIDEO = "media/fall_k_song.mp4";
const FALL_K_SONG_POSTER = "media/fall_k_song_poster.jpg";
window.DA_PLANS = [
{ id:"fall-kk-unlabeled", room:"", age:"(not filled in)", ageId:null, hidden:true, theme:"Fall – Seasonal Changes", letter:"Kk", source:"Lesson plan PDF #1 (5 pages; room/age left as 'Type here')",
  circle:"Discuss the changes that happen during fall, such as cooler weather, leaves changing colors, falling leaves, and shorter days. Review the four seasons and encourage children to share what they notice about the weather and trees outside. Talk about fall colors and appropriate clothing for cooler weather.",
  objectives:["Identify fall as one of the four seasons.","Recognize seasonal changes, such as cooler weather, changing leaves, and shorter days.","Identify common fall colors: red, orange, yellow, and brown.","Describe appropriate clothing for cooler weather.","Develop observation and communication skills by discussing changes in their environment.","Build vocabulary using words such as fall, autumn, leaves, wind, and season."],
  words:["fall","autumn","leaves","wind","season"],
  steam:{name:"Fall Leaf Wind Experiment", desc:"Children will investigate how wind moves falling leaves by using straws and a handheld fan to create gentle and strong winds. They will make predictions, observe movement, and compare how far their leaves travel while exploring seasonal changes."},
  crafts:[
   {name:"Blow Paint Fall Tree", supplies:["White cardstock","Brown or black washable paint","Green, yellow, orange, and red washable paint","Drinking straws","Droppers or small spoons","Water to thin the paint","Paint trays"]},
   {name:"Scarecrow", supplies:["White paper plate","Brown, yellow, green, red, orange construction paper"]},
   {name:"Fall Leaves", supplies:["Laminating sleeve","Paint","Leaf outline"]}],
  activities:[{name:"Counting Fall Leaves", desc:"Children count and place the matching number of leaves on their tree."}],
  notes:"Activities 1–3 were left blank ('Type here'). Pages 3–5 repeat pages 2 and 4."},
{ id:"room7-vpk-fall", room:"7", age:"VPK", ageId:"vpk", theme:"Fall", letter:"Kk", source:"Lesson plan PDF #2 (3 pages)",
  circle:"Review the days of the week and months of the year. Introduce our new theme: fall, and discuss seasonal changes. Explore signs of fall including changing leaves and cooler weather. Introduce the letter of the week Kk and its sounds. Review words that start with Kk.",
  objectives:["Identify the signs of fall and seasonal changes.","Recognize the letter Kk and its sound.","Explore the texture of pumpkins and practice counting by collecting seeds.","Identify the days of the week and the months of the year."],
  words:[],
  steam:{name:"Pumpkin Seeds", desc:"Students will be able to explore the inside of a pumpkin and count and collect the seeds."},
  crafts:[
   {name:"Scarecrow Popsicle Stick", supplies:["Scarecrow template","Popsicle sticks"]},
   {name:"K is for Key", supplies:["Key template","Aluminum foil"]},
   {name:"Fall Leaves Marble Painting", supplies:["Shaving cream","Paint"]}],
  activities:[
   {name:"Letter K Tracing", desc:"Students will practice writing the letter K."},
   {name:"Ball Toss", desc:"Students will toss a ball and count how many balls were caught in the tape."},
   {name:"Counting with Blocks", desc:"Students will walk around a table and when the music stops they will add the amount of blocks on the number they stop on."},
   {name:"Alphabet Bingo", desc:"Students will play bingo using their alphabet letters."}],
  notes:"The marble-painting craft lists only shaving cream and paint (no marbles listed).",
  song: FALL_K_SONG, songVideo: FALL_K_SONG_VIDEO, songPoster: FALL_K_SONG_POSTER},
{ id:"room11-3s-fall", room:"11", age:"3 Year Olds", ageId:"threes", theme:"Seasonal Changes – Fall", short:"Fall", letter:"Kk", source:"Lesson plan PDF #3, pages 1–3",
  circle:"Begin reviewing date, weather, weekly vocabulary words, emotion chart and classroom rules/expectations (using anchor charts). Use manipulatives relating to weekly theme to relate to number, color, shape and letter of the week. Review days of the week, months of the year, and follow VPK dialogic reading plan. On Mondays, assign classroom jobs. End circle time with transition song of the week (relating to theme). Inform students that upon hearing the song, it means to be prepared to transition for the week.",
  objectives:["Understand the changes seen in the season of fall.","Associate certain colors with fall (orange, yellow, red, brown).","Associate certain images with fall (pumpkins, leaves, scarecrow, etc).","List changes seen during fall."],
  words:[],
  steam:{name:"Parts of a Pumpkin", desc:"Students will explore a sensory bin to discover the different parts of a pumpkin. They will learn through touch the feeling of pumpkin seeds, and what the \"guts\" of a pumpkin feel like. They will learn what the outside of the pumpkin feels like and notice its ridges. They will learn about the stem, what it does, and how it feels/looks. They will learn about the leaves, what they do, and how they feel/look."},
  letterPlan:"The letter of the week is Kk. Students will understand it is a consonant and it makes one sound, and give word examples that start with Kk. They will do a letter bag for Kk on Thursday to present to class on Friday, and a letter Kk craft on Friday. Students will not trace the letter; they work in small group learning to form it freehand, then play dough mats to create Kk, and whiteboard writing.",
  days:{Thu:["Letter Kk bag (to present Friday)"],Fri:["Present letter bags","Letter Kk craft"]},
  crafts:[
   {name:"Fall Leaf", supplies:["Construction paper (brown, yellow, red, orange)","Leaf cut out","Glue sticks"]},
   {name:"Laying on a Leaf Pile", supplies:["Fabric leaves","Wet glue","Print out of student laying down"]},
   {name:"Fall Tree", supplies:["Tree printable","Paint (red, yellow, orange)","Plastic forks"]}],
  activities:[
   {name:"Leaf Correspondence", desc:"Students will match lowercase letters to their matching uppercase version."},
   {name:"Ten Apples Up on Top", desc:"Students will count how many apples belong to each animal's head, using fingerprints to mimic the apples and dotting in a straight line going up."},
   {name:"Apple Patterns", desc:"Students will recognize patterns and use fingerprints to correctly continue the pattern. Colors will be green and red to mimic apples."},
   {name:"Big v. Medium v. Small", desc:"Students will take different size leaves and sort them into the correct groups based on size."}],
  notes:"Large/small group columns are marked 'X' but the text layout doesn't show which column each X is in. Pages 4–6 are a blank plan (all N/A).",
  song: FALL_K_SONG, songVideo: FALL_K_SONG_VIDEO, songPoster: FALL_K_SONG_POSTER},
{ id:"room11-3s-hygiene", room:"11", age:"3 Year Olds", ageId:"threes", theme:"Personal Hygiene – handwashing, potty wiping, bath time, hair and teeth brushing", letter:"Mm", source:"Lesson plan PDF #3, pages 7–9",
  circle:"Begin reviewing date, weather, weekly vocabulary words, emotion chart and classroom rules/expectations (using anchor charts). Use manipulatives relating to weekly theme to relate to number, color, shape and letter of the week. Review days of the week, months of the year, and follow VPK dialogic reading plan. On Mondays, assign classroom jobs. End circle time with transition song of the week (relating to theme). Inform students that upon hearing the song, it means to be prepared to transition for the week.",
  objectives:["Know routines for hygiene habits.","Know the importance of hygiene, and what it means.","Be able to teach a friend or family member a hygiene routine.","List the different examples of personal hygiene."],
  words:[],
  steam:{name:"Soap Experiment", desc:"Students gather around the table with a paper plate in the middle filled with water and pepper. The water is 'dirty' and represents the germs on our hands. Students dip a finger into a separate plate of soap, then into the dirty water. The pepper moves away from the finger toward the edge of the plate: when we wash with soap and water, the germs go away. Read the book Germs vs. Soap to connect the idea."},
  letterPlan:"The letter of the week is Mm. Students will understand it is a consonant and it makes one sound, and give word examples that start with Mm. They will do a letter bag for Mm on Thursday to present to class on Friday, and a letter Mm craft on Friday. Students will not trace the letter; they work in small group learning to form it freehand, then play dough mats to create Mm, and whiteboard writing.",
  days:{Thu:["Letter Mm bag (to present Friday)"],Fri:["Present letter bags","Letter Mm craft"]},
  crafts:[
   {name:"Germs Are Ick!", supplies:["Construction paper \"germ\" cutout","Construction paper rectangles and circles","Glue stick"]},
   {name:"Dirty vs Clean Hands", supplies:["Hand cutouts (4 per student)","Brown or black crayon","Blue paint","Blue sponge brush","Soap cutout","Glue stick"]},
   {name:"Teeth Brushing", supplies:["Yellow teeth cutout","Toothbrushes","White paint"]}],
  activities:[
   {name:"Cleaning Hands Activity", desc:"Uses a clear rubber glove filled with water, Crayola washable markers, a spray bottle with soapy water, and sponges.", supplies:["Clear rubber glove","Crayola washable markers","Spray bottle","Sponges"]},
   {name:"Alphabet Teeth Cleaning", desc:"Students clean a letter on the teeth using the corresponding letter paper. If a student picks the letter Nn, they find and erase that letter off the tooth to \"clean\" it."},
   {name:"Toothbrush Scissor Practice", desc:"Students cut on the lines drawn on the toothbrushes and practice proper scissor cutting technique."},
   {name:"Teeth Flossing", desc:"Students use a large Lego with play dough between the ridges and yarn to \"floss\" the gunk out of the gums. Flossing technique will be shown during the lesson.", supplies:["Large Lego","Play dough","Yarn"]}],
  notes:"Large/small group columns are marked 'X' but which column is unclear."}
];
/* Photos extracted from the PDFs (prefix per plan) + one generated example where the PDF had none. */
(function(){ const P={"fall-kk-unlabeled":"a","room11-3s-fall":"f","room11-3s-hygiene":"h","room7-vpk-fall":"v"};
 const have={a:{steam:1,craft:[1,2,3],act:[1]},f:{steam:1,craft:[1,3],act:[1,2,3,4]},h:{steam:1,craft:[1,2,3],act:[1,2,3]},v:{steam:1,craft:[1,2,3],act:[1,3,4]}};
 DA_PLANS.forEach(p=>{const k=P[p.id],h=have[k]; p.steam.img=`media/plans/${k}_steam.jpg`;
  p.crafts.forEach((c,i)=>{ if(h.craft.includes(i+1)) c.img=`media/plans/${k}_craft${i+1}.jpg`; });
  p.activities.forEach((a,i)=>{ if(h.act.includes(i+1)) a.img=`media/plans/${k}_act${i+1}.jpg`; });
  if(k==="f"||k==="h") p.activities.forEach(a=>a.group="Small group");
 });
 const fl=DA_PLANS.find(p=>p.id==="room11-3s-hygiene").activities[3]; fl.img="media/plans/gen_flossing.jpg"; fl.imgNote="Example image (generated) — no photo in the PDF";
})();
