export const MyPosts = (name, textPost, photoUrl) => {
  const myPostsDiv = document.createElement("div");

  const post = `<div class="containerPost">
      <div class="containerUser">
        <img class="userBlack"src="${photoUrl}" alt="user Black"/>
        <p class="names" >${name}</p>
     </div>
      
      <p class="feedPost" >${textPost}</p>
      
      <div class="horizontal-line"></div>
      
      <div class="containerIcons">
        <div class="containerLike">
          <img class="likeCat" src="./assets/icons/CatHead.png"/>
          <p class="like">Me gusta</p>
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
