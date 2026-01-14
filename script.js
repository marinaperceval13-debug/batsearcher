document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD_HASH = "abb634e86d43122098486bcea800a3da"; // MD5 de 'bat2026'
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");
  const loginBtn = document.getElementById("login-btn");
  const passwordInput = document.getElementById("password-input");

  async function md5(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  loginBtn.addEventListener("click", async () => {
    const hash = await md5(passwordInput.value);
    if (hash === PASSWORD_HASH) {
      loginScreen.style.display = "none";
      app.style.display = "block";
    } else {
      alert("Contraseña incorrecta.");
      passwordInput.value = "";
    }
  });
});

