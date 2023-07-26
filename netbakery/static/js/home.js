document.querySelector('.mobile-toggle').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
  document.querySelector('.mobile-overlay').classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
});

document.querySelector('.mobile-overlay').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
  document.querySelector('.mobile-overlay').classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
});

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 3,
    },
  },
  a11y: {
    enabled: true,
    firstSlideMessage: 'This is the first slide',
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    paginationBulletMessage: 'Go to slide {{index}}',
  },
});

const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', e => {
  heroSection.querySelectorAll('.btn').forEach(btn => {
    const speed = btn.getAttribute('data-speed');
    const percent = 300;
    const x = (window.innerWidth - e.pageX * speed) / percent;
    const y = (window.innerHeight - e.pageY * speed) / percent;
    btn.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// shrink header when scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Scroll to section parts

const activeTabOrScrollTo = function (
  tabSection = navHome,
  sectionSelector = 'hero'
) {
  tabSection.addEventListener('click', e => {
    let currentActive = document.querySelector('.nav .active');

    //TODO If currentTarget is Bag tab, open shopping cart
    if (e.currentTarget === navBag){
      tabSection.parentElement.classList.toggle('active');
      if(e.currentTarget === document.body){
        document.querySelector('.bag-container').style.display = 'none';
      }
      else if(document.querySelector('.bag-container').style.display==='block'){
        document.querySelector('.bag-container').style.display = 'none';
      }
      else{
        document.querySelector('.bag-container').style.display = 'block';
      }
    }
    // (e.currentTarget !== navBag)
    else {
      currentActive.classList.remove('active');
      e.currentTarget.parentElement.classList.add('active');
    }

    // Scroll to tabSection if it's not navBag tab
    if (tabSection !== navBag) {
      let section = document.getElementById(sectionSelector).offsetTop;
      window.scrollTo({ top: section, behavior: 'smooth' });
    }
  });
};

const navHome = document.getElementById('nav__home');
activeTabOrScrollTo(navHome, 'hero');

const navAbout = document.getElementById('nav__about');
activeTabOrScrollTo(navAbout, 'about');

const navMenu = document.getElementById('nav__menu');
activeTabOrScrollTo(navMenu, 'menu');

const navBag = document.getElementById('nav__bag');
activeTabOrScrollTo(navBag, null);

//Product list

// const productList = [
//   {
//     id: 0,
//     image: "{{ url_for('static', filename='img/cupcake (0).png') }}",
//     price: 'Rs.350',
//     name: 'Cranberries cake',
//   },
//   {
//     id: 1,
//     image: "{{ url_for('static', filename='img/cupcake (1).png') }}",
//     price: 'Rs.340',
//     name: 'Blueberry cake',
//   },
//   {
//     id: 2,
//     image: "{{ url_for('static', filename='img/cupcake (2).png') }}",
//     price: 'Rs.335',
//     name: 'Strawberry cake',
//   },
//   {
//     id: 3,
//     image: "{{ url_for('static', filename='img/cupcake (3).png') }}",
//     price: 'Rs.355',
//     name: 'Mulberry cake',
//   },
//   {
//     id: 4,
//     image: "{{ url_for('static', filename='img/cupcake (4).png') }}",
//     price: 'Rs.350',
//     name: 'Milk cake',
//   },
//   {
//     id: 5,
//     image: "{{ url_for('static', filename='img/cupcake (5).png') }}",
//     price: 'Rs350',
//     name: 'Caramel cake',
//   },
//   {
//     id: 6,
//     image: "{{ url_for('static', filename='img/cupcake (6).png') }}",
//     price: 'Rs350',
//     name: 'Vanilla cake',
//   },
//   {
//     id: 7,
//     image: "{{ url_for('static', filename='img/cupcake (7).png') }}",
//     price: 'Rs350',
//     name: 'Lavender cake',
//   },
//   {
//     id: 8,
//     image: "{{ url_for('static', filename='img/cupcake (8).png') }}",
//     price: 'Rs350',
//     name: 'Rasberry cake',
//   },
//   {
//     id: 9,
//     image: "{{ url_for('static', filename='img/cupcake (9).png') }}",
//     price: 'Rs350',
//     name: 'Valentine cake',
//   },
//   {
//     id: 10,
//     image: "{{ url_for('static', filename='img/cupcake (10).png') }}",
//     price: 'Rs350',
//     name: 'Snowflake cake',
//   },
//   {
//     id: 11,
//     image: "{{ url_for('static', filename='img/cupcake (11).png') }}",
//     price: 'Rs350',
//     name: 'Christmas cake',
//   }
// ];
var orderData =[];
// Pagination for Menu Grid
const createProductCard = function (id) {

  const product = productList.find(productItem => {
    return productItem.id === id;
  });
  let productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const productCardImg = document.createElement('div');
  productCardImg.classList.add('product-card__img');

  const img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('alt', product.name);

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-small');
  btn.innerText = 'Add to Bag';
  productCardImg.append(img, btn);

  const bagContainer = document.querySelector('.bag-container');
  function emptybag(){
    if(orderData.length <= 0){
      let bagContainer = document.querySelector('.bag-container');
      bagContainer.innerHTML = `<div style='font-size: 18px;text-align:center;'><h2>Nothing to show</h2>
      <p>No Orders Made</p><button onclick="listDispatches()">Show Past Orders</button></div>`;
    }
   }
  emptybag();

  btn.addEventListener('click', e => {

    document.querySelector('.item-added').style.display = 'block';
    setTimeout(()=>{
      document.querySelector('.item-added').style.display = 'none';
    },
    1200);

    let orderItems = {
      itemId: e.currentTarget.parentElement.parentElement.querySelector('.product-card__id').innerText,
      itemImage : e.currentTarget.parentElement.querySelector('img').src,
      itemName :  e.currentTarget.parentElement.parentElement.querySelector('.product-card__name').innerText,
      itemPrice : e.currentTarget.parentElement.parentElement.querySelector('.product-card__price').innerText
    }
      orderData.push(orderItems);

      if(orderData.length <= 0){
        let bagContainer = document.querySelector('.bag-container');
        bagContainer.innerHTML = `<div style='font-size: 18px;text-align:center;'><h2>Nothing to show</h2>
        <p>No Orders Made</p><button onclick="listDispatches()">Show Past Orders</button></div>`;
      }
      else{
        bagContainer.innerHTML = '<button class="purchase-btn" onClick="purchaseClicked()">Buy</button>';
        orderData.forEach(item=>{
            let div = document.createElement('div');
            div.setAttribute('class','ordered-item');
            div.innerHTML = `<img src="${item.itemImage}" alt="">
            <span>${item.itemName}</span>
            <span>${item.itemPrice}</span>
            <span class="delete-order"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M15.292 7.295 12 10.587 8.708 7.295 7.294 8.709l3.292 3.292-3.292 3.292 1.414 1.414L12 13.415l3.292 3.292 1.414-1.414-3.292-3.292 3.292-3.292z"></path></svg>
            </span>`;
            bagContainer.appendChild(div);

        });
      }
      const cartOrders = document.querySelectorAll('.delete-order');
cartOrders.forEach((order=>{
  order.addEventListener('click',(e)=>{
    orderData.splice(-1, 1);
    e.currentTarget.parentElement.remove();
    if(orderData.length <= 0){
      bagContainer.innerHTML = `<div style='font-size: 18px;text-align:center;'><h2>Nothing to show</h2>
      <p>No Orders Made</p><button onclick="listDispatches()">Show Past Orders</button></div>`;
    }

  });
}));
    product.counter ??= 0;
    product.counter++;
    localStorage.setItem(`Item ${id}`, JSON.stringify(productList[id]));
  });

  productCard.append(productCardImg);

  const productId = document.createElement('div');
  productId.style.display = 'none';
  productId.classList.add('product-card__id');
  productId.innerText = product.id;
  productCard.append(productId)

  const productCardPrice = document.createElement('div');
  productCardPrice.classList.add('product-card__price');
  productCardPrice.innerText = product.price;
  productCard.append(productCardPrice);

  const productCardName = document.createElement('div');
  productCardName.classList.add('product-card__name');
  productCardName.innerText = product.name;
  productCard.append(productCardName);

  return productCard;
};


const readMore = document.querySelector('.about__info__btn');
const moreText = document.querySelector('.description-2');
readMore.addEventListener('click', ()=>{
  if(moreText.style.display == 'block'){
    moreText.style.display = 'none';
    readMore.querySelector('button').innerText = 'Read more';
  }
  else{
    moreText.style.display = 'block';
    readMore.querySelector('button').innerText = 'Read less';
  }
});

const abtbtn = document.querySelector('#about-us-btn');
const aboutUs = document.querySelector('.about-us');
abtbtn.addEventListener('click', ()=>{
  if(aboutUs.style.display == 'block'){
    aboutUs.style.display = 'none'
  }
  else{
    aboutUs.style.display = 'block';
  }
})

const displayList = function (items, wrapper, rowsPerPage, page) {
  wrapper.innerHTML = '';
  page--;

  const pageCount = Math.ceil(items.length / rowsPerPage);
  let start = (rowsPerPage * page) + 1;
  let end =
    page !== pageCount - 1 ||
    (page === pageCount - 1 && items.length % rowsPerPage === 0)
      ? start + rowsPerPage
      : start + (items.length % rowsPerPage);
  let paginatedItems = items.slice(start, end);

  for (let i = start; i < end; i++) {
    const productCard = createProductCard(i);
    wrapper.append(productCard);
  }
};

const setUpPagination = function (items, wrapper, rowsPerPage) {
  wrapper.innerHTML = '';

  let pageCount = Math.ceil(items.length / rowsPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i, items);
    btn.classList.add('btn-page', 'btn');
    wrapper.append(btn);
  }
};

// Pagination Button

const paginationButton = function (page, items) {
  let button = document.createElement('button');
  button.innerText = page;

  if (currentPage === page) button.classList.add('active');

  button.addEventListener('click', () => {
    currentPage = page;
    displayList(items, productGrid, rows, currentPage);

    let currentBtn = document.querySelector('#pagination button.active');
    currentBtn.classList.remove('active');
    button.classList.add('active');
  });
  return button;
};

const productGrid = document.querySelector('.product-grid');
const paginationEl = document.getElementById('pagination');

let currentPage = 1;
// responsive row grid
let rows = window.matchMedia('(min-width: 769px) and (max-width: 1365px)')
  .matches
  ? 3
  : 4;

displayList(productList, productGrid, rows, currentPage);
setUpPagination(productList, paginationEl, rows);

// localStorage for adding items into card

// const addToBag = function () {
//   localStorage.setItem('Product');
// };
// addToBag()

const purchaseBtn = document.querySelector('.purchase-btn');
const bagContainer = document.querySelector('.bag-container');

function purchased(e, name, address, pincode, phone){
  const bagContainer = document.querySelector('.bag-container');
  let btnDiv = document.createElement('div');
  btnDiv.innerHTML = `<button style="font-size: 20px;" id="back-from-details">&laquo; Back/Clear</button><br><br>`;
  bagContainer.innerHTML = btnDiv.innerHTML;

  let div = document.createElement('div');
  let totalPrice = 0;
  for (let i = 0; i < orderData.length; i++) {
    totalPrice = totalPrice+Number(orderData[i].itemPrice.replace( /^\D+/g, ''));
  }
  let today = new Date().toISOString().slice(0, 10)
  div.innerHTML = `<div id='shipping-details' style="text-align:center; font-size:1.5em; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; width:750px;">
  <h2>Your Order</h2>
  Name: ${e.currentTarget.parentElement.querySelector('.person-name').value}<br>
    Ordered on: ${today}<br>
    <!-- Order id: ${Date.now()}<br> -->
    Total Bill: Rs ${totalPrice}
    <br><br>
    <button style="font-size: 18px;" id="print-details">Print</button>
    </div>`;
;
  const products_ordered = [];
  orderData.forEach(item=>{
    products_ordered.push(item.itemId)
  });

  $.post("/db/add-dispatch", {
    name: name,
    address: address,
    pincode: pincode,
    phone: phone,
    products: JSON.stringify(products_ordered)
  });

  bagContainer.appendChild(div);
  document.getElementById('print-details').addEventListener('click',(e)=>{
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(e.currentTarget.parentElement.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    bagContainer.innerHTML = `<div style='font-size: 18px;text-align:center;'><h2>Nothing to show</h2>
    <p>No Orders Made</p><button onclick="listDispatches()">Show Past Orders</button></div>`;
  })

  document.getElementById('back-from-details').addEventListener('click',(e)=>{
    bagContainer.innerHTML = `<div style='font-size: 18px;text-align:center;'><h2>Nothing to show</h2>
    <p>No Orders Made</p><button onclick="listDispatches()">Show Past Orders</button></div>`;
  })
}

function add_purchase(e) {
    purchased(e, document.getElementById("order-name").value, document.getElementById("order-address").value, document.getElementById("order-pincode").value, document.getElementById("order-phone").value);
}

function purchaseClicked(){
  let bagContainer = document.querySelector('.bag-container');
  bagContainer.innerHTML = `<div class="form">
      <h1>Fill Your Details</h1>
        <div>
            <input id="order-name" type="text" class="person-name" placeholder="Full Name" required>
            <input id="order-address" type="text" placeholder="Address" required>
            <input id="order-pincode" type="number" placeholder="PIN CODE" maxlength="6" required>
            <input id="order-phone" type="number" placeholder="Phone Number" required>
            <button class="purchase-btn" onClick="add_purchase(event)" id="buy">Buy</button>
        </div>
      </div>`;
  if(orderData.length<=0){
    bagContainer.innerHTML = '<h2 style="text-align: center;">Please Select Items First.</h2>'
  }
}
