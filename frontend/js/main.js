// Hàm hiển thị toàn bộ sách
async function displayBooks() {
  const bookList = document.getElementById("book-list");

  try {
    const response = await fetch("http://localhost/BookStore/backend/books/get_book.php", {
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
      bookDiv.classList.add("book-item"); // Thêm class để CSS dễ chỉnh sửa
      bookDiv.setAttribute("onclick", `viewBook(${book.book_id})`); // Thêm sự kiện onclick

      bookDiv.innerHTML = `
        <img class="book_cover" src="${book.book_cover}" alt="">
        <h3 class="title">${book.title}</h3>
        <p class="price">${book.price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
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
    
    if (!response.ok) {
      throw new Error(`==> Lỗi HTTP: ${response.status}`);
    }

    const books = await response.json();

    if (books.length === 0) {
      alert("Không tìm thấy sách nào với từ khoá đã nhập.");
      return;
    }

    // Xóa danh sách sách hiện tại và hiển thị kết quả tìm kiếm
    bookList.innerHTML = "";

    books.forEach((book) => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("book-item"); // Thêm class để CSS dễ chỉnh sửa
      resultDiv.setAttribute("onclick", `viewBook(${book.book_id})`); // Bấm vào để xem chi tiết sách

      resultDiv.innerHTML = `
        <img class="book_cover" src="${book.book_cover}" alt="">
        <h3 class="title">${book.title}</h3>
        <p class="price">${book.price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
      `;

      bookList.appendChild(resultDiv);
    });
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

function showFilter() {
  const filter = document.querySelector('.container .filter');
  console.log(filter.style.display);
  if (filter.style.display === 'none' || filter.style.display === '') {
    filter.style.display = 'block';
  } else {
    filter.style.display = 'none';
  }
  
}

let listImg = document.querySelectorAll(".container-slide img");

let next = document.querySelector(".container-slide .next");

let prev = document.querySelector(".container-slide  .prev");

let containerImg = document.querySelector(".container-slide .container-slide-img");

console.log(listImg);
console.log(next);
console.log(prev);
console.log(containerImg);


let currentImg = 1;

let timeout;
function slide1(){
    function NEXT() {
        listImg[currentImg].classList.remove("active");
        listImg[currentImg].classList.remove("nextAnimation");
        listImg[currentImg].classList.remove("prevAnimation");
        currentImg++;
        listImg[currentImg].classList.add("active");
        listImg[currentImg].classList.add("nextAnimation");
        console.log(currentImg);
        if(currentImg == listImg.length - 1){
            next.removeEventListener("click", NEXT);
        }
    
        prev.addEventListener("click", PREV);
        
    }
    
    function PREV() {
        listImg[currentImg].classList.remove("active");
        listImg[currentImg].classList.remove("prevAnimation");
        listImg[currentImg].classList.remove("nextAnimation");
        currentImg--;
        listImg[currentImg].classList.add("active");
        listImg[currentImg].classList.add("prevAnimation");
        console.log(currentImg);
    
        if(currentImg == 0){
            prev.removeEventListener("click", PREV);
        }
    
        next.addEventListener("click", NEXT);
    
    }
    
    next.addEventListener("click", NEXT);
    prev.addEventListener("click", PREV);
}

function slide2(){
    console.log(window.innerWidth * 0.8);
    let currentWidth = window.innerWidth * 0.8;
    function updateImg(){
        if(currentImg < 1){
            currentImg = listImg.length;
        }
        else if(currentImg > listImg.length) {
            currentImg = 1;
        }
        // containerImg.style.transform = `translateX(-${(currentImg - 1) * currentWidth}px)`;    
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

// slide1();
slide2();

