


// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



//Active Navbar code
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', (e) => {
    nav.classList.add('active');
  })
}

const accountIcon = document.getElementById('account-icon');
const subMenu = document.querySelector('.sub-menu-wrap');

if (accountIcon) {
  accountIcon.addEventListener('click', (e) => {
    subMenu.classList.toggle('open');
  });
}

//Upload and Preview Code
const photoInput = document.getElementById('image-upload');
const photosContainer = document.querySelector('.photos-container');
const previewSection = document.querySelector('#preview-section');


let subtotal = 0.00; // Initialize subtotal variable


// Create an array to store all cart table rows
const cartTableRows = [];

let photos = [];

//Add to cart button creation
const addToCartBtn = document.createElement('button');
addToCartBtn.classList.add('button');
addToCartBtn.textContent = 'Add to Cart';

photoInput.addEventListener('change', (e) => {
  const files = photoInput.files;
  photos = [];

  const printSizeSelects = [];

  previewSection.scrollIntoView({ behavior: 'smooth' });

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = () => {
      const photoPreview = document.createElement('div');
      photoPreview.classList.add('photo');
      photoPreview.innerHTML = `
        <img src="${reader.result}" alt="photo">
        <div class="print-size">
            <p>Print Size</p>
            <select class="print-size">
                <option>4"x6" Print</option>
                <option>6"x8" Print</option>
                <option>8"x10" Print</option>
                <option>8"x12" Print</option>
            </select>
        </div>
        <div class="delete-photo">
            <i id="remove-photo" class="fa-solid fa-trash-can"></i>
        </div>
        `;
      photosContainer.appendChild(photoPreview);

      const printSizeSelect = photoPreview.querySelector('.print-size select');
      printSizeSelects.push(printSizeSelect);

      const photo = {
        file: file,
        printSize: printSizeSelect.value,
        price: getPriceForSize(printSizeSelect.value)
      };

      photos.push(photo);

      printSizeSelect.addEventListener('change', (e) => {
        const selectedSize = e.target.value;
        photo.printSize = selectedSize;
        photo.price = getPriceForSize(selectedSize);
        console.log(`Updated photo size: ${photo.price}`);
      });

      const deletePhotoBtn = photoPreview.querySelector('#remove-photo');
      deletePhotoBtn.addEventListener('click', () => {
        photosContainer.removeChild(photoPreview);

        const index = photos.findIndex(p => p.file === file);
        photos.splice(index, 1);

        console.log('Photo deleted');
        console.log(`${photos.length}`);
      })
    };
    reader.readAsDataURL(file);
  }
  previewSection.appendChild(addToCartBtn);

});

addToCartBtn.addEventListener('click', (e) => {
  if (photos.length != 0) {
    handleAddToCartClick(e);
    // Clear the preview
    addToCartBtn.remove(); // Remove the "Add to Cart" button
  } else {
    alert('Upload Files');
    return 1;
  }
});


function handleAddToCartClick(event) {
  const cart = document.querySelector('#pixel-cart tbody');
  const cartSummary = document.querySelector('#cart-totals');

  cart.scrollIntoView({ behavior: 'smooth' });
  photos.forEach((photo) => {
    const cartTableRow = document.createElement('tr');
    cartTableRow.innerHTML = `
      <td><i class="fa-solid fa-trash-can"></i></td>
      <td><img src="${URL.createObjectURL(photo.file)}" alt="product image"></td>
      <td>${photo.printSize}</td>
      <td><input type="number" value="1" min="1" class="quantity-input"></td>
      <td class="price-cell">$${photo.price.toFixed(2)}</td>
    `;
    cart.appendChild(cartTableRow);

    const quantityInput = cartTableRow.querySelector('.quantity-input');
    const priceCell = cartTableRow.querySelector('.price-cell');

    // Add the current cart table row to the array to iterate over it later to calculate the subtotal.
    cartTableRows.push(cartTableRow);

    quantityInput.addEventListener('input', (e) => {
      const quantity = parseInt(e.target.value, 10);
      const totalPrice = photo.price * quantity;
      priceCell.textContent = `$${totalPrice.toFixed(2)}`;

      // Update the subtotal
      updateSubtotal(cartTableRows);
    });
  });

  cartSummary.innerHTML = `
   <div id="subtotal">
            <h3>Pixel Summary</h3>
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td id="subtotal-cell"></td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td id="shipping-cell">Ksh 180</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td id="grandtotal-cell">Ksh 0.00</td>
                </tr>
            </table>
            <button>Proceed</button>
        </div>
  `

  // Initial update of the subtotal
  updateSubtotal(cartTableRows);
}

// Function to update the subtotal
function updateSubtotal(cartTableRows) {
  let subtotal = 0.00;
  let grandTotal = 180.00;
  cartTableRows.forEach((cartTableRow) => {
    const priceCell = cartTableRow.querySelector('.price-cell');
    const totalPriceText = priceCell.textContent;
    const totalPrice = parseFloat(totalPriceText.replace('$', ''));
    subtotal += totalPrice;
  });

  grandTotal += subtotal;

  console.log(`Subtotal: $${subtotal.toFixed(2)}`); // Log subtotal
  //display the subtotal in the UI
  document.querySelector('#subtotal-cell').textContent = `Ksh ${subtotal.toFixed(2)}`;

  //Display GrandTotal
  document.querySelector('#grandtotal-cell').textContent = `Ksh ${grandTotal.toFixed(2)}`;
}


function getPriceForSize(size) {
  switch (size) {
    case '4"x6" Print':
      return 50.00;
    case '6"x8" Print':
      return 75.00;
    case '8"x10" Print':
      return 375.00;
    case '8"x12" Print':
      return 600.00;
    default:
      return 0.00;
  }
}

function scrollToUpload() {
  document.querySelector('#upload').scrollIntoView({ behavior: 'smooth' });
}
