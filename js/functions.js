
// navigation
document.addEventListener("DOMContentLoaded", function () {
  var navItems = document.querySelectorAll("nav ul li a");

  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      navItems.forEach(function (navItem) {
        navItem.parentElement.classList.remove("active");
      });
      item.parentElement.classList.add("active");
    });
  });
});
// youtube-player
document.addEventListener('DOMContentLoaded', function () {
  var YTPlayerOverlay = document.querySelector(".youtube-player-overlay");
  var YTLinks = document.querySelectorAll(".show-video");
  var YTPlayerPupup = document.querySelector(".my-project-video iframe");

  YTLinks.forEach((link) => {
    link.addEventListener("click", () => {
      YTPlayerOverlay.classList.add("active2");
      let videoLink = `https://www.youtube.com/embed/${link.dataset.link}`;
      YTPlayerPupup.src = videoLink;
    });
  });

  YTPlayerOverlay.addEventListener("click", () => {
    YTPlayerOverlay.classList.remove("active2");
    YTPlayerPupup.src = "";
  });
});
// scroll to top buton
document.addEventListener('DOMContentLoaded', function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  scrollToTopBtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

});
// =========Specialized_skills=========
document.addEventListener('DOMContentLoaded', function () {
  fetch('./data/specialized_skills.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('data-specialized-skills');
      const template = document.getElementById('data-template');

      data.forEach(item => {
        const clone = document.importNode(template.content, true);

        // Set background image
        clone.querySelector('.background-image img').src = `images/${item.image}`;
        // Set name
        clone.querySelector('.topic-name').textContent = item.name;


        container.appendChild(clone);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
// certificate
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("myModal");
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  }
});
