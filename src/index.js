document.addEventListener('DOMContentLoaded', () => {
  console.log('%c hey cutie!', 'color: magenta')

  let imageId = 4904
  //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const myURL = 'https://randopic.herokuapp.com/images/4904'

  fetchPicture()

  const image = document.getElementById('image')
  const name = document.getElementById('name');
  const likes = document.getElementById('likes');
  //console.log(pic)
  const commentsUl = document.getElementById('comments');
  const il = document.createElement('il');

function fetchPicture() {
  fetch(myURL)
  .then(r => r.json())
  .then(addPictureInfo)
}

function addPictureInfo(pic) {
  il.innerText = pic.comments 
  image.src = pic.url 
  name.innerText = pic.name 
  likes.innerText = pic.like_count 
  
  commentsUl.appendChild(il)
}
  
function addLikes(e) {
  const likeButton = document.getElementById('like_button')
 
  likeButton.addEventListener('click', (e) => {
    console.log(e.target)
  })
}




});
