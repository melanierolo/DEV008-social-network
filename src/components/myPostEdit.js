export const MyPostEdit = (name, textPost, photoUrl, postId, isUserIdInArray ) => {
  const myPostsDiv = document.createElement("div");
  const isLiked = (isUserIdInArray === true) ? "colorLikeCat": "";

  const post = `<div class="containerPost">
      <div class="containerUser">
        <img class="userBlack"src="${photoUrl}" alt="user Black"/>
        <a class="names" >${name}</a>
        <p>Esta es mi publicación</p>
        <div>
          <button id="btn-delete" class="btnDelete" data-id="${postId}">Eliminar</button>
          <button id="btn-edit" class="btnEdit" data-id="${postId}">Editar</button>
        </div>
    </div>
      
      <p id="text-${postId}"class="feedPost" >${textPost}</p>
      
      <div class="horizontal-line"></div>
      
      <div class="containerIcons">
        <div class="containerLike" data-id="${postId}">
          <img  data-id="${postId}"class="likeCat ${isLiked}" src="./assets/icons/CatHead.png"/>
          <p  data-id="${postId}"class="like">Me gusta</p>
        </div>
        
        <div class="sharePost">
          <img class="share" src="./assets/icons/shares.png"/>
          <p class="shareText">Compartir</p>
        </div>
      </div>
 </div>`;
  myPostsDiv.innerHTML = post;
  return myPostsDiv;
};
