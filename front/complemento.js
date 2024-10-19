const usuarioData = localStorage.getItem("usuario");
if (usuarioData) {
  const usuario = JSON.parse(usuarioData);
  const isAdmin = usuario.is_admin;
  if (isAdmin) {
    window.location.href = `./Tareas/index.html`;
  } else {
    window.location.href = `./misTareas/index.html`;
  }
}
if (!localStorage.getItem("token")) {
  window.location.href = `./login/index.html`;
}
