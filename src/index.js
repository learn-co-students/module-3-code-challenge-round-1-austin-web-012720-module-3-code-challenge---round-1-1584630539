const imageInfo = [];
let imageComments = [];
let comment = '';

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');
  const imageId = 4892; // Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = 'https://randopic.herokuapp.com/likes/';
  const commentsURL = 'https://randopic.herokuapp.com/comments/';
  getImage();
});

function getImage() {
  return fetch('https://randopic.herokuapp.com/images/4892')
    .then((response) => response.json())
    .then((json) => {
      imageInfo.push(json);
      renderImage(imageInfo);
    });
}

function renderImage(imageInfo) {
  const imgCard = document.getElementById('image_card');
  // imgCard.setAttribute('src', `${imageInfo[0].url}`)
  // Tried to change src to image URL in line 25, didn't work
  // Added new element to get image to show
  const image = document.createElement('p');
  image.innerHTML = '';
  image.innerHTML = `<img src = ${imageInfo[0].url} />`;
  imgCard.append(image);

  imgName = document.getElementById('name');
  imgName.innerHTML = `${imageInfo[0].name}`;

  imgLikes = document.getElementById('likes');
  imgLikes.innerHTML = `${imageInfo[0].like_count}`;
  let likeCount = parseInt(`${imageInfo[0].like_count}`);

  imgCommentsUl = document.getElementById('comments');
  imageComments = imageInfo[0].comments;
  imageComments.forEach((comment) => {
    const commentLi = document.createElement('li');
    commentLi.innerText = comment.content;
    imgCommentsUl.appendChild(commentLi);
  });

  const commentUl = document.getElementById('comments');
  const commentInput = document.getElementById('comment_input');
  const submitBtn = document.getElementById('submitButton');
  // Modified index.html to add ID value to submit button
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newComment = document.createElement('li');
    comment = newComment.textContent = commentInput.value;
    // Line 55 is really ugly but out of time trying to change
    commentUl.appendChild(newComment);
    addComment(imageInfo, comment);
    commentInput.value = '';
  });

  const likeBtn = document.getElementById('like_button');
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalLikes = imgLikes.innerHTML = `${likeCount += 1}`;
    updateLikes(imageInfo, totalLikes);
  });
}

function addComment(imageInfo, commentText) {
  const newComment = {
    method: 'POST',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
    body: JSON.stringify({
      image_id: `${imageInfo[0].id}`,
      content: `${commentText}`,
    }),
  };
  fetch('https://randopic.herokuapp.com/comments', newComment)
    .then((response) => response.json());
}

function updateLikes(imageInfo, totalLikes) {
  const updateLikes = {
    method: 'POST',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
    body: JSON.stringify({
      image_id: `${imageInfo[0].id}`,
      like_count: totalLikes,
    }),
  };
  fetch('https://randopic.herokuapp.com/likes', updateLikes)
    .then((response) => response.json());
}
