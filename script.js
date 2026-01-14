document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password-input");

  // 🔧 Prueba: ignora el hash y entra directamente
  loginBtn.addEventListener("click", () => {
    loginScreen.style.display = "none";
    app.style.display = "block";
  });
});
