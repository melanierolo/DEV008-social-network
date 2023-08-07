export const ModalPostEdit = () => {
  // The Modal
  const myModalPostDiv = document.createElement('div');
  myModalPostDiv.classList.add('modal');
  myModalPostDiv.setAttribute('id', 'myModal');
  const modal = `
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <h3>Editar publicación</h3>
        <button id="btn-modal-cancel" class="close">X</button>
      </div>
      <div class="modal-body"> 
        <textarea class="modal-body-input" id="modal-text"> </textarea>
      </div>
      <div class="modal-buttons">
        <div class="modal-buttons-icon"> 
          <img class="modal-img" src="./assets/icons/img.png" alt="add photo">
          <p>Agregar imagen</p>
        </div> 
        <button id="btn-modal-save" class="btn btn--primary btn-save">Guardar</button>
      </div>
    </div>`;
  myModalPostDiv.innerHTML = modal;
  return myModalPostDiv;
};
