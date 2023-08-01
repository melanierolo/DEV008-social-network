/* eslint-disable comma-dangle */
export const Sidebar = () => {
  const sidebarDiv = document.createElement('div');
  sidebarDiv.classList.add('containerSidebar');
  const sidebarContent = `<ul class="sidebarTopics">
                            <li class="sidebarItemTopics">
                              <a id="understandCat"><img class="sidebarIcon" src="./assets/icons/Heart.png" alt="heart-icon" />¿Cómo entender a un gato?</a></li>
                            <li class="sidebarItemTopics">
                              <a id="memes"><img class="sidebarIcon" src="./assets/icons/Happy.png" alt="happy-icon"/>Memes</a></li>
                            <li class="sidebarItemTopics">
                              <a id="tips"><img class="sidebarIcon" src="./assets/icons/AskQuestion.png" alt="tip-icon" />Tips</a></li>
                            <li class="sidebarItemTopics">
                              <a id="curiosities"><img class="sidebarIcon" src="./assets/icons/LightOn.png" alt="curiosities icon" />Curiosidades</a></li>
                            <hr class="sidebar__line" />
                            <li class="sidebarItemTopics">
                              <a id="tipDay"><img class="sidebarIcon" src="./assets/icons/Detective.png" alt="tipDay-icon" />Tip/dato del día</a></li>
                            <li class="sidebarItemTopics"><a id="vet">
                              <img class="sidebarIcon" src="./assets/icons/DoctorsBag.png" alt="vet-icon" />Veterinarios</a></li>
                            <li class="sidebarItemTopics"><a id="help">
                              <img class="sidebarIcon" src="./assets/icons/Help.png" alt="help-icon" />Ayuda</a></li>
                        </ul>`;
  sidebarDiv.innerHTML = sidebarContent;
  return sidebarDiv;
};
