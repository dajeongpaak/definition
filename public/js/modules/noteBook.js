import { resultBtn, word, phonetic, definition } from "./dictionaryAPI.js";
const wordList = document.querySelector("#listItems");
const filterList = document.querySelector("#listFilter");
export function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
}
function onAddItemClick(e) {
    e.preventDefault();
    let newItem = {
        word,
        phonetic,
        definition
    };
    // prevent duplicated words
    if (checkStoredItem(newItem)) {
        alert("That word is what you already have!");
        return;
    }
    else {
        addItemToDOM(newItem);
        addItemToStorage(newItem);
    }
}
function addItemToDOM(newItem) {
    const { word, phonetic, definition } = newItem;
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
function addItemToStorage(newItem) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(newItem);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
}
function onClickItem(e) {
    const target = e.target;
    const parentElement = target === null || target === void 0 ? void 0 : target.parentElement;
    if (target === null || target === void 0 ? void 0 : target.classList.contains("removeItem")) {
        removeItem(parentElement);
    }
}
function checkStoredItem(newItem) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.some((item) => item.word === newItem.word);
}
function removeItem(item) {
    var _a;
    const wordValue = (_a = item === null || item === void 0 ? void 0 : item.querySelector("h4")) === null || _a === void 0 ? void 0 : _a.textContent;
    // remove item from DOM
    item === null || item === void 0 ? void 0 : item.remove();
    // remove item from storage
    removeItemFromStorage(wordValue);
}
function removeItemFromStorage(value) {
    let itemsFromStorage = getItemsFromStorage();
    // filter out items
    itemsFromStorage = itemsFromStorage.filter((item) => item.word !== value);
    // re-set sorted array to localstorage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
function filterItems(e) {
    const items = wordList.querySelectorAll("li");
    const inputTarget = e.target.value.toLowerCase();
    items.forEach(item => {
        var _a, _b;
        const h4 = (_b = (_a = item.querySelector('h4')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if ((h4 === null || h4 === void 0 ? void 0 : h4.indexOf(inputTarget)) != -1) {
            item.style.display = "grid";
        }
        else {
            item.style.display = "none";
        }
    });
}
// initialize 
export function init() {
    resultBtn.addEventListener("click", onAddItemClick);
    wordList.addEventListener("click", onClickItem);
    filterList.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
}
