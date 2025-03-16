const access = "6A6FUnc-RhuTshsG1QYilQ06DXPiaxzw0QjVGDPKNwk";

const searchButton = document.getElementById("searchBtn");
const userInput = document.getElementById("textInput");
const searchResult = document.getElementById("output");
const showMore = document.getElementById("loadMore");
const container = document.querySelector(".container");

let page = 1;
let keyword = "";

async function searchFunction() {
  keyword = userInput.value.trim().toLowerCase();
  
  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=6A6FUnc-RhuTshsG1QYilQ06DXPiaxzw0QjVGDPKNwk&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResult.innerHTML = "";
    }

    if (results === 0) {
      let para = document.createElement("p");
      para.textContent = "No images found";
      para.id = "errorMsg";
      container.appendChild(para);
      showMore.style.display = "none"
      return;
    }

    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.target = "_blank";

      imgLink.appendChild(image);
      searchResult.appendChild(imgLink);
    });
    showMore.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener("click", function () {
  searchFunction();
  userInput.value = "";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchFunction();
    userInput.value = "";
  }
});

showMore.addEventListener("click", function () {
  page++;
  searchFunction();
});
