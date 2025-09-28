const nextButton = document.querySelector('.next-btn');
const video = document.querySelector('.hero-video');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.head-right');
const navLinks = document.querySelectorAll('.head-right a');
const watchButton = document.querySelector('.watch-btn');
const aboutSection = document.querySelector('.about-section');
const infoSection = document.querySelector('.info-section');
const infoCards = document.querySelectorAll('.info-card');
const cardsSection = document.querySelector('.cards-section');
const cards = document.querySelectorAll('.card');
const footer = document.querySelector('footer');
const productsBtn = document.querySelector('.products-btn');
const productsSection = document.querySelector('.products-section');

//Click button to open trailer link
watchButton.addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=AO_bL5hMrwE', '_blank');
});

//Click products button to kuromi tv show page
productsBtn.addEventListener('click', () => {
  window.open(' https://leinad222.github.io/kuromi/', '_blank');
});
// List of videos to cycle through

const movieList = [
  'videos-hero/hero-1.mp4',
  'videos-hero/hero-2.mp4',
  'videos-hero/hero-3.mp4',
  'videos-hero/hero-4.mp4',
];

let index = 0;

// Safari/iOS inline fix
video.setAttribute('playsinline', '');
video.setAttribute('webkit-playsinline', '');

// Cycle videos
nextButton.addEventListener('click', () => {
  index = (index + 1) % movieList.length;
  video.src = movieList[index];
  video.play();
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  toggleMenuIcon();
});

// Auto-close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    toggleMenuIcon(false); // force reset to hamburger
  });
});

// Toggle menu icon (hamburger ↔ X)
function toggleMenuIcon(forceHamburger = null) {
  const icon = menuToggle.querySelector('i');
  if (forceHamburger === false) {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    return;
  }
  if (navMenu.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}
