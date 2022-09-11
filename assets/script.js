'use strict';

const homeProduct = document.querySelector('.home-product').children[0];
console.log(homeProduct);
class User {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  userName;
  passWord;
  constructor(userName, passWord) {
    this.userName = userName;
    this.passWord = passWord;
    this.cart = [];
  }
}

class Product {
  idItem = (Date.now() + '').slice(-10);

  constructor(type, urlImg, title, oldPri, newPri, brand, country, sale) {
    this.type = type;
    this.urlImg = urlImg;
    this.title = title;
    this.oldPri = oldPri;
    this.newPri = newPri;
    this.brand = brand;
    this.country = country;
    this.sale = sale;
    this._addProduct();
  }

  _addProduct() {
    let html = `
    <div class="grid__column-2-4">
    <div class="home-product__item " data-id = "${this.idItem}">
      <div
        class="home-product__item-img"
        style="
          background-image: url(${this.urlImg});
        "
      ></div>
      <h5 class="product__item-name">
        ${this.title}
      </h5>
      <div class="home-product__item-price">
        <span class="product-item__old-price">${this.oldPri}</span>
        <span class="product-item__new-price">${this.newPri}</span>
      </div>

      <div class="home-product__item-icon">
        <!--product-icon--active-->
        <div class="home-product__icon-heart">
          <i class="icon__heart--no-like fas fa-heart"></i>
          <i class="icon__heart--liked fas fa-heart"></i>
        </div>
        <div class="home-product__icon-star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>

      <div class="home-product__item-origin">
        <span class="home-product__item-brand">${this.brand}</span>
        <span class="home-product__item-origin-name"
          >${this.country}</span
        >
      </div>

      <button class="buy-product">Order</button>

      <div class="home-product__item-label1">
        <i class="fas fa-check"></i>
        Yeu thich
      </div>

      <div class="home-product__item-label2">
        <span class="home-product__item-sale-percent">${this.sale}</span>
        <span class="home-product__item-sale-label">GIAM</span>
      </div>
    </div>
  </div>`;

    homeProduct.insertAdjacentHTML('beforeend', html);
  }
}

const item1 = new Product(
  'Ao so mi',
  'https://cf.shopee.vn/file/53cc5e24b53b7322c4f7bd4c04916789',
  'Áo thun tay lỡ unisex SADLUV - Áo phông nam nữ form rộng cho cặp đôi phong cách hàn quốc vải dày dặn',
  '300.000d',
  '200.000d',
  'Now',
  'Vietnam',
  '24%'
);

const item2 = new Product(
  'Ao so mi',
  'https://cf.shopee.vn/file/5f50b6f851ff03d1154d06deef4460bd',
  'Áo thun tay lỡ unisex THỎ BAD RABBIT- Áo phông F&S nữ form rộng cho cặp đôi phong cách hàn quốc vải dày dặn, thoáng mát',
  '400.000d',
  '100.000d',
  'Bui',
  'Han Quoc',
  '14%'
);

const item3 = new Product(
  'Ao khoac',
  '	https://cf.shopee.vn/file/45c5e59b7cef4dae67519fef04add7bd',
  '(Rẻ) Áo hoodie nam nữ,Áo sweater nỉ nam nữ from rộng Unisex chất nỉ ngoại siêu dày dặn in chữ DELIG (ảnh thật)',
  '300.000d',
  '500.000d',
  'Bo Bui',
  'Dai Loan',
  '9%'
);

const item4 = new Product(
  'Ao khoac',
  'https://cf.shopee.vn/file/c8099a22c9d4c0611746a160f2a94df0',
  'Áo khoác Nam Nữ 40-100kg dây kéo mũ trùm đầu Sói Store bigsize 4 màu',
  '100.000d',
  '50.000d',
  'Bo',
  'Dai Loan',
  '19%'
);

// ////////// APPLICATION ARCHITECTURER

const formRegister = document.querySelector('.auth__form-register');
const formLogin = document.querySelector('.auth__form-login');
const formInputEmail = document.querySelector('.form__res-email');
const formInputPass = document.querySelector('.form__res-pass');
const formInputRePass = document.querySelector('.form__res-re-pass');
const btnRegister = document.querySelector('.btn__register');
const formLoginUser = document.querySelector('.form__login-user');
const formLoginPass = document.querySelector('.form__login-pass');
const btnLogin = document.querySelector('.btn__login');
const modalContainer = document.querySelector('.modal');
const btnLoginChange = document.querySelectorAll('.btn__login--change');
const btnLoginBack = document.querySelectorAll('.btn__control--back');
const headerRegister = document.querySelector('.header__register');
const headerLogin = document.querySelector('.header__login');
const headerUser = document.querySelector('.header--user');
const homeProductContainer = document.querySelector('.grid__column-10');
const headerCartNo = document.querySelector('.header__cart--no');
const headerCartList = document.querySelector('.cart__list-list');
const headerListCart = document.querySelector('.header__cart-list');
console.log(homeProductContainer);

