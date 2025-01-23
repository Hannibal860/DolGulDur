$(function () {
  var mixer = mixitup('.gallery__content-list');

})


$('.hero__background').slick({
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  speed: 100,
  fade: true,
  cssEase: 'linear'
});


let card = document.querySelectorAll('.gallery-card');
let cover = document.querySelectorAll('.gallery-card__cover');

for (let i = 0; i < card.length; i++) {
  card[i].addEventListener('mouseover', covered, false);
  function covered(e) {
    cover[i].classList.add('card-animation');
  }

  card[i].addEventListener('mouseout', notCovered, false);
  function notCovered(e) {
    cover[i].classList.remove('card-animation');
  }
}


(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();


