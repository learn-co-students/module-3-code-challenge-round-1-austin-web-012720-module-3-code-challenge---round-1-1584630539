document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4893
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()
  
      // Grabs the imageData(JSON)
      function fetchImage() {
        fetch(imageURL)
        .then(response => response.json())
        .then(imageData => renderPage(imageData))
       
      }

      // Renders all page elements
      function renderPage(imageData){
        const imgTag = document.getElementById("image")
        const imgCard = document.getElementById("image_card")
        const image = imageData.url
        imgTag.src = image
        imgCard.append(imgTag)

        const name = document.getElementById("name")
        name.innerText = imageData.name

        const likes = document.getElementById("likes")
        likes.innerText = imageData.like_count


        getComments(imageData)

        // Renders comments list
        function getComments(imageData){
          const commentsUl = document.getElementById("comments")
          const li = document.createElement("li")

          imageData.comments.forEach(comment => {
            const commentId = comment.id 
            const commentContent = comment.content 

            li.innerText = commentContent
            commentsUl.append(li)
          })
        }

          // Adds likes
          const likeBtn = document.getElementById("like_button")
          likeBtn.addEventListener("click", (event) => {
            event.preventDefault()
            console.log("Added a like!")
            let likeNum = parseInt(likes.innerText, 10)
            likeNum += 1
            likes.innerText = likeNum

          })

            // Post request for likes
            fetch(likeURL, {
              method: "POST",
              body: JSON.stringify({image_id: imageId}),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
            .then(response => response.json())
        
          // Organize input form
          const commentInput = document.getElementById("comment_input")
          const commentForm = document.getElementById("comment_form")
          commentForm.addEventListener("submit", (event) => {
            event.preventDefault()

            // NOT WORKING, trying to render comments
            const cmntlist = document.getElementById("comments")
            const lis = document.createElement("li")
            lis.innerText = commentInputValue
            commentsUl.append(lis)
          })
        
          // Post request for comments
          fetch(commentsURL, {
            method: "POST",
            body: JSON.stringify({
              image_id: imageId, 
              // Fix next line  - need to grab text from input box
              content: commentInput.innerText
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(response => response.json())

      }
})
