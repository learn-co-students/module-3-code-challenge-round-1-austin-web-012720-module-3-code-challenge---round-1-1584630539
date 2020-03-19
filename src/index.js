document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')


  let imageId = 4895 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.getElementById('image')
  const imgName = document.getElementById('name')
  const imgLikes = document.getElementById('likes')
  const imgComments = document.getElementById('comments')
  const form = document.getElementById('comment_form')

  form.onsubmit = addComment

  let likeCount = 0

  fetchImageData().then(addImageData)

  function fetchImageData(){
    return fetch(imageURL)
    .then(resp => resp.json())
  }

  function addImageData(data){
    likeCount = data.like_count
    image.src = data.url
    imgName.innerText = data.name
    imgLikes.innerText = likeCount
    data.comments.forEach(com => {
      const li = document.createElement('li')
      li.innerText = com.content
      imgComments.appendChild(li)
    })



  }

  function addComment(event){
    event.preventDefault()
    console.log(event)

    const inputData = {
      
    }

  }

  // function addLikes(){
  //   const bttn = document.getElementById('like_button')
  //   bttn.addEventListener("click", increaseLikes)

  //   function increaseLikes(){
  //     likeCount += 1
  //   }
  



})
