// Hàm hiển thị toàn bộ sách
async function displayBooks() {
  const bookList = document.getElementById("books-sell");

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