const dynamicText = document.getElementById('dynamicText');
const messages = ["Quality Painting Services", "Transforming Spaces", "Experienced Craftsmanship"];
let index = 0;

function type() {
    dynamicText.textContent = messages[index];
    index = (index + 1) % messages.length;
}

setInterval(type, 3000);


/*===== MENU SHOW/HIDE =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show');

            // Animate hamburger to X
            toggle.classList.toggle('active-toggle');
        })
    }
}
showMenu('nav-toggle','nav-menu')


/*===== REMOVE MENU ON LINK CLICK =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');

    const toggle = document.getElementById('nav-toggle');
    toggle.classList.remove('active-toggle'); // reset hamburger
}

navLink.forEach(n => n.addEventListener('click', linkAction));


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});


/*===== IMAGE SLIDER =====*/
var currentImg = 0;
var imgs = document.querySelectorAll('.slider img');
let dots = document.querySelectorAll('.dot');
var interval = 3000;

// Second banner
var secondEventTitle = 'Hi! *Freshmen* Orientation Day';

// Third banner
var thirdEventDate = new Date('2023-02-01'); // pull this from database
var thirdEventDateString = thirdEventDate.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
var days = calculateDays(new Date(), thirdEventDate) || 0;
const countdownText = days > 0 ? `${days} days left` : 'Live Now!';

var secondImageUrl = `https://ondemand.bannerbear.com/simpleurl/01YWAxB7nGYdJrKoXM/title/text/${encodeURIComponent(secondEventTitle)}`;
var thirdImageUrl = `https://ondemand.bannerbear.com/simpleurl/ley9O0B2ZGbB4GjRDY/date/text/${encodeURIComponent(
  thirdEventDateString
)}/countdown/text/${encodeURIComponent(countdownText)}`;

document.getElementById('img-2').src = secondImageUrl;
document.getElementById('img-3').src = thirdImageUrl;

var timer = setInterval(changeSlide, interval);

function changeSlide(n) {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].style.opacity = 0;
    dots[i].className = dots[i].className.replace(' active', '');
  }

  currentImg = (currentImg + 1) % imgs.length;

  if (n != undefined) {
    clearInterval(timer);
    timer = setInterval(changeSlide, interval);
    currentImg = n;
  }

  imgs[currentImg].style.opacity = 1;
  dots[currentImg].className += ' active';
}

function calculateDays(today, eventDate) {
    const difference = eventDate.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)); // convert to days
}
