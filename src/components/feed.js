import { Header } from "./header.js";
import { PublishPost } from "./publishPost.js";
import { addPost } from "../lib/firebase.js";
import { queryPosts } from "../lib/firebase.js";
import { MyPosts } from "./myPosts.js";
import { MyPostEdit } from "./myPostEdit.js";
import { deletePost } from "../lib/firebase.js";
import { ModalPostEdit } from "./modalPostEdit.js";
import { updatePost } from "../lib/firebase.js";
import { ModalDelete } from "./modalDelete.js";

export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement("div");
  feedDiv.classList.add("FeedContainer");

  // Childs
  const headerHtml = Header(onNavigate);
  const publishPostHtml = PublishPost();
  const modalPostEdit = ModalPostEdit();
  const modalPostDelete = ModalDelete();

  feedDiv.appendChild(headerHtml);
  feedDiv.appendChild(publishPostHtml);
  feedDiv.appendChild(modalPostEdit);
  feedDiv.appendChild(modalPostDelete);

  const buttonPublish = publishPostHtml.querySelector("#buttonPublish");
  const inputTextPublish = publishPostHtml.querySelector("#inputTextPublish");

  buttonPublish.addEventListener("click", () => {
    const getUserRegister = JSON.parse(localStorage.getItem("userRegister"));
    console.log("sin json.parse", localStorage.getItem("userRegister"));
    console.log(
      "con json.parse",
      JSON.parse(localStorage.getItem("userRegister"))
    );
    const userName = getUserRegister.email;
    const likes = 8;
    const img = getUserRegister.photoUrl;
    const textPublish = inputTextPublish.value;
    const userId = JSON.parse(localStorage.getItem("userRegister")).id;

    console.log("hice click", textPublish);
    addPost(img, likes, userName, textPublish, userId)
      .then((result) => {
        inputTextPublish.value = "";
        onNavigate("/feed");
      })
      .catch((error) => console.log(error));
  });

  const allPostsHtml = document.createElement("div");
  allPostsHtml.classList.add("postsContainer");
  feedDiv.appendChild(allPostsHtml);

  let posts = [];
  queryPosts()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      const userId = JSON.parse(localStorage.getItem("userRegister")).id;

      // Show all Data in HTML
      posts.forEach((post) => {
        let myPostsHtml;
        if (post.user_id === userId) {
          myPostsHtml = MyPostEdit(
            post.user_name,
            post.user_post,
            post.user_img,
            post.id
          );
        } else {
          myPostsHtml = MyPosts(post.user_name, post.user_post, post.user_img);
        }
        allPostsHtml.appendChild(myPostsHtml);
      });

      // --------------- Delete Post ---------------
      const buttonsDelete = feedDiv.querySelectorAll(".btnDelete");

      buttonsDelete.forEach((button) => {
        button.addEventListener("click", ({ target: { dataset } }) => {
          modalPostDelete.style.display = "block"; 
          // add attribute called data-id and its value
          modalPostDelete.setAttribute("data-id", `modalDelete-${dataset.id}`);
        });
      });

      const modalButtosnCancel = modalPostDelete.querySelectorAll(".close");
      modalButtosnCancel.forEach((button) => {
        button.addEventListener("click", ({ target: { dataset } }) => {
          console.log("click edit", dataset.id);
          modalPostDelete.style.display = "none";
        });
      });

      const modalButtosnConfirm = modalPostDelete.querySelector("#btn-confirm");
      console.log("----", modalButtosnConfirm);
      modalButtosnConfirm.addEventListener("click", () => {
        console.log ("se hizo click :)");
        // get id of the modalDelete
        const allPostId = modalPostDelete.getAttribute("data-id");
        const postId = allPostId.slice(12);
        console.log("-----",postId);
      // Delete post - firebase
         deletePost(postId);
        onNavigate("/feed");
      });

      // --------------- Delete  ---------------
      /* const buttonsPostDelete = feedDiv.querySelectorAll(".btnDelete");

      buttonsPostDelete.forEach((button) => {
        button.addEventListener("click", ({ target: { dataset } }) => {
          console.log("click edit", dataset.id);
          // add text from post on the modal
          modalPostDelete.querySelector("#modal-text").value =
            document.querySelector(`#text-${dataset.id}`).textContent;
          modalPostDelete.setAttribute("data-id", `modal-${dataset.id}`);
        });
      }); */

      // --------------- Edit Post ---------------
      const buttonsEdit = feedDiv.querySelectorAll("#btn-edit");

      buttonsEdit.forEach((button) => {
        button.addEventListener("click", ({ target: { dataset } }) => {
          console.log("click edit", dataset.id);
          modalPostEdit.style.display = "block";
          // add text from post on the modal
          modalPostEdit.querySelector("#modal-text").value =
            document.querySelector(`#text-${dataset.id}`).textContent;
             // add attribute called data-id and its value
          modalPostEdit.setAttribute("data-id", `modal-${dataset.id}`);
        });
      });

      // button cancel of Modal
      const cancelButtonModal =
        modalPostEdit.querySelector("#btn-modal-cancel");

      cancelButtonModal.addEventListener("click", () => {
        console.log("click en close");
        modalPostEdit.style.display = "none";
      });

      // --------------- button save of Modal ----------------
      const saveButtonModal = modalPostEdit.querySelector("#btn-modal-save");

      saveButtonModal.addEventListener("click", () => {
        const textPostUpdate = modalPostEdit.querySelector("#modal-text").value;
        const allPostId = modalPostEdit.getAttribute("data-id");
        const postId = allPostId.slice(6);

        // update post-firebase
        updatePost(postId, textPostUpdate);

        // onNavigate
        onNavigate("/feed");

        modalPostEdit.style.display = "none";
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return feedDiv;
};
