/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import { Header } from './header.js';
import { PublishPost } from './publishPost.js';
import {
  addPost,
  queryPosts,
  deletePost,
  updatePost,
  getPost,
  removeLike,
  addLike,
} from '../lib/firebase.js';
import { MyPosts } from './myPosts.js';
import { MyPostEdit } from './myPostEdit.js';
import { ModalPostEdit } from './modalPostEdit.js';
import { ModalDelete } from './modalDelete.js';
import { Sidebar } from './sidebar.js';
/* validation functions */

function showError(divInput, divError, errorMessage) {
  divInput.style.border = '1px solid red';
  divError.innerHTML = `<img class="icon-error" src="./assets/icons/icon-error.svg">
  <p class="error">${errorMessage}</p>`;
}
function hideError(divInput, divError) {
  divInput.style.border = '1px solid hs1(246, 25% 77%)';
  divInput.style.border = '1px solid #00b4b8';
  divError.innerHTML = '';
}
function validateEmpty(valueInput, divInput, divError, errorMessage) {
  let result;
  if (valueInput.length === 0) {
    showError(divInput, divError, errorMessage);
    result = true;
  } else {
    hideError(divInput, divError);
    result = false;
  }
  return result;
}
export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement('div');
  feedDiv.classList.add('feedContainer');
  const feedContentDiv = document.createElement('div');
  feedContentDiv.classList.add('feedContent');
  const publishPostAndPostDiv = document.createElement('div');
  publishPostAndPostDiv.classList.add('publishPostAndPostContainer');
  const userData = JSON.parse(localStorage.getItem('userRegister'));

  // Childs
  const headerHtml = Header(onNavigate, userData);
  const modalPostEdit = ModalPostEdit();
  const modalPostDelete = ModalDelete();
  const sidebarHtml = Sidebar();

  feedDiv.appendChild(headerHtml);
  feedDiv.appendChild(feedContentDiv);
  feedDiv.appendChild(modalPostEdit);
  feedDiv.appendChild(modalPostDelete);

  feedContentDiv.appendChild(sidebarHtml);
  feedContentDiv.appendChild(publishPostAndPostDiv);

  /* ------------------------ Post Publishing Section ------------------------------ */
  const userImg = JSON.parse(localStorage.getItem('userRegister')).photoUrl;
  const publishPostImg =
    userImg === './assets/icons/Account-circle.svg'
      ? './assets/icons/Account-circle.svg'
      : userImg;
  const publishPostHtml = PublishPost(publishPostImg);
  publishPostAndPostDiv.appendChild(publishPostHtml);

  /* button publishPost */

  const buttonPublish = publishPostHtml.querySelector('#buttonPublish');
  const inputTextPublish = publishPostHtml.querySelector('#inputTextPublish');
  const inputTextPublishError = publishPostHtml.querySelector(
    '#inputTextPublishError'
  );

  buttonPublish.addEventListener('click', () => {
    const getUserRegister = JSON.parse(localStorage.getItem('userRegister'));
    const userName = getUserRegister.email;
    const img = getUserRegister.photoUrl;
    const textPublish = inputTextPublish.value;
    const userId = JSON.parse(localStorage.getItem('userRegister')).id;

    const isPublishEmpty = validateEmpty(
      textPublish,
      inputTextPublish,
      inputTextPublishError,
      'No se puede publicar el campo vacío.'
    );
    if (!isPublishEmpty === true) {
      addPost(img, userName, textPublish, userId)
        .then(() => {
          inputTextPublish.value = '';
          onNavigate('/feed');
        })
        .catch((error) => {
          throw new Error(error.message, 'error');
        });
    }
  });

  /* ------------------------ Posts ------------------------------ */

  const allPostsHtml = document.createElement('div');
  allPostsHtml.classList.add('postsContainer');
  publishPostAndPostDiv.appendChild(allPostsHtml);

  const posts = [];
  queryPosts()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      const userId = JSON.parse(localStorage.getItem('userRegister')).id;

      // Show all Data in HTML
      posts.forEach((post) => {
        const arrayLikes = post.user_likes;
        const isUserIdInArray = arrayLikes.includes(userId);
        const numberOfLikes = arrayLikes.length;
        let myPostsHtml;

        if (post.user_id === userId) {
          myPostsHtml = MyPostEdit(
            post.user_name,
            post.user_post,
            post.user_img,
            post.id,
            isUserIdInArray,
            numberOfLikes
          );
        } else {
          myPostsHtml = MyPosts(
            post.user_name,
            post.user_post,
            post.user_img,
            post.id,
            isUserIdInArray,
            numberOfLikes
          );
        }
        allPostsHtml.appendChild(myPostsHtml);
      });

      // --------------- Buttons of icon more ---------------
      const postsEditButtons = feedDiv.querySelectorAll('.postEditButtons');

      postsEditButtons.forEach((postEditButtons) => {
        const submenu = postEditButtons.querySelector(
          '.postEditButtons__submenu'
        );
        const buttonIconMore =
          postEditButtons.querySelector('.postEditIconMore');
        buttonIconMore.addEventListener('click', () => {
          if (submenu.classList.contains('hideSubmenu')) {
            submenu.classList.remove('hideSubmenu');
            submenu.classList.add('showSubmenu');
          } else {
            submenu.classList.remove('showSubmenu');
            submenu.classList.add('hideSubmenu');
          }
        });
      });

      // --------------- Delete Post ---------------
      const buttonsDelete = feedDiv.querySelectorAll('.btnDelete');

      buttonsDelete.forEach((button) => {
        button.addEventListener('click', ({ target: { dataset } }) => {
          modalPostDelete.style.display = 'block';
          // add attribute called data-id and its value
          modalPostDelete.setAttribute('data-id', `modalDelete-${dataset.id}`);
        });
      });

      const modalButtosnClose = modalPostDelete.querySelectorAll('.close');
      modalButtosnClose.forEach((button) => {
        button.addEventListener('click', () => {
          modalPostDelete.style.display = 'none';
        });
      });

      const modalButtosnCancel =
        modalPostDelete.querySelectorAll('.close-delete');
      modalButtosnCancel.forEach((button) => {
        button.addEventListener('click', () => {
          modalPostDelete.style.display = 'none';
        });
      });

      const modalButtosnConfirm = modalPostDelete.querySelector('#btn-confirm');

      modalButtosnConfirm.addEventListener('click', () => {
        // get id of the modalDelete
        const allPostId = modalPostDelete.getAttribute('data-id');
        const postId = allPostId.slice(12);
        // Delete post - firebase
        deletePost(postId);
        onNavigate('/feed');
      });

      // --------------- Edit Post ---------------
      const buttonsEdit = feedDiv.querySelectorAll('#btn-edit');

      buttonsEdit.forEach((button) => {
        button.addEventListener('click', ({ target: { dataset } }) => {
          modalPostEdit.style.display = 'block';
          // add text from post on the modal
          modalPostEdit.querySelector('#modal-text').value =
            document.querySelector(`#text-${dataset.id}`).textContent;
          // add attribute called data-id and its value
          modalPostEdit.setAttribute('data-id', `modal-${dataset.id}`);
        });
      });

      // button cancel of Modal
      const cancelButtonModal =
        modalPostEdit.querySelector('#btn-modal-cancel');

      cancelButtonModal.addEventListener('click', () => {
        modalPostEdit.style.display = 'none';
      });

      // --------------- button save of Modal ----------------
      const saveButtonModal = modalPostEdit.querySelector('#btn-modal-save');

      saveButtonModal.addEventListener('click', () => {
        const textPostUpdate = modalPostEdit.querySelector('#modal-text').value;
        const allPostId = modalPostEdit.getAttribute('data-id');
        const postId = allPostId.slice(6);

        // update post-firebase
        updatePost(postId, textPostUpdate);

        // onNavigate
        onNavigate('/feed');

        modalPostEdit.style.display = 'none';
      });

      // --------------- Likes ---------------
      const buttonsLike = feedDiv.querySelectorAll('.containerLike');

      buttonsLike.forEach((button) => {
        const buttonLikeCat = button.querySelector('.likeCat');

        button.addEventListener('click', (event) => {
          const postId = event.target.getAttribute('data-id');
          buttonLikeCat.classList.toggle('colorLikeCat');

          getPost(postId)
            .then((result) => {
              const arrayLikes = result.data().user_likes;
              const isUserIdInArray = arrayLikes.includes(userId);
              if (isUserIdInArray) {
                removeLike(postId, userId);
              } else {
                addLike(postId, userId);
              }
            })
            .catch((error) => {
              throw new Error(error.message, 'error');
            });
          // show current like
          onNavigate('/feed');
        });
      });
    })
    .catch((error) => {
      throw new Error(error.message, 'error');
    });
  return feedDiv;
};
