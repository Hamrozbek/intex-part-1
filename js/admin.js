let isUser = document.querySelector(".logined-user");
let findedUser = JSON.parse(localStorage.getItem("user"));

let modalWrapper = document.querySelector(".modal-wrapper");
let modalInner = document.querySelector(".modal-inner");

let elCategoryList = document.querySelector(".category-list");

isUser.innerHTML = `${findedUser.firstname} ${findedUser.lastname}`;

let products = JSON.parse(localStorage.getItem("products")) || []
let elProductTable = document.querySelector(".products-table")

let elSearchinput = document.querySelector(".search-input")

let activeList = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[35px]"
let notActiveList = "border-b-[3px] border-transparent text-[#A6A6A6] cursor-pointer font-bold text-[35px]";

// Sign out
isUser.parentElement.addEventListener("click", () => {
  modalWrapper.classList.remove("scale-0");
  modalInner.innerHTML = `
    <div class="w-[600px]">
      <h1 class="font-bold mb-[20px] text-[35px] text-center">Хотите выйти?</h1>
      <div class="flex items-center justify-center gap-[20px]">
        <button onclick="handleCancel()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Отмена</button>
        <button onclick="handleSignOut()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Выход</button>
      </div>
    </div>
    `
});

function handleCancel() {
  modalWrapper.classList.add("scale-0");
}

function handleSignOut() {
  modalWrapper.classList.add("scale-0");
  setTimeout(() => {
    localStorage.clear();
    location.pathname = "/";
  }, 800);
}
modalWrapper.addEventListener("click", (e) => e.target.id == "wrapper" &&
  modalWrapper.classList.add("scale-0"))


// Kategoriya tanlash
elCategoryList.addEventListener("click", function (e) {
  if (e.target.textContent == "Каркасные") {
    e.target.className = activeList
    e.target.nextElementSibling.className = notActiveList
    renderProducts(products, elProductTable, "0")
  } else if (e.target.textContent == "Надувные") {
    e.target.className = activeList
    e.target.previousElementSibling.className = notActiveList
    renderProducts(products, elProductTable, "1")
  }
})

