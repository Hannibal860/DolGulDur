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


