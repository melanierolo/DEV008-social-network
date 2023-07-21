export const ModalPostEdit = () => {
  // The Modal
  const myModalPostDiv = document.createElement("div");
  myModalPostDiv.classList.add("modal");
  myModalPostDiv.setAttribute("id", "myModal");
  const modal = `
    <!-- Modal content -->
    <div class="modal-content">
      <input id="modal-text">
      <button id="btn-modal-cancel" class="close">Cancelar</button>
      <button id="btn-modal-save" class="save">Guardar</button>
    </div>`;
  myModalPostDiv.innerHTML = modal;
  return myModalPostDiv;
};
