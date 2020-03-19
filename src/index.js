
// A user of your app must be able to do the following things:

// As a user, when the page loads, I should see:

// an image
// any comments that image has
// the number of likes that image has
// As a user, I can click a button to like an image. When I click, the number of likes the image has should increase by one without the page refreshing.

// As a user, I can enter text in an input field, and submit the form that the input is in. 
// When I do, the app should add comment to the image without the page refreshing. I should see my new comment below any previous comments.

// As a user, when I refresh the page, any comments or likes I have added should still be there. When a user adds a like or a comment, 
// make sure their changes are sent to the backend API.



//PERSONAL NOTES
// First Render Picture
// Get ID from picture and put that whats associated to that id
// From that ID return the title/name or whatever its called in api as the title

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4912

  const imageURL = `https://randopic.herokuapp.com/images/4912`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function renderImage(pics){
    const picInfo = `https://randopic.herokuapp.com/images/4912`
    const img = document.getElementById('div-card')
      img.innerHtml = `
      <h4> Title ${picInfo.name}</h4>
      <img>${picInfo.url}<img>
      `
  }

  function likeImage(event){
    const liked = document.createElement('#like_button')
      liked.addEventListener("click")
      console.log("works")


  }

  function commentImage(event){
    const comment = document.getElementById("")
  }

})
