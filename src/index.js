document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4898

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const imageSrcDiv = document.querySelector('#image');
  const titleDiv = document.querySelector('#name');
  const likesDiv = document.querySelector('#likes');
  const commentListUl = document.querySelector('#comments');
  const commentForm = document.querySelector('#comment_form');
  const likeBtn = document.querySelector('#like_button');

  ///////////// Working Here

  document.addEventListener('click', (event) => {

    // if event.target.className === ''
    const curImageId = event.target.getAttribute('data-image-id');
    console.log(curImageId);
    const curCount = parseInt(likesDiv.textContent) + 1;
    likesDiv.textContent = curCount;

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        image_id: imageId,
      })
    })
      .then((result) => result.json())
      .then((json) => console.log(json))

  })

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let commentContent = event.target.elements[0].value;
    liEl = document.createElement('li');
    liEl.textContent = commentContent;
    commentListUl.appendChild(liEl);

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentContent
      })
    })
      .then((result) => result.json())
      .then((json) => console.log(json))
  })

  function fetchImage() {
    fetch(imageURL)
      .then((res) => res.json())
      .then((json) => renderImage(json))
  }

  function renderImage(json) {
    console.log(json.name);
    imageSrcDiv.setAttribute('src', json.url);
    titleDiv.textContent = json.name;
    likesDiv.textContent = json.like_count;
    likeBtn.setAttribute('data-image-id', json.id);
    json.comments.forEach((comment) => {
      liEl = document.createElement('li');
      liEl.textContent = comment.content;
      delBtn = document.createElement('button');
      delBtn.textContent = 'remove comment';
      delBtn.addEventListener('click', (event) => {
        console.log('delete this li');
        // needed to put button into li to remove whole comment. Ran out of time.
      });
      delBtn.className = 'remove-btn';
      commentListUl.appendChild(liEl);
      commentListUl.appendChild(delBtn);

    })
  }


  

fetchImage()



})




// As a user, when the page loads, I should see:
// 
// an image
// any comments that image has
// the number of likes that image has
// As a user, I can click a button to like an image. When I click, the number of likes the image has should increase by one without the page refreshing.
// 
// As a user, I can enter text in an input field, and submit the form that the input is in. When I do, the app should add comment to the image without the page refreshing. I should see my new comment below any previous comments.
// 
// As a user, when I refresh the page, any comments or likes I have added should still be there. When a user adds a like or a comment, make sure their changes are sent to the backend API.