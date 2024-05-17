// Get all image elements with the specified class name
const images = document.getElementsByClassName("team-member");

// Loop through the image elements
for (let i = 0; i < images.length; i++) {
  const image = images[i];

  // Adding event listeners for mouseover and mouseout events

  image.addEventListener("mouseover", function () {
    // Expand the image by scale 1.1 when mouseover
    image.style.transform = "scale(1.1)";
  });

  image.addEventListener("mouseout", function () {
    // Set the image back to its normal size when mouseout
    image.style.transform = "scale(1)";
  });
}
