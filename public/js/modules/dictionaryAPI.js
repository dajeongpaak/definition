var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resultWord = document.querySelector("#resultWord");
const resultDef = document.querySelector("#resultDef");
export const resultBtn = document.querySelector("#resultBtn");
// define global variables
let word = '';
let phonetic = '';
let definition = '';
// fetch definition of inputed word
export function getSearchedWord(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const BASE_URI = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
        const response = yield fetch(BASE_URI);
        const data = yield response.json();
        displaySearchedWord(data);
    });
}
export function displaySearchedWord(data) {
    // if data exists return as it is
    if (data[0]) {
        // extract data as needed
        word = data[0].word;
        phonetic =
            data[0].phonetic ?
                data[0].phonetic :
                null;
        definition =
            data[0].meanings[0].definitions[0].definition;
        resultBtn.style.display = "flex";
        // if it doesn't return not found message
    }
    else {
        word = data.title;
        phonetic = "";
        definition = data.message;
        resultBtn.style.display = "none";
    }
    // empty div elements for the next searched item
    resultWord.textContent = "";
    resultDef.textContent = "";
    const fetchedWord = document.createElement("h3");
    const fetchedPhonetic = document.createElement("p");
    const fetchedDefinition = document.createElement("p");
    fetchedWord.textContent = word;
    fetchedPhonetic.textContent = phonetic;
    fetchedDefinition.textContent = definition;
    // inject node element 
    resultWord.appendChild(fetchedWord);
    resultWord.appendChild(fetchedPhonetic);
    resultDef.appendChild(fetchedDefinition);
    return {
        word,
        phonetic,
        definition
    };
}
export { word, phonetic, definition };
