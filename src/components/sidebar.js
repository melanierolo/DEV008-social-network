import iconHeart from '../assets/icons/Heart.png';
import iconHappy from '../assets/icons/Happy.png';
import iconAskQuestion from '../assets/icons/AskQuestion.png';
import iconLightOn from '../assets/icons/LightOn.png';
import iconDetective from '../assets/icons/Detective.png';
import iconDoctorsBag from '../assets/icons/DoctorsBag.png';
import iconHelp from '../assets/icons/Help.png';

/* eslint-disable comma-dangle */
export const Sidebar = () => {
  const sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('containerSidebar');
  const sidebarContent = `<ul class="sidebarTopics">
                            <li class="sidebarItemTopics">
                              <a id="understandCat"><img class="sidebarIcon" src=${iconHeart} alt="heart-icon" />¿Cómo entender a un gato?</a></li>
                            <li class="sidebarItemTopics">
                              <a id="memes"><img class="sidebarIcon" src=${iconHappy} alt="happy-icon"/>Memes</a></li>
                            <li class="sidebarItemTopics">
                              <a id="tips"><img class="sidebarIcon" src=${iconAskQuestion} alt="tip-icon" />Tips</a></li>
                            <li class="sidebarItemTopics">
                              <a id="curiosities"><img class="sidebarIcon" src=${iconLightOn} alt="curiosities icon" />Curiosidades</a></li>
                            <hr class="sidebar__line" />
                            <li class="sidebarItemTopics">
                              <a id="tipDay"><img class="sidebarIcon" src=${iconDetective} alt="tipDay-icon" />Tip/dato del día</a></li>
                            <li class="sidebarItemTopics"><a id="vet">
                              <img class="sidebarIcon" src=${iconDoctorsBag} alt="vet-icon" />Veterinarios</a></li>
                            <li class="sidebarItemTopics"><a id="help">
                              <img class="sidebarIcon" src=${iconHelp} alt="help-icon" />Ayuda</a></li>
                        </ul>`;
  sidebarDiv.innerHTML = sidebarContent;
  return sidebarDiv;
};
