"use strict";!function(){var e=document.querySelector(".js-datepicker"),t=document.querySelector(".js-vat"),a=(document.querySelector(".js-tooltip"),document.querySelector(".js-vat-display")),n=document.querySelector(".js-company-address"),s=document.querySelector(".js-discount"),i=document.querySelector(".js-estimate-subtotal"),r=document.querySelector(".js-estimate-total"),l=0,c={variables:{$imgBlank:document.getElementById("js-image-blank"),$logoImageField:document.getElementById("js-logo-image"),$logoWrapper:document.querySelector(".js-logo-wrapper")},getBase64Image:function(e){var t=this.variables.$imgBlank,a=t.getContext("2d"),n=new Image;n.onload=function(){n.height>150?t.height=80:t.height=n.height,t.width=n.width,a.drawImage(n,0,0)},n.src=URL.createObjectURL(e.target.files[0]),t.classList.remove("hidden")},getImageFromStorage:function(){var e=localStorage.getItem("imgData");this.variables.$imgBlank.src="data:image/png;base64,"+e},init:function(){var e=this;this.variables.$logoImageField.addEventListener("change",function(t){var a=e.getBase64Image(t);localStorage.setItem("imgData",a),e.variables.$logoWrapper.classList.add("x-logo-visible")}),this.getImageFromStorage()}},o={variables:{$selectIcon:document.querySelector(".js-select-icon"),$selectBox:document.querySelector(".js-select"),$firstInputUnity:document.getElementById("js-unity-product-0"),$firstInputAmount:document.getElementById("js-amount-product-0"),$firstInputQuantity:document.getElementById("js-quantity-product-0"),$firstSelectProduct:document.getElementById("js-select-product-0")},isDataTableValid:function(e){var t={},a={},n={},s={};0===e?(t=this.variables.$firstSelectProduct,a=this.variables.$firstInputUnity,n=this.variables.$firstInputAmount,s=this.variables.$firstInputQuantity):(t=document.getElementById("js-select-product-"+e),a=document.getElementById("js-unity-product-"+e),n=document.getElementById("js-amount-product-"+e),s=document.getElementById("js-quantity-product-"+e));var i=parseInt(a.value),r=parseInt(s.value),l=parseInt(n.value);return"0"===t.value?(t.classList.add("error"),!1):(t.classList.remove("error"),!0,isNaN(i)||""===a.value?(a.classList.add("error"),!1):(a.classList.remove("error"),!0,isNaN(r)||""===s.value?(s.classList.add("error"),!1):(s.classList.remove("error"),!0,isNaN(l)||""===n.value?(n.classList.add("error"),!1):(n.classList.remove("error"),!0))))},onQuantityFocusOutHandler:function(e,t,a){var n=""===e.value,s=""===t.value,i=isNaN(t.value),r=isNaN(e.value),l=0;s||i?(t.classList.add("error"),l+=1):t.classList.remove("error"),n||r?(e.classList.add("error"),l+=1):e.classList.remove("error"),0===l&&(a.value=this.calculateSingleAmount(t.value,e.value),this.variables.$firstInputAmount.parentNode.classList.add("x-value"),this.calculateTotalAmount())},calculateTotalAmount:function(){for(var e=0,a=document.getElementsByClassName("js-input-amount"),n="",l="",c="",o="",m=0;m<a.length;m++)e+=parseFloat(a[m].value),""!==t.value&&(l=d(t),c=parseFloat(l)),""!==s.value&&(n=u(s),o=parseFloat(n)),i.innerHTML=e,r.innerHTML=e+c-o+"€"},calculateSingleAmount:function(e,t){return parseFloat(e).toFixed(2)*parseFloat(t).toFixed(2)},createCellTable:function(e,t,a,n,s,i){var r=document.createElement("td"),l=document.createElement(e),c=document.createElement("span"),o=document.createElement("span");if("select"===e){c.setAttribute("class","js-select-icon select-icon icon-circle-down");var u={0:"-- Select --",1:"Service",2:"Hours",3:"Days",4:"Product"};for(var d in u)if(u.hasOwnProperty(d)){var m=document.createElement("option");m.setAttribute("value",d),m.innerHTML=u[d],l.appendChild(m)}r.appendChild(c)}return r.setAttribute("class",t),l.setAttribute("name",s),l.setAttribute("class",a),l.setAttribute("id",n),l.setAttribute("placeholder",i),l.classList.contains("js-input-amount")&&(o.setAttribute("class","amount-euro"),r.appendChild(o)),r.appendChild(l),r},createRowTable:function(e){var t=document.createElement("tr");return t.classList.add("estimate__main__table__row"),t.appendChild(this.createCellTable("select","js-select-wrapper estimate__main__table__row__cell small","js-select","js-select-product-"+e,"js-select-product-"+e,"productSelect"+e,"-- Select --")),t.appendChild(this.createCellTable("textarea","estimate__main__table__row__cell large","js-input-description table-field","js-description-product-"+e,"productDescription"+e,"")),t.appendChild(this.createCellTable("input","estimate__main__table__row__cell small","js-input-unity table-field","js-unity-product-"+e,"productUnity"+e,"0.00")),t.appendChild(this.createCellTable("input","estimate__main__table__row__cell small","js-input-quantity table-field","js-quantity-product-"+e,"productQuantity"+e,"0")),t.appendChild(this.createCellTable("input","amount-cell estimate__main__table__row__cell small","js-input-amount table-field","js-amount-product-"+e,"productAmount"+e,"0.00")),t},selectIconHandler:function(e){e.classList.contains("icon-circle-down")?(e.classList.remove("icon-circle-down"),e.classList.add("icon-circle-up")):(e.classList.add("icon-circle-down"),e.classList.remove("icon-circle-up"))},addProduct:function(){var e=document.getElementById("tbody"),t=this;if(this.isDataTableValid(l)){l+=1,e.appendChild(this.createRowTable(l));var a=(document.getElementById("js-select-product-"+l),document.getElementById("js-unity-product-"+l)),n=document.getElementById("js-quantity-product-"+l),s=document.getElementById("js-amount-product-"+l);n.addEventListener("focusout",function(){t.onQuantityFocusOutHandler(this,a,s),s.parentNode.classList.add("x-value")})}},init:function(){var e=this.variables,t=this;e.$selectBox.addEventListener("focusout",function(){e.$selectIcon.classList.contains("icon-circle-up")&&(e.$selectIcon.classList.add("icon-circle-down"),e.$selectIcon.classList.remove("icon-circle-up"))}),document.querySelector("body").addEventListener("click",function(e){var a="";e.target.classList.contains("js-select")&&(a=e.srcElement.previousElementSibling,t.selectIconHandler(a))}),e.$firstInputQuantity.addEventListener("focusout",function(){t.onQuantityFocusOutHandler(this,e.$firstInputUnity,e.$firstInputAmount)})}},u=function(e){var t="",a="",n="";if(!isNaN(e.value))return e.classList.remove("error"),t=(e.value/100*i.innerHTML).toFixed(2),a=parseFloat(t),n=parseFloat(i.innerHTML),r.innerHTML=n-a+"€",t;e.classList.add("error")},d=function(e){var t="",n="",s="";return isNaN(e.value)?void e.classList.add("error"):(e.classList.remove("error"),a.innerText=e.value,t=(i.innerHTML*e.value/100).toFixed(2),s=parseFloat(t),n=parseFloat(i.innerHTML),r.innerHTML=n+s+"€",t)},m={variables:{$addProductBtn:document.getElementById("js-add-btn"),$printBtn:document.getElementById("js-print-btn"),$previewBtn:document.getElementById("js-preview-btn")},init:function(){this.variables.$addProductBtn.addEventListener("click",function(){o.addProduct()}),this.variables.$printBtn.addEventListener("click",function(){window.print()}),this.variables.$previewBtn.addEventListener("click",function(){document.querySelector("body").classList.toggle("x-preview")})}};n.addEventListener("focusin",function(){this.classList.add("expand")}),s.addEventListener("change",function(){u(this)}),t.addEventListener("change",function(){d(this)}),flatpickr(e,{dateFormat:"d-m-Y"}),c.init(),o.init(),m.init()}();