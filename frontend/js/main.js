// Hàm hiển thị toàn bộ sách
async function displayBooks() {
  const bookList = document.getElementById("book-list");

  try {
    const response = await fetch("http://localhost/BookStore/backend/books/get_books.php", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`==>Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();

    bookList.innerHTML = "";

    data.forEach((book) => {
      console.log("Thông tin sách: ", book);
      
      const bookDiv = document.createElement("div");
      bookDiv.innerHTML = `
        <img class="book_cover" src="${book.book_cover}" alt="">
        <h3 class="title">${book.title}</h3>
        <p class="price">${book.price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
        <button class="button-view" onclick="viewBook(${book.book_id})">View</button>
      `;
      bookList.appendChild(bookDiv);
    });
  } catch (error) {
    console.error("==>Lỗi khi tải danh sách sách:", error);
  }
}

// Chạy hàm hiển thị sách khi tải trang
window.onload = displayBooks;

// Hàm tìm kiếm sách
async function searchBooks() {
  const input = document.getElementById("search-bar").value;
  const bookList = document.getElementById("book-list");

  try {
    const response = await fetch(`http://localhost/BookStore/backend/books/search_book.php?term=${input}`);
    const books = await response.json();

    
    if (books.length == 0) {
      alert("No books found with the given title.");
      return;
    }

    // Làm rỗng danh sách hiện tại và hiển thị kết quả
    bookList.innerHTML = "";
    
    books.forEach((book) => {
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `
        <img class="book_cover" src="${book.book_cover}" alt="">
        <h3 class="title">${book.title}</h3>
        <p class="price">${book.price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
        <button class="button-view" onclick="viewBook(${book.bookId})">View</button>
      `;
      bookList.appendChild(resultDiv);
    });
  } catch (error) {
    console.error("Error searching books:", error);
    alert("An error occurred while searching for books. Please try again.");
  }
}

// Hàm xem chi tiết sách
async function viewBook(bookId) {
  console.log(bookId);
  
  try {
    const response = await fetch(`http://localhost/BookStore/backend/books/view_book.php?bookId=${bookId}`);
    const bookDetails = await response.json();

    console.log(bookDetails);

    // Set the modal content
    const modalTitle = document.getElementById("bookModalLabel");
    const modalBody = document.getElementById("bookModalBody");

    modalTitle.innerText = bookDetails[0][0].title;
    modalBody.innerHTML = `
      <div class="container my-5">
          <div class="row">
              <div class="col-md-4">
                  <img src="${bookDetails[0][0].book_cover}" class="img-fluid rounded" alt="${bookDetails[0][0].title}">
              </div>
              <div class="col-md-8">
                  <h2 class="mb-3">${bookDetails[0][0].title}</h2>
                  <h5 class="text-muted">${bookDetails[0][0].author}</h5>
                  <p class="mt-4">
                      <strong>Genre:</strong> ${bookDetails[0][0].genre_name} <br>
                      <strong>Publisher:</strong> Publisher Name <br>
                      <strong>Publication Date:</strong> January 1, 2022 <br>
                      <strong>ISBN:</strong> 123-4567891234
                  </p>
                  <p class="mt-4">
                      <strong>Description:</strong> ${bookDetails[0][0].description}
                  </p>
                  <p class="fs-4 fw-bold text-danger">${bookDetails[0][0].price}đ</p>
                  <button class="btn btn-success button-main" onclick="addToCart(${bookId})">Add to Cart</button>
                  <button class="btn btn-warning button-main">Buy</button>
              </div>
          </div>
      </div>
    `;

    // Show the modal
    const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
    bookModal.show();
  } catch (error) {
    console.error("Error viewing book:", error);
    alert("Failed to load book details. Please try again.");
  }
}

// Hàm lọc sách
async function filterBooks() {
  const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
    .map(checkbox => checkbox.value)
    .join(',');
  
  const price = document.querySelector('input[name="price"]:checked')?.value || 0;
  const sortOption = document.getElementById('price-sort').value;

  console.log(genres, price, sortOption );

  const apiUrl = `http://localhost/BookStore/backend/books/filter_book.php?genre=${genres}&price=${price}&sortOption=${sortOption}`;
  const bookList = document.getElementById('book-list');

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    bookList.innerHTML = "";
    data.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.innerHTML = `
        <img class="book_cover" src=${book.book_cover} alt="">
        <h3 class="title">${book.title}</h3>
        <p class="price">${book.price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
        <button class="button-view" onclick="viewBook(${book.bookId})">View</button>
      `;
      bookList.appendChild(bookDiv);
    });
  } catch (error) {
    console.error("Error filtering books:", error);
    alert("Failed to filter books. Please try again later.");
  }
}

