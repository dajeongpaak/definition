import { 
    resultBtn, 
    word, 
    phonetic, 
    definition 
} from "./dictionaryAPI.js";
import { SearchedWordTypes } from "../types/types.js";

const wordList = document.querySelector("#listItems") as HTMLUListElement;
const filterList = document.querySelector("#listFilter") as HTMLInputElement;

export function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDOM(item));
}

function onAddItemClick(e: MouseEvent) {
    e.preventDefault();

    let newItem: SearchedWordTypes = { 
        word, 
        phonetic, 
        definition 
    };

        // prevent duplicated words
    if(checkStoredItem(newItem)) {
        alert("That word is what you already have!");
        return;
    } else {
        addItemToDOM(newItem);
        addItemToStorage(newItem);
    }

}

function addItemToDOM(newItem: SearchedWordTypes) {

    const {
        word, 
        phonetic, 
        definition
    } = newItem;

    const listItem = document.createElement("li");
    const itemTitle = document.createElement("div");
    const itemWord = document.createElement("h4");
    const itemPhonetic = document.createElement("p");
    const itemDefinition = document.createElement("p");
    const itemBtn = document.createElement("button");

    itemTitle.className = "list__word";
    itemWord.textContent = word;
    itemPhonetic.textContent = phonetic;
    itemDefinition.textContent = definition;
    itemBtn.type = "button";
    itemBtn.className = "removeItem";

    itemTitle.appendChild(itemWord);
    itemTitle.appendChild(itemPhonetic);
    listItem.appendChild(itemTitle);
    listItem.appendChild(itemDefinition);
    listItem.appendChild(itemBtn);

    wordList.appendChild(listItem);

}

function addItemToStorage(newItem: SearchedWordTypes) {
    const itemsFromStorage: SearchedWordTypes[] = getItemsFromStorage();

    itemsFromStorage.push(newItem);

    localStorage.setItem("items", JSON.stringify(itemsFromStorage));

}

function getItemsFromStorage() {
    let itemsFromStorage: SearchedWordTypes[];


    if(localStorage.getItem("items") === null) {
        itemsFromStorage = [];

    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items") as string) as SearchedWordTypes[];
    }

    return itemsFromStorage;
}

function onClickItem(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    const parentElement = target?.parentElement;
 
    if(target?.classList.contains("removeItem")) {
        removeItem(parentElement);
    }
}

function checkStoredItem(newItem: SearchedWordTypes) {
    const itemsFromStorage = getItemsFromStorage();

    return  itemsFromStorage.some((item) => item.word === newItem.word);
}

function removeItem(item: HTMLElement | undefined | null) {
    const wordValue = item?.querySelector("h4")?.textContent as string;
        // remove item from DOM
    item?.remove();

        // remove item from storage
    removeItemFromStorage(wordValue);
}

function removeItemFromStorage(value: string) {
    let itemsFromStorage = getItemsFromStorage();
       
        // filter out items
    itemsFromStorage = itemsFromStorage.filter((item) => item.word !== value);

        // re-set sorted array to localstorage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function filterItems(e: Event) {
    const items = wordList.querySelectorAll("li");
    const inputTarget: string = (e.target as HTMLInputElement).value.toLowerCase();

   items.forEach(item => {
        const h4 = item.querySelector('h4')?.textContent?.toLowerCase();

        if(h4?.indexOf(inputTarget) != -1) {
            item.style.display = "grid";
        } else {
            item.style.display = "none";
        }
   })
}

    // initialize 
export function init() {

resultBtn.addEventListener("click", onAddItemClick);
wordList.addEventListener("click", onClickItem);
filterList.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

}