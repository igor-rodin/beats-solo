$(document).ready (()=> {
  $(team).on('click', event => {
    const memberHeader = event.target.closest('.team-member__header');
    $(memberHeader).toggleClass('team-member__header--active');
    const toggleWrap = $(memberHeader).siblings('.team-member__wrap-content');
    
    let newHeight = 0;
    if (toggleWrap.height() === 0){
      newHeight = toggleWrap.find('.team-member__content').height(); 
    }
    toggleWrap.height(newHeight);

    const activeItem = 
      $(memberHeader)
      .closest('.team__item')
      .siblings('.team__item')
      .find('.team-member__header')
      .filter('.team-member__header--active');

    $(activeItem).removeClass('team-member__header--active');
    $(activeItem).siblings('.team-member__wrap-content').height(0);
  })
})