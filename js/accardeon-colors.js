$(document).ready (()=> {
  const MEDIUM_SIZE = 768;
  const SMALL_SIZE = 480;

  const colorItemsWidth = $('.colors__item').length  * $('.color-item__header').outerWidth();
  

  $('#colors-list').on('click', event => {
    const activeColorItem = $('.colors__item--active');
    const targetColorItem = event.target.closest('.colors__item');

    $(targetColorItem).toggleClass('colors__item--active');
    

    const wrapText = $(targetColorItem).find('.color-item__toggle-text');

    const newWidth = (wrapText.width() === 0) ? getWrapWidth($(document)) : 0;
    wrapText.width(newWidth);

    if ($(document).width() <= MEDIUM_SIZE) {
      toggleSectionHeader($('.section__title--colors'));
    }
    
    activeColorItem.removeClass('colors__item--active');
    activeColorItem.find('.color-item__toggle-text').width(0);
  })

  getWrapWidth = window => {
    const itemWidth = $('.color-item__header').outerWidth();
    console.log('itemWidth', itemWidth);
    const allItemsWidth = $('.colors__item').length  * itemWidth;
    const headerWidth = $('.section__title--colors').outerWidth();
    
    if (window.width() > MEDIUM_SIZE) {
      return window.width() - allItemsWidth - headerWidth;
    }
    else {
      return window.width() - allItemsWidth;
    }
  }

  toggleSectionHeader = header => {
    const countActiveItems = $('.colors__item--active').length;
    if (countActiveItems > 0) {
      header.css('display', 'none');
    }
    else {
      header.css('display', 'block');
    }
  }
})