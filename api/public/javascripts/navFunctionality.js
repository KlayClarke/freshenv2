function toggleNav() {
  if (document.querySelector("#nav_overlay").classList.contains("show")) {
    document.querySelector("#nav_overlay").classList.remove("show");
    document.querySelector("#nav_overlay").classList.add("hide");
    document.querySelector("#screen_overlay").classList.remove("show");
    document.querySelector("#screen_overlay").classList.add("hide");
  } else if (
    document.querySelector("#nav_overlay").classList.contains("hide")
  ) {
    document.querySelector("#nav_overlay").classList.remove("hide");
    document.querySelector("#nav_overlay").classList.add("show");
    document.querySelector("#screen_overlay").classList.remove("hide");
    document.querySelector("#screen_overlay").classList.add("show");
  }
}

document.addEventListener("click", function (event) {
  if (document.querySelector("#nav_overlay").classList.contains("show")) {
    if (
      event.target !== document.querySelector("nav") &&
      event.target !== document.querySelector("#nav_overlay") &&
      event.target !== document.querySelector("#nav_toggle i")
    ) {
      toggleNav();
    }
  }
});
