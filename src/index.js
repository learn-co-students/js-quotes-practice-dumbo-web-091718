// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {

  let quoteCon = document.getElementById('quote-list')

  fetch('http://localhost:3000/quotes')
  .then( response => response.json())
  .then(json => renderQuotes(json))


  function renderQuotes(quotesList) {
    quotesList.forEach( quote => {
      quoteCon.innerHTML += `<li class='quote-card' id="${quote.id}">
      <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
      </blockquote>
      </li>`
    })
  }

  let quoteForm = document.getElementById('new-quote-form')

  quoteForm.addEventListener('submit', function(event) {
    event.preventDefault()

    let quote = event.target[0]
    let author = event.target[1]

    quoteCon.innerHTML += `<li class='quote-card' id="${quote.id}">
    <blockquote class="blockquote">
    <p class="mb-0">${quote.value}</p>
    <footer class="blockquote-footer">${author.value}</footer>
    <br>
    <button class='btn-success'>Likes: <span>0</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>
    </li>`

    postQuote(event)
  })

  function postQuote(event) {
    fetch('http://localhost:3000/quotes', {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        quote: event.target[0].value,
        author: event.target[1].value
      })
    })
    event.target.reset()
  }

  quoteCon.addEventListener('click', function(event) {
    // debugger
    if (event.target.className === "btn-danger") {
      event.target.parentElement.parentElement.remove()

      deleteQuote(parseInt(event.target.parentElement.parentElement.id), 'http://localhost:3000/quotes')
    }
  })

  function deleteQuote(item, url) {
    fetch(url + '/' + item, {
      method: "DELETE"
    })
  }

  quoteCon.addEventListener('click', function(event) {
    if (event.target.className === "btn-success") {
      // debugger
      event.target.firstElementChild.innerHTML = Number(event.target.firstElementChild.innerHTML) + 1
      // console.log("hi")

      updateLike(parseInt(event.target.parentElement.parentElement.id), 'http://localhost:3000/quotes')
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

})
