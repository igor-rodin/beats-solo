(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    const ORDER_ID = 8;
    const sections = document.querySelectorAll('.section');
    let isScrolled = false;


    document.addEventListener('wheel', event => {
      scrollPage(event);
    });

    document.addEventListener('keydown', event => {
      const tagName = event.target.tagName.toLowerCase();

      if (tagName!=='input' && tagName !== 'textarea') {
        const activeSection = document.querySelector('.section--active');
      if (!activeSection){
        return;
      }
      const activeSectionId = parseInt(activeSection.getAttribute('data-slide-id'));
      if (event.key === 'PageDown' ||  event.key === 'ArrowDown'){
        if (activeSectionId < sections.length) {
          moveSectionTo(activeSection, activeSectionId);
        }
      }
      else if(event.key === 'PageUp' ||  event.key === 'ArrowUp'){
        if (activeSectionId > 1) {
          moveSectionTo(activeSection, activeSectionId - 2);
        }
      }
      }
    })



    const mainMenu = document.querySelector('#main-menu');
    if (mainMenu){
      mainMenu.addEventListener('click', event => {
        event.preventDefault();
        const activeMenuItem = document.querySelector('.menu__item--active');
        activeMenuItem.classList.remove('menu__item--active');

        const targetMenuItem = event.target.parentElement;
        const targetMenuItemId = parseInt(targetMenuItem.getAttribute('data-slide-to'));
        targetMenuItem.classList.add('menu__item--active');
        const activeSection = document.querySelector('.section--active');
        moveSectionTo(activeSection, targetMenuItemId - 1);
        sincSideMenuWith(targetMenuItemId);
      })
    }

    const sideMenu = document.querySelector('#side-menu');
    if (sideMenu){
      sideMenu.addEventListener('click', event => {
        event.preventDefault();
        const activeMenuItem = document.querySelector('.side-menu__item--active');
        activeMenuItem.classList.remove('side-menu__item--active');

        const targetMenuItem = event.target.parentElement;
        const targetMenuItemId = parseInt(targetMenuItem.getAttribute('data-slide-to'));
        targetMenuItem.classList.add('side-menu__item--active');
        const activeSection = document.querySelector('.section--active');
        moveSectionTo(activeSection, targetMenuItemId - 1);
      })
    }

    const orderBtn = document.querySelector('#order-btn');
    if (orderBtn){
      orderBtn.addEventListener('click', event => {
        event.preventDefault();
        const activeMenuItem = document.querySelector('.side-menu__item--active');
        activeMenuItem.classList.remove('side-menu__item--active');
        const targetMenuItem = document.querySelector(`.section:nth-of-type(${ORDER_ID})`);
        targetMenuItem.classList.add('side-menu__item--active');
        const activeSection = document.querySelector('.section--active');
        moveSectionTo(activeSection, ORDER_ID - 1);
      })
    }

    function scrollPage(event) {

      const activeSection = document.querySelector('.section--active');
      if (!activeSection){
        return;
      }
      const activeSectionId = parseInt(activeSection.getAttribute('data-slide-id'));
      if (event.deltaY > 0 ){
        if (activeSectionId < sections.length) {
          moveSectionTo(activeSection, activeSectionId);
        }
      }
      else {
        if (activeSectionId > 1) {
          moveSectionTo(activeSection, activeSectionId - 2);
        }
      }
    }

    function moveSectionTo(activeSection, sectionId) {
      const mainContent = document.querySelector('.main-content');
      const dist = -100 * sectionId;

      if (!isScrolled){
        isScrolled = true;
        mainContent.style.transform = `translateY(${dist}%)`;
        activeSection.classList.remove('section--active');
        sections[sectionId].classList.add('section--active');
        
        setTimeout(()=>{
          isScrolled = false;
          sincSideMenuWith(sectionId + 1);
        }, 800);
      }
    }

    function sincSideMenuWith(activeSectionId) {
      const activeMenuItem = document.querySelector('.side-menu__item--active');
      if (activeMenuItem){
        activeMenuItem.classList.remove('side-menu__item--active');
      }
      const targetMenuItem = document.querySelector(`.side-menu__item:nth-of-type(${activeSectionId})`);
      targetMenuItem.classList.add('side-menu__item--active');
    };

  });
})();