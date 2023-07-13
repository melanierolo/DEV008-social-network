export const MyPosts = () => {
  const myPostsDiv = document.createElement("div");

  const post = `<div class="containerPost">
      <div class="containerUser">
        <img class="userBlack"src="./assets/icons/userBlack.svg" alt="user Black"/>
        <a class="names" >Nombre del usuario</a>
     </div>

      <p class="feedPost" >"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."</p>
      
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
