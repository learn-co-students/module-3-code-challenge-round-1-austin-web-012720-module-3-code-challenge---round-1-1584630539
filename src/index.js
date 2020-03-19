/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  const imageId = 4896; // Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = 'https://randopic.herokuapp.com/likes/';
  const commentsURL = 'https://randopic.herokuapp.com/comments/';

  const imageSrc = document.getElementById('image');
  const imageTitle = document.getElementById('name');
  const likeCount = document.getElementById('likes');
  const commentsContainer = document.getElementById('comments');

  const likeBtn = document.getElementById('like_button');

  imageFetch();

  function imageFetch() {
    fetch(imageURL)
      .then((resp) => resp.json())
      .then((json) => addImage(json));
  }

  function addImage(json) {
    console.log(json);
    imageSrc.src = json.url;
    imageTitle.innerText = json.name;
    likeCount.innerText = json.like_count;
  }

  likeBtn.addEventListener('click', () => {
    likeCount.innerText++;
    // persistLikes();
  });





  // function persistLikes() {
  //   fetch(likeURL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify

  //       ,
  //   }).then((resp) => resp.json())
  //   .then((json) => addImage(json));
  // }

  // was tring to get likes to persist in the backend, ran out of time.
});
