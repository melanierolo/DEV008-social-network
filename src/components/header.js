/* eslint-disable operator-linebreak */
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import iconLogo from '../assets/images/catsSociety--logo.png';
import iconAccount from '../assets/icons/account-icon.svg';

import iconUser from '../assets/icons/userIcon.png';
import iconCat from '../assets/icons/postCat.png';
import iconGear from '../assets/icons/blueGear.png';

import iconHeart from '../assets/icons/Heart.png';
import iconHappy from '../assets/icons/Happy.png';
import iconQuestion from '../assets/icons/AskQuestion.png';
import iconLightOn from '../assets/icons/LightOn.png';

import iconDetective from '../assets/icons/Detective.png';
import iconDoctorsBag from '../assets/icons/DoctorsBag.png';
import iconHelp from '../assets/icons/Help.png';

import iconHamnurguer from '../assets/icons/hamburger-icon.svg';
import iconClose from '../assets/icons/close-icon.png';

export function Header(onNavigate, data) {
  const profileImg =
    data.photoUrl === './assets/icons/Account-circle.svg'
      ? `${iconAccount}`
      : data.photoUrl;
  const menuImg =
    data.photoUrl === './assets/icons/Account-circle.svg'
      ? `${iconUser}`
      : data.photoUrl;
  const username = typeof data.name === 'string' ? data.name : 'Hola, usuario';

  // Template String
  const logoHeader = `
                      <img class="logoHeader__img" src=${iconLogo} alt="logo">`;
  const menuProfile = `<ul class="menuProfile">
                        <li class="menuItemProfile">
                          <img class="menuProfile__img" src=${menuImg} alt="userIcon">
                        </li>
                        <li class="menuItemProfile">${username}</li>
                        <li class="menuItemProfile">@username</li>
                        <hr class="menu__line" />
                        <li class="menuItemProfile">
                          <a id="myPosts">
                            <img class="menuIconProfile" src=${iconUser} alt="userIcon">Mis publicaciones
                          </a>
                        </li>
                        <li class="menuItemProfile">
                          <a id="feeds">
                            <img class="menuIconProfile" src=${iconCat} alt="postCat">Feeds
                          </a>
                        </li>
                        <li class="menuItemProfile">
                          <a id="configuration"> 
                            <img class="menuIconProfile" src=${iconGear} alt="gearIcon">Configuración
                          </a>
                        </li>
                        <hr class="menu__line" />
                        <li class="menuItemProfile">
                          <a id="logOut">Cerrar Sesión</a>
                        </li>
                      </ul>
                      <button class="hamburger">
                        <img class="profileIcon" src=${profileImg}>
                        <img class="closeIcon" src=${iconClose}>
                      </button>`;
  const menuTopics = `<ul class="menuTopics">
                          <li class="menuItemTopics">
                            <a id="understandCat"><img class="menuIcon" src=${iconHeart} alt="heart-icon">¿Cómo entender a un gato?</a></li>
                          <li class="menuItemTopics">
                            <a id="memes"><img class="menuIcon" src=${iconHappy} alt="happy-icon">Memes</a></li>
                          <li class="menuItemTopics">
                            <a id="tips"><img class="menuIcon" src=${iconQuestion} alt="tip-icon">Tips</a></li>
                          <li class="menuItemTopics">
                            <a id="curiosities"><img class="menuIcon" src=${iconLightOn} alt="curiosities icon">Curiosidades</a></li>
                          <hr class="menu__line" />
                          <li class="menuItemTopics">
                            <a id="tipDay">
                              <img class="menuIcon" src=${iconDetective} alt="tipDay-icon">Tip/dato del día
                            </a>
                          </li>
                          <li class="menuItemTopics">
                            <a id="vet">
                              <img class="menuIcon" src=${iconDoctorsBag} alt="vet-icon">Veterinarios
                            </a>
                          </li>
                          <li class="menuItemTopics">
                            <a id="help">
                              <img class="menuIcon" src=${iconHelp} alt="help-icon">Ayuda
                            </a>
                          </li>
                        </ul>
                        <button class="hamburgerTopic">
                                <img class="profileIconTopic" src=${iconHamnurguer}>
                                <img class="closeIconTopic" src=${iconClose}>
                        </button>`;

  const headerTemplate = `<nav class="header__menuTopics">${menuTopics}</nav>
                          <div class="header__logoHeader">${logoHeader}</div>
                          <nav class="header__menuProfile">${menuProfile}</nav>`;

  // DOM
  const headerHtml = document.createElement('div');
  headerHtml.classList.add('header');
  headerHtml.innerHTML = headerTemplate;

  // const myPosts = headerHtml.querySelector('#myPosts');
  const feeds = headerHtml.querySelector('#feeds');
  const logOut = headerHtml.querySelector('#logOut');

  /* myPosts.addEventListener('click', () => {
    onNavigate('/myPosts');
  }); */

  feeds.addEventListener('click', () => {
    onNavigate('/feed');
  });
  logOut.addEventListener('click', async () => {
    await signOut(auth);
    onNavigate('/');
  });

  // Menu CSS - Profile

  const menuItemsProfile = headerHtml.querySelectorAll('.menuItemProfile');
  const hamburgerButton = headerHtml.querySelector('.hamburger');
  const menuProfileHtml = headerHtml.querySelector('.menuProfile');
  const closeIcon = headerHtml.querySelector('.closeIcon');

  hamburgerButton.addEventListener('click', () => {
    if (menuProfileHtml.classList.contains('showMenu')) {
      menuProfileHtml.classList.remove('showMenu');
      closeIcon.style.display = 'none';
    } else {
      menuProfileHtml.classList.add('showMenu');
      closeIcon.style.display = 'block';
    }
  });

  menuItemsProfile.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {});
  });

  // Menu CSS - Topics
  const menuItemsTopics = headerHtml.querySelectorAll('.menuItemTopics');
  const hamburgerButtonTopic = headerHtml.querySelector('.hamburgerTopic');
  const menuTopicsHtml = headerHtml.querySelector('.menuTopics');
  const closeIconTopic = headerHtml.querySelector('.closeIconTopic');

  hamburgerButtonTopic.addEventListener('click', () => {
    if (menuTopicsHtml.classList.contains('showMenuTopic')) {
      menuTopicsHtml.classList.remove('showMenuTopic');
      closeIconTopic.style.display = 'none';
    } else {
      menuTopicsHtml.classList.add('showMenuTopic');
      closeIconTopic.style.display = 'block';
    }
  });

  menuItemsTopics.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {});
  });

  return headerHtml;
}
