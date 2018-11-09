const BASE_URL = 'http://localhost:3000/quotes'
const quoteCon = document.getElementById('quote-list')
const formCon = document.getElementById('new-quote-form')

window.addEventListener('load', init)

function init() {

  quoteCon.addEventListener('click', updateQuote)
  formCon.addEventListener('submit', createNewQuote)

  fetch(BASE_URL)
  .then(res => res.json())
  .then(json => json.forEach(quote => {
    renderQuote(quote)
  }))
}

function renderQuote(quote) {
  quoteCon.innerHTML +=  `<li class='quote-card' data-id="${quote.id}">
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' data-id="${quote.id}">Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger' data-id="${quote.id}">Delete</button>
    </blockquote>
  </li>`
}

function updateQuote() {
  if (event.target.className === 'btn-success') {
    updateLike(event)
  } else if (event.target.className === 'btn-danger') {
    deleteQuote(event)
  }
}

function updateLike(event) {
  let quoteId = event.target.dataset.id
  let likeNum = event.target.firstElementChild
  let likeCount = Number(likeNum.innerText)
  likeNum.innerText = ++likeCount

  fetch(`${BASE_URL}/${quoteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: likeCount
    })
  })
}

function deleteQuote(event) {
  let quoteId = event.target.dataset.id
  event.target.parentElement.parentElement.remove()

  fetch(`${BASE_URL}/${quoteId}`, {
    method: 'DELETE'
  })
}

function createNewQuote(event) {
  event.preventDefault()
  // debugger
  let quote = event.target[0]
  let author = event.target[1]

  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quote: quote.value,
      likes: 0,
      author: author.value
    })
  })
  .then(res => res.json())
  .then(renderQuote)

  event.target.reset()
}
