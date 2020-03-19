let imageId = 4890 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

document.addEventListener('DOMContentLoaded', () => {
  
  
  //element assignment
  const likeButton = document.querySelector('button')
  const commentForm = document.getElementById('comment_form')
  
  
  fetchImage()
  .then(renderImage)
  likeButton.addEventListener('click', likeImage)
  commentForm.addEventListener('submit', addComment)
})

function addComment(event){
  event.preventDefault();
  const commentInput = document.getElementById('comment_input').value
  const commentCollection = document.getElementById('comments')
  
  const newComment = document.createElement('li')
  newComment.innerText = commentInput
  commentCollection.appendChild(newComment)
  updateCommentsBackend(commentInput)
}

function updateCommentsBackend(newComment){
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetch(`${commentsURL}`, {
    method: 'POST',
    body: JSON.stringify({
      "image_id": `${imageId}`,
      "content": `${newComment}`
    }),
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
}

function fetchImage() {
  return fetch(imageURL)
  .then(response => response.json())
}

function renderImage(image){
  const imageNameH4 = document.getElementById('name')
  const imageCard = document.getElementById('image_card')
  const imageImage = document.getElementById('image')
  const likeCounter = document.getElementById('likes')
  const likeButton = document.getElementById('like-button')
  const commentCollection = document.getElementById('comments')
  imageImage.src = image.url
  imageImage.setAttribute('data-id', image.id)
  imageNameH4.innerText = image.name
  likeCounter.innerText = image.like_count

  image.comments.forEach((comment) => {
    const newComment = document.createElement('li')
    newComment.innerText = comment.content
    commentCollection.appendChild(newComment)
  })
  
}

function likeImage(event){
  const likeCounter = document.getElementById('likes')
  let likes = parseInt(likeCounter.innerText)
  likes += 1
  likeCounter.innerText = likes
  updateBackendLikes(likes)
}


function updateBackendLikes(likes){
  ///It keeps saying could not make connection. Will try to troubleshoot API issue if time. 422 (Unprocessable Entity) error
  const likeURL = `https://randopic.herokuapp.com/likes/`
  fetch(`${likeURL}`, {
    method: 'POST',
    body: JSON.stringify({
      "image_id": `${imageId}`,
      "like_count": `${likes}`
    }),
    headers:  {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}