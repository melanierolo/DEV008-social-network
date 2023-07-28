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

export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement('div');
  feedDiv.classList.add('FeedContainer');

  // Childs
  const headerHtml = Header(onNavigate);
  const publishPostHtml = PublishPost();
  const modalPostEdit = ModalPostEdit();
  const modalPostDelete = ModalDelete();

  feedDiv.appendChild(headerHtml);
  feedDiv.appendChild(publishPostHtml);
  feedDiv.appendChild(modalPostEdit);
  feedDiv.appendChild(modalPostDelete);

  const buttonPublish = publishPostHtml.querySelector('#buttonPublish');
  const inputTextPublish = publishPostHtml.querySelector('#inputTextPublish');

  buttonPublish.addEventListener('click', () => {
    const getUserRegister = JSON.parse(localStorage.getItem('userRegister'));
    const userName = getUserRegister.email;
    const img = getUserRegister.photoUrl;
    const textPublish = inputTextPublish.value;
    const userId = JSON.parse(localStorage.getItem('userRegister')).id;

    addPost(img, userName, textPublish, userId)
      .then(() => {
        inputTextPublish.value = '';
        onNavigate('/feed');
      })
      .catch((error) => console.log(error));
  });

  const allPostsHtml = document.createElement('div');
  allPostsHtml.classList.add('postsContainer');
  feedDiv.appendChild(allPostsHtml);

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
        console.log('se hizo click :)');
        // get id of the modalDelete
        const allPostId = modalPostDelete.getAttribute('data-id');
        const postId = allPostId.slice(12);
        console.log('-----', postId);
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
            .catch((error) => console.log(error));
          // show current like
          onNavigate('/feed');
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return feedDiv;
};
