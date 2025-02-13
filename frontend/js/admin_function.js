async function addBook() {
  document.getElementById("addBookForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const bookData = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        book_cover: document.getElementById("book-cover").value,
        description: document.getElementById("description").value
    };

    try {
      const response = await fetch('http://localhost:8081/books/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
      });
      if (response.ok) {
        alert("Book added successfully!");
        location.reload();
      } else {
        alert("Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the book.");
    }
  });
}

function showAllBooks() {
  document.getElementById('all-books').classList.add('active-list');
  document.getElementById('history-books').classList.remove('active-list');
  document.getElementById('navbar-brand').classList.add('nav-font-bg');
  document.getElementById('nav-link').classList.remove('nav-font-bg');
}

function showNewUpdate() {
  document.getElementById('history-books').classList.add('active-list');
  document.getElementById('all-books').classList.remove('active-list');
  document.getElementById('nav-link').classList.add('nav-font-bg');
  document.getElementById('navbar-brand').classList.remove('nav-font-bg');
  listBook_history();
}

async function DeleteBook(book_id) {
  try {
    const response = await fetch(`http://localhost:8081/books/delete/${book_id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Book deleted successfully!');
      location.reload();
      window.onload = listBooks;
    } else {
      alert('Failed to delete book. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    alert('An error occurred while deleting the book.');
  }
}

async function EditBook(book_id) {
  console.log(book_id);
  
  const response = await fetch(`http://localhost:8081/books/${book_id}`);
  const book = await response.json();
  console.log(book);

  // Điền thông tin sách vào form
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("price").value = book.price;
  document.getElementById("stock").value = book.stock;
  document.getElementById("bookCover").value = book.book_cover;
  
  document.getElementById("updateBookForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const bookData = {
        title: document.getElementById("title")?.value || book.title,
        author: document.getElementById("author")?.value || book.author,
        price: parseFloat(document.getElementById("price")?.value) || book.price,
        stock: parseInt(document.getElementById("stock")?.value) || book.stock,
        book_cover: document.getElementById("bookCover")?.value || book.book_cover,
        createdDate: new Date().toISOString().slice(0, 19)
    };

    console.log(bookData);
    
    fetch(`http://localhost:8081/books/${book_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (response.ok) {
            alert("Book updated successfully!");
            location.reload();
        } else {
            alert("Failed to update the book.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while updating the book.");
    });
  });
}

async function listBooks() {
  document.getElementById('all-books').classList.add('active-list');
  try {
    const response = await fetch('http://localhost:8081/books');
    const books = await response.json();

    const tableBody = document.getElementById('book-table-body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ, nếu có
    
    books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.bookId}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td>${book.stock}</td>
        <td>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick=EditBook(${book.bookId})>
            Edit
          </button>
          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Update Book Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container p-4" style="flex-grow: 1;">
                  <form id="updateBookForm" class="bg-light p-4 rounded shadow-sm">
                    <div class="mb-3">
                      <label for="title" class="form-label">Title:</label>
                      <input type="text" class="form-control" id="title" name="title">
                    </div>
                    <div class="mb-3">
                      <label for="author" class="form-label">Author:</label>
                      <input type="text" class="form-control" id="author" name="author">
                    </div>
                    <div class="mb-3">
                      <label for="price" class="form-label">Price:</label>
                      <input type="number" class="form-control" id="price" name="price" step="0.01">
                    </div>
                    <div class="mb-3">
                      <label for="stock" class="form-label">Stock:</label>
                      <input type="number" class="form-control" id="stock" name="stock" min="0">
                    </div>
                    <div class="mb-3">
                      <label for="bookCover" class="form-label">Book Cover URL:</label>
                      <input type="url" class="form-control" id="bookCover" name="book_cover">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Book</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-danger" onclick=DeleteBook(${book.bookId})>Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

async function listBook_history(){
  document.getElementById('all-books-history').classList.add('active-list');
  try {
    const response = await fetch('http://localhost:8081/book_history');
    const books = await response.json();

    const tableBody = document.getElementById('book-history-table-body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ, nếu có
    
    books.forEach(book_history => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book_history.bookId}</td>
        <td>${book_history.title}</td>
        <td>${book_history.author}</td>
        <td>${book_history.price}</td>
        <td>${book_history.stock}</td>
        <td>${book_history.actionType}</td>
        <td>${book_history.actionDate}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Gọi hàm fetchBooks khi trang được tải
window.onload = listBooks;