$(document).ready(()=> {
  console.log('slider owl');
  const slider = $('.owl-carousel');
  console.log(slider);
  slider.owlCarousel({nav: false, items: 1, loop: true});

  $('.products-slider__btn--prev').on('click', ()=> {
    console.log('prev owl');
    slider.trigger('prev.owl.carousel', [300]);
  })

  $('.products-slider__btn--next').on('click', ()=> {
    console.log('next owl');
    slider.trigger('next.owl.carousel', [300]);
  })
})