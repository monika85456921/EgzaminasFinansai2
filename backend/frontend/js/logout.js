const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userRole");
  localStorage.removeItem("userID");
  localStorage.removeItem("userToken");
  window.location.href = "index.html";
});