const access = "6A6FUnc-RhuTshsG1QYilQ06DXPiaxzw0QjVGDPKNwk";
const searchButton = document.getElementById("searchBtn");
const userInput = document.getElementById("textInput");
const searchResult = document.getElementById("output");

let page = 1;
let keyword = "";

async function searchFunction() {
  keyword = userInput.value.trim().toLowerCase()
  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=6A6FUnc-RhuTshsG1QYilQ06DXPiaxzw0QjVGDPKNwk`;

    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener("click", function(){
    searchFunction()
})