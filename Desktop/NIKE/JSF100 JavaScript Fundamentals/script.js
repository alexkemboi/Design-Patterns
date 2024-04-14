
  const slider = document.querySelector('.slider');
  const indicator = document.querySelector('.indicator');
  const cartdiv = document.querySelector('.cart');
  const cartList = document.querySelector('.cart-list');
  const cart = []; // Array to store items added to the cart

  const images = [
    { url: 'images/nike1.jpg', description: 'Nike Air Max 1 (2023)', price: 120 },
    { url: 'images/nike5.jpg', description: 'Nike Waffle Trainer (2020)', price: 90 },
    { url: 'images/nike2.jpg', description: 'Nike Air Jordan 1 (2024)', price: 150 },
    { url: 'images/nike6.jpg', description: 'Nike Air Force 1 (2024)', price: 110 },
    { url: 'images/nike5.jpg', description: 'Nike Waffle Trainer (2020)', price: 90 },
  ];

let currentSlide = 0;

// Function to create image elements with descriptions
function createImageElement(imageUrl, description) {
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = description;

  const imageDescription = document.createElement('div');
  imageDescription.classList.add('image-description');
  imageDescription.textContent = description;
  imageDescription.style.textAlign = 'center';

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  imageContainer.appendChild(imageDescription);
  imageContainer.appendChild(image);

  return imageContainer;
}

// Function to create indicator dots
function createIndicatorDots() {
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', function() {
      currentSlide = this.dataset.index;
      updateSlider(currentSlide);
    });
    indicator.appendChild(dot);
  }
}

// Function to update slider content and indicator dots
function updateSlider(currentSlide) {
  slider.innerHTML = ''; // Clear existing content
  const imageContainer = createImageElement(images[currentSlide].url, images[currentSlide].description);
  slider.appendChild(imageContainer);  
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
  currentSlide = (currentSlide + 1) % images.length; // Loop back to first image
}

// Create image elements and indicator dots

  const imageContainer = createImageElement(images[currentSlide].url, images[currentSlide].description);
  slider.appendChild(imageContainer);

createIndicatorDots();

// Function to handle next button click
function nextSlide() {
  currentSlide = (currentSlide + 1) % images.length;
  updateSlider(currentSlide);
}

// Function to handle previous button click
function prevSlide() {
  currentSlide = (currentSlide - 1+images.length) % images.length;
  updateSlider(currentSlide);
}

// Start the automatic slide show
setInterval(nextSlide, 5000); //Interval (in milliseconds) to adjust automatic slide timing


// Function to create card elements
function createCardElement(imageUrl, description, price) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = description;

  const imageDescription = document.createElement('div');
  imageDescription.classList.add('image-description');
  imageDescription.textContent = description;

  const imagePrice = document.createElement('div');
  imagePrice.classList.add('image-price');
  imagePrice.textContent = `$${price}`;

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', function() {
    addToCart(description, price);
  });

  card.appendChild(image);
  card.appendChild(imageDescription);
  card.appendChild(imagePrice);
  card.appendChild(addToCartButton);

  return card;
}
function addToCart(description, price) {
  cart.push({ description, price });
  console.log('Item added to cart:', description);
  console.log('Cart:', cart); 
}

images.forEach(image => {
  const cardElement = createCardElement(image.url, image.description, image.price);
  cartdiv.appendChild(cardElement);
});
// Function to add item to cart and update cart display
function addToCart(description, price) {
  // Add item to cart array
  cart.push({ description, price });
  
  // Update cart display
  updateCartDisplay();
  
  
}

// Function to update cart display
function updateCartDisplay() {
  // Clear existing cart list
  cartList.innerHTML = '';
  
  // Iterate over cart array and create list items for each item
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.description} - $${item.price}`;
    cartList.appendChild(listItem);
  });
}