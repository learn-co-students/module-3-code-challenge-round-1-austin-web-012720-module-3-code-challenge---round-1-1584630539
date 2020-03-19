document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()
    .then(image => {
      console.log(image);
      displayImage(image)});
})

function fetchImage() {
  let imageId = 4894
  return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(response => response.json())
}

function displayImage(image) {
  const img = document.querySelector('img');
  img.setAttribute('src', image.url);
  img.id = image.id
  img.setAttribute('data-id', image.id);

  const name = document.querySelector('#name')
  name.innerText = image.name;

  const likeCount = document.querySelector('#likes');
  likeCount.innerText = image.like_count;
}

function addComments() {
  //can't figure out how to select anything today.  Everything I try to select comes up as null
  //I had the same issue in the above code.  I couldn't select what I wanted to do add the image
}


