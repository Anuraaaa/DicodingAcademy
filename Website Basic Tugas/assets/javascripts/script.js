let slideIndex = 0;
showSlide(slideIndex);

function nextSlide() {
  showSlide(slideIndex += 1);
}

function prevSlide() {
  showSlide(slideIndex -= 1);
}

function showSlide(index) {
  const slides = document.getElementsByClassName("slide");
  if (index >= slides.length) {slideIndex = 0}
  if (index < 0) {slideIndex = slides.length - 1}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Tambahkan fungsi untuk menggeser slide otomatis setiap 3 detik
let slideInterval = setInterval(nextSlide, 3000);

// Tambahkan event listener untuk menghentikan slider otomatis saat mouse hover pada slider
document.querySelector('.slider-container').addEventListener('mouseover', function() {
  clearInterval(slideInterval);
});

// Tambahkan event listener untuk memulai kembali slider otomatis saat mouse meninggalkan slider
document.querySelector('.slider-container').addEventListener('mouseout', function() {
  slideInterval = setInterval(nextSlide, 3000);
});
