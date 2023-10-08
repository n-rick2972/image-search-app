const apiKey = "Y2Lsoy6b-d6Q3wuJvve-L2NGkSvQVC3xrd-2oIQ-9uA";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const moreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

const searchImages = async () => {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (page === 1) {
    while (searchResultsEl.firstChild) {
      searchResultsEl.removeChild(searchResultsEl.firstChild);
    }
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.rel = "noopener noreferrer";
    imageLink.innerText = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    moreButton.style.display = "block";
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

moreButton.addEventListener("click", () => {
  searchImages();
});
