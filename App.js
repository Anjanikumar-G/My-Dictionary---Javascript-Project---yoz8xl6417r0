const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const wordCardContainer = document.getElementById("wordCardContainer");

searchBtn.addEventListener("click", searchWord);

function searchWord() {
  const word = searchInput.value.trim();
  if (word !== "") {
    fetchWordMeaning(word);
  }
}

function fetchWordMeaning(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      const meaning = data[0].meanings[0].definitions[0].definition;
      createWordCard(word, meaning);
      saveToLocalStorage(word, meaning);
    })
    .catch((error) => console.log("Error fetching data:", error));
}

function createWordCard(word, meaning) {
  const card = document.createElement("div");
  card.classList.add("word-card");
  card.innerHTML = `
        <h3>${word}</h3>
        <p>${meaning}</p>
    `;
  wordCardContainer.appendChild(card);
}

function saveToLocalStorage(word, meaning) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push({ word, meaning });
  localStorage.setItem("searches", JSON.stringify(searches));
}

