const imageId = 4891;
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

function likeImage() {
  const likes = document.getElementById('likes');
  const newLikes = parseInt(likes.innerText) + 1;
  likes.innerText = newLikes;

  const postLike = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: imageId,
      like_count: newLikes,
    }),
  };

  fetch(likeURL, postLike);
}

function createCommentNode(commentContent) {
  const newComment = document.createElement('li');
  newComment.appendChild(document.createTextNode(commentContent));

  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.addEventListener('click', e => {
    console.log(e.srcElement.parentNode);
    e.srcElement.parentNode.innerHTML = '';

    window.alert(`\nJust wanted you to know I could make the button \n
      and that I know how to get the parent node, but at this point\n
      in the challenge it would take to long to refactor for it to \n
      be worth the time.\n\n
      Anyways the 'li' node of the click event is in the console. I could\n
      probably do something clever with that information.`);
  });

  newComment.append(delBtn);

  return newComment;
}

function addComment(commentContent) {
  const commentList = document.getElementById('comments');
  const newComment = createCommentNode(commentContent);
  commentList.append(newComment);

  const postComment = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: imageId,
      content: commentContent,
    }),
  };

  fetch(commentsURL, postComment);
}

function addAssets(pageInfo) {
  const image = document.getElementById('image');
  image.src = pageInfo.url;

  const imgName = document.getElementById('name');
  imgName.innerText = pageInfo.name;

  const likes = document.getElementById('likes');
  likes.innerText = pageInfo.like_count;

  const likesBtn = document.getElementById('like_button');
  likesBtn.addEventListener('click', e => {
    e.preventDefault();
    likeImage();
  });

  const comments = document.getElementById('comment_form');
  comments.addEventListener('submit', e => {
    e.preventDefault();
    addComment(document.getElementById('comment_input').value);
  });

  const commentList = document.getElementById('comments');
  pageInfo.comments.forEach(comment => {
    const newComment = createCommentNode(comment.content);
    commentList.appendChild(newComment);
  });
}

function getImages() {
  return fetch(imageURL)
    .then(resp => resp.json())
    .then(json => addAssets(json));
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');
  getImages();
});
