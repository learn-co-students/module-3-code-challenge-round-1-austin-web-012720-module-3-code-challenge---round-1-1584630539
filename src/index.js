document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4900 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
   getImage() 

  function getImage() {
      return fetch(imageURL)
      .then(response => response.json())
      .then(data => showDivData(data))
    }  

    function showDivData(data){
      const divContainer = document.querySelector('#container')
       const divRow = document.getElementById('image-content')
       divContainer.append(divRow)
    
      divRow.className = "row"
      const divImageCard = document.getElementById('image_card')
      divImageCard.className = "card col-md-4"
      divImageCard.src = data.url
      divImageCard.dataset.id = data.id
      divRow.append(divImageCard)
    
      const imageTitle = document.getElementById('name')
      imageTitle.innerText = `${data.name}`
      divImageCard.append(imageTitle)

      const spanLikes = document.getElementById('likes')
      spanLikes.innerText = `Likes: ${data.like_count}`
      divImageCard.append(spanLikes)

      const likeButton = document.getElementById('id')
      likeButton.dataset.id = data.id
      likeButton.innerText = "Like"
      divImageCard.append(likeButton)

      const form = document.getElementById('comment_form')
      form.addEventListener('click', function(event)) {
        event.preventDefault();
        //times out..........
      }
    }

//     <div class="container">

//     <div class="row" id="image_content">

//       <div class="card col-md-4"></div>
//       <div id="image_card" class="card col-md-4">
//           <img src="" id="image" data-id=""/>

//           <h4 id="name">Title of image goes here</h4>

//           <span>Likes:
//             <span id="likes">Likes Go Here</span>
//           </span>

//           <button id="like_button">Like</button>


//           <form id="comment_form">
//             <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
//             <input type="submit" value="Submit"/>
//           </form>


//           <ul id="comments">
//                <!-- <li> for each comment goes here -->
//           </ul>
//         </div>
 })
