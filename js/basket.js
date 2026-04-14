const PRODUCT_LS_KEY = "basket";

const totalPrice = document.querySelector(".js-total-price");
const clearBtn = document.querySelector(".js-clear");
const container = document.querySelector(".js-list");

clearBtn.addEventListener("click", handlerClear);

const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) ?? [];
let totalCost;

// -------Refactoring code-------------

function calcTotalCost(productList) {
  if (products.length) {
    clearBtn.hidden = false;
    totalCost = productList.reduce((acc, { qty, price }) => {
      return acc + qty * price;
    }, 0);
  }
  totalPrice.textContent = totalCost
    ? `Total cost ${totalCost} грн`
    : "Your basket is empty";
}

calcTotalCost(products);

// ------------------------------------------

// totalPrice.textContent = calcTotalCost(products) ? `Total cost ${totalCost} грн` : "Your basket is empty";
container.insertAdjacentHTML("beforeend", createMarkup(products));

function createMarkup(arr) {
  return arr
    .map(
      ({ img, name, qty, price, id }) => `
        <li class="product-card" data-id="${id}">
            <img src="${img}" alt="${name}" class="product-img"/>
            <h2>${name}</h2>
            <p>Quantity: ${qty}</p>
            <p>Total price: ${qty * price} грн</p>
           <button class="product-del-btn">Delete from basket</button>
        </li>
    `,
    )
    .join("");
}

function handlerClear() {
  localStorage.removeItem(PRODUCT_LS_KEY);
  window.location.href = "shop.html";
}

// ----------button remove card-----------

container.addEventListener("click", hendlerDeleteCard);

function hendlerDeleteCard(event) {
  if (event.target.classList.contains("product-del-btn")) {
    const productsList = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY));
    const removebleCard = event.target.closest(".product-card");
    const cardId = +removebleCard.dataset.id;

    const newProductsList = productsList.filter(({ id }) => id != cardId);
    
    calcTotalCost(newProductsList);
    localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(newProductsList));
    removebleCard.remove();
  }
}
