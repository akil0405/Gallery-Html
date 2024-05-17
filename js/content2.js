// get the button through id
const scrollToTop = document.getElementById("scrollToTop");

// Show or hide the button based on scroll position of the window
window.onscroll = function () {
  if (window.scrollY > 30) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
};

// Scroll to the top of the document when the button is clicked
scrollToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
