document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "form.html";
    })
    .catch(() => {
      alert("Email o contraseña incorrectos");
    });
});
