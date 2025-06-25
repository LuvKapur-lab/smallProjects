document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".searchBox");
  const movieInput = document.getElementById("movie-input");
  const searchMovieBtn = document.getElementById("search-movie");
  const errorMessage = document.getElementById("error-message");
  const movieCard = document.querySelector(".movie-card");

  const watchlistAdd = document.querySelector(".add-movie");
  const moviePoster = document.getElementById("movie-Poster");
  const movieTitle = document.getElementById("movie-title");
  const movieDescription = document.getElementById("movie-description");

  const API_KEY = "13f8be2c";

  searchMovieBtn.addEventListener("click", async function () {
    const movieName = movieInput.value.trim();
    if (movieName === "") return;

    try {
      let movieDetails = await fetchMovie(movieName);
      displayMovie(movieDetails);
      addToWatchlist();
    } catch (error) {
      showError();
    }

    movieInput.value = "" //clear the searched item
  });

  //   fetching movie done
  async function fetchMovie(movie) {
    let response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
    );
    let data = await response.json();

    if (data.Response === "False") {
      throw new Error("Movie not found");
    }

    // handeling error messages
    errorMessage.classList.add("hidden");
    movieCard.classList.remove("hidden");

    console.log(data);

    return data;
  }

  watchlistAdd.addEventListener("click", function () {
    if (currentMovie) {
      addToWatchlist(currentMovie);
    }
  });

  // display done
  function displayMovie(data) {
    movieCard.classList.remove("hidden");
    const movie = data.Search[0];
    movieTitle.textContent = movie.Title;
    moviePoster.src = movie.Poster;
    movieDescription.textContent = `Year: ${movie.Year}`;

    currentMovie = movie.Title;
  }

  let myMovies = [];

// watchlist from storage
  function loadWatchlistFromStorage() {
    const storedMovies = localStorage.getItem("watchlist");
    if (storedMovies) {
      myMovies = JSON.parse(storedMovies);
      myMovies.forEach((title) => watchlistDisplay(title));
    }
  }

  loadWatchlistFromStorage();

  // addind to the watchlist
  function addToWatchlist(data) {
    let movieToAdd = data;
    if (!movieToAdd) return;

    if (!myMovies.includes(data)) {
      myMovies.push(data);
      localStorage.setItem("watchlist", JSON.stringify(myMovies))
      watchlistDisplay(data);
    }
  }

  
  // display movie watchlist
  function watchlistDisplay(title) {
    const wishlist = document.getElementById("wishlist-movies");

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${title}</span>
      <button class="remove-movie">Delete</button>
    `;

    // Wait until button is created, then add event
    const deleteBtn = li.querySelector(".remove-movie");

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        li.remove(); // Remove from UI
        myMovies = myMovies.filter((movie) => movie !== title); // Remove from array
        localStorage.setItem("watchlist", JSON.stringify(myMovies)); // Update storage
      });
    }

    wishlist.appendChild(li);
  }


  //   error part done!
  function showError() {
    errorMessage.classList.remove("hidden");
    movieCard.classList.add("hidden");
  }
});
