let isUser = document.querySelector(".logined-user");
let findedUser = JSON.parse(localStorage.getItem("user"));

let modalWrapper = document.querySelector(".modal-wrapper");
let modalInner = document.querySelector(".modal-inner");
let elCategoryList = document.querySelector(".category-list");

isUser.innerHTML = `${findedUser.firstName} ${findedUser.lastName}`;

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
    </div>`
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
  const text = e.target.textContent.trim();

  if (text === "Каркасные" || text === "Надувные") {
    const items = elCategoryList.children;
    for (let item of items) {
      item.className = "border-b-[3px] border-transparent text-[#A6A6A6] cursor-pointer font-bold text-[35px]";
    }
    e.target.className = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[35px]";
  }
});



// Mahsulot qo‘shish oynasi
function handleAddBtnClick() {
  modalWrapper.classList.remove("scale-0");
  modalInner.innerHTML = `
    <form autocomplete="off" class="w-[800px] p-5 bg-[#F8F8F8] rounded-[20px]">
      <label>
        <input type="file" class="hidden" />
        <div class="relative mx-auto flex items-center justify-center border-[2px] border-dashed border-slate-500 w-[70%] h-[300px] bg-white rounded-[20px]">
          <img class="absolute w-full h-full hidden" src="" alt="choose img" />
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

          <button class="bg-[#009398] text-white py-[10px] rounded-[30px] mt-[22px] font-bold text-[14px] hover:opacity-[70%] duration-300 px-[14px]">Добавить</button>
        </div>
      </div>
    </form>`;
}
