(function(){
  const popupMenu = document.querySelector('#popupMenu');
  const openBtn = document.querySelector('#menuOpenBtn');

  openBtn.addEventListener('click', event => {
    popupMenu.classList.toggle('menu-popup--active');

    openBtn.classList.toggle('button-togle--cross');

    document.body.classList.toggle('popup-shown');
  });
})();