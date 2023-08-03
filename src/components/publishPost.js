/* eslint-disable operator-linebreak */
export const PublishPost = (userImg) => {
  const divPublishPost = document.createElement('div');
  divPublishPost.classList.add('cointainerPublishPost');
  const publishPost = `
                        <div class="containerUserText">
                            <img class="circleUser" src=${userImg} alt="logo CatsSociety" />
                            <div class="containerInput">
                              <input id="inputTextPublish" type= "text" class="inputText" placeholder="¿Alguna gatoaventura que contar?"/>
                              <div id="inputTextPublishError" class="error-container"></div>
                            </div>
                            </div>
                        <div class="photo-publish">
                            <img class="addPhoto" src="./assets/icons/img.png" alt="add photo" />
                            <label class="textAdd">Agregar imagen</label>
                            <input id="buttonPublish" class="btnPublicar" type="submit" value="Publicar">
                        </div>`;

  divPublishPost.innerHTML = publishPost;

  return divPublishPost;
};
