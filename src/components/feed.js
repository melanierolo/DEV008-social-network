import { Header } from "./header.js";
import { PublishPost } from "./publishPost.js";
import { addPost } from "../lib/firebase.js";
import { queryPosts } from "../lib/firebase.js";
import { MyPosts } from "./myPosts.js";

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
    const img = "/dadasda/userPruebita.png";
    const textPublish = inputTextPublish.value;

    console.log("hice click", textPublish);
    addPost(img, likes, userName, textPublish);
    inputTextPublish.value = "";
    onNavigate("/feed");
  });

  let posts = [];
  queryPosts()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      posts.forEach((post) => {
        // Show all Data in HTML
        const myPostsHtml = MyPosts(post.user_name, post.user_post);
        feedDiv.appendChild(myPostsHtml);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return feedDiv;
};
