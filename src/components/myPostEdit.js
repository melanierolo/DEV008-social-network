/* eslint-disable operator-linebreak */
import iconDelete from '../assets/icons/Delete.png';
import iconEdit from '../assets/icons/Edit.png';
import iconCatHead from '../assets/icons/CatHead.png';
import iconMore from '../assets/icons/button-icon-more.svg';
import iconShare from '../assets/icons/shares.png';
import iconAccount from '../assets/icons/Account-circle.svg';

/* eslint-disable comma-dangle */
export const MyPostEdit = (
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
      <div class="containerUserEdit">
        <div class="postEditNameAndImg">
          <img class="userBlack"src="${photo}" alt="user Black"/>
          <p class="names" >${name}</p>
        </div>
        <div class="postEditButtons">
          <img class="postEditIconMore" data-id="${postId}" src=${iconMore} alt="button icon more">
          <ul class="postEditButtons__submenu hideSubmenu">
            <li class="postEditButtons__li">
              <img class="trash" src=${iconDelete} alt="IConDelete">
              <button id="btn-delete" class="btnDelete" data-id="${postId}">Eliminar</button>
            </li>
            <li class="postEditButtons__li">
              <img class="pencil" src=${iconEdit} alt="IconEdit">
              <button id="btn-edit" class="btnEdit" data-id="${postId}">Editar</button>
            </li>
          </ul>
        </div>
    </div>
      
      <p id="text-${postId}"class="feedPost" >${textPost}</p>
      
      <div class="horizontal-line"></div>
      
      <div class="containerIcons">
        <div class="containerLike" data-id="${postId}">
          <img  data-id="${postId}" class="likeCat ${isLiked}" src=${iconCatHead}>
          <p  data-id="${postId}" class="like">Me gusta ${numberLikes}</p>
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
