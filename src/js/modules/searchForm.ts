import { 
    getSearchedWord, 
    displaySearchedWord 
} from "./dictionaryAPI.js";

const searchForm = document.querySelector("#searchForm") as HTMLFormElement | null;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const listItems = document.querySelector("#listItems") as HTMLElement;
const introText = document.querySelector("#js-introduction") as HTMLElement;
const result = document.querySelector("#js-result") as HTMLDivElement;

    // search the word that user inputs
function searchWord(e: SubmitEvent): void{
    e.preventDefault();
    
    if (searchInput.value === "") {
        const h2Element = introText.querySelector("h2") as HTMLHeadingElement;

        h2Element.textContent = "Please fill out this field"
    } else {
      getSearchedWord(searchInput.value);
      displayResult(searchInput.value);
   
    }
}

function displayResult(value: string) {

    searchInput.value = "";
    introText.style.display = "none";
    result.style.display = "grid";

    displaySearchedWord;
}

searchForm?.addEventListener("submit", searchWord);