// rander products start 
function renderProducts(arr, list, categoryId) {
  list.innerHTML = null;
  if(categoryId){
  arr.filter(value => value.categoryId == categoryId).forEach((item) => {
    let elTr = document.createElement("tr")
    elTr.className = "bg-white rounded-[35px]"
    elTr.innerHTML = `
       <td class="text-center py-[17px] bg-white">
          <img class="mx-auto" src="${item.imgURl}" alt="pool img" width="110" height="41">
      </td>
        <td class="py-[17px] text-[20px] bg-white">
          <div class="flex flex-col">
            <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]">${item.oldPrice}</span>
              <strong class="text-[18px]">${item.newPrice}</strong>
          </div>
        </td>
            <td class="py-[17px] text-[20px] bg-white">
              <div class="flex flex-col">${item.categoryId == "0" ? "Каркасные" : "Надувные"}</td>
                <td class="py-[17px] text-[20px] bg-white">${item.quantity}</td>
                <td class="py-[17px] text-[20px] bg-white">${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Рамка призмы" : "Прямоугольная")}</td>
                <td class="py-[17px] text-center bg-white">
            <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.75012 15.8125V19.2499H6.18752L16.3255 9.11191L12.8881 5.67234L2.75012 15.8125ZM18.9847 6.45268C19.0697 6.36793 19.1372 6.26722 19.1832 6.15635C19.2292 6.04547 19.2529 5.9266 19.2529 5.80655C19.2529 5.6865 19.2292 5.56763 19.1832 5.45675C19.1372 5.34588 19.0697 5.24517 18.9847 5.16041L16.8396 3.01529C16.7548 2.93027 16.6541 2.86281 16.5432 2.81679C16.4323 2.77076 16.3135 2.74707 16.1934 2.74707C16.0734 2.74707 15.9545 2.77076 15.8436 2.81679C15.7328 2.86281 15.632 2.93027 15.5473 3.01529L13.8697 4.69827L17.3071 8.13026L18.9847 6.45268Z"
                        fill="#3F8C8E" />
                </svg>
            </button>
              <button onclick="handleDeleteProduct(${item.id}, ${item.categoryId})" class="ml-[18px] cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 1.57129C11.8064 1.57129 12.5818 1.8812 13.1661 2.43693C13.7503 2.99266 14.0986 3.75168 14.139 4.557L14.1429 4.71415H18.0715C18.2717 4.71437 18.4643 4.79105 18.61 4.92853C18.7556 5.066 18.8432 5.25389 18.8549 5.45381C18.8667 5.65373 18.8016 5.85059 18.6731 6.00416C18.5446 6.15773 18.3622 6.25642 18.1634 6.28007L18.0715 6.28557H17.4044L16.4772 17.7201C16.4174 18.4579 16.0821 19.1462 15.5379 19.648C14.9937 20.1499 14.2805 20.4285 13.5402 20.4284H8.45981C7.71955 20.4285 7.00639 20.1499 6.46219 19.648C5.91799 19.1462 5.58263 18.4579 5.52281 17.7201L4.59488 6.28557H3.9286C3.73615 6.28555 3.5504 6.21489 3.40659 6.08701C3.26278 5.95913 3.1709 5.78291 3.14838 5.59179L3.14288 5.49986C3.14291 5.30741 3.21356 5.12167 3.34145 4.97785C3.46933 4.83404 3.64554 4.74216 3.83667 4.71965L3.9286 4.71415H7.85717C7.85717 3.88061 8.18829 3.08121 8.77769 2.49181C9.36709 1.90241 10.1665 1.57129 11 1.57129ZM9.23217 8.83915C9.08977 8.83915 8.95219 8.89072 8.84487 8.98432C8.73755 9.07792 8.66775 9.20721 8.64838 9.34829L8.64288 9.42843V15.7141L8.64838 15.7943C8.66779 15.9353 8.7376 16.0646 8.84492 16.1581C8.95224 16.2517 9.0898 16.3032 9.23217 16.3032C9.37454 16.3032 9.5121 16.2517 9.61942 16.1581C9.72673 16.0646 9.79655 15.9353 9.81595 15.7943L9.82145 15.7141V9.42843L9.81595 9.34829C9.79659 9.20721 9.72679 9.07792 9.61947 8.98432C9.51215 8.89072 9.37457 8.83915 9.23217 8.83915ZM12.7679 8.83915C12.6255 8.83915 12.4879 8.89072 12.3806 8.98432C12.2733 9.07792 12.2035 9.20721 12.1841 9.34829L12.1786 9.42843V15.7141L12.1841 15.7943C12.2035 15.9353 12.2733 16.0646 12.3806 16.1581C12.4879 16.2517 12.6255 16.3032 12.7679 16.3032C12.9103 16.3032 13.0478 16.2517 13.1551 16.1581C13.2624 16.0646 13.3323 15.9353 13.3517 15.7943L13.3572 15.7141V9.42843L13.3517 9.34829C13.3323 9.20721 13.2625 9.07792 13.1552 8.98432C13.0479 8.89072 12.9103 8.83915 12.7679 8.83915ZM11 3.14272C10.6036 3.14259 10.2217 3.29232 9.93102 3.56189C9.64032 3.83146 9.46226 4.20095 9.43253 4.59629L9.4286 4.71415H12.5715L12.5675 4.59629C12.5378 4.20095 12.3597 3.83146 12.069 3.56189C11.7783 3.29232 11.3965 3.14259 11 3.14272Z"
                            fill="#FF0202" />
                  </svg>
              </button>
         </td>
    `
    list.appendChild(elTr)
  })
  }else{
    arr.forEach((item) => {
    let elTr = document.createElement("tr")
    elTr.className = "bg-white rounded-[35px]"
    elTr.innerHTML = `
       <td class="text-center py-[17px] bg-white">
          <img class="mx-auto" src="${item.imgURl}" alt="pool img" width="110" height="41">
      </td>
        <td class="py-[17px] text-[20px] bg-white">
          <div class="flex flex-col">
            <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]">${item.oldPrice}</span>
              <strong class="text-[18px]">${item.newPrice}</strong>
          </div>
        </td>
            <td class="py-[17px] text-[20px] bg-white">
              <div class="flex flex-col">${item.categoryId == "0" ? "Каркасные" : "Надувные"}</td>
                <td class="py-[17px] text-[20px] bg-white">${item.quantity}</td>
                <td class="py-[17px] text-[20px] bg-white">${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Рамка призмы" : "Прямоугольная")}</td>
                <td class="py-[17px] text-center bg-white">
            <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.75012 15.8125V19.2499H6.18752L16.3255 9.11191L12.8881 5.67234L2.75012 15.8125ZM18.9847 6.45268C19.0697 6.36793 19.1372 6.26722 19.1832 6.15635C19.2292 6.04547 19.2529 5.9266 19.2529 5.80655C19.2529 5.6865 19.2292 5.56763 19.1832 5.45675C19.1372 5.34588 19.0697 5.24517 18.9847 5.16041L16.8396 3.01529C16.7548 2.93027 16.6541 2.86281 16.5432 2.81679C16.4323 2.77076 16.3135 2.74707 16.1934 2.74707C16.0734 2.74707 15.9545 2.77076 15.8436 2.81679C15.7328 2.86281 15.632 2.93027 15.5473 3.01529L13.8697 4.69827L17.3071 8.13026L18.9847 6.45268Z"
                        fill="#3F8C8E" />
                </svg>
            </button>
              <button onclick="handleDeleteProduct(${item.id}, ${item.categoryId})" class="ml-[18px] cursor-pointer">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 1.57129C11.8064 1.57129 12.5818 1.8812 13.1661 2.43693C13.7503 2.99266 14.0986 3.75168 14.139 4.557L14.1429 4.71415H18.0715C18.2717 4.71437 18.4643 4.79105 18.61 4.92853C18.7556 5.066 18.8432 5.25389 18.8549 5.45381C18.8667 5.65373 18.8016 5.85059 18.6731 6.00416C18.5446 6.15773 18.3622 6.25642 18.1634 6.28007L18.0715 6.28557H17.4044L16.4772 17.7201C16.4174 18.4579 16.0821 19.1462 15.5379 19.648C14.9937 20.1499 14.2805 20.4285 13.5402 20.4284H8.45981C7.71955 20.4285 7.00639 20.1499 6.46219 19.648C5.91799 19.1462 5.58263 18.4579 5.52281 17.7201L4.59488 6.28557H3.9286C3.73615 6.28555 3.5504 6.21489 3.40659 6.08701C3.26278 5.95913 3.1709 5.78291 3.14838 5.59179L3.14288 5.49986C3.14291 5.30741 3.21356 5.12167 3.34145 4.97785C3.46933 4.83404 3.64554 4.74216 3.83667 4.71965L3.9286 4.71415H7.85717C7.85717 3.88061 8.18829 3.08121 8.77769 2.49181C9.36709 1.90241 10.1665 1.57129 11 1.57129ZM9.23217 8.83915C9.08977 8.83915 8.95219 8.89072 8.84487 8.98432C8.73755 9.07792 8.66775 9.20721 8.64838 9.34829L8.64288 9.42843V15.7141L8.64838 15.7943C8.66779 15.9353 8.7376 16.0646 8.84492 16.1581C8.95224 16.2517 9.0898 16.3032 9.23217 16.3032C9.37454 16.3032 9.5121 16.2517 9.61942 16.1581C9.72673 16.0646 9.79655 15.9353 9.81595 15.7943L9.82145 15.7141V9.42843L9.81595 9.34829C9.79659 9.20721 9.72679 9.07792 9.61947 8.98432C9.51215 8.89072 9.37457 8.83915 9.23217 8.83915ZM12.7679 8.83915C12.6255 8.83915 12.4879 8.89072 12.3806 8.98432C12.2733 9.07792 12.2035 9.20721 12.1841 9.34829L12.1786 9.42843V15.7141L12.1841 15.7943C12.2035 15.9353 12.2733 16.0646 12.3806 16.1581C12.4879 16.2517 12.6255 16.3032 12.7679 16.3032C12.9103 16.3032 13.0478 16.2517 13.1551 16.1581C13.2624 16.0646 13.3323 15.9353 13.3517 15.7943L13.3572 15.7141V9.42843L13.3517 9.34829C13.3323 9.20721 13.2625 9.07792 13.1552 8.98432C13.0479 8.89072 12.9103 8.83915 12.7679 8.83915ZM11 3.14272C10.6036 3.14259 10.2217 3.29232 9.93102 3.56189C9.64032 3.83146 9.46226 4.20095 9.43253 4.59629L9.4286 4.71415H12.5715L12.5675 4.59629C12.5378 4.20095 12.3597 3.83146 12.069 3.56189C11.7783 3.29232 11.3965 3.14259 11 3.14272Z"
                            fill="#FF0202" />
                  </svg>
              </button>
         </td>
    `
    list.appendChild(elTr)
  })
  }
  
  
}
renderProducts(products, elProductTable, 0)

// render products and


// Mahsulot qo‘shish oynasi
function handleAddBtnClick() {
  modalWrapper.classList.remove("scale-0");
  modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[800px] p-5 bg-[#F8F8F8] rounded-[20px]">
      <label>
        <input type="file" class="choose-file hidden" />
        <div class="relative mx-auto flex items-center justify-center border-[2px] border-dashed border-slate-500 w-[70%] h-[300px] bg-white rounded-[20px]">
          <img class="choose-img absolute w-full h-full hidden" src="" alt="choose img" />
          <p class="text-[14px] text-center">Выберите изображение</p>
        </div>
      </label>

      <div class="flex justify-between mt-8">
        <div class="w-[49%] flex flex-col gap-[25px]">
          <label>
            <span class="pl-5 text-[14px] text-[#898989]">Выберите категорию</span>
            <select name="categoryId" class="w-full pl-4 text-[14px] py-[11px] bg-white shadow-md">
              <option value="0">Каркасные</option>
              <option value="1">Надувные</option>
            </select>
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите старую цену</span>
            <input name="oldPrice" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Старая цена" />
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите новую цену</span>
            <input name="newPrice" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Новая цена" />
          </label>
        </div>

        <div class="w-[49%] flex flex-col gap-[25px]">
          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите количество</span>
            <input name="quantity" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Количество" />
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите рамку</span>
            <select name="frameId" class="w-full pl-4 text-[14px] py-[11px] bg-white shadow-md">
              <option value="0">Металлический</option>
              <option value="1">Рамка призма</option>
              <option value="2">Мрамурогляндая</option>
            </select>
          </label>

          <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[22px] font-bold text-[14px] hover:opacity-[70%] duration-300 px-[14px]">Добавить</button>
        </div>
      </div>
    </form>
    
    `

  let elAddPoolForm = document.querySelector(".add-pool-form");
  let elChooseFile = document.querySelector(".choose-file");
  let elChooseImg = document.querySelector(".choose-img");
  let elSubmitBtn = document.querySelector(".add-btn");

  elChooseFile.addEventListener("change", function (evt) {
    elChooseImg.classList.remove("hidden");
    elChooseImg.src = URL.createObjectURL(evt.target.files[0]);
  });

  elAddPoolForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let pool = {
      id: products[products.length - 1]?.id ? products[products.length - 1].id + 1 : 1,
      imgURl: elChooseImg.src,
      oldPrice: evt.target.oldPrice.value,
      newPrice: evt.target.newPrice.value,
      categoryId: evt.target.categoryId.value,
      quantity: evt.target.quantity.value,
      frameId: evt.target.frameId.value,
    };

    products.push(pool);
    localStorage.setItem("products", JSON.stringify(products));
    elSubmitBtn.innerHTML = `
        <img class="mx-auto scale-[2]" src="./images/louding.png" alt="Loading..." width="20" height="20" />
    `
    setTimeout(() => {
      elSubmitBtn.innerHTML = `Добавить`
      setTimeout(() => {
        modalWrapper.classList.add("scale-0");
        if (pool.categoryId == "0") {
          elCategoryList.firstElementChild.className = activeList
          elCategoryList.lastElementChild.className = notActiveList
        } else {
          elCategoryList.lastElementChild.className = activeList
          elCategoryList.firstElementChild.className = notActiveList
        }
        renderProducts(products, elProductTable, pool.categoryId);
      }, 800)
    }, 1000)
    // console.log(products);

  })

}


// delet part start
let handleDeleteProduct = (id, categoryId) => {
  modalWrapper.classList.remove("scale-0");
  modalInner.innerHTML = `
    <div class="w-[600px]">
      <h1 class="font-bold mb-[20px] text-[35px] text-center">Вы хотите удалить?</h1>
      <div class="flex items-center justify-center gap-[20px]">
        <button onclick="handleCancel()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Отмена</button>
        <button onclick="deleteProduct(${id}, ${categoryId})" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Удалить</button>
      </div>
    </div>
  `;
}

function deleteProduct(id, categoryId) {
  let deleteId = products.findIndex(item => item.id == id);
  products.splice(deleteId, 1);
  renderProducts(products, elProductTable, categoryId);
  modalWrapper.classList.add("scale-0");
  localStorage.setItem("products", JSON.stringify(products));
}

// deletpart and 

//update part start 
function handleUpdateProduct(id){
  let findedObj = products.find(item => item.id == id)
  modalWrapper.classList.remove("scale-0")
  modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[800px] p-5 bg-[#F8F8F8] rounded-[20px]">
      <label>
        <input type="file" class="choose-file hidden" />
        <div class="relative mx-auto flex items-center justify-center border-[2px] border-dashed border-slate-500 w-[70%] h-[300px] bg-white rounded-[20px]">
          <img class="choose-img absolute w-full h-full" src="${findedObj.imgURl}" alt="choose img" />
          <p class="text-[14px] text-center">Выберите изображение</p>
        </div>
      </label>

      <div class="flex justify-between mt-8">
        <div class="w-[49%] flex flex-col gap-[25px]">
          <label>
            <span class="pl-5 text-[14px] text-[#898989]">Выберите категорию</span>
            <select name="categoryId" class="w-full pl-4 text-[14px] py-[11px] bg-white shadow-md">
              <option ${findedObj.categoryId == "0" && "selected"} value="0">Каркасные</option>
              <option ${findedObj.categoryId == "1" && "selected"} value="1">Надувные</option>
            </select>
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите старую цену</span>
            <input value="${findedObj.oldPrice}" name="oldPrice" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Старая цена" />
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите новую цену</span>
            <input value="${findedObj.newPrice}" name="newPrice" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Новая цена" />
          </label>
        </div>

        <div class="w-[49%] flex flex-col gap-[25px]">
          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите количество</span>
            <input value="${findedObj.quantity}" name="quantity" type="number" class="w-full pl-4 text-[14px] py-2 bg-white shadow-md" placeholder="Количество" />
          </label>

          <label>
            <span class="pl-4 text-[14px] text-[#898989]">Введите рамку</span>
            <select name="frameId" class="w-full pl-4 text-[14px] py-[11px] bg-white shadow-md">
              <option ${findedObj.frameId == "0" && "selected"} value="0">Металлический</option>
              <option ${findedObj.frameId == "1" && "selected"} value="1">Рамка призма</option>
              <option ${findedObj.frameId == "2" && "selected"} value="2">Мрамурогляндая</option>
            </select>
          </label>

          <button class="add-btn bg-[#009398] text-white py-[10px] rounded-[30px] mt-[22px] font-bold text-[14px] hover:opacity-[70%] duration-300 px-[14px]">Обнавить</button>
        </div>
      </div>
    </form>
  
  `

  let elUpdatePoolFrom = document.querySelector(".add-pool-form");
  let elChooseFile = document.querySelector(".choose-file");
  let elChooseImg = document.querySelector(".choose-img");
  let elSubmitBtn = document.querySelector(".add-btn");

  elChooseFile.addEventListener("change", function(evt){
    elChooseImg.src = URL.createObjectURL(evt.target.files[0])
  })

  
  elUpdatePoolFrom.addEventListener("submit", function(evt) {
    evt.preventDefault()

    findedObj.imgURL = elChooseImg.src
    findedObj.categoryId = evt.target.categoryId.value
    findedObj.oldPrice = evt.target.oldPrice.value
    findedObj.newPrice = evt.target.newPrice.value
    findedObj.quantity = evt.target.quantity.value
    findedObj.frameId = evt.target.frameId.value

    localStorage.setItem("products", JSON.stringify(products))
    elSubmitBtn.innerHTML = `
        <img class="mx-auto scale-[2]" src="./images/louding.png" alt="Loading..." width="20" height="20" />
    `

    setTimeout(() => {
      elSubmitBtn.innerHTML = `Обнавить`
      setTimeout(() => {
        modalWrapper.classList.add("scale-0")
        if(findedObj.categoryId == "0"){
          elCategoryList.firstElementChild.className = activeList
          elCategoryList.lastElementChild.className = notActiveList
        }else{
          elCategoryList.lastElementChild.className = activeList
          elCategoryList.firstElementChild.className = notActiveList
        }
        renderProducts(products, elProductTable, findedObj.categoryId)
      }, 800)
    }, 1000)
  })
  

}
//update part and

//search part start 
elSearchinput.addEventListener("input", function(e){
  let filteredProduct = products.filter(item => item.newPrice.includes(e.target.value))
  elCategoryList.firstElementChild.className = notActiveList
  elCategoryList.lastElementChild.className = notActiveList
  if(filteredProduct.length == 1){
    renderProducts(filteredProduct, elProductTable, filteredProduct[0].categoryId)
    if(filteredProduct[0].categoryId == "0"){
      elCategoryList.firstElementChild.className = activeList
      elCategoryList.lastElementChild.className = notActiveList
    }else{
      elCategoryList.lastElementChild.className = activeList
      elCategoryList.firstElementChild.className = notActiveList
    }
  }
  renderProducts(filteredProduct, elProductTable)
})

//search part end