class App {
  users = [];
  currentUser;
  products = [item1, item2, item3, item4];
  constructor() {
    // Get data from local storage
    this._getLocalStorage();

    // Render Cart List

    this._renderCartList(this.currentUser.cart);

    // Attach event handlers
    headerRegister.addEventListener('click', this._openModal.bind(this));
    headerLogin.addEventListener('click', this._openModal.bind(this));
    btnLoginChange.forEach(el => {
      el.addEventListener('click', this._convertForm);
    });
    btnLoginBack.forEach(el => {
      el.addEventListener('click', this._convertForm);
    });
    btnLogin.addEventListener('click', this._login.bind(this));
    btnRegister.addEventListener('click', this._getNewInforUser.bind(this));

    //Buy product
    homeProductContainer.addEventListener(
      'click',
      this._addProductToCart.bind(this)
    );
  }

  //openModal
  _openModal(e) {
    console.log(e.target);

    //open check and render modal
    modalContainer.classList.remove('modal--disable');
    formRegister.classList.add('modal--disable');
    formLogin.classList.add('modal--disable');

    if (e.target.classList.contains('header__register')) {
      formRegister.classList.toggle('modal--disable');
    } else {
      formLogin.classList.toggle('modal--disable');
    }
  }

  // Register a new Account
  _getNewInforUser() {
    let newUser;
    let userN = formInputEmail.value;
    let passW = formInputPass.value;

    if (passW != formInputRePass.value) {
      formInputRePass.value = '';
      formInputRePass.setAttribute('placeholder', 'Wrong password');
    }

    newUser = new User(userN, passW);

    // Add new object to users array
    this.users.push(newUser);

    // Save to local Storage
    this._setLocalStorage();

    this._convertForm();

    this._defaultForm();
  }

  //Login
  _login() {
    let user = formLoginUser.value;
    let pass = formLoginPass.value;

    //check if acc available
    if (this.users.find(el => el.userName == user)?.passWord !== pass) {
      formLoginPass.value = '';
      formLoginPass.setAttribute('placeholder', 'Wrong password');
      return;
    }

    //render Main Page
    modalContainer.classList.add('modal--disable');

    this._defaultForm();

    //render user header information
    this._renderHeaderUserIn4(user);

    this.currentUser = this.users.find(el => el.userName === user);
  }

  //convert Login & Register
  _convertForm() {
    formLogin.classList.toggle('modal--disable');
    formRegister.classList.toggle('modal--disable');
  }

  _defaultForm() {
    formInputEmail.value = '';
    formInputPass.value = '';
    formInputRePass.value = '';
    formLoginUser.value = '';
    formLoginPass.value = '';
  }

  _renderHeaderUserIn4(user) {
    headerLogin.classList.add('header--no-active');
    headerRegister.classList.add('header--no-active');
    headerUser.classList.add('header--active');

    let name = headerUser.querySelector('.header__user-name');
    name.textContent = user;
  }

  _addProductToCart(e) {
    if (!e.target.classList.contains('buy-product')) return;

    //get id product
    let id = e.target.closest('.home-product__item').dataset.id;

    console.log(this.currentUser);
    //add to cart array CurrentUser
    this.products.forEach(el => {
      if (el.idItem === id) {
        this.currentUser.cart.push(el);
      }
    });

    //render cart list
    this._renderCartList(this.currentUser.cart);
  }

  _renderCartList(cart) {
    //Check whether cart has item or not
    if (cart.length === 0) {
      // render no item
      headerCartNo.classList.add('.header__nocard--active');
      headerListCart.classList.add('modal--disable');
    } else {
      headerCartNo.classList.remove('.header__nocard--active');
      headerListCart.classList.remove('modal--disable');
      //edit arr cart
      let newCart = [];
      cart.forEach(el => {
        if (!newCart.includes(el)) {
          newCart.push(el);
          newCart[newCart.indexOf(el)].quantity = 1;
        } else {
          newCart[newCart.indexOf(el)].quantity += 1;
        }
      });
      //render item list
      newCart.forEach(el => {
        let html1 = `<li class="cart__list-item">
        <img
          src="./assets/img/kem.jpg"
          alt=""
          class="cart__list-img"
        />

        <div class="cart__list-info">
          <div class="cart__list-main">
            <div class="list__main-1">${el.title}</div>
            <div class="list__main-2">${el.newPri}x${el.quantity}</div>
          </div>
          <div class="cart__list-sub">
            <div class="list__sub-1">Noi xuat xu: ${el.brand}</div>
            <span class="list__sub--delete">Xoa</span>
          </div>
        </div>
      </li>`;

        headerCartList.insertAdjacentHTML('beforeend', html1);
      });
    }
  }

  _setLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('users'));

    if (!data) return;

    this.users = data;
  }

  _removeLocalStorage() {
    localStorage.removeItem('users');
  }
}

const Shoppe = new App();
