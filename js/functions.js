// Get the modal
var modal = document.getElementById("myModal");
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
// navigation
document.addEventListener("DOMContentLoaded", function() {
  var navItems = document.querySelectorAll("nav ul li a");

  navItems.forEach(function(item) {
      item.addEventListener("click", function(e) {
          navItems.forEach(function(navItem) {
              navItem.parentElement.classList.remove("active");
          });
          item.parentElement.classList.add("active");
      });
  });
});
