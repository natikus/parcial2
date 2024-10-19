import { login } from "./../importante/metodos.js";

// Asignar el evento al botón de login
document
  .getElementById("btnLogin")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    console.log(localStorage);
    localStorage.clear();
    const username = document.getElementById("username").value;
    const contraseña = document.getElementById("contraseña").value;

    try {
      const { token, usuario } = await login(username, contraseña);
      // Guardar en localStorage
      console.log(token, usuario);
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      // Redirigir al usuario
      window.location.href = "../../index.html";
    } catch (error) {
      console.error("Error durante el login:", error);
      alert("Error al iniciar sesión. Verifique sus credenciales.");
    }
  });
const usuarioData = localStorage.getItem("usuario");
if (usuarioData) {
  const usuario = JSON.parse(usuarioData);
  const isAdmin = usuario.is_admin;
  if (isAdmin) {
    window.location.href = `./../Tareas/index.html`;
  } else {
    window.location.href = `./../misTareas/index.html`;
  }
}
