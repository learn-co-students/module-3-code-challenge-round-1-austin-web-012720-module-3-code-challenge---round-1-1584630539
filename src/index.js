document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 4901 //Enter the id from the fetched image here
  
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  // const imageURL = 'http://blog.flatironschool.com/wp-content/uploads/2017/06/5-year-event-352x200.jpg'
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  // fetch from API
  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
    console.log(data),
    
    // adding to DOM
    // add image url
    document.getElementById('image').setAttribute('src',`${imageURL}.jpg`)
    
    // add image name
    document.getElementById('name').innerText=data.name;
    
    // add the likes
    document.getElementById('likes').innerText=data.like_count;
    
    // add comments
    data.comments.forEach(c => {
      console.log(c.content),
      document.getElementById('comments').innerHTML=`
      <li id=${c.id}>${c.content}</li>`
    })
    // increase likes
    document.addEventListener('click', e => {
      if (e.target.id === 'like_button') {
        console.log('button clicked'),
        document.getElementById('likes').innerText=data.like_count += 1,
        patchLikes()
      }
    })
    
    
    
  })
  
  
})

function patchLikes() {
  console.log('patch fetch would go here')
}