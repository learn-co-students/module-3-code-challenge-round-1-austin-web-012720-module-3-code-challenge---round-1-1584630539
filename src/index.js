document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/4905`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetchImage();


})

const commentButn = (image) => {
  
}

const likeButn = (image) => {

  console.log(image)

    const likesContainer = document.getElementById("likes")
    likesContainer.innerHTML = parseInt(likesContainer.innerHTML)+1

  fetch(`https://randopic.herokuapp.com/likes`,{
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({
      image: image.url,
      image_id: image.id
    })
  })
  .then(resp => resp.json())
  .then(data => {
    // data.like_count += 1
    console.log(data)})

  }


const renderComments = (comments) => {
  const commentContainer = document.getElementById("comments")

    comments.forEach(comment =>{
      commentContainer.innerHTML += `
        <li>${comment.content}</li>
      `
    })
}

  const renderImage = (image) => {
    const imageContainer = document.getElementById("image")
    const nameContainer = document.getElementById("name")
    const likeBtn = document.getElementById("like_button")
    const imageForm = document.getElementById("comment_form")
    const commentInput = document.getElementById("comment_input")
    const submitBtn = document.getElementById("submit-button")
    const likesContainer = document.getElementById("likes")


    console.log(image.url)
    console.log(image.name)
    console.log(image.like_count)
    console.log(image.comments)


    imageContainer.src = `${image.url}`
    nameContainer.innerHTML = image.name
    likesContainer.innerHTML = image.like_count

    
    renderComments(image.comments)

    const imageCard = document.getElementById("image_card")
    
    imageCard.addEventListener("click", (e) => {
      if (e.target.dataset.action === "like"){
        console.log("WOW I WAS LIKED")
        likeButn(image);
      }
      else if (e.target.dataset.action === "submit"){
        e.preventDefault()
        console.log("WOW I WAS SUBMITTED")
        commentButn(image)
      }

    })

  }

  const fetchImage = () => {
    fetch(`https://randopic.herokuapp.com/images/4905`)
    .then(resp => resp.json())
    .then(data => renderImage(data))
  }
