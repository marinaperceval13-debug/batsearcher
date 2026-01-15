document.addEventListener("DOMContentLoaded", () => {
  // 🔐 1. Guardamos el hash de la contraseña (bat2026)
  const PASSWORD_HASH = "abb634e86d43122098486bcea800a3da";

  // 🧱 2. Conectamos con los elementos del HTML
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password-input");

  // 🧮 3. Función para convertir texto en hash MD5
  function md5(s) {
    return CryptoJS.MD5(s).toString();
  }

  // 🖱️ 4. Al hacer clic en el botón "Entrar"...
  loginBtn.addEventListener("click", () => {
    const inputHash = md5(passwordInput.value);

    // ✅ Si coincide → entra
    if (inputHash === PASSWORD_HASH) {
      loginScreen.style.display = "none";
      app.style.display = "block";
    } 
    // ❌ Si no coincide → error
    else {
      alert("Contraseña incorrecta");
      passwordInput.value = "";
    }
  });
});
