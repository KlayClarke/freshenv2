console.log("js testing");

if (document.querySelector(".alert")) {
  const alert = document.querySelector(".alert");
  console.log("start");
  setTimeout(() => {
    console.log("fin");
    alert.style.display = "none";
  }, 5000);
}
