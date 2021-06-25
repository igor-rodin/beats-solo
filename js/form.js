(function(){
  const ERROR_404 = "Страница не найдена";
  document.addEventListener('DOMContentLoaded', ()=>{
    const orderForm = document.querySelector('#orderForm');
    const btnSubmit = document.querySelector('#btnSubmit');
    btnSubmit.addEventListener('click', event => {
      event.preventDefault();
      if (validateForm(orderForm)) {
        const elements = orderForm;
        const orderInfo = {
          name: elements.name.value,
          phone: elements.phone.value,
          comment: elements.comment.value,
          street: elements.street.value,
          house: elements.house.value,
          housing: elements.housing.value,
          flat: elements.flat.value,
          floor: elements.floor.value,
          options: elements.options.value,
          call: elements.call.checked,
          to: 'test@test.mail'
        };

        sendOrder(orderInfo);
      }
    })
  });

  function validateForm(form){
    let isValid = true;
    const elements = form.elements;
    
    if (!validateElement(elements.name)) {
      isValid = false;
    }

    if (!validateElement(elements.phone)) {
      isValid = false;
    }

    if (!validateElement(elements.comment)) {
      isValid = false;
    }

    return isValid;
  };

  function validateElement(element){
    isValid = true;
    if (!element.checkValidity()) {
      const error = element.nextElementSibling;
      error.classList.add('form-element__error--active');
      error.textContent = element.validationMessage;
      element.style.border = "4px solid red";
      isValid = false;
    }
    else {
      const error = element.nextElementSibling;
      error.classList.remove('form-element__error--active');
      error.textContent = "";
      element.style.border = "";
      isValid = true;
    }
      
    return isValid;
  };

  function sendOrder(order) {
    const xhr  = new XMLHttpRequest();
    
    xhr.open('POST', ' https://webdev-api.loftschool.com/sendmail', false);
    xhr.setRequestHeader('content-type', 'application/json');
    let respMessage;
    xhr.onload = () => {
      if (xhr.status === 404){
        respMessage = ERROR_404;  
      }
      else{
        respMessage = JSON.parse(xhr.response).message;
      }
      
      showModalWindow(respMessage, 'закрыть');
    }

    xhr.send(JSON.stringify(order));
  };

  function showModalWindow(windowMessage, btnText){
    const modalTepmlate = document.querySelector('#modalTemplate').content;
    const template = modalTepmlate.querySelector('.overlay').cloneNode(true);
    template.querySelector('.overlay__text').textContent = windowMessage;
    const closeBtn = template.querySelector('.overlay__button');    
    closeBtn.textContent = btnText;
    closeBtn.addEventListener('click', event => {
      document.body.removeChild(template);
    })
    document.body.appendChild(template);    
  };

})();