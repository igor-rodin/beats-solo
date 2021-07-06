$(function(){
  const SMALL_SIZE = 480;
  const MEDIUM_SIZE = 768;
  const DESCKTOP_WIDTH = 524;
  


  const getWrapWidth = (window) => {
    const itemWidth = $('.color-item__toggle').width();
    const allItemsWidth = $('.colors__item').length  * itemWidth;
    
    if (window.width() > MEDIUM_SIZE) {
      return DESCKTOP_WIDTH;
    }
    else {
      return window.width() - allItemsWidth;
    }
  }

  const toggleSectionHeader = header => {
    const countActiveItems = $('.colors__item--active').length;
    if (countActiveItems > 0) {
      header.css('display', 'none');
    }
    else {
      header.css('display', 'block');
    }
  }

  $('#colors-list').on('click', event => {
    
    const activeColorItem = $('.colors__item--active');
    const targetColorItem = event.target.closest('.colors__item');
    const itemWidth = $('.color-item__toggle').width();

    $(targetColorItem).toggleClass('colors__item--active');
    

    const wrapText = $(targetColorItem).find('.color-item__toggle-text');
    const newWidth = (wrapText.width() === 0) ? getWrapWidth($(document)) : 0;
    wrapText.width(newWidth);

    if ($(document).width() <= MEDIUM_SIZE) {
      toggleSectionHeader($('.section__title--colors'));
    }
    
    const innerText = wrapText.find('.color-item__text');
    if ($(document).width() <= SMALL_SIZE) {
      wrapText.addClass('color-item__toggle-text--mobile');
      
      const pL = parseInt(innerText.css('padding-left'));
      const pR = parseInt(innerText.css('padding-right'));
      const textWidth = $(document).width() - itemWidth - pL - pR;
      innerText.width(textWidth);
    }
    activeColorItem.find('.color-item__toggle-text').width(0);
    activeColorItem.find('.color-item__text').width(0);
    activeColorItem.find('.color-item__toggle-text').removeClass('color-item__toggle-text--mobile');
    activeColorItem.removeClass('colors__item--active');
  })
});