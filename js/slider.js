$(document).ready(()=> {
  const slider = $('.owl-carousel');
  slider.owlCarousel({nav: false, items: 1, loop: true});

  $('.products-slider__btn--prev').on('click', ()=> {
    slider.trigger('prev.owl.carousel', [300]);
  })

  $('.products-slider__btn--next').on('click', ()=> {
    slider.trigger('next.owl.carousel', [300]);
  })
})