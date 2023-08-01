/* eslint-disable comma-dangle */
export const Sidebar = () => {
  const sidebarDiv = document.createElement('div');
  const sidebarContent = `<div class="containerSidebar">
  <ul class="sidebarTopics">
                          <li class="sidebarTopics">
                            <a id="understandCat"><img class="menuIcon" src="./assets/icons/Heart.png" alt="heart-icon" />¿Cómo entender a un gato?</a></li>
                          <li class="sidebarTopics">
                            <a id="memes"><img class="menuIcon" src="./assets/icons/Happy.png" alt="happy-icon"/>Memes</a></li>
                          <li class="sidebarTopics">
                            <a id="tips"><img class="menuIcon" src="./assets/icons/AskQuestion.png" alt="tip-icon" />Tips</a></li>
                          <li class="sidebarTopics">
                            <a id="curiosities"><img class="menuIcon" src="./assets/icons/LightOn.png" alt="curiosities icon" />Curiosidades</a></li>
                          <hr class="menu__line" />
                          <li class="sidebarTopics">
                            <a id="tipDay"><img class="menuIcon" src="./assets/icons/Detective.png" alt="tipDay-icon" />Tip/dato del día</a></li>
                          <li class="sidebarTopics"><a id="vet">
                            <img class="menuIcon" src="./assets/icons/DoctorsBag.png" alt="vet-icon" />Veterinarios</a></li>
                          <li class="sidebarTopics"><a id="help">
                            <img class="menuIcon" src="./assets/icons/Help.png" alt="help-icon" />Ayuda</a></li>
                        </ul>
  </div>`;
  sidebarDiv.innerHTML = sidebarContent;
  return sidebarDiv;
};
