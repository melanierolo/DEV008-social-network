import { Header } from "./header.js";
import { PublishPost } from "./publishPost.js";
import { addPost } from "../lib/firebase.js";
import { queryPosts } from "../lib/firebase.js";
import { MyPosts } from "./myPosts.js";
import { MyPostEdit } from "./myPostEdit.js";

export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement("div");

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
    console.log ("img",img)
    const textPublish = inputTextPublish.value;
    const userId = JSON.parse(localStorage.getItem("userRegister")).id;

    console.log("hice click", textPublish);
    addPost(img, likes, userName, textPublish, userId)
      .then((result) => {
        console.log("result *****************", result);
        inputTextPublish.value = "";
        onNavigate("/feed");
      })
      .catch((error) => console.log(error));
  });

  let posts = [];
  queryPosts()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      const userId = JSON.parse(localStorage.getItem("userRegister")).id;
      posts.forEach((post) => {
        console.log("post",post)
        // Show all Data in HTML
      
        let myPostsHtml;
        if (post.user_id === userId) {
          myPostsHtml = MyPostEdit(post.user_name, post.user_post, post.user_img);
        } else {
          myPostsHtml = MyPosts(post.user_name, post.user_post, post.user_img);
        }
        feedDiv.appendChild(myPostsHtml);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return feedDiv;
};
