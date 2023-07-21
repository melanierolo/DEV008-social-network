import { Header } from "./header.js";
import { PublishPost } from "./publishPost.js";
import { addPost } from "../lib/firebase.js";
import { queryPosts } from "../lib/firebase.js";
import { MyPosts } from "./myPosts.js";
import { MyPostEdit } from "./myPostEdit.js";
import { deletePost } from "../lib/firebase.js";

export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement("div");
  feedDiv.classList.add("FeedContainer");

  // Childs
  const headerHtml = Header(onNavigate);
  const publishPostHtml = PublishPost();

  feedDiv.appendChild(headerHtml);
  feedDiv.appendChild(publishPostHtml);

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

      // Delete Post
      const buttonsDelete = feedDiv.querySelectorAll("#btn-delete");

      buttonsDelete.forEach((button) => {
        button.addEventListener("click", ({ target: { dataset } }) => {
          deletePost(dataset.id);
          onNavigate("/feed");
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return feedDiv;
};
