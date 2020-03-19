document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4903 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // const imageEl = document.createElement('img')
  // imageEl.src = imageURL

  document.getElementById('like_button').addEventListener('click', event => {
    
    // console.log(event.target)
    const likesEl = document.getElementById('likes')
    likesEl.innerText = parseInt(likesEl.innerText) + 1
    
     fetch(`${likeURL}`, {
    // fetch(`${likeURL}/${imageId}`, {
    //  fetch(`${imageURL}`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({'image_id': imageId})
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
  })

  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    
    const commentText = document.getElementById('comment_input').value
    
    const commentLi = document.createElement('li')
    commentLi.innerHTML = commentText
    document.getElementById('comments').appendChild(commentLi)

    fetch(`${commentsURL}`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        'content': commentText,
        'image_id': imageId
      })
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    
  })

  
  fetch(imageURL)
  .then(resp => resp.json())
  .then(imageObj => {
    displayImage(imageObj)
    displayLikes(imageObj)
    displayComments(imageObj)
  })

  // const imageEl = document.getElementById('image')
  // imageEl.src = imageURL
  // imageEl.dataId = imageId

})

function displayImage(imageObj) {
  // console.log(imageObj)
  const imageEl = document.getElementById('image')
  imageEl.src = imageObj.url
  imageEl.dataId = imageObj.id

  document.getElementById('name').innerText = imageObj.name
}

function displayLikes(imageObj) {
  // console.log(imageObj)

  document.getElementById('likes').innerText = imageObj.like_count

}

function displayComments(imageObj) {
  const commentsUL = document.getElementById('comments')
  imageObj.comments.forEach(comment => {
    const commentEl = document.createElement('li')
    commentEl.innerText = comment.content

    commentsUL.appendChild(commentEl)
  })
}
