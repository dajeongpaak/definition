import { SearchedWordTypes } from '../types/types';

const resultWord = document.querySelector("#resultWord") as HTMLDivElement;
const resultDef = document.querySelector("#resultDef") as HTMLDivElement;
export const resultBtn = document.querySelector("#resultBtn") as HTMLDivElement;

      // define global variables
let word: string = '';
let phonetic: string = '';
let definition: string = '';

    // fetch definition of inputed word
export async function getSearchedWord(value: string): Promise<void> {
    const BASE_URI = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`

    const response = await fetch(BASE_URI);
    const data = await response.json();

    displaySearchedWord(data);
}

export function displaySearchedWord(data: any): SearchedWordTypes {

        // if data exists return as it is
    if(data[0]) {
            // extract data as needed
        word = data[0].word;
        phonetic = 
        data[0].phonetic ? 
        data[0].phonetic : 
        null ;
        definition =
        data[0].meanings[0].definitions[0].definition;
        resultBtn.style.display = "flex";
  
        // if it doesn't return not found message
    } else {
        word = data.title;
        phonetic = "";
        definition= data.message;
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