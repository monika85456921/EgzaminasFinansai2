const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginFormEmailInput").value;
  const password = document.getElementById("loginFormPasswordInput").value;

  try {
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userID", data._id);
      localStorage.setItem("userToken", data.token);

      window.location.href = "dashboard.html";
    } else {
      alert("wrong password or email");
    }
  } catch (error) {
    console.log("Error logging in:", error.message);
  }
});
