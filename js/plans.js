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
{ id:"room11-3s-hygiene", room:"11", age:"3 Year Olds", ageId:"threes", theme:"Personal Hygiene – handwashing, potty wiping, bath time, hair and teeth brushing", short:"Personal Hygiene", letter:"Mm", source:"Lesson plan PDF #3, pages 7–9",
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
/* 3D activity art (Oct 2026) replaces the PDF photos where we have it. Original photo kept as .photo. */
(function(){ const P={"fall-kk-unlabeled":"a","room11-3s-fall":"f","room11-3s-hygiene":"h","room7-vpk-fall":"v"};
 const ART={a:{steam:1,craft:[2],act:[1]},f:{steam:1,craft:[1,2,3],act:[1,2,3,4]},h:{steam:1,craft:[1,2,3],act:[1,2,3,4]},v:{steam:1,craft:[1,2,3],act:[1,2,3,4]}};
 const BANNER={"room11-3s-fall":"media/activities/banner_w9.webp","room7-vpk-fall":"media/activities/banner_w9.webp","room11-3s-hygiene":"media/activities/banner_w10.webp"};
 const sw=(o,src)=>{ if(o.img) o.photo=o.img; o.img=src; delete o.imgNote; };
 DA_PLANS.forEach(p=>{ const k=P[p.id]; if(!k) return; const h=ART[k], base="media/activities/"+k+"_";
  if(h.steam) sw(p.steam, base+"steam.webp");
  p.crafts.forEach((c,i)=>{ if(h.craft.includes(i+1)) sw(c, base+"craft"+(i+1)+".webp"); });
  p.activities.forEach((a,i)=>{ if(h.act.includes(i+1)) sw(a, base+"act"+(i+1)+".webp"); });
  if(BANNER[p.id]) p.banner=BANNER[p.id];
 });
})();

/* ===== Week 11 (Oct 19–23): Pumpkin Patch · Letter Pp — one plan per age =====
   Standards tags name the Florida Early Learning and Developmental Standards domain (no invented codes). */
(function(){
 const FL={phys:"FL ELDS · Physical Development",atl:"FL ELDS · Approaches to Learning",se:"FL ELDS · Social & Emotional Development",lit:"FL ELDS · Language & Literacy",math:"FL ELDS · Mathematical Thinking",sci:"FL ELDS · Scientific Inquiry",art:"FL ELDS · Creative Expression Through the Arts",ss:"FL ELDS · Social Studies"};
 const img=(age,s)=>`media/activities/w11_${age}_${s}.webp`;
 const SONG="Pumpkin Patch Pop! (Letter P chant)\n\nHOOK: P, p, pumpkin — pop, pop, pop!\nPick a pumpkin, plop, plop, plop!\n\nVerse 1: Sampson rolls a pumpkin round,\nP says \"puh\" without a sound… just air!\nVerse 2: Panther peeks in the patch so wide,\nPurple, pink and orange side by side.\n\nEnding: P is for pumpkin, P is for play,\nPumpkin patch fun every day!";
 const base=(age,room)=>({ id:"w11-"+age+"-pumpkin", room:room||"", ageId:age, theme:"Pumpkin Patch", short:"Pumpkin Patch", letter:"Pp", color:"Orange", shape:"Circle",
  banner:"media/activities/banner_w11.webp", song:SONG, source:"Davie Academy Week 11 plan (generated draft, Oct 2026)" });
 const W=[
 Object.assign(base("ones"),{ age:"Ones",
  overview:"Our littlest learners explore pumpkins with their hands, eyes and ears: squishing, rolling, and finding pumpkins that hide.",
  circle:"Sing \"Pumpkin Patch Pop!\" with gentle bounces. Pass a real mini pumpkin around the circle: feel the bumpy skin and the stem. Say \"pumpkin… puh, puh\" and model the word \"orange\".",
  objectives:["Explore textures with hands (squishy, bumpy, smooth).","Track a rolling object and crawl or walk after it.","Begin object permanence: look for a hidden pumpkin.","Hear and babble the /p/ sound."],
  number:"1", words:[["pumpkin","calabaza"],["orange","anaranjado"],["roll","rodar"]],
  steam:{name:"Pumpkin Squish Bag", desc:"Seal orange hair gel and a few pumpkin seeds in a zip bag, double-bag it and tape all edges to the floor or a tray. Babies press, pat and push the seeds around. Talk: \"squish! push! where did the seed go?\" Always supervise; check seals before each use.", supplies:["Gallon zip-top bags","Clear hair gel","Orange food coloring","Duct tape","Pumpkin seeds"], img:img("ones","steam"), standards:FL.phys},
  crafts:[{name:"Handprint Pumpkin", desc:"Paint each child's palm with orange washable paint and press onto cardstock. Add a green stem with a finger dab. Label with name and date for families.", supplies:["Orange washable paint","Green washable paint","White cardstock","Baby wipes","Foam brush"], img:img("ones","craft1"), standards:FL.art}],
  activities:[
   {name:"Roll the Mini Pumpkins", desc:"Gently roll mini pumpkins across a soft mat. Encourage crawling, cruising or walking after them; cheer \"you got the pumpkin!\"", supplies:["Mini pumpkins","Soft play mat"], img:img("ones","act1"), standards:FL.phys},
   {name:"Peekaboo Pumpkin", desc:"Hide a mini pumpkin under a sheer scarf, then lift it: \"Peekaboo, pumpkin!\" Let babies pull the scarf off themselves.", supplies:["Sheer play scarves","Mini pumpkins"], img:img("ones","act2"), standards:FL.atl}],
  home:[["Pumpkin peekaboo","Hide a small toy under a towel and let your baby find it."],["Kitchen textures","Let baby touch a squash or orange while you name it."],["Rolling game","Roll a ball back and forth and say \"roll!\""]],
  ask:["pumpkins","squishing","rolling","peekaboo"]}),
 Object.assign(base("twos"),{ age:"Twos",
  overview:"Twos wash, sort and hop through the pumpkin patch while learning the color orange and the /p/ sound.",
  circle:"Sing \"Pumpkin Patch Pop!\" and pop up on every \"pop\". Show orange, green and white pumpkins: name each color together. Practice the /p/ sound by \"popping\" lips.",
  objectives:["Name the color orange and match colors.","Use tools (brushes, sponges) with control.","Jump or hop with two feet.","Hear words that begin with /p/."],
  number:"2", words:[["pumpkin","calabaza"],["wash","lavar"],["orange","anaranjado"],["hop","saltar"]],
  steam:{name:"Pumpkin Wash Station", desc:"Fill a water table with warm soapy water, mini pumpkins and scrub brushes. Children scrub pumpkins clean and set them on a towel to dry. Talk about wet/dry, dirty/clean.", supplies:["Water table or bin","Mini pumpkins","Scrub brushes","Sponges","Tear-free bubble soap","Towels"], img:img("twos","steam"), standards:FL.sci},
  crafts:[{name:"Sponge-Dab Pumpkin", desc:"Clip sponge squares onto clothespins. Children dab orange paint inside a pumpkin outline, then glue on a green paper stem.", supplies:["Pumpkin outline printable","Orange washable paint","Sponges","Clothespins","Green construction paper","Glue sticks"], img:img("twos","craft1"), standards:FL.art}],
  activities:[
   {name:"Pumpkin Color Sort", desc:"Sort orange, green and white mini pumpkins into matching colored baskets. Name each color as it goes in.", supplies:["Mini pumpkins (orange, green, white)","Small baskets"], img:img("twos","act1"), standards:FL.math},
   {name:"Pumpkin Hop", desc:"Tape paper pumpkins in a path on the floor. Children hop from pumpkin to pumpkin; say \"pop!\" on each landing.", supplies:["Orange construction paper","Painter's tape"], img:img("twos","act2"), standards:FL.phys}],
  home:[["Color hunt","Find 3 orange things in your home together."],["Bath-time scrub","Let your child wash a toy with a sponge at bath time."],["Hop game","Hop on pillows or tape squares and say \"pop!\""]],
  ask:["washing pumpkins","the color orange","hopping","the pumpkin song"]}),
 Object.assign(base("threes","11"),{ age:"3 Year Olds",
  overview:"Threes predict, count and sort. Does a pumpkin sink or float? How many seeds? What starts with P?",
  circle:"Review date, weather and classroom rules. Introduce Pumpkin Patch week and letter Pp: show a pumpkin, pig and pencil. Children say the /p/ sound and feel the puff of air on their hand. End with \"Pumpkin Patch Pop!\" as the transition song.",
  objectives:["Make and test a prediction (sink or float).","Count objects 1–5 with one-to-one correspondence.","Identify the letter Pp and its sound.","Use fine-motor skills to crumple and place paper."],
  number:"5", words:[["pumpkin","calabaza"],["float","flotar"],["sink","hundir"],["seed","semilla"],["vine","enredadera"]],
  letterPlan:"Letter of the week: Pp. Children hear /p/, name P words (pumpkin, pig, pizza, purple) and form P with play dough on a mat. Thursday letter bag, Friday Pp craft.",
  steam:{name:"Sink or Float Pumpkin?", desc:"Show a pumpkin and a tub of water. Children vote: sink or float? Test it, then try an apple, a rock and an acorn. Record results on a two-column chart with pictures.", supplies:["Clear storage bin","Small pumpkin","Apple","Rock","Acorn","Chart paper"], img:img("threes","steam"), standards:FL.sci},
  crafts:[{name:"Tissue-Paper Plate Pumpkin", desc:"Crumple orange tissue squares and glue onto a paper plate. Twist a green pipe cleaner into a vine for the stem.", supplies:["Paper plates","Orange tissue paper","Green pipe cleaners","Glue sticks"], img:img("threes","craft1"), standards:FL.art}],
  activities:[
   {name:"Pumpkin Seed Count", desc:"Small group: children drop the matching number of seeds (1–5) into pumpkin cups, counting aloud and touching each seed.", supplies:["Mini pumpkin cups","Pumpkin seeds (dried)","Dot cards 1–5"], img:img("threes","act1"), standards:FL.math, group:"Small group"},
   {name:"P Picnic Basket", desc:"Pull objects out of a basket (pig, pot, pizza, pencil, pumpkin, plus a few non-P items). Children say each name and decide: does it start with /p/?", supplies:["Picnic basket","Toy pig","Play pot","Play pizza","Pencil","Mini pumpkin"], img:img("threes","act2"), standards:FL.lit, group:"Small group"}],
  home:[["Sink or float","At bath time, test 3 toys: will they sink or float?"],["P hunt","Find 3 things at home that start with P."],["Count snacks","Count out 5 crackers together."]],
  ask:["sink or float","counting seeds","the letter P","pumpkin crafts"]}),
 Object.assign(base("vpk","7"),{ age:"VPK",
  overview:"VPK scientists weigh and measure pumpkins, clap syllables, and play roll-and-cover games, building richer math and phonological awareness.",
  circle:"Begin with date, weather, weekly vocabulary, emotion chart and rules. Follow the VPK dialogic reading plan with a pumpkin book (ask: what, where, why questions). Introduce Pp: consonant, one sound /p/. Clap syllables in pump-kin, pa-tch, pie. Assign classroom jobs Monday; end with the transition song.",
  objectives:["Compare weight and size using a balance scale and nonstandard units.","Segment words into syllables by clapping.","Count and cover up to 10 using a die.","Identify Pp and generate words that begin with /p/."],
  number:"10", words:[["heavier","más pesado"],["lighter","más ligero"],["vine","enredadera"],["harvest","cosecha"],["syllable","sílaba"]],
  letterPlan:"Letter Pp: consonant with one sound /p/. Children brainstorm P words, sort pictures by beginning sound, form Pp freehand on whiteboards and with play dough. Letter bag Thursday, Pp craft Friday.",
  steam:{name:"Pumpkin Investigation: Weigh & Measure", desc:"Children predict which of two pumpkins is heavier, test on a balance scale, then wrap yarn or a measuring tape around each to compare size. Record predictions vs. results in a science journal.", supplies:["Balance scale","Two small pumpkins","Measuring tape","Yarn","Science journals","Magnifying glass"], img:img("vpk","steam"), standards:FL.sci},
  crafts:[{name:"Torn-Paper Pumpkin Mosaic", desc:"Tear orange papers in several shades and glue inside a pumpkin outline on blue paper. Add a brown stem and curly green vine. Children write their name and a P on the back.", supplies:["Orange construction paper (assorted)","Blue construction paper","Brown and green paper","Liquid glue"], img:img("vpk","craft1"), standards:FL.art}],
  activities:[
   {name:"Pumpkin Syllable Clap", desc:"In a circle around a pumpkin, children clap the syllables of pumpkin-patch words (pump-kin, scare-crow, vine, har-vest) and count the claps.", supplies:["Pumpkin","Picture cards"], img:img("vpk","act1"), standards:FL.lit},
   {name:"Roll & Cover Pumpkins", desc:"Roll a dot die, count the dots and cover that many pumpkins on the mat. First to cover all 10 wins. Extension: roll two dice and add.", supplies:["Foam dot dice","Roll & cover pumpkin mats","Orange counters"], img:img("vpk","act2"), standards:FL.math}],
  home:[["Heavier or lighter?","Hold two fruits, guess which is heavier, then check."],["Clap names","Clap the syllables in each family member's name."],["P snack","Make a P snack together: pretzels, pears or popcorn."]],
  ask:["which pumpkin was heavier","clapping syllables","roll and cover","P words"]}),
 Object.assign(base("fours"),{ age:"Fours",
  overview:"Fours learn how a pumpkin grows from seed to vine, measure with cubes, and hunt for Pp in our classroom pumpkin patch.",
  circle:"Review calendar and weather. Read a pumpkin life-cycle story and act it out (seed curled up, sprout, vine stretches, pumpkin grows big). Introduce Pp and list P words on chart paper.",
  objectives:["Sequence the 4 stages of a pumpkin's life cycle.","Measure length with nonstandard units.","Recognize uppercase and lowercase Pp.","Use fingers to create a patterned artwork."],
  number:"8", words:[["seed","semilla"],["sprout","brote"],["flower","flor"],["grow","crecer"],["measure","medir"]],
  letterPlan:"Letter Pp: match uppercase P to lowercase p, find Pp in names and books, form Pp with play dough and in a sand tray.",
  steam:{name:"Pumpkin Life-Cycle Sequencing", desc:"Children put picture cards in order: seed → sprout → vine with flower → pumpkin. Discuss what a plant needs (sun, water, soil). Plant a few seeds in a cup to watch at the window.", supplies:["Life-cycle picture cards","Clear cups","Potting soil","Pumpkin seeds","Spray bottle"], img:img("fours","steam"), standards:FL.sci},
  crafts:[{name:"Fingerprint Pumpkin Patch", desc:"Paint a curly green vine across paper, then add orange fingerprint pumpkins along it. Children count how many pumpkins grew on their vine.", supplies:["White cardstock","Green washable paint","Orange washable paint","Paintbrushes","Wipes"], img:img("fours","craft1"), standards:FL.art}],
  activities:[
   {name:"Measure the Pumpkin", desc:"Children build a linking-cube train as long as a pumpkin is tall, then count the cubes. Compare: which pumpkin needed the most cubes?", supplies:["Linking cubes","Pumpkins of different sizes"], img:img("fours","act1"), standards:FL.math},
   {name:"Pp Pumpkin Patch Hunt", desc:"Hide paper pumpkins around the room (some with P/p, some with other letters). Children use flashlights to find them and sort P vs. not-P.", supplies:["Orange paper pumpkins","Marker","Small flashlights","Hay bale or basket"], img:img("fours","act2"), standards:FL.lit}],
  home:[["Seed watch","Plant a bean or seed in a cup and check it each day."],["Measure with spoons","How many spoons long is your shoe?"],["Pp in print","Find the letter P on cereal boxes or signs."]],
  ask:["how pumpkins grow","measuring with cubes","the Pp hunt","fingerprint pumpkins"]}),
 Object.assign(base("fives"),{ age:"Fives (Pre-K/VPK)",
  overview:"Fives run a pumpkin eruption experiment, build P words, add with ten-frames and map a pumpkin patch: kindergarten-ready skills through play.",
  circle:"Morning meeting with calendar, weather graph and share. Read a pumpkin nonfiction book; list 3 facts. Introduce Pp and blend simple words: p-i-g, p-o-t, p-a-n. Preview the pumpkin volcano and ask for hypotheses.",
  objectives:["Form a hypothesis and describe a chemical reaction (fizzing).","Add two groups within 10 using a ten-frame.","Blend and build simple CVC words beginning with p.","Create and read a simple map with a path and landmarks."],
  number:"10", words:[["hypothesis","hipótesis"],["reaction","reacción"],["map","mapa"],["add","sumar"],["landscape","paisaje"]],
  letterPlan:"Letter Pp: blend p-CVC words (pig, pan, pot, pin, pup) with letter tiles, write Pp words in journals, and read a Pp emergent reader.",
  steam:{name:"Pumpkin Volcano", desc:"Scoop out a small pumpkin, add baking soda and a drop of dish soap, then pour in colored vinegar. Children record their hypothesis, watch it fizz over, and draw what happened.", supplies:["Small pumpkin","Baking soda","White vinegar","Dish soap","Orange food coloring","Tray","Safety goggles"], img:img("fives","steam"), standards:FL.sci},
  crafts:[{name:"Pumpkin Patch Landscape", desc:"Children draw and paint a pumpkin patch scene with foreground (pumpkins), middle (fence, scarecrow) and background (barn, sky). Add a title using P words.", supplies:["Watercolor paper","Watercolor paints","Oil pastels","Paintbrushes"], img:img("fives","craft1"), standards:FL.art}],
  activities:[
   {name:"Pumpkin Ten-Frame Addition", desc:"Roll two dice, place that many pumpkin counters in a ten-frame in two colors, and count all to find the sum. Record the number sentence.", supplies:["Ten-frame mats","Pumpkin counters (two colors)","Dice","Dry-erase markers"], img:img("fives","act1"), standards:FL.math},
   {name:"Pumpkin Patch Map", desc:"As a group, draw a map of our classroom pumpkin patch with a dotted path, trees and the \"big pumpkin\". Partners follow the map to find a hidden pumpkin.", supplies:["Butcher paper","Markers","Mini pumpkin","Stickers"], img:img("fives","act2"), standards:FL.ss}],
  home:[["Kitchen fizz","Mix baking soda and vinegar in a cup and talk about the bubbles."],["Add it up","Use 10 pieces of cereal to make addition stories."],["Draw a map","Draw a map of your bedroom or street together."]],
  ask:["the pumpkin volcano","adding with ten-frames","P words we built","our pumpkin patch map"]})
 ];
 W.forEach(p=>DA_PLANS.push(p));
})();
