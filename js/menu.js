(function(){
  const popupMenu = document.querySelector('#popupMenu');
  const openBtn = document.querySelector('#menuOpenBtn');

  openBtn.addEventListener('click', event => {
    popupMenu.classList.toggle('menu-popup--active');
    document.body.classList.toggle('scroll-hidden');

    openBtn.classList.toggle('button-togle--cross');
  });
})();