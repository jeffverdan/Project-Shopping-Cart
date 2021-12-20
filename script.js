const cartItems = document.querySelector('.cart__items');
const selectItems = document.querySelector('.items');
const total = document.querySelector('.total-price');
const loading = document.querySelector('.loading');
const clear = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function createCartItemElement(p) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  if (typeof p === 'object') {
    li.innerText = `SKU: ${p.id} | NAME: ${p.title} | PRICE: $${p.price}`;
    return li;
  }
  li.innerText = p;
  cartItems.appendChild(li);
}

function sum() {
  return [...cartItems.children].reduce((a, { innerHTML }) => {
    let soma = a;
    soma += (Number(innerHTML.substring((innerHTML.indexOf('$')) + 1)));
    return soma;
  }, 0);
}

clear.addEventListener('click', () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.children);
  total.innerHTML = sum();
});

cartItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart__item')) {
    e.target.remove();
    saveCartItems(cartItems.children);
    total.innerHTML = sum();
  }  
});

async function selectItem(id) {
  const item = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(item));
}

selectItems.addEventListener('click', async (e) => {
  if (e.target.classList.contains('item__add')) {
    const id = e.path[1].children[0].innerText;
    await selectItem(id);
    saveCartItems(cartItems.children);
    total.innerHTML = sum();
  }
});

function reLoad() {
  const test = Object.keys(JSON.parse(getSavedCartItems()));
  for (let i = 0; i < test.length; i += 1) {
    createCartItemElement((JSON.parse(getSavedCartItems())[i]));
  }
}

window.onload = async () => {
  const itens = await fetchProducts('computador');
  if (itens) {
    loading.remove();
  }
  itens.forEach((element) => {
    selectItems.appendChild(createProductItemElement(element));
  });
  reLoad();
  total.innerHTML = sum();
};
