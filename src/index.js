const imageId = 4910;
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage()
    .then(function(json){
      renderImage(json)
    });
  postLike();
})

function fetchImage(){
    return fetch(imageURL)
      .then (function(response){
        return response.json();
      })
}

function renderImage(json){
  const imgContainer = document.querySelector('#image_content');

  const img = document.getElementById('image');
  img.setAttribute('src', json.url);

  const name = document.getElementById('name');
  name.innerText = json.name;

  const likes = document.getElementById('likes');
  likes.innerText = json.like_count;

  const comments = document.getElementById('comments');
  for (let i = 0; i < json.comments.length; i++){
    let comment = document.createElement('li');
    comment.innerText = json.comments[i].content;
    comments.appendChild(comment);
  }
}

function postLike(){
  const likeButton = document.getElementById('like_button');
  const likes = document.getElementById('likes');

  likeButton.addEventListener('click', function(e){
    likes.innerText = `${parseInt(likes.innerText) + 1}`;
    fetch(likeURL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likes.innerText
      })
    })
  })
}
