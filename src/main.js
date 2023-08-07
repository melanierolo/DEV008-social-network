// Este es el punto de entrada de tu aplicacion

import { Login } from './components/login.js';
import { Register } from './components/register.js';
import { Feed } from './components/feed.js';
import { MyPosts } from './components/myPosts.js';
import { PublishPost } from './components/publishPost.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Login,
  '/register': Register,
  '/feed': Feed,
  '/myPosts': MyPosts,
  '/publishPost': PublishPost,
};

// Navegando por las rutas
export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname](onNavigate));
};

const component = routes[window.location.pathname];
// history
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(component(onNavigate));
};

rootDiv.appendChild(component(onNavigate));
