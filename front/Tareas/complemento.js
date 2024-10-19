import { getallTemas, getUsuario } from "../importante/metodos.js";
async function mostrarTemas() {
  const cardContainer = document.getElementById("card-container");
  const tareas = await getallTemas();
  if (!tareas) return;

  tareas.forEach((tema) => {
    console.log(tema);
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                      <h2>${tema.titulo} </h2><br>
                      
                      <p><strong>descripcion:</strong> ${tema.descripcion}</p><br>
                      <p><strong>creador:</strong> ${tema.creador}días</p><br>
                     
                      <button class="btnSee" data-id="${tema.id_tema}" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5c-2.485 0-4.5-2.015-4.5-4.5S5.515 3.5 8 3.5 12.5 5.515 12.5 8 10.485 12.5 8 12.5z"/><path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                      </svg></button>
                  `;
    cardContainer.appendChild(card);
  });

  const buttonSee = document.querySelectorAll(".btnSee");
  buttonSee.forEach((button) => {
    button.addEventListener("click", function () {
      const id_tema = this.getAttribute("data-id");
      seeTarea(id_tema);
    });
  });
}

async function seeTarea(id) {
  window.location.href = `./../tarea/ver/index.html?id=${id}`;
}

//salir
document.getElementById("btnSalir").addEventListener("click", () => {
  // Eliminar el token de localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");

  // Redirigir al usuario a la página de inicio o login
  window.location.href = "./usuario/login";
});

async function getUsuarioInfo(idUsuario) {
  try {
    const usuario = await getUsuario(idUsuario);

    if (usuario) {
      console.log("tarea obtenida:", usuario);
      document.getElementById("nombre").innerText = usuario.username;
      document.getElementById("email").innerText = usuario.email;

      console.log("El usuario se ha cargado correctamente:", usuario);
    } else {
      console.error("Error al obtener los datos del usuario");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    alert("Error al obtener los datos del usuario");
  }
}
window.addEventListener("load", () => {
  const usuarioData = localStorage.getItem("usuario");
  console.log(usuarioData);
  const usuario = JSON.parse(usuarioData);
  const id_usuario = usuario.id_usuario;
  mostrarTemas();
  getUsuarioInfo(id_usuario);
});
