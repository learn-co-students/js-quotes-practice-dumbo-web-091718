// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.


let quoteList = document.getElementById('quote-list')
let addQuote = document.querySelector('#new-quote-form')
let BASE_URL = 'http://localhost:3000/quotes'

//// like and delete and add quote -- fetch function
function changeQuoteDatabase(doThing, body, id = null,) {
  let url;
  if (doThing === 'POST') {
    url = BASE_URL
  } else {
    url = BASE_URL +`/${id}`
  }
  fetch(url, {
    method: doThing,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(() => getQuotes(BASE_URL))
}

//// like and delete button creation
window.addEventListener("click", (event)=> {
  if (event.target.className === 'btn-danger') {
    let method = 'DELETE'
    let quoteId = parseInt(event.target.parentElement.dataset["id"])
    let body = {}
    return changeQuoteDatabase(method, body, quoteId)
  }
  if (event.target.className === 'btn-success') {
    let method = 'PATCH'
    let quoteId = parseInt(event.target.parentElement.dataset["id"])
    let newLike = parseInt(event.target.children[0].innerHTML)+1
    let body = {likes: newLike}
    return changeQuoteDatabase(method, body, quoteId)
  }
})

/// create new quote form
addQuote.addEventListener("submit", (event) => {
  event.preventDefault()
  let method = 'POST'
  let newQuote = event.target[0].value
  let newAuthor = event.target[1].value
  let body = {
    likes: 0,
    author: newAuthor,
    quote: newQuote
  }
  return changeQuoteDatabase(method, body)
})

/// fetch
function getQuotes(url) {
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse){
    viewQuotes(jsonResponse)
  })
}

/// display quotes on page
function viewQuotes(arr) {
  quoteList.innerHTML = ""
  for (quote of arr) {
    let quoteCard = document.createElement('li')
    quoteCard.className = 'quote-card'
    quoteCard.innerHTML = ` <blockquote data-id="${quote['id']}"class="blockquote">
        <p class="mb-0">${quote['quote']}</p>
        <footer class="blockquote-footer">${quote['author']}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote['likes']}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>`
    quoteList.appendChild(quoteCard)
  }
}

getQuotes(BASE_URL)
