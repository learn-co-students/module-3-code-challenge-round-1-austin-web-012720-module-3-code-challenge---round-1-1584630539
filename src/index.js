document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4897;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchImage(imageURL);
  const likeButton = document.getElementById('like_button');
  likeButton.addEventListener("click", like);

  const commentButton = document.querySelector('input[type="submit"]');
  commentButton.addEventListener("click", addComment);

});

function fetchImage(url) {
  fetch(url)
  .then(resp => resp.json())
  .then(json => imageHTML(json));
}

function imageHTML(json) {
  console.log(json);
  const url = json.url;
  const id = json.id;
  const name = json.name
  const likes = json.like_count;
  const comments = json.comments;

  const h4 = document.getElementById('name');
  h4.innerText = name;

  const span = document.getElementById('likes');
  span.innerText = likes;

  const ul = document.getElementById('comments');
  console.log(comments);
  for(const comment in comments) {
    const content = comments[comment].content;
    const commentId = comments[comment].id;
    // console.log(content);
    const li = document.createElement('li');
    li.innerText = content;

    const deleteButton = document.createElement('button');
      deleteButton.dataset.commentId = commentId;
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", deleteComment);
      li.appendChild(deleteButton);
    ul.appendChild(li);
  }

  const image = document.getElementById('image');
  image.src = url;
  image.dataset.id = id;
  // console.log(image);
}

function like(event) {
  event.preventDefault();
  const span = document.getElementById('likes');
  let numberLikes = parseInt(span.innerText);
  // console.log(numberLikes);
  numberLikes = numberLikes + 1;
  span.innerText = numberLikes;

  const body = {
    image_id: 4897
  }

  const configObj = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  fetch(`https://randopic.herokuapp.com/likes/`, configObj)
  .then(resp => resp.json())
  .then(json => console.log(json));
}

function addComment(event) {
  console.log(event.target);
  event.preventDefault();

  const input = document.getElementById('comment_input');
  const ul = document.getElementById('comments');
  const li = document.createElement('li');
  li.innerText = input.value;
  const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteComment);
    li.appendChild(deleteButton);
  ul.appendChild(li);

  const body = {
    image_id: 4897,
    content: input.value
  }

  const configObj = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  fetch('https://randopic.herokuapp.com/comments', configObj)
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
    deleteButton.dataset.commentId = json.id;
  });
}

function deleteComment(event) {
  console.log(event.target);
  event.preventDefault();

  const id = event.target.dataset.commentId;
  console.log(id);

  const li = event.target.parentNode;
  li.remove();

  const configObj = {
    method: "DELETE",
  }

  fetch(`https://randopic.herokuapp.com/comments/${id}`, configObj)
  .then(resp => resp.json())
  .then(json => console.log(json))
}
