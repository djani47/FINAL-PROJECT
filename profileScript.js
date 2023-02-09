function importaionId(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("valeurId")
    return id
}


function informationUserProfil(){
    const id = importaionId()
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then((response) => {
        let user = response.data.data
        let conteneur = `
    
                            <div style="width: 60%;height: 150px;display: flex;" >
                            <img class="rounded-circle  mt-3 m-xl-4" src="${user.profile_image}"  alt="Bootstrap" width="170" height="170" style="border: 4px black solid;">
                            <div class="information">
                                <span>${user.email}</span>
                                <span>${user.username}</span>
                                <span>${user.name}</span>
                            </div>
                        </div>
                        <div style="width: 40%;height: 150px;margin-top: 90px;margin-bottom:30px ;">
                            <div style="display: flex;justify-content: center;margin-bottom: 40px;">
                                <h4>${user.posts_count}</h4>
                                <h3>Posts</h3>
                            </div>
                            <div style="display: flex;justify-content: center;">
                                <h4>${user.comments_count}</h4>
                                <h3>Commentaires</h3>
                            </div>
                        </div>
    
    `
    document.getElementById("profile").innerHTML = conteneur
    
    })
}

informationUserProfil()



function postInformation(){
    const id = importaionId()
    toggleLaoder(true)
    axios.get(`http://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then((response) => {
        toggleLaoder(false)
        const posts = response.data.data
        console.log(response)
        document.getElementById("info").innerHTML = ""
        document.getElementById("infoTitre").innerHTML = ""
        
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
                    
                        <div class="col-8 ">
                            <div class="card my-4">
                                <h5 class="card-header ">
                                    <a class="navbar-brand" href="#">
                                    <img  id ="ami" class="rounded-circle border border-2 border-white" src="${post.author.profile_image}" alt="Bootstrap" width="40" height="40">
                                    <b>${post.author.username}</b> 
                                    </a> 
                                    ${btnModifier}
                                </h5>
                            <div class="card-body shadow h-100">
                                <img class="rounded w-100" src="${post.image}" class="card-img-top" height="200" style="height:250px;">
                                <p class="text-light-emphasis opacity-50 mt-1">${post.author.created_at}</p>  
                                <h5 class="card-title">${postTitle}</h5>
                                <p class="card-text">${post.body}</p>
                                <hr>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                    <span>
                                        ${post.comments_count} commentaires
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
              

            `
            document.getElementById("info").innerHTML += conteneur

            const titre = `
                                    <div class="mt-4  mb-2  " style="font-weight: 500;font-size: 30px;margin-left: 250px;" >
                                    Post ${post.author.username}   
                                    </div>
            
            `


            document.getElementById("infoTitre").innerHTML = titre
        }  
            
    })
      
}
    
postInformation()


