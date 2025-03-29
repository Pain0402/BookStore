function createPagination(page = 1, booksPerPage = 12, booksData, func) {
  const bookList = document.getElementById("book-list");
  const pagination = document.getElementById("pagination");
  bookList.innerHTML = "";
  pagination.innerHTML = "";

  const totalPages = Math.ceil(booksData.length / booksPerPage);
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = booksData.slice(start, end);

  booksToShow.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-item");
    bookDiv.setAttribute("onclick", `viewBook(${book.book_id})`);

    bookDiv.innerHTML = `
      <img class="book_cover" src="${book.book_cover}" alt="">
      <h3 class="title">${book.title}</h3>
      <p class="price">${book.price}đ</p>
      <p class="rate">Rating: 5/5⭐</p>
    `;

    bookList.appendChild(bookDiv);
  });

  for(let i = 1; i <= totalPages; i++){
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("page-btn");
    if (i === page) button.classList.add("active");
    button.addEventListener("click", () => func(i));
    pagination.appendChild(button);
  }
}

// Hàm hiển thị toàn bộ sách
async function displayBooks(page = 1, booksPerPage = 12) {
  try {
    const response = await fetch("http://localhost/BookStore/backend/books/get_book.php", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`==>Lỗi HTTP: ${response.status}`);
    }

    const booksData = await response.json();
    
    createPagination(page, booksPerPage, booksData, displayBooks);
    
  } catch (error) {
    console.error("==>Lỗi khi tải danh sách sách:", error);
  }
}

// Gọi hàm khi trang tải
displayBooks();

// Hàm tìm kiếm sách
async function searchBooks(page = 1, booksPerPage = 12) {
  const input = document.getElementById("search-bar").value;

  try {
    const response = await fetch(`http://localhost/BookStore/backend/books/search_book.php?term=${input}`);
    
    if (!response.ok) {
      throw new Error(`==> Lỗi HTTP: ${response.status}`);
    }

    const books = await response.json();

    if (books.length === 0) {
      alert("Không tìm thấy sách nào với từ khoá đã nhập.");
      return;
    }

    createPagination(page, booksPerPage, books, searchBooks);
    
   
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sách:", error);
    alert("Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.");
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      searchBooks();
  }
});


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
async function filterBooks(page = 1, booksPerPage = 4) {
  const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
    .map(checkbox => checkbox.value)
    .join(',');
  
  const price = document.querySelector('input[name="price"]:checked')?.value || 0;
  const sortOption = document.getElementById('price-sort').value;

  console.log(genres, price, sortOption );
  try {
    const response = await fetch(`http://localhost/BookStore/backend/books/filter_book.php?genre=${genres}&price=${price}&sortOption=${sortOption}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`==>Lỗi HTTP: ${response.status}`);
    }

    const booksData = await response.json();
    
    createPagination(page, booksPerPage, booksData, filterBooks);
    
  } catch (error) {
    console.error("==>Lỗi khi tải danh sách sách:", error);
  }
}

function showFilter() {
  const filter = document.querySelector('.container .filter');
  console.log(filter.style.display);
  if (filter.style.display === 'none' || filter.style.display === '') {
    filter.style.display = 'block';
  } else {
    filter.style.display = 'none';
  }
  
}

function slide(){
  let listImg = document.querySelectorAll(".container-slide img");

  let next = document.querySelector(".container-slide .next");

  let prev = document.querySelector(".container-slide  .prev");

  let containerImg = document.querySelector(".container-slide .container-slide-img");

  let currentImg = 1;

  let timeout;
    function updateImg(){
        if(currentImg < 1){
            currentImg = listImg.length;
        }
        else if(currentImg > listImg.length) {
            currentImg = 1;
        }
        containerImg.style.transform = `translateX(-${(currentImg - 1) * 900}px)`;
        timeout =  setTimeout(() => {
            currentImg++;
            updateImg();
        }, 3000)
    }

    next.addEventListener("click", ()=> {
        console.log("next");
        currentImg++;
        clearTimeout(timeout);
        updateImg();
    }) 
    prev.addEventListener("click", ()=> {
        console.log("prev");
        currentImg--;
        clearTimeout(timeout);
        updateImg();
    }) 

}

slide();
setTimeout(() => {
  currentImg++;
  updateImg();
}, 3000)


async function displaySell() {
  const bestSell = document.getElementById("books-sell");
  console.log(bestSell);
  
  bestSell.innerHTML = "";
  try {
    const response = await fetch("http://localhost/BookStore/backend/books/get_book.php", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`==>Lỗi HTTP: ${response.status}`);
    }

    const books = await response.json();
    for(let i = 1; i <= 5; i++){
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-item");
      bookDiv.setAttribute("onclick", `viewBook(${books[i].book_id})`);

      bookDiv.innerHTML = `
        <img class="book_cover" src="${books[i].book_cover}" alt="">
        <h3 class="title">${books[i].title}</h3>
        <p class="price">${books[i].price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
      `;

      bestSell.appendChild(bookDiv);
    }
  } catch (error) {
    console.error("==>Lỗi khi tải danh sách sách:", error);
  }
}

displaySell();


function startCountdown(duration) {
  let endTime = new Date().getTime() + duration;
  
  function updateCountdown() {
      let now = new Date().getTime();
      let distance = endTime - now;
      
      if (distance < 0) {
          document.getElementById("countdown").innerHTML = "Flash Sale Đã Kết Thúc!";
          document.querySelector(".time-sell-h").innerHTML = "00";
          document.querySelector(".time-sell-m").innerHTML = "00";
          document.querySelector(".time-sell-s").innerHTML = "00";
          clearInterval(interval);
          return;
      }
      
      let hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((distance / (1000 * 60)) % 60);
      let seconds = Math.floor((distance / 1000) % 60);
      
      document.querySelector(".time-sell-h").innerHTML = hours.toString().padStart(2, '0');
      document.querySelector(".time-sell-m").innerHTML = minutes.toString().padStart(2, '0');
      document.querySelector(".time-sell-s").innerHTML = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  let interval = setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  startCountdown(2 * 60 * 60 * 1000); // Đếm ngược 2 giờ
});

