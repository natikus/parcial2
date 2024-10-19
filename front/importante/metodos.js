export async function login(username, contraseña) {
  console.log("intantando hacer login");
  try {
    const response = await fetch("http://localhost/back/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, contraseña }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Datos del login:", data);
      // Guardar el token JWT en el almacenamiento local o en cookies
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", data.usuario);
      alert("Login exitoso");
      return {
        token: data.token,
        usuario: data.usuario,
      };
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Error en el login");
    }
  } catch (error) {
    console.error("Error al intentar hacer login:", error);
    alert("Error al intentar hacer login");
  }
}

export async function getallTemas() {
  try {
    const response = await fetch(`http://localhost/back/temas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Error al obtener la tarea");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getYourTemas(id_usuario) {
  try {
    const response = await fetch(
      `http://localhost/back/usuarios/${id_usuario}/temas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error al obtener la tarea");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getUsuario(id_usuario) {
  try {
    const response = await fetch(
      `http://localhost/back/usuarios/${id_usuario}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("Error al obtener la tarea");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
