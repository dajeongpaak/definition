import { getSearchedWord, displaySearchedWord } from "./dictionaryAPI.js";
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const listItems = document.querySelector("#listItems");
const introText = document.querySelector("#js-introduction");
const result = document.querySelector("#js-result");
// search the word that user inputs
function searchWord(e) {
    e.preventDefault();
    if (searchInput.value === "") {
        const h2Element = introText.querySelector("h2");
        h2Element.textContent = "Please fill out this field";
    }
    else {
        getSearchedWord(searchInput.value);
        displayResult(searchInput.value);
    }
}
function displayResult(value) {
    searchInput.value = "";
    introText.style.display = "none";
    result.style.display = "grid";
    displaySearchedWord;
}
searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener("submit", searchWord);
