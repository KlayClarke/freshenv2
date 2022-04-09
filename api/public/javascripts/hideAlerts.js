if (document.querySelector(".alert")) {
  const alert = document.querySelector(".alert");
  setTimeout(() => {
    alert.style.opacity = 0;
    alert.style.transition = "display 0s 2s, opacity 3s linear";
  }, 3500);
}
