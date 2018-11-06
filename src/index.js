// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

// **need if script is at header
document.addEventListener('DOMContentLoaded', () => {

  let quoteContainer = document.getElementById('quote-list')
  // let counter = 0

  fetch("http://localhost:3000/quotes")
    .then( (response) => {
      return response.json()
    })
    .then( (json) => renderQuotes(json) )

  function renderQuotes(list) {

    list.forEach( (quoteObject) => {
      quoteContainer.innerHTML += `<li class='quote-card' id='${quoteObject.id}'>
      <blockquote class="blockquote">
        <p class="mb-0">${quoteObject.quote}</p>
        <footer class="blockquote-footer">${quoteObject.author}</footer>
        <br>
        <button class='btn-success' id='${quoteObject.id}'>Likes: <span>${quoteObject.likes}</span></button>
        <button class='btn-danger' id='${quoteObject.id}'>Delete</button>
      </blockquote>
    </li>`

    })
  }

  // POSTING NEW FORM

  function renderNewQuoteCard(url) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify( {
        quote: event.target[0].value,
        // likes: 0,
        author: event.target[1].value
      })
    }).then( (response) => {
      return response.json()
    })
    .then( (json) => {
      quoteContainer.innerHTML += `<li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${json.quote}</p>
        <footer class="blockquote-footer">${json.author}</footer>
        <br>
        <button class='btn-success' id='${json.id}'>Likes: <span>${json.likes}</span></button>
        <button class='btn-danger' id='${json.id}'>Delete</button>
      </blockquote>
    </li>`
    })
  }

  let quoteForm = document.getElementById('new-quote-form')

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault()

    renderNewQuoteCard('http://localhost:3000/quotes')
    // debugger

    // reset the form fields
    event.target.reset()
  })

  // DELETE & LIKE QUOTES

  function deleteQuoteCard(url, eventId) {
    fetch(url + '/' + eventId, {
      method: 'DELETE'
    })
  }

  quoteContainer.addEventListener('click', (event) => {

    // DELETE QUOTE
    if (event.target.className === 'btn-danger') {
      deleteQuoteCard("http://localhost:3000/quotes", parseInt(event.target.id))

      event.target.parentNode.parentNode.remove()
      // debugger
    }

    // LIKE QUOTE
    if (event.target.className === 'btn-success') {

      // let likeButton = document.querySelector('.btn-success')

      // update frontend like:

      // event.target = <button class="btn-success" id="2">Likes: <span>0</span></button>
      // event.target.firstElementChild = <span>0</span>
      // debugger
      let likecount = event.target.firstElementChild
      likecount.innerHTML = parseInt(likecount.innerHTML) + 1

      likesnum = parseInt(likecount.innerHTML)

      // update the backend:
      addLike('http://localhost:3000/quotes', parseInt(event.target.id))
    }

  })

// LIKE FETCH

function addLike(url, eventId) {
  fetch(url + '/' + eventId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      likes: likesnum
    })
  })
}

})









// end here
