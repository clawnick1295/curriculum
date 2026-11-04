/* Shared data for home mockups. Themes come from js/data.js (Under the Sea) and alt2/plans.js (Fall). */
window.HOME={
 ages:[
  {id:"ones",name:"Ones",sub:"12–24 months",color:"#ff8a65",img:"../../media/activities/w9/ones_steam.webp",char:"../../media/chars/sampson.webp"},
  {id:"twos",name:"Twos",sub:"2-year-olds",color:"#ffb300",img:"../../media/activities/w9/twos_steam.webp",char:"../../media/chars/crab_math.webp"},
  {id:"threes",name:"3 Year Olds",sub:"Room 11",color:"#66bb6a",img:"../../media/activities/w9/threes_steam.webp",char:"../../media/chars/frog_movement.webp"},
  {id:"fours",name:"Fours",sub:"4-year-olds",color:"#29b6f6",img:"../../media/activities/w9/fours_steam.webp",char:"../../media/chars/turtle_science.webp"}
 ],
 months:[
  {title:"Under the Sea in South Florida",label:"Sample month",themes:[
   {w:1,theme:"Manatee Mornings",letter:"Mm",icon:"🐋"},{w:2,theme:"Sea Turtle Beach",letter:"Tt",icon:"🐢"},
   {w:3,theme:"Coral Reef Colors",letter:"Ff",icon:"🐠"},{w:4,theme:"Beach Buddies & Hermit Crabs",letter:"Cc",icon:"🦀"}]},
  {title:"Fall",label:"Fall",themes:[{w:9,theme:"Fall Leaves & Pumpkins",icon:"🍂",letter:"Ll",fall:true}]}
 ],
 link(age,t){return t.fall?"../#/"+age:"../../#/age/"+age+"/"+t.w}
};
