export const PublishPost = () => {
    const divPublishPost = document.createElement("div");
    const publishPost = `<div class="cointainerPublishPost">
                        <div class="containerUserText">
                            <img class="circleUser"src="./assets/icons/Account circle.svg" alt="logo CatsSociety" />
                            <input type= "text" class="text" placeholder="¿Alguna gatoaventura que contar?"/>
                       </div>
                        <div class="photo-publish">
                            <img class="addPhoto" src="./assets/icons/img.png" alt="add photo" />
                            <label class="textAdd">Agregar imagen</label>
                            <input class="btnPublicar" type="submit" value="Publicar">
                        </div>
                      </div>`;
    const publishing = `<form id:"publishingid" class:"publishing">
                       <input type="text"/></form>`;

    const publish = `<section class="publishing"></section>
                         <div class="pub">
                           ${publishing}
                         </div>
                       </section>`;
                      
divPublishPost.innerHTML=publishPost;

    return divPublishPost;
  };
  