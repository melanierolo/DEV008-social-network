import { Header } from "./header.js";
import { PublishPost } from "./publishPost.js";
import { addPost } from "../lib/firebase.js";

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
    const userName = "Panchito";
    const likes = 8;
    const img = "/dadasda/userPruebita.png";
    const textPublish = inputTextPublish.value;

    console.log("hice click", textPublish);
    addPost(img, likes, userName, textPublish);
    inputTextPublish.value = "";
  });
  return feedDiv;
};
