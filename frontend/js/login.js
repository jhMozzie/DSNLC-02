// Lógica de inicio de sesión con Axios
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    axios
      .post("http://localhost:3000/api/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // Login exitoso, redirigir a la página list.html
        window.location.href = "list.html"; // Redirigir a list.html
      })
      .catch((error) => {
        // Mostrar mensaje de error si el login falla
        const loginError = document.getElementById("loginError");
        loginError.textContent = error.response.data.error;
        loginError.style.display = "block";
      });
  });
