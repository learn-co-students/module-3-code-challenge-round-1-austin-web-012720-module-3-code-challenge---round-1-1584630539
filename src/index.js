document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4907 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImg(imageURL);


})



function getImg(url){

  return fetch(url)
  .then((res) => res.json())
  .then((json) => dispImg(json,url));


}

function dispImg(json,url){
  console.log(json);
  const imgEl = document.getElementById('image');
  imgEl.setAttribute('src', json['url']);
  //const cardEl = document.getElementById('image_card');
  const titleEl = document.getElementById('name');
  titleEl.innerText = json['name'];

  const likeBtn = document.getElementById('like_button');
  likeBtn.addEventListener('click', (e) =>{
      e.preventDefault();
      likeImg(json['id'],url);
  });

  const likeCount = document.getElementById('likes');
  likeCount.innerText = json['like_count'];

  const comArray = document.getElementById('comments');
  comArray.innerHTML = "";
  json['comments'].forEach( (com) => {
          const comEl = document.createElement('li');
          console.log(com);
          comEl.innerText = com.content;
          comArray.appendChild(comEl);

  });
  
  const comment = document.getElementById('comment_form');
  comment.addEventListener('submit', (e) =>{
      e.preventDefault();
      const text = document.getElementById('comment_input');
      addComment(text.value,json['id'],url);
  });




}

function addComment(com, img_id,url){
  fetch(`https://randopic.herokuapp.com/comments/`, {
  method: 'POST',
  body: JSON.stringify({
    image_id: img_id,
    content: com
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(resp => resp.json())
  .then(getImg(url));

}

function likeImg(img_id,url){
  fetch(`https://randopic.herokuapp.com/likes/`, {
  method: 'POST',
  body: JSON.stringify({
    image_id: img_id
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(resp => resp.json())
  .then(getImg(url));

}
