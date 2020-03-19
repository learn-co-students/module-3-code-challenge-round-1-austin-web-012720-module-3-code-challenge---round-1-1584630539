let imageId = 4910;
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage()
    .then(function(json){
      renderImage(json)
    });
})

function fetchImage(){
    return fetch(imageURL)
      .then (function(response){
        return response.json();
      })
}
function renderImage(json){
  let imgContainer = document.querySelector('#image_content');

  let img = document.createElement('img');
  img.setAttribute('src', imageURL);
  imgContainer.appendChild(img);

  let name = document.getElementById('name');
  name.innerText = json.name;

  let likes = document.getElementById('likes');
  likes.innerText = `${json.like_count}`;

  let comments = document.getElementById('comments');
  for (let i = 0; i < json.comments.length; i++){
    let comment = document.createElement('li');
    comment.innerText = json.comments[i].content;
    comments.appendChild(comment);
  }

  let likeButton = document.getElementById('like_button');
  likeButton.addEventListener('click', function(e){
    let likes = document.getElementById('likes');
    likes.innerText = `${parseInt(likes.innerText) + 1}`
  })
}
