let currentImage = 0;

// Get all gallery images
function getVisibleImages() {
    return Array.from(
        document.querySelectorAll(".gallery-item:not([style*='display: none']) img")
    );
}

// Open Lightbox
function openLightbox(image) {

    const images = getVisibleImages();

    currentImage = images.indexOf(image);

    document.getElementById("lightbox").style.display = "flex";

    document.getElementById("lightbox-img").src = image.src;
}

// Close Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Next / Previous
function changeImage(direction) {

    const images = getVisibleImages();

    if (images.length === 0) return;

    currentImage += direction;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    document.getElementById("lightbox-img").src =
        images[currentImage].src;
}

// Category Filter
function filterImages(category) {

    const items = document.querySelectorAll(".gallery-item");

    items.forEach(item => {

        if (
            category === "all" ||
            item.classList.contains(category)
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });

    closeLightbox();
}

// Close lightbox by clicking outside image
document.getElementById("lightbox").addEventListener("click", function(event) {

    if (event.target === this) {
        closeLightbox();
    }

});

// Keyboard navigation
document.addEventListener("keydown", function(event) {

    const lightbox = document.getElementById("lightbox");

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            changeImage(1);
        }

        if (event.key === "ArrowLeft") {
            changeImage(-1);
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

    }

});