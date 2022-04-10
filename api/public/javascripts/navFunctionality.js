function toggleNav() {
  if (document.querySelector("#nav_overlay").classList.contains("show")) {
    document.querySelector("#nav_overlay").classList.remove("show");
    document.querySelector("#nav_overlay").classList.add("hide");
  } else if (
    document.querySelector("#nav_overlay").classList.contains("hide")
  ) {
    document.querySelector("#nav_overlay").classList.remove("hide");
    document.querySelector("#nav_overlay").classList.add("show");
  }
}
