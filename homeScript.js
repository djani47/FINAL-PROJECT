                      //  ---------Infinity scroll---------//

let currentPage = 1
let lastPage = 1
window.addEventListener("scroll",function(){
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
  if(endOfPage && currentPage<lastPage){ 
    currentPage = currentPage + 1
    postUser(false,currentPage)
  }
})

                      //  ---------Infinity scroll---------//


                      



function postUser(reload = true,page =1){
  toggleLaoder(true)
  axios.get(`http://tarmeezacademy.com/api/v1/posts?limit=4&page=${page}`)
  .then((response) => {
    toggleLaoder(false)
    let posts = response.data.data
    lastPage =response.data.meta.last_page
    if(reload){
      document.getElementById("post").innerHTML = " "
    }
    
    let post = ""
    for(post of posts){
      let postTitle =""

      /* Pour Chacher btn*/ 
        let user = importationStringVersJson()
        let monPost = user != null && post.author.id == user.id
        let btnModifier = ""
        if(monPost){
          btnModifier = `
                  <svg onclick="modalModifierMonPost('${encodeURIComponent(JSON.stringify(post))}')" style="float: right;color: green;height:30px;width:30px;" alt="Modifier Le Post" id="i-compose" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z" />
                  </svg>
                  
                  <svg onclick="supprimerMonPost('${encodeURIComponent(JSON.stringify(post))}')" style="float: right;color: red;height:27px;width:27px;margin-right: 27px;margin-top: 3px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
          `
        }
      /* Pour Chacher btn*/ 
      
      if(post.title!= null)
      {
        postTitle = post.title
      }
        let conteneur = `
          <div class="d-flex justify-content-center">
            <div class="col-8">
              <div class="card my-4">
                <h5 class="card-header">
                  <a class="navbar-brand" href="#" onclick="profileInfo(${post.author.id})" style="cursor: pointer;">
                    <img class="rounded-circle border border-2 border-white" src="${post.author.profile_image}" alt="Bootstrap" width="40" height="40">                
                    <b>${post.author.username}</b>
                  </a>
                  ${btnModifier}
                </h5>
                <div class="card-body shadow h-100" onclick="postClick(${post.id})" style="cursor: pointer;">
                  <img class="rounded w-100" src="${post.image}" class="card-img-top" height="300">
                  <p class="text-light-emphasis opacity-50 mt-1">${post.created_at}</p>  
                  <h5 class="card-title">${postTitle}</h5>
                  <p class="card-text">${post.body}</p>
                  <hr>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    <span>
                      ${post.comments_count}
                    </span>
                    <span id="post-${post.id}">
                        
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      document.getElementById("post").innerHTML += conteneur
      document.getElementById(`post-${post.id}`).innerHTML = ""

        for(tag of post.tags){
          let content = `
                
                  <div class="d-inline p-2 rounded mx-2 text-success" style="background-color: #c3cbce;">
                  ${tag.name}
                  </div>
                
          
          `
          document.getElementById(`post-${post.id}`).innerHTML += content
        }
    }         
  })
  .catch(error =>{
      let message = error.response.data.message
      showsSuccessAlert(message, "danger")
  })
  .finally(()=>{
    toggleLaoder(false)
  })
}

postUser()




  


function postClick(id){
  window.location = `PostDetaill.html?postId=${id}`
  
}



function modalModifierMonPost(postObject){
  
  const post = JSON.parse(decodeURIComponent(postObject))
  
  document.getElementById("action").innerHTML = "Modifier"
  document.getElementById("post-id-input").value = post.id
  document.getElementById("post-title-input").value = post.title
  document.getElementById("post-body-input").innerHTML = post.body
  document.getElementById("Modifier-titre-post").value ="Modifier votre publication"
  document.getElementById("Modifier-titre-post").innerHTML = "Modifier Votre Post"
  let postModal = new bootstrap.Modal(document.getElementById("btn-post-clicked"), {})
  postModal.toggle()
}




function modalNouveauPost(){
  
  document.getElementById("action").innerHTML = "Creé"
  document.getElementById("post-id-input").value = null
  document.getElementById("Modifier-titre-post").innerHTML = "Remplisser les Information de votre Post"
  document.getElementById("post-title-input").value = null
  document.getElementById("post-body-input").innerHTML = null
  document.getElementById("post-image-input").value = null
  
  let postModal = new bootstrap.Modal(document.getElementById("btn-post-clicked"), {})
  postModal.toggle()
  
}





function profileInfo(userId){
  
   window.location = `Profile.html?valeurId=${userId}`
}


function profilePage(){
  const user = importationStringVersJson()
  const profileId = user.id
  window.location = `Profile.html?valeurId=${profileId}`
  
}


