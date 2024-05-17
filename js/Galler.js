
function extendedImg(pic, description) {
    var fullImgBox = document.getElementById("fullImgBox");
    var imgDescription = document.getElementById("imgDescription");
    var fullImg = document.getElementById("fullImg");
    
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
    fullImg.alt = "Full-size image";
    fullImg.title = "Click to close";
    imgDescription.innerText = description;
}

document.getElementById("fontSelect").addEventListener("change", function() {
    var imgDescription = document.getElementById("imgDescription");
    imgDescription.style.fontFamily = this.value;
});

document.getElementById("bgColorSelect").addEventListener("change", function() {
    var fullImgBox = document.getElementById("fullImgBox");
    fullImgBox.style.background = this.value;
});

function closeFullImg() {
    var fullImgBox = document.getElementById("fullImgBox");
    fullImgBox.style.display = "none";    
}

