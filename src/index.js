// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES_URL = "http://localhost:3000/quotes"

document.addEventListener('DOMContentLoaded', init)
let quoteList = document.querySelector('#quote-list')

function init() {
  fetch(QUOTES_URL)
  .then(function(res){
    return res.json()
  })
  .then(function(json){
    cardCreate(json);
  })
}

function cardCreate(json){
  console.log(json);
  json.forEach(function(info){
    quoteList.innerHTML += `<li class='quote-card' data-id='${info.id}'>
      <blockquote class="blockquote">
        <p class="mb-0">${info.quote}</p>
      <footer class="blockquote-footer">${info.author}</footer>
        <br>
        <button class='btn-success' data-id="${info.id}">Likes: <span>${info.likes}</span></button>
        <button class='btn-danger' data-id="${info.id}">Delete</button>
      </blockquote>
    </li>`

  })
}

document.addEventListener('click', function (event) {

  if (event.target.className === 'btn-success') {
    console.log(event);
    successId = event.target.dataset.id

    let likes = parseInt(event.target.children[0].textContent)
    likes++
    event.target.children[0].textContent = likes
    // debugger
    fetch(QUOTES_URL + `/${successId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    })

    .then(function(res) {
      res.json()
    })
    .then(function(json){
      return(json);
    })
  }
  if (event.target.className === 'btn-danger') {
    deleteId = event.target.dataset.id

    let li = document.querySelector(`li[data-id="${deleteId}"]`)

    li.remove();

    fetch(QUOTES_URL + `/${deleteId}`, {
      method: "DELETE",
    })
    // console.log("delete");
  }
})
