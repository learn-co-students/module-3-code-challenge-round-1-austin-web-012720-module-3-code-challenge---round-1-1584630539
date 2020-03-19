
  let imageId = 4899 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    
    getImage()
    .then(renderImage) 
  })
  
  function getImage(){
    return fetch(imageURL)
  .then(resp => resp.json())
}


function renderImage(imageInfo){
  let imageContainer = document.querySelector("#image")
  let imageTitle = document.querySelector("#name")
  let likeCount = document.querySelector("#likes")
  let commentSection = document.querySelector("#comments")
  
  const imgUrl = imageInfo.url
  const imgTitle = imageInfo.name
  const numLks = imageInfo.like_count
  const cmnts = imageInfo.comments
  
  imageContainer.src = imgUrl
  imageTitle.innerText = imgTitle
  likeCount.innerText = numLks
  cmnts.forEach(comment => {
    const liEl = document.createElement('li')
    liEl.innerText = comment.content
    commentSection.appendChild(liEl)
  });
  

  const postRequest = {
    method: "POST",
    body: {
      image_id: 
    },
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

  }

  document.getElementById("like_button").addEventListener("click", addLike);
  function addLike(e){
    document.getElementById("likes").innerText = parseInt(document.getElementById("likes").innerText)+1;
    addLikeToBackend(e);
  }     

  
  
  
  
  

  
}