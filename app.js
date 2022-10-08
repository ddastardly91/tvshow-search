const searchForm = document.querySelector("#searchForm");
const searchTitle = document.querySelector("#searchTerm");
const showWrapper = document.querySelector(".show-wrapper");
const errorMessage = document.querySelector(".error");
const searchResult = document.querySelector(".searchResult");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  showWrapper.innerHTML = "";

  let searchInput = searchForm.elements.search.value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchInput}`
  );

  createImages(res.data);
  searchForm.elements.search.value = "";
  showWrapper.classList.remove("hidden");
});

const createImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const showDiv = document.createElement("div");
      const showImg = document.createElement("IMG");
      const showName = document.createElement("h5");
      const showRating = document.createElement("p");

      showName.textContent = result.show.name;
      showImg.src = result.show.image.medium;

      if (result.show.rating.average) {
        showRating.textContent = `Rating: ${result.show.rating.average} / 10`;
        showRating.classList.add("rating");
        showDiv.appendChild(showRating);
      }

      showDiv.classList.add("show-div");
      showDiv.appendChild(showImg);
      showDiv.appendChild(showName);

      showWrapper.appendChild(showDiv);

      searchResult.classList.remove("hidden");
      searchTitle.textContent = searchForm.elements.search.value;
    }
  }
};
