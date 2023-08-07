/* eslint-disable operator-linebreak */
import iconShare from '../assets/icons/shares.png';
import iconCatLike from '../assets/icons/CatHead.png';
import iconAccount from '../assets/icons/Account-circle.svg';

/* eslint-disable comma-dangle */
export const MyPosts = (
  name,
  textPost,
  photoUrl,
  postId,
  isUserIdInArray,
  numberOfLikes
) => {
  const myPostsDiv = document.createElement('div');
  const isLiked = isUserIdInArray === true ? 'colorLikeCat' : '';
  const numberLikes = numberOfLikes === 0 ? '' : numberOfLikes;
  const photo =
    photoUrl === './assets/icons/Account-circle.svg'
      ? `${iconAccount}`
      : photoUrl;

  const post = `<div class="containerPost">
      <div class="containerUser">
        <img class="userBlack"src="${photo}" alt="user Black"/>
        <p class="names" >${name}</p>
      </div>
      
      <p class="feedPost" >${textPost}</p>
      
      <div class="horizontal-line"></div>
      
      <div class="containerIcons">
        <div data-id="${postId}" class="containerLike">
          <img data-id="${postId}" class="likeCat ${isLiked}" src=${iconCatLike}>
          <p data-id="${postId}" class="like">Me gusta ${numberLikes} </p>
        </div>
        
        <div class="sharePost">
          <img class="share" src=${iconShare}>
          <p class="shareText">Compartir</p>
        </div>
      </div>
  </div>`;

  myPostsDiv.innerHTML = post;
  return myPostsDiv;
};
