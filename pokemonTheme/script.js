let buttons = document.querySelectorAll(".btn");
let container = document.querySelector(".container");

buttons.forEach(button=>{
  button.addEventListener("click", switchThemes)
})

let themes = [
  {
    name: "day",
    musicN: "Pallet Town",
    color: "rgba(0, 128, 0, 0.532)",
    bgImg: "./Img/day.jpg",
    music: "./soundTrack/1-06. Pallet Town.mp3",
  },
  {
    name: "night",
    musicN: "Pewter City",
    color: "rgba(81, 0, 255, 0.393)",
    bgImg: "./Img/night.jpg",
    music: "./soundTrack/1-15. Pewter City.mp3",
  },
];


let isDay = true;
function switchThemes() {
  
  isDay = !isDay;
  let theme = isDay ? themes[0] : themes[1]; // Select theme based on isDay

  //changes
  document.querySelector(".musicSelection").style.backgroundColor = theme.color
  let img = document.querySelector(".pokeImg")
  img.style.display = "block"
  img.src = theme.bgImg;

  //music
  let audio = document.querySelector(".audio")
  audio.src = theme.music;
  audio.play()

  //music name 
  let name = document.querySelector(".musicName");
  name.textContent = (`${theme.musicN} Theme`)

}
