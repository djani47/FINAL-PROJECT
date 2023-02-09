function setupUI(){
  const token = localStorage.getItem("token")
  const connecterDiv =document.getElementById("connecter-div")
  const déconnecterDiv =document.getElementById("déconnecter-div")
  const buttonPosts =document.getElementById("button-posts")

  if(token == null){  /* Deconnecter*/ 
  if(buttonPosts != null){
    buttonPosts.style.setProperty("display", "none", "important")
  }
    
    connecterDiv.style.setProperty("display", "flex", "important")
    déconnecterDiv.style.setProperty("display", "none", "important")
  }else{    /* Connecter*/ 
  if(buttonPosts != null){
    buttonPosts.style.setProperty("display", "flex", "important")
  }
    
    connecterDiv.style.setProperty("display", "none", "important")
    déconnecterDiv.style.setProperty("display", "flex", "important")

    let user = importationStringVersJson()
    document.getElementById('userName-profil').innerHTML = user.username
    document.getElementById("nav-user-image").src = user.profile_image
  }
}

setupUI()



function loginConnection(){
  let username = document.getElementById("exampleInputText").value
  let password = document.getElementById("exampleInputPassword1").value
  toggleLaoder(true)
  axios.post('https://tarmeezacademy.com/api/v1/login',
  {
    "username": username,
    "password": password
  })  

  .then(function(response) {
    toggleLaoder(false)
    let token = response.data.token
    let user = response.data.user
  
    localStorage.setItem("token",token)
    localStorage.setItem("user",JSON.stringify(user))

    const modal = document.getElementById("exampleModal")
    const modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()
    showsSuccessAlert("vous êtes Connecter", "success")
    setupUI()
  })
  .catch(error =>{
    let message = error.response.data.message
    showsSuccessAlert(message, "danger")
  })
  .finally(()=>{
    toggleLaoder(false)
  })
  
}



function registerNewUser(){
  let username = document.getElementById("register-username").value
  let password = document.getElementById("register-password").value
  let name = document.getElementById("register-name").value  
  let image = document.getElementById("register-image-user").files[0]
  

    let formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("name", name)
    formData.append("image", image)
    const headers = { 
      "Content-Type":"multipart/form-data"
    }
    toggleLaoder(true)
    axios.post('https://tarmeezacademy.com/api/v1/register',formData,{
      headers :headers
    })
    
    .then(function(response) {
      toggleLaoder(false)
      localStorage.setItem("token",response.data.token)
      let user = response.data.user
      localStorage.setItem("user",JSON.stringify(user))

      const modal = document.getElementById("loggen")
      const modalInstance = bootstrap.Modal.getInstance(modal)
      modalInstance.hide()
      showsSuccessAlert("vous venu de finir votre inscription")
      setupUI()
      
    })
    .catch(error =>{
      let message = error.response.data.message
      showsSuccessAlert(message, "danger")
    })
    .finally(()=>{
      toggleLaoder(false)
    })
}



function importationStringVersJson(){
  let user = null
  const storageUser =  localStorage.getItem("user")
  if(storageUser != null){
    user = JSON.parse(storageUser)
  }
  return user
  
}



function DeconnecterUse(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  showsSuccessAlert("vous êtes déconnecter", "warning")
  setupUI()
  
}


function showsSuccessAlert(note, x){
  const alertPlaceholder = document.getElementById('myAlert')
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      
      `
      <div class="alert alert-${x} d-flex align-items-center mt-4" role="alert alert-${type} alert-dismissible mt-4">
        <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
        </svg>
        <div style="margin-right: 470px;">
          ${message}
        </div>
        <div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      `
    ].join('')

    alertPlaceholder.append(wrapper)
  }
    alert(note, x)
  //   setTimeout(() => {
  //     let amine = bootstrap.Alert.getOrCreateInstance('#myAlert')
  //     amine.hide()
  //   }, 1000);


    // let modal = document.getElementById("myAlert")
    // let modalInstance = bootstrap.Modal.setInstance(modal)
    // modalInstance.hide()  
    
    
}









//  LAODER   //

function toggleLaoder(show = true){
  if(show){
    document.getElementById("attendez").style.visibility = `visible`
  }else{
    document.getElementById("attendez").style.visibility = `hidden`
  }
}

//  LAODER   //


function publieNouveauPost(){
  let postId =  document.getElementById("post-id-input").value;
  let siNouveauPost = postId == null || postId == ""
  
  const title = document.getElementById("post-title-input").value
  const body = document.getElementById("post-body-input").value
  let image = document.getElementById("post-image-input").files[0]
  const token = localStorage.getItem("token")

  let formData = new FormData()
  formData.append("image", image)
  formData.append("title", title)
  formData.append("body", body)
  

  const headers = { 
    "Content-Type":"multipart/form-data",
    "authorization": `Bearer ${token}`
  }

    if(siNouveauPost){
      toggleLaoder(true)
      const url = 'https://tarmeezacademy.com/api/v1/posts'
      axios.post(url,formData,{
        headers 
      })

      .then(function(response) {
        toggleLaoder(false)
        showsSuccessAlert("Votre commentaire vient d'etre ajouter", "success")

        const modal = document.getElementById("btn-post-clicked")
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        postUser()

        let user = importationStringVersJson()
        document.getElementById("ami").src = user.profile_image
      })
      .catch(error =>{
        let message = error.response.data.message
        showsSuccessAlert(message, "danger")
      })
      
    }else{
      
      formData.append("_method", "put")
      toggleLaoder(true)
      const url = 'https://tarmeezacademy.com/api/v1/posts/'+`${postId}`
      axios.post(url,formData,{
        headers 
      })

      .then(function(response) {
        toggleLaoder(false)
        showsSuccessAlert("Votre commentaire vient d'etre Modifier", "success")

        const modal = document.getElementById("btn-post-clicked")
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        postUser()

        let user = importationStringVersJson()
        document.getElementById("ami").src = user.profile_image
      })
      .catch(error =>{
        let message = error.response.data.message
        showsSuccessAlert(message, "danger")
      })
      .finally(()=>{
        toggleLaoder(false)
      })
      

    }

}


function confirmeSupprimerMonPost(){
  const token = localStorage.getItem("token")
  const postId = document.getElementById("delete-post-id-input").value
    
   
  const headers = { 
    "Content-Type":"multipart/form-data",
    "authorization": `Bearer ${token}`
  }


  const url = 'https://tarmeezacademy.com/api/v1/posts/'+`${postId}`
    axios.delete(url,{
      headers : headers
    })

  .then(function(response) {
      
    showsSuccessAlert("Votre commentaire vient d'etre Supprimer", "success")
    const modal = document.getElementById("amine1")
    const modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()

    
    postUser()
      
      
  })
  .catch(error =>{
    let message = error.response.data.message
    showsSuccessAlert(message, "danger")
  })
}  


function supprimerMonPost(postObject){
  const post = JSON.parse(decodeURIComponent(postObject))
  document.getElementById("delete-post-id-input").value = post.id
  document.getElementById("nomPost").innerHTML = post.author.username
  

  let postModal = new bootstrap.Modal(document.getElementById("amine1"), {})
  postModal.toggle()
  

}













  
  
  
 
                    