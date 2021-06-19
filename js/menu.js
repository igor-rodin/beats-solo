(function(){
  const popupMenu = document.querySelector('#popupMenu');
  const openBtn = document.querySelector('#menuOpenBtn');
  const closeBtn = document.querySelector('#menuCloseBtn');

  openBtn.addEventListener('click', event => {
    popupMenu.classList.add('menu-popup--active');
  });

  closeBtn.addEventListener('click', event => {
    popupMenu.classList.remove('menu-popup--active');
  });
})();