let quotesContainer = document.getElementById('quote-list');
let quoteform = document.getElementById('new-quote-form')
let newquotevalue = document.getElementById('new-quote')
let newauthorvalue = document.getElementById('author')
let likebutton = document.querySelector('.btn-success')






fetch('http://localhost:3000/quotes').then(function(response) {
  return response.json()
}).then(function(json) {

  json.forEach(function(quote) {
    quotesContainer.innerHTML += `<li class='quote-card'>
      <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' data-id=${quote.id}>Likes:<span>${quote.likes}</span></button>
      <button class='btn-danger' data-id=${quote.id}>Delete</button>
      </blockquote>
      </li>`

  })

  quoteform.addEventListener('submit', function(event) {
    event.preventDefault()

    fetch('http://localhost:3000/quotes',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          quote: newquotevalue.value,
          likes: 0,
          author: newauthorvalue.value
        })
      }).then(function(response) {
        return response.json()
      }).then(function(quote){

        quotesContainer.innerHTML += `<li class='quote-card'>
          <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success' data-id=${quote.id}>Likes:<span>${quote.likes}</span></button>
          <button class='btn-danger' data-id=${quote.id}>Delete</button>
          </blockquote>
          </li>`
      })


  })

counter = 0
  quotesContainer.addEventListener('click', function(event) {

    let dataid = event.target.dataset.id
    let likecount = event.target.firstElementChild

    if(event.target.className === "btn-success") {

      likecount.innerHTML = parseInt(likecount.innerHTML) + 1

      likesnum = parseInt(likecount.innerHTML)
      
  }

  fetch(`http://localhost:3000/quotes/${dataid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        likes: likesnum
      })
  })



  })



quotesContainer.addEventListener('click', function(event) {

  let dataid = event.target.dataset.id
let deletebutton = event.target.firstElementChild

if(event.target.className === 'btn-danger') {
  event.target.parentElement.parentElement.remove()
  console.log(dataid);
  fetch(`http://localhost:3000/quotes/${dataid}`, {
    method: "delete"
  })
}

})







})