// Hàm kiểm tra trạng thái đăng nhập
function checkLogin() {
  const userId = localStorage.getItem("userId");
  if (userId) {
    document.querySelector("header .nav .nav-login a").textContent = "Giang";
    document.querySelector("header .nav .nav-admin").classList.add("nav-hide");
  }
}

// checkLogin();

// Hàm đăng ký người dùng
async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const passwordUser = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  try {
    const response = await fetch("http://localhost:8081/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phoneNumber,
        passwordUser,
        confirmPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Registration successful:", result);
      alert(result.message);
      window.location.href = "login.html";
    } else {
      console.error("Registration failed:", result.message);
      alert(`Registration failed: ${result.message}`);
    }
  } catch (error) {
    console.error("Error registering user:", error);
    alert("An error occurred during registration. Please try again later.");
  }
}

// Hàm đăng nhập người dùng
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`http://localhost/BookStore/backend/users/login.php?username=${username}&password=${password}`);
    
    if (response.ok) {
      const user = await response.json();
      console.log("User:", user);

      // Store user data in localStorage
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.userId);

      alert(`Welcome, ${user.username}!`);
      window.location.href = "index.html"; // Redirect to the main page
    } else {
      alert("Login failed. Please check your username and password.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("An error occurred during login. Please try again later.");
  }
}

// Hàm reset mật khẩu
async function resetPassword() {
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  // Check if all fields are filled and passwords match
  if (!email || !newPassword || !confirmPassword) {
    alert("Please fill in all required fields.");
    return;
  }
  if (newPassword !== confirmPassword) {
    alert("Password confirmation does not match.");
    return;
  }

  // Send password reset request to the server
  try {
    const response = await fetch('http://localhost:8081/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        newPassword,
        confirmPassword
      })
    });

    if (response.ok) {
      const message = await response.text();
      alert(`Success: ${message}`);
      window.location.href = "login.html"; // Redirect to the login page
    } else {
      const errorMessage = await response.text();
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("An error occurred while connecting to the server. Please try again later.");
  }
}

// Hàm thêm sách vào giỏ hàng
async function addToCart(bookId) {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(`http://localhost:8081/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: { userId },
        book: { bookId },
        quantity: 1
      })
    });

    if (response.ok) {
      alert("Book has been added to the cart.");
    } else {
      alert("Failed to add book to the cart. Please try again.");
    }
  } catch (error) {
    console.error("Error adding book to cart:", error);
    alert("An error occurred. Please try again later.");
  }
}

// Hàm xóa sách ra khỏi giỏ hàng
async function removeCartItem(cartId) {
  try {
    const response = await fetch(`http://localhost:8081/cart/remove/${cartId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Book has been removed from the cart.");
      window.location.reload();
    } else {
      alert("Failed to remove book from the cart. Please try again.");
    }
  } catch (error) {
    console.error("Error removing book:", error);
    alert("An error occurred. Please try again later.");
  }
}

// Hàm hiển thị sách trong giỏ hàng
async function loadCartItems() {
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(`http://localhost:8081/cart/id/${userId}`);

    if (response.ok) {
      const cartItems = await response.json();
      const cartContainer = document.getElementById("cart-list");
      cartContainer.innerHTML = "";

      cartItems.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
          <div class="card mb-3">
              <div class="row g-0">
                  <div class="col-md-4 cart-image">
                      <img src="${item.book.book_cover}" class="img-fluid rounded-start" alt="${item.book.title}">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title">${item.book.title}</h5>
                          <p class="card-text">${item.book.price}đ</p>
                          <div class="input-group mb-3" style="max-width: 120px;">
                              <button class="btn btn-outline-secondary btn-minus" type="button">-</button>
                              <input type="text" class="form-control text-center" value="${item.quantity}">
                              <button class="btn btn-outline-secondary btn-plus" type="button">+</button>
                          </div>
                          <button class="btn btn-danger" onclick="removeCartItem(${item.cartId})">Remove</button>
                      </div>
                  </div>
              </div>
          </div>
        `;
        cartContainer.appendChild(cartItemElement);
      });

      const cartSummary = document.getElementById("cart-summary");
      cartSummary.innerHTML = `
        <div class="card p-3">
            <h5 class="card-title">Cart Summary</h5>
            <p class="card-text">Total: $29.99</p>
            <button class="btn btn-primary">Proceed to Checkout</button>
        </div>
      `;
    } else {
      console.error("Failed to load cart items.");
      alert("Failed to load cart items. Please try again later.");
    }
  } catch (error) {
    console.error("Error loading cart items:", error);
    alert("An error occurred while loading cart items.");
  }
}

// loadCartItems();
