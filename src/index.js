// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {

  let quoteCon = document.getElementById('quote-list')

  fetch('http://localhost:3000/quotes')
  .then( response => response.json())
  .then(json => renderQuotes(json))

  function addNewQuote(quote) {
    quoteCon.innerHTML += `<li class='quote-card' id="${quote.id}">
    <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>
    </li>`
  }

  function renderQuotes(quotesList) {
    quotesList.forEach( quote => {
      addNewQuote(quote)
    })
  }

  let quoteForm = document.getElementById('new-quote-form')

  quoteForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let quote = event.target[0]
    let author = event.target[1]

    postQuote(event)
    .then(response => response.json())
    .then( quote => {
      addNewQuote(quote)
    })

    event.target.reset()
  })

  function postQuote(event) {
    return fetch('http://localhost:3000/quotes', {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        quote: event.target[0].value,
        likes: 0,
        author: event.target[1].value
      })
    })
  }

  quoteCon.addEventListener('click', function(event) {
    if (event.target.className === "btn-success") {
      // debugger
      event.target.firstElementChild.innerHTML = Number(event.target.firstElementChild.innerHTML) + 1
      // console.log("hi")

      updateLike(parseInt(event.target.parentElement.parentElement.id), 'http://localhost:3000/quotes')
    } else if (event.target.className === "btn-danger") {
      event.target.parentElement.parentElement.remove()

      deleteQuote(parseInt(event.target.parentElement.parentElement.id), 'http://localhost:3000/quotes')
    }
  })

  function updateLike(item, url) {
    fetch(url + '/' + item, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        likes: Number(event.target.firstElementChild.innerHTML)
      })
    })
  }

  function deleteQuote(item, url) {
    fetch(url + '/' + item, {
      method: "DELETE"
    })
  }

})
