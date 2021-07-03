$(function(){
  const picker = $('.reviews__picker');
  $(picker).on('click', event => {
      event.preventDefault();
      if (event.target === picker[0]) {
        return;
      }

      const activeAvatar = $('.reviews__picker--active');
      $(activeAvatar).removeClass('reviews__picker--active');

      const currentCard = $('.reviews__card--active');
      
      const pickedAvatar  = event.target.closest('.avatar-picker');
      $(pickedAvatar).addClass('reviews__picker--active');

      const newCardId =  parseInt($(pickedAvatar).attr('data-slide-id'));
      const nextCard = $('.reviews__card').eq(newCardId - 1);
     
      $(currentCard).removeClass('reviews__card--active');
      $(nextCard).addClass('reviews__card--active'); 
  })
});

