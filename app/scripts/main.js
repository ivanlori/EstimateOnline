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

  const
    $datepicker = document.querySelector('.js-datepicker'),
    $vat = document.querySelector('.js-vat'),
    $vatFooterDisplay = document.querySelector('.js-vat-display'),
    $addressInputField = document.querySelector('.js-company-address'),
    $discount = document.querySelector('.js-discount'),
    $estimateSubtotal = document.querySelector('.js-estimate-subtotal'),
    $estimateTotal = document.querySelector('.js-estimate-total');

  let
    id = 0;

  const imageHandler = {
    variables: {
      $imgBlank: document.getElementById('js-image-blank'),
      $logoImageField: document.getElementById('js-logo-image'),
      $logoWrapper: document.querySelector('.js-logo-wrapper'),
    },
    getBase64Image(event) {

      /**
       * Thanks to: https://stackoverflow.com/questions/33024630/html5-canvas-conversion-of-image-file-to-dataurl-throws-uncaught-typeerror
       *
       * This converts an image into base 64 format
       * and then is possible to retrieve via local storage
       */
      const logo = this.variables.$imgBlank;

      let
        ctx = logo.getContext('2d'),
        img = new Image();

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

    },
    getImageFromStorage() {
      let dataImage = localStorage.getItem('imgData');
      this.variables.$imgBlank.src = 'data:image/png;base64,' + dataImage;
    },
    init() {

      let self = this;

      // On image select
      this.variables.$logoImageField.addEventListener('change', function(event) {
        let imgData = self.getBase64Image(event);
        localStorage.setItem('imgData', imgData);
        self.variables.$logoWrapper.classList.add('x-logo-visible');
      });

      this.getImageFromStorage();

    }
  };

  const productTableHandler = {
    variables: {
      $selectBox: document.querySelector('.js-select'),
      $firstInputUnity: document.getElementById('js-unity-product-0'),
      $firstInputAmount: document.getElementById('js-amount-product-0'),
      $firstInputQuantity: document.getElementById('js-quantity-product-0'),
      $firstSelectProduct: document.getElementById('js-select-product-0')
    },
    isDataTableValid(id) {

      let
        $defaultSelectId = {},
        $defaultUnityId = {},
        $defaultAmountId = {},
        $defaultQuantityId = {};

      if (id === 0) {
        $defaultSelectId = this.variables.$firstSelectProduct;
        $defaultUnityId = this.variables.$firstInputUnity;
        $defaultAmountId = this.variables.$firstInputAmount;
        $defaultQuantityId = this.variables.$firstInputQuantity;
      } else {
        $defaultSelectId = document.getElementById(`js-select-product-${id}`);
        $defaultUnityId = document.getElementById(`js-unity-product-${id}`);
        $defaultAmountId = document.getElementById(`js-amount-product-${id}`);
        $defaultQuantityId = document.getElementById(`js-quantity-product-${id}`);
      }

      let
        unityValueParsed = parseInt($defaultUnityId.value),
        quantityValueParsed = parseInt($defaultQuantityId.value),
        amountValueParsed = parseInt($defaultAmountId.value),
        isValid = false;

      // Check product select field
      if ($defaultSelectId.value === '0') {
        $defaultSelectId.classList.add('error');
        return isValid = false;
      } else {
        $defaultSelectId.classList.remove('error');
        isValid = true;
      }

      // Check unity field
      if (isNaN(unityValueParsed) || $defaultUnityId.value === '') {
        $defaultUnityId.classList.add('error');
        return isValid = false;
      } else {
        $defaultUnityId.classList.remove('error');
        isValid = true;
      }

      // Check quantity field
      if (isNaN(quantityValueParsed) || $defaultQuantityId.value === '') {
        $defaultQuantityId.classList.add('error');
        return isValid = false;
      } else {
        $defaultQuantityId.classList.remove('error');
        isValid = true;
      }

      // Check amount field
      if (isNaN(amountValueParsed) || $defaultAmountId.value === '') {
        $defaultAmountId.classList.add('error');
        return isValid = false;
      } else {
        $defaultAmountId.classList.remove('error');
        isValid = true;
      }

      return isValid;

    },
    onQuantityKeyUpHandler(quantityField, unityField, amountField) {

      let
        isQuantityEmpty = quantityField.value === '',
        isUnityEmpty = unityField.value === '',
        hasUnityValueInvalid = isNaN(unityField.value),
        hasQuantityValueInvalid = isNaN(quantityField.value),
        errors = 0;

      if (isUnityEmpty || hasUnityValueInvalid) {
        unityField.classList.add('error');
        errors += 1;
      } else {
        unityField.classList.remove('error');
      }

      if (isQuantityEmpty || hasQuantityValueInvalid) {
        quantityField.classList.add('error');
        errors += 1;
      } else {
        quantityField.classList.remove('error');
      }

      if (errors === 0) {
        amountField.value = this.calculateSingleAmount(unityField.value, quantityField.value);
        this.variables.$firstInputAmount.parentNode.classList.add('x-value');
        this.calculateTotalAmount();
      }

    },
    calculateTotalAmount() {

      let
        sum = 0,
        $amountClass = document.getElementsByClassName('js-input-amount'),
        discountVal = '',
        vatVal = '',
        parsedVatVal = '',
        parsedDiscountVal = '';

      // Iterate over all amount and sum
      for (let i = 0; i < $amountClass.length; i++) {
        sum += parseFloat($amountClass[i].value);

        if ($vat.value !== '') {
          vatVal = calculateAndSetVat($vat);
          parsedVatVal = parseFloat(vatVal);
        }

        if ($discount.value !== '') {
          discountVal = calculateDiscount($discount);
          parsedDiscountVal = parseFloat(discountVal);
        }

        $estimateSubtotal.innerHTML = sum;
        $estimateTotal.innerHTML = `${(sum + parsedVatVal) - parsedDiscountVal}€`;
      }

    },
    calculateSingleAmount(unity, quantity) {
      return parseFloat(unity).toFixed(2) * parseFloat(quantity).toFixed(2);
    },

    /**
     * @param elementChildType
     * @param colClassAttr
     * @param nameAttr
     * @param placeholderAttr
     * @returns Col table with element in it
     */
    createColTable(elementChildType, colClassAttr, elemClassAttr, idAttr, placeholderAttr) {

      let
        $td = document.createElement('td'),
        $elem = document.createElement(elementChildType),
        $euroSymbol = document.createElement('span');

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

      $td.setAttribute('class', colClassAttr);

      $elem.setAttribute('class', elemClassAttr);
      $elem.setAttribute('id', idAttr);
      $elem.setAttribute('placeholder', placeholderAttr);

      if ($elem.classList.contains('js-input-amount')) {
        $euroSymbol.setAttribute('class', 'amount-euro');
        $td.appendChild($euroSymbol);
      }

      $td.appendChild($elem);

      return $td;

    },
    createRowTable(id) {

      let
        $row = document.createElement('tr'),
        $deleteRowBtn = document.createElement('i');

      $deleteRowBtn.setAttribute('class', 'icon-minus');
      $deleteRowBtn.setAttribute('id', id);

      $row.classList.add('row');

      $row.appendChild(this.createColTable('select', 'js-select-wrapper col small', 'js-select', `js-select-product-${id}`, `js-select-product-${id}`, '-- Select --'));
      $row.appendChild(this.createColTable('textarea', 'col large', 'js-input-description table-field', `js-description-product-${id}`, ''));
      $row.appendChild(this.createColTable('input', 'col small', 'js-input-unity table-field', `js-unity-product-${id}`, '0.00'));
      $row.appendChild(this.createColTable('input', 'col small', 'js-input-quantity table-field', `js-quantity-product-${id}`, '0'));
      $row.appendChild(this.createColTable('input', 'amount-col col small', 'js-input-amount table-field', `js-amount-product-${id}`, '0.00'));

      $row.appendChild($deleteRowBtn);
      $row.setAttribute('id', id);

      return $row;
    },
    addProduct() {

      let
        $tbody = document.getElementById('js-tbody'),
        self = this;

      // if there's not errors
      if (this.isDataTableValid(id)) {

        id += 1;

        // Insert the row created
        $tbody.appendChild(this.createRowTable(id));

        let
          unityId = document.getElementById(`js-unity-product-${id}`),
          quantityId = document.getElementById(`js-quantity-product-${id}`),
          amountId = document.getElementById(`js-amount-product-${id}`);

        // Focus out on dynamic input id
        quantityId.addEventListener('keyup', function() {
          self.onQuantityKeyUpHandler(this, unityId, amountId);
          amountId.parentNode.classList.add('x-value');
        });

      }

    },
    init() {

      let
        variables = this.variables,
        self = this;

      document.querySelector('body').addEventListener('click', function(e) {

        // when user clicks on delete btn, remove the own row
        if (e.target.classList.contains('icon-minus')) {
          id -= 1;
          e.target.parentNode.remove();

          // recalculate total after row remove
          self.calculateTotalAmount();
        }

      }, false);

      variables.$firstInputQuantity.addEventListener('keyup', function() {
        self.onQuantityKeyUpHandler(this, variables.$firstInputUnity, variables.$firstInputAmount);
      });

    }
  };

  const calculateDiscount = (discount) => {

    let
      discountResult = '',
      parsedDiscountVal = '',
      parsedSubtotalVal = '';

    if (isNaN(discount.value)) {
      discount.classList.add('error');
    } else {
      discount.classList.remove('error');
      discountResult = ((discount.value / 100) * $estimateSubtotal.innerHTML).toFixed(2);

      parsedDiscountVal = parseFloat(discountResult);
      parsedSubtotalVal = parseFloat($estimateSubtotal.innerHTML);

      $estimateTotal.innerHTML = `${parsedSubtotalVal - parsedDiscountVal}€`;

      return discountResult;
    }

  };

  const calculateAndSetVat = (vat) => {

    let
      vatVal = '',
      parsedSubtotalVal = '',
      parsedVatVal = '';

    // validate
    if (isNaN(vat.value)) {
      vat.classList.add('error');
      return;
    } else {
      vat.classList.remove('error');
      $vatFooterDisplay.innerText = vat.value;

      vatVal = (($estimateSubtotal.innerHTML * vat.value) / 100).toFixed(2);

      parsedVatVal = parseFloat(vatVal);
      parsedSubtotalVal = parseFloat($estimateSubtotal.innerHTML);

      $estimateTotal.innerHTML = `${parsedSubtotalVal + parsedVatVal}€`;

      return vatVal;
    }

  };

  const actionsHandler = {
    variables: {
      $addProductBtn: document.getElementById('js-add-btn'),
      $printBtn: document.getElementById('js-print-btn'),
      $previewBtn: document.getElementById('js-preview-btn')
    },
    init() {
      this.variables.$addProductBtn.addEventListener('click', function() {
        productTableHandler.addProduct();
      });

      this.variables.$printBtn.addEventListener('click', function() {

        let
          isLogoUploaded = imageHandler.variables.$logoWrapper.classList.contains('x-logo-visible'),
          isThereAnyErrorInTable = (function() {
              document.querySelector('.js') //qui
          });

        // if user has uploaded an image
        if (isLogoUploaded) {
          window.print();
        } else {
          document.querySelector('.x-logo-error').classList.remove('hidden');
        }
      });

      this.variables.$previewBtn.addEventListener('click', function() {
        document.querySelector('body').classList.toggle('x-preview');
      });
    }
  };

  $addressInputField.addEventListener('focusin', function() {
    this.classList.add('expand');
  });

  $discount.addEventListener('keyup', function() {
    calculateDiscount(this);
  });

  $vat.addEventListener('keyup', function() {
    calculateAndSetVat(this);
  });

  // Thanks to -> https://github.com/chmln/flatpickr
  flatpickr($datepicker, {
    dateFormat: 'd-m-Y'
  });

  imageHandler.init();
  productTableHandler.init();
  actionsHandler.init();

}());
