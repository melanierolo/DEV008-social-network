import { Header } from "./header.js";

export const Feed = (onNavigate) => {
  // Parent
  const feedDiv = document.createElement("div");

  // Childs
  const headerHtml = Header(onNavigate);
  const contentFeed = document.createElement("div");
  contentFeed.textContent = "Bienvenido al Feed";

  feedDiv.appendChild(headerHtml);
  feedDiv.appendChild(contentFeed);

  return feedDiv;
};
