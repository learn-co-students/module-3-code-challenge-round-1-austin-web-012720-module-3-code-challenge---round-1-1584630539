document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4889 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchImg(imageURL)
  let data;
  addLike(likeURL,imageId)

  addComment(commentsURL,imageId);


})
function fetchImg(url){
  fetch(url)
  .then(resp =>resp.json())
  .then(json => {
    data = json;
    document.querySelector('img#image').setAttribute('src',`${json.url}`);
    document.querySelector('h4#name').textContent = `${json.name}`
    document.querySelector('span#likes').textContent = `${json.like_count}`

    for (const i in json.comments){
      let ul = document.querySelector('ul#comments')
      let li = document.createElement('li');
      li.innerText = data.comments[i].content;
      ul.appendChild(li)
    };
  })
}
function addLike(url,imageId){
  let likeButton = document.getElementById('like_button');
  likeButton.addEventListener('click', (event)=>{
    let likeBox = document.querySelector('span#likes')
    likeBox.innerText = Number(likeBox.innerText ) + 1
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      image_id: imageId
      })

  });
});
}
function addComment(commentsURL,imageId){
  let subButton = document.querySelector('form').children[1];
  subButton.addEventListener('click', (event)=>{
    event.preventDefault();
     let formData = event.target.parentNode.children[0].value;
     let newLi = document.createElement('li');
     if (formData !==''){
       newLi.innerText = formData;
       document.querySelector('ul#comments').appendChild(newLi);
       document.querySelector('input').value = '';
       fetch(commentsURL, {
         method:'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           image_id: imageId,
           content: formData
         })
       })
     }





  })
}
