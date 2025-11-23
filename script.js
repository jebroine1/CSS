// === CONFIG ===
const API_KEY = "YOUR_API_KEY_HERE";

// === DOM ELEMENTS ===
const gifContainer = document.querySelector("#gif-container");
const fetchBtn = document.querySelector("#fetch-btn");
const searchInput = document.querySelector("#search-input");

// === FETCH FUNCTION ===
async function fetchGifs(searchTerm = "cats") {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=12`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log("GIF data:", data);

    // Clear old gifs
    gifContainer.innerHTML = "";

    // Loop through results & add images
    data.data.forEach((gif) => {
      const imgURL = gif.images.original.url;
      gifContainer.innerHTML += `
        <img src="${imgURL}" class="col-3 mb-3" />
      `;
    });

  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
}

// === EVENT LISTENER ===
fetchBtn.addEventListener("click", () => {
  const term = searchInput.value.trim();

  // If nothing typed, default to "cats"
  fetchGifs(term || "cats");
});
