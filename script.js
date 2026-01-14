document.addEventListener("DOMContentLoaded", () => {
  // Hash MD5 de "bat2026"
  const PASSWORD_HASH = "abb634e86d43122098486bcea800a3da";

  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password-input");

  // Función para generar hash MD5
  async function md5(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  // Permitir usar "Enter" para enviar
  passwordInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });

  // Acción al pulsar "Entrar"
  loginBtn.addEventListener("click", async () => {
    const hash = await md5(passwordInput.value.trim());
    console.log("Hash introducido:", hash); // ✅ Verifica el hash en consola

    if (hash === PASSWORD_HASH) {
      // ✅ Contraseña correcta: muestra la web
      loginScreen.style.display = "none";
      app.style.display = "block";
    } else {
      // ❌ Contraseña incorrecta
      alert("Contraseña incorrecta.");
      passwordInput.value = "";
    }
  });
});
