'use strict';

(function() {

  /**
   * @Author: Ivan Lori
   * @Description: An online estimate of costs
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
  const $addProductBtn = document.getElementById('js-add-btn'),
        $estimateTotal = document.querySelector('.js-estimate-total'),
        $estimateSubtotal = document.querySelector('.js-estimate-subtotal'),
        $discount = document.querySelector('.js-discount'),

        // Input data fields
        $logoImageField = document.getElementById('js-logo-image'),
        $logoWrapper = document.querySelector('.js-logo-wrapper'),
        $datepicker = document.querySelector('.js-datepicker'),
        $vat = document.querySelector('.js-vat'),
        $imgBlank = document.getElementsByClassName('js-image-blank'),
        $tooltipContainer = document.querySelector('.js-tooltip'),
        $vatFooterDisplay = document.querySelector('.js-vat-display'),

        // Buttons
        $printBtn = document.getElementById('js-print-btn');

  let $firstInputUnity = document.getElementById('js-unity-product-0'),
      $firstInputAmount = document.getElementById('js-amount-product-0'),
      $firstInputQuantity = document.getElementById('js-quantity-product-0'),
      id = 0;

  /**
   * Thanks to: https://stackoverflow.com/questions/33024630/html5-canvas-conversion-of-image-file-to-dataurl-throws-uncaught-typeerror
   *
   * This converts an image into base 64 format
   * and then is possible to retrieve via local storage
   */
  const getBase64Image = (event) => {

    const logo = document.getElementById('js-image-blank');
    let ctx = logo.getContext('2d');
    let img = new Image();
    img.onload = function() {

      if (img.height > 150) {
        logo.height = 80;
      } else {
        logo.height = img.height;
      }

      logo.width = img.width;
      ctx.drawImage(img, 0, 0);
    };

    img.src = URL.createObjectURL(event.target.files[0]);
    logo.classList.remove('hidden');

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
        $amountClass = document.getElementsByClassName('js-input-amount'),
        discountValue = '',
        vatValue = '';

    // Iterate over all amount and sum
    for (let i = 0; i < $amountClass.length; i++) {
      sum += parseInt($amountClass[i].value);
      $estimateSubtotal.innerHTML = sum;

      if ($vat.value !== '') {
        vatValue = calculateAndSetVat($vat);
      }

      if ($discount.value !== '') {
        discountValue = calculateDiscount($discount);
      }

      $estimateTotal.innerHTML = `${(sum + vatValue) - discountValue}€`;
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
              '4': 'Product'
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

    $row.classList.add('estimate__main__table__row');

    $row.appendChild(createCellTable('select', 'estimate__main__table__row__cell small', 'js-select', `js-select-product-${id}`, `js-select-product-${id}`, `productSelect${id}`, '-- Select --'));
    $row.appendChild(createCellTable('textarea', 'estimate__main__table__row__cell large', 'js-input-description', `js-description-product-${id}`, `productDescription${id}`, ''));
    $row.appendChild(createCellTable('input', 'estimate__main__table__row__cell small', 'js-input-unity', `js-unity-product-${id}`, `productUnity${id}`, '0.00'));
    $row.appendChild(createCellTable('input', 'estimate__main__table__row__cell small', 'js-input-quantity', `js-quantity-product-${id}`, `productQuantity${id}`, '0'));
    $row.appendChild(createCellTable('input', 'estimate__main__table__row__cell small', 'js-input-amount', `js-amount-product-${id}`, `productAmount${id}`, '0.00'));

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

      let productId = document.getElementById(`js-select-product-${id}`),
          unityId = document.getElementById(`js-unity-product-${id}`),
          quantityId = document.getElementById(`js-quantity-product-${id}`),
          amountId = document.getElementById(`js-amount-product-${id}`);


      // Focus out on dynamic input id
      quantityId.addEventListener('focusout', function() {
        onQuantityFocusOutHandler(this, unityId, amountId);
      });

    }

  };

  const onQuantityFocusOutHandler = (quantityField, unityField, amountField) => {

    let isQuantityEmpty = quantityField.value === '',
      isUnityEmpty = unityField.value === '',
      hasUnityValueInvalid = isNaN(unityField.value),
      hasQuantityValueInvalid = isNaN(quantityField.value);

    if (isUnityEmpty || hasUnityValueInvalid) {
      unityField.classList.add('error');
    } else if (isQuantityEmpty || hasQuantityValueInvalid) {
      quantityField.classList.add('error');
    } else {

      quantityField.classList.remove('error');
      unityField.classList.remove('error');

      amountField.value = calculateSingleAmount(unityField.value, quantityField.value);
      calculateTotalAmount();
    }

  };

  const calculateDiscount = (discount) => {

    let discountResult = '';

    if (isNaN(discount.value)) {
      discount.classList.add('error');
    } else {
      discount.classList.remove('error');
      discountResult = (discount.value / 100) * $estimateSubtotal.innerHTML;

      $estimateTotal.innerHTML = `${parseInt($estimateSubtotal.innerHTML) - parseInt(discountResult)}€`;

      return discountResult;
    }

  };

  const calculateAndSetVat = (vat) => {

    let vatValue = '',
        discountValue = '';

    // validate
    if (isNaN(vat.value)) {
      vat.classList.add('error');
      return;
    } else {
      vat.classList.remove('error');
      $vatFooterDisplay.innerText = vat.value;
    }

    discountValue = calculateDiscount($discount);

    vatValue = ($estimateSubtotal.innerHTML * vat.value) / 100;

    $estimateTotal.innerHTML = `${(parseInt($estimateSubtotal.innerHTML) - discountValue) + vatValue}€`;

    return vatValue;

  };

  const switchLanguage = () => {
    $tooltipContainer.classList.toggle('visible');
  };

  $firstInputQuantity.addEventListener('focusout', function() {
    onQuantityFocusOutHandler(this, $firstInputUnity, $firstInputAmount);
  });

  $addProductBtn.addEventListener('click', function() {
    addProduct();
  });

  $discount.addEventListener('change', function() {
    calculateDiscount(this);
  });

  $vat.addEventListener('change', function() {
    calculateAndSetVat(this);
  });

  $printBtn.addEventListener('click', function() {
    window.print();
  });

  // Thanks to -> https://github.com/chmln/flatpickr
  flatpickr($datepicker, {
    dateFormat: 'd-m-Y'
  });

  $logoImageField.addEventListener('change', function(event) {
    let imgData = getBase64Image(event);
    localStorage.setItem('imgData', imgData);
    $logoWrapper.classList.add('x-logo-visible');
  });

  let dataImage = localStorage.getItem('imgData');

  $imgBlank.src = 'data:image/png;base64,' + dataImage;

}());
