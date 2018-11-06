// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function(){

let quotes;
const quoteContainer = document.querySelector("#quote-list")
fetch('http://localhost:3000/quotes')
  .then(res => res.json())
  .then(json => { createQuoteList(json);
    quotes = json});

function renderQuotes(quote){
  let quoteListItem = document.createElement('li');
  quoteListItem.className = "quote-card";
  quoteListItem.innerHTML = `
  <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>`
  quoteContainer.appendChild(quoteListItem);
}

function createQuoteList(quotes){
  for(let i=0; i < quotes.length; i++){
    renderQuotes(quotes[i]);
  }
}

document.addEventListener("click", function(event){
  if(event.target.className === "btn-success"){
    let targetAuthor = event.target.parentElement.querySelector(".blockquote-footer").innerText;
    let thisQuote = quotes.find(quote => quote.author === targetAuthor )
    ++thisQuote.likes;
    targetQuote.querySelector("span").innerText = thisQuote.likes;
  }
})

const form = document.querySelector("#new-quote-form");
const inputQuote = document.querySelector("#new-quote");
const inputAuthor = document.querySelector("#author");

form.addEventListener("submit", function(event){
  event.preventDefault();
  let quote = inputQuote.value;
  let author = inputAuthor.value;
  let quoteObj = {"quote": quote, "author": author, "likes": 0}
  renderQuotes(quoteObj)
  addQuoteToJSON(quoteObj)
})

function addQuoteToJSON(obj){
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  })
}

document.addEventListener("click", function(event){
  if(event.target.className === "btn-danger"){
    let targetQuote = event.target.parentElement;
    let targetAuthor = event.target.parentElement.querySelector(".blockquote-footer").innerText;
    let thisQuote = quotes.find(quote => quote.author === targetAuthor )
    targetQuote.parentElement.remove();
    deleteQuoteFromJSON(thisQuote);
  }
})

function deleteQuoteFromJSON(quote){
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: 'DELETE'
  })
}

})
