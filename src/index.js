const URL = 'http://localhost:3000/quotes'
const quoteList = document.getElementById('quote-list')
const newQuoteForm = document.getElementById('new-quote-form')

const getQuotes = () => {
  return fetch(URL).then(response => response.json())
}

const renderQuote = quote => {
  quoteList.innerHTML += `<li class='quote-card' data-id="${quote.id}">
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`  
}

const init = () => {
  getQuotes().then(quotes => quotes.forEach(renderQuote))
}


document.addEventListener('DOMContentLoaded', init)

newQuoteForm.addEventListener('submit', e => {
  e.preventDefault()

  const [quote, author] = e.target

  const newQuoteObj = {
    'quote':  quote.value,
    'author': author.value,
    'likes':  0
  }

  fetch(URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(newQuoteObj)
  })
    .then(response => response.json())
    .then(renderQuote)

  newQuoteForm.reset()
})

// Note to self: REFACTOR!!!!
quoteList.addEventListener('click', function(e) {
  if (e.target.className.match('btn-danger')) {
    let foundQuote = e.target.parentElement.parentElement
    let foundQuoteId = foundQuote.dataset.id
    fetch(`${URL}/${foundQuoteId}`, { method: 'DELETE' })
    foundQuote.remove() 
  } else if (e.target.className.match('btn-success')) {
    let foundQuoteId = e.target.parentElement.parentElement.dataset.id 
    const foundLike = e.target.children[0]
    const likes = Number(foundLike.innerText) + 1 
    foundLike.innerText = `${likes}`
    fetch(`${URL}/${foundQuoteId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ likes })
    })
      .then(response => console.log(response))
  }
})
