if (document.querySelector(".alert")) {
  const alert = document.querySelector(".alert");
  setTimeout(() => {
    alert.style.opacity = 0;
    alert.style.transition = "display 0s 1s, opacity 1.5s linear";
    setTimeout(() => {
      alert.style.display = "none";
    }, 1500);
  }, 2000);
}
