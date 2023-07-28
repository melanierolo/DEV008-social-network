export const ModalDelete = () => {
  // The Modal
  const myModalDeleteDiv = document.createElement('div');
  myModalDeleteDiv.classList.add('modal');
  myModalDeleteDiv.setAttribute('id', 'myModal');
  const modal = `
      <!-- Modal content -->
      <div class="modal-content-delete">
        <div class="modal-delete-header">
            <button id="btn-modal-cancel" class="close">X</button>
        </div>
        <div class="modal-delete-body"> 
          <p class="modal-text-delete" id="modal-text-delete">¿Estas seguró de eliminar tu publicación?</p>
        </div>
        <div class="modal-buttons">
          <button id="btn-modal-cancel" class="close-delete">Cancelar</button>
          <button id="btn-confirm" class="btn btn--primary btn-save">Confirmar</button>
        </div>
      </div>`;
  myModalDeleteDiv.innerHTML = modal;
  return myModalDeleteDiv;
};
