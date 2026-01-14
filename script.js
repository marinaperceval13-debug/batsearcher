document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD_HASH = "abb634e86d43122098486bcea800a3da"; // MD5 de 'bat2026'
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password-input");

  // === Función para generar hash MD5 ===
  async function md5(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  // === LOGIN ===
  loginBtn.addEventListener("click", async () => {
    const hash = await md5(passwordInput.value);
    if (hash === PASSWORD_HASH) {
      // Oculta login y muestra app
      loginScreen.style.display = "none";
      app.style.display = "block";
      iniciarApp();
    } else {
      alert("Contraseña incorrecta.");
      passwordInput.value = "";
    }
  });

  // === FUNCIONES PRINCIPALES DE LA APP ===
  function iniciarApp() {
    const links = document.querySelectorAll("nav a");
    const contenido = document.getElementById("contenido");

    async function cargarPagina(pagina) {
      contenido.innerHTML = "<p class='cargando'>Cargando contenido...</p>";
      try {
        const respuesta = await fetch(`content/${pagina}`);
        if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
        const html = await respuesta.text();
        contenido.innerHTML = html;
      } catch (error) {
        console.error("Error al cargar contenido:", error);
        contenido.innerHTML = "<p>Error al cargar el contenido.</p>";
      }
    }

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        cargarPagina(link.dataset.page);
      });
    });

    // Cargar "resumen.html" al inicio
    cargarPagina("resumen.html");
  }
});
