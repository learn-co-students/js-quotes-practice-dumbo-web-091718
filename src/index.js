// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function(event) {
    const ulTag= document.getElementById('quote-list')
    const quoteUrl = `http://localhost:3000/quotes`
    const form = document.getElementById('new-quote-form')

        fetch (quoteUrl)
        .then(res=>res.json())
        .then(arr=>
              arr.forEach(data=> ulTag.innerHTML+=` <li class='quote-card'>
              <blockquote class="blockquote">
                <p class="mb-0">${data.quote}</p>
                <footer class="blockquote-footer">${data.author}</footer>
                <br>
                <button class='btn-success' like-id=${data.id}>Likes: <span>${data.likes}</span></button>
                <button class='btn-danger' data-id=${data.id}>Delete</button>
              </blockquote>
              </li>`
            ))

            const like_btn = document.querySelector('.btn-success')
            const likes = document.querySelector('span')

        form.addEventListener("submit",(event)=>{
          event.preventDefault();
          fetch(quoteUrl, {
            method: "POST",
            headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quote: form.querySelectorAll('input')[0].value,
            author: form.querySelectorAll('input')[1].value
          })
        })
        .then(res=>res.json())
        .then(data=>ulTag.innerHTML+=` <li class='quote-card'>
            <blockquote class="blockquote">
              <p class="mb-0">${data.quote}</p>
              <footer class="blockquote-footer">${data.author}</footer>
              <br>
              <button class='btn-success' like-id=${data.id}>Likes: <span>${data.likes}</span></button>
              <button class='btn-danger' data-id=${data.id}>Delete</button>
            </blockquote>
            </li>`)
          })

        ulTag.addEventListener("click",(event)=>{
          if (event.target.hasAttribute('data-id')){
            event.target.parentElement.parentElement.remove()
            let id = event.target.getAttribute('data-id')
            fetch(`${quoteUrl}/${id}`,{
              method: 'DELETE'
            })
          }
        })

        ulTag.addEventListener("click",(event)=>{
          if (event.target.hasAttribute('like-id')){
            const span = event.target.querySelector('span')
            span.innerText = parseInt(span.innerText)+1
              let id = event.target.getAttribute('like-id')
              fetch(`${quoteUrl}/${id}`,{
                method: 'PATCH',
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                   likes: span.innerText
              })
          })
        }
        })
  });
