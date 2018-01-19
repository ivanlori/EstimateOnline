'use strict';

(function() {

  /**
   * @Author: Ivan Lori
   * @Description: An online estimate of costs with pdf creator
   *
   * My experiment with new features from ES6 and the new grid system
   * for responsive purposes
   *
   * The code style which I adopted is from AirBnb
   * references to: https://github.com/airbnb/javascript
   *
   * Feel free to inspect my code and reuse it or... Contribute! :D
   */

        // Input table fields
  const $addProductBtn = document.getElementById('js-add-product-btn'),
        $defaultSelectTag = document.getElementById('js-select-product-0'),
        $subtotal = document.querySelector('.js-subtotal'),
        $total = document.querySelector('.js-total'),
        $estimate = document.querySelector('.js-estimate'),

        // Input data fields
        $logoInputField = document.getElementById('js-sender-logo-input'),
        $logoImageField = document.getElementById('js-sender-logo-image'),

        // Buttons
        $createPdfBtn = document.getElementById('js-create-btn'),
        $uploadBtn = document.getElementById('js-upload-btn'),
        $printBtn = document.getElementById('js-print-btn');

  let $firstInputUnity = document.getElementById('js-unity-product-0'),
      $firstInputAmount = document.getElementById('js-amount-product-0'),
      $firstInputQuantity = document.getElementById('js-quantity-product-0'),
      id = 0,
      isLogoBtnClicked = false;

  const saveDataInLocalStorage = () => {

  };

  const createPdf = () => {

    // save all data in local storage
    saveDataInLocalStorage();
  };

  const switchLogoInputType = () => {

    if (isLogoBtnClicked) {
      $logoInputField.classList.remove('hidden');
      $logoImageField.classList.add('hidden');
      $uploadBtn.innerText = 'Upload image';
      isLogoBtnClicked = false;
    } else {
      $logoInputField.classList.add('hidden');
      $logoImageField.classList.remove('hidden');
      $uploadBtn.innerText = 'Write your company name';
      isLogoBtnClicked = true;
    }

  };

  /**
   * Thanks to: https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
   *
   * This converts an image into base 64 format
   * and then is possible to retrieve via local storage
   */
  const getBase64Image = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let dataURL = canvas.toDataURL('image/png');

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  };

  const validateDataTable = (id) => {

    let $defaultSelectId = {},
        $defaultUnityId = {},
        $defaultAmountId = {},
        $defaultQuantityId = {};

    if (id === 0) {

          $defaultSelectId = document.getElementById('js-select-product-0');
          $defaultUnityId = document.getElementById('js-unity-product-0');
          $defaultAmountId = document.getElementById('js-amount-product-0');
          $defaultQuantityId = document.getElementById('js-quantity-product-0');

    } else {

          $defaultSelectId = document.getElementById(`js-select-product-${id}`);
          $defaultUnityId = document.getElementById(`js-unity-product-${id}`);
          $defaultAmountId = document.getElementById(`js-amount-product-${id}`);
          $defaultQuantityId = document.getElementById(`js-quantity-product-${id}`);

    }

    let unityValueParsed = parseInt($defaultUnityId.value),
        quantityValueParsed = parseInt($defaultQuantityId.value),
        amountValueParsed = parseInt($defaultAmountId.value),
        isError = false;

    // Check product select field
    if ($defaultSelectId.value === '0') {
      $defaultSelectId.classList.add('error');
      isError = true;
    } else {
      $defaultSelectId.classList.remove('error');
      isError = false;
    }

    // Check unity field
    if (isNaN(unityValueParsed) || $defaultUnityId.value === '') {
      $defaultUnityId.classList.add('error');
      isError = true;
    } else {
      $defaultUnityId.classList.remove('error');
      isError = false;
    }

    // Check quantity field
    if (isNaN(quantityValueParsed) || $defaultQuantityId.value === '') {
      $defaultQuantityId.classList.add('error');
      isError = true;
    } else {
      $defaultQuantityId.classList.remove('error');
      isError = false;
    }

    // Check amount field
    if (isNaN(amountValueParsed) || $defaultAmountId.value === '') {
      $defaultAmountId.classList.add('error');
      isError = true;
    } else {
      $defaultAmountId.classList.remove('error');
      isError = false;
    }

    return isError;

  };

  const calculateSingleAmount = (unity, quantity) => {
    return parseInt(unity) * parseInt(quantity);
  };

  const calculateTotalAmount = () => {

    let sum = 0,
        $amountClass = document.getElementsByClassName('js-input-amount');

    // Iterate over all amount and sum
    for (let i = 0; i < $amountClass.length; i++) {
      sum += parseInt($amountClass[i].value);
      $subtotal.innerHTML = sum;
      $total.innerHTML = sum;
      $estimate.innerHTML = `${sum}€`;
    }

  };

  /**
   *
   * @param elementChildType
   * @param cellClassAttr
   * @param nameAttr
   * @param placeholderAttr
   * @returns Cell table with element in it
   */
  const createCellTable = (elementChildType, cellClassAttr, elemClassAttr, idAttr, nameAttr, placeholderAttr) => {

    let $td = document.createElement('td'),
        $elem = document.createElement(elementChildType);

    if (elementChildType === 'select') {
          let items = {
              '0': '-- Select --',
              '1': 'Service',
              '2': 'Hours',
              '3': 'Days',
              '4': 'Product',
              '5': 'Discount'
          };

      for (let key in items) {
        if (items.hasOwnProperty(key)) {

          let $option = document.createElement('option');

          $option.setAttribute('value', key);
          $option.innerHTML = items[key];
          $elem.appendChild($option);
        }
      }

    }

    $td.setAttribute('class', cellClassAttr);

    $elem.setAttribute('name', nameAttr);
    $elem.setAttribute('class', elemClassAttr);
    $elem.setAttribute('id', idAttr);
    $elem.setAttribute('placeholder', placeholderAttr);

    $td.appendChild($elem);

    return $td;

  };

  const createRowTable = (id) => {
    let $row = document.createElement('tr');

    $row.classList.add('box__main__table__row');

    $row.appendChild(createCellTable('select', 'box__main__table__row__cell small', 'js-select', `js-select-product-${id}`, `js-select-product-${id}`, `productSelect${id}`, '-- Select --'));
    $row.appendChild(createCellTable('textarea', 'box__main__table__row__cell large', 'js-input-description', `js-description-product-${id}`, `productDescription${id}`, ''));
    $row.appendChild(createCellTable('input', 'box__main__table__row__cell small', 'js-input-unity', `js-unity-product-${id}`, `productUnity${id}`, '0.00'));
    $row.appendChild(createCellTable('input', 'box__main__table__row__cell small', 'js-input-quantity', `js-quantity-product-${id}`, `productQuantity${id}`, '0'));
    $row.appendChild(createCellTable('input', 'box__main__table__row__cell small', 'js-input-amount', `js-amount-product-${id}`, `productAmount${id}`, '0.00'));

    return $row;
  };

  const addProduct = () => {

    // Clone the default row
    let $tbody = document.getElementById('tbody');

    // if there's not errors
    if (!validateDataTable(id)) {

      id += 1;

      // Insert the row created
      $tbody.appendChild(createRowTable(id));

      let unityId = document.getElementById(`js-unity-product-${id}`),
          quantityId = document.getElementById(`js-quantity-product-${id}`),
          amountId = document.getElementById(`js-amount-product-${id}`);

      // Focus out on dynamic input id
      quantityId.addEventListener('focusout', function() {

        if (unityId.value !== '' && quantityId.value !== '') {
          amountId.value = calculateSingleAmount(unityId.value, quantityId.value);
          calculateTotalAmount();
        }

      });

      if (sessionStorage.getItem('defaultSelectProduct')) {

        // set the item select in the default row
        $defaultSelectTag
          .querySelector(`option[value="${sessionStorage.getItem('defaultSelectProduct')}"]`)
          .setAttribute('selected', 'selected');
      }

    }

  };

  // Focus out on default first row input
  $firstInputQuantity.addEventListener('focusout', function() {
    if ($firstInputQuantity.value !== '' && $firstInputUnity.value !== '') {
      $firstInputAmount.value = calculateSingleAmount($firstInputUnity.value, $firstInputQuantity.value);
      calculateTotalAmount();
    }
  });

  $addProductBtn.addEventListener('click', function() {
    addProduct();
  });

  $uploadBtn.addEventListener('click', function() {
    switchLogoInputType();
  });

  // get the default row select product and save it
  $defaultSelectTag.addEventListener('change', function() {
    sessionStorage.setItem('defaultSelectProduct', $defaultSelectTag.value);
  });

  $createPdfBtn.addEventListener('click', function() {
    createPdf();
  });

  $printBtn.addEventListener('click', function() {
    window.print();
  });

}());
