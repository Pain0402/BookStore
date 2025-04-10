// SLIDE SHOW
function slide(){
  // Lấy tất cả các hình ảnh trong slide
  let listImg = document.querySelectorAll(".container-slide img");

  let next = document.querySelector(".container-slide .next");
  let prev = document.querySelector(".container-slide .prev");

  // Lấy container chứa ảnh để thay đổi vị trí khi chuyển slide
  let containerImg = document.querySelector(".container-slide .container-slide-img");

  let currentImg = 1;
  let timeout;

  // Hàm cập nhật hình ảnh khi chuyển sang ảnh tiếp theo hoặc quay lại
  function updateImg(){
    if(currentImg < 1){
        currentImg = listImg.length;
    }
    else if(currentImg > listImg.length) {
        currentImg = 1;
    }

    // Cập nhật vị trí của container hình ảnh để chuyển sang ảnh mới
    containerImg.style.transform = `translateX(-${(currentImg - 1) * 900}px)`;

    // Thiết lập lại thời gian để chuyển hình ảnh tự động sau 3 giây
    timeout =  setTimeout(() => {
        currentImg++; 
        updateImg(); 
    }, 3000);
  }

  // Xử lý sự kiện khi nhấn nút "next" (chuyển sang ảnh tiếp theo)
  next.addEventListener("click", () => {
    console.log("next");
    currentImg++;
    clearTimeout(timeout); 
    updateImg();
  }) 

  // Xử lý sự kiện khi nhấn nút "prev" (quay lại ảnh trước)
  prev.addEventListener("click", () => {
    console.log("prev");
    currentImg--; 
    clearTimeout(timeout); 
    updateImg(); 
  }) 

  // Thiết lập hình ảnh tự động chuyển sau mỗi 3 giây
  setTimeout(() => {
    currentImg++; 
    updateImg();  
  }, 3000)
}

// Gọi hàm slide để bắt đầu hoạt động của slide show
slide();


// SELL SHOW
async function displaySell() {
  // Lấy phần tử có id là "books-sell" để hiển thị danh sách sách bán chạy
  const bestSell = document.getElementById("books-sell");
  
  // Xóa nội dung hiện tại của phần tử "books-sell" trước khi thêm sách mới
  bestSell.innerHTML = "";
  
  try {
    // Gửi yêu cầu GET đến API để lấy dữ liệu sách từ backend
    const response = await fetch("http://localhost/BookStore/backend/books/get_book.php", {
      method: "GET", // Sử dụng phương thức GET để lấy dữ liệu
    });

    // Kiểm tra nếu có lỗi HTTP (ví dụ: không thể kết nối đến server)
    if (!response.ok) {
      throw new Error(`==>Lỗi HTTP: ${response.status}`);
    }

    // Phân tích dữ liệu JSON từ phản hồi
    const books = await response.json();
    
    // Lặp qua 5 cuốn sách đầu tiên và hiển thị lên giao diện
    for (let i = 1; i <= 5; i++) {
      // Tạo một div cho mỗi cuốn sách
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-item");
      
      // Thêm sự kiện onclick để khi người dùng nhấp vào sẽ xem chi tiết cuốn sách
      bookDiv.setAttribute("onclick", `viewBook(${books[i].book_id})`);

      // Thêm nội dung vào div của cuốn sách
      bookDiv.innerHTML = `
        <img class="book_cover" src="${books[i].book_cover}" alt="">
        <h3 class="title">${books[i].title}</h3>
        <p class="price">${books[i].price}đ</p>
        <p class="rate">Rating: 5/5⭐</p>
      `;

      // Thêm cuốn sách vào trong phần tử "books-sell"
      bestSell.appendChild(bookDiv);
    }
  } catch (error) {
    // Nếu có lỗi khi tải dữ liệu, in ra lỗi trong console
    console.error("==>Lỗi khi tải danh sách sách:", error);
  }
}

// Gọi hàm để hiển thị danh sách sách bán chạy khi trang được tải
displaySell();

// COUNTDOWN
function startCountdown(duration) {
  // Tính thời điểm kết thúc đếm ngược (thời gian hiện tại cộng thêm duration)
  let endTime = new Date().getTime() + duration;
  
  // Hàm cập nhật đồng hồ đếm ngược
  function updateCountdown() {
      let now = new Date().getTime();

      let distance = endTime - now;
      console.log("distance: " + distance);
      
      
      // Nếu thời gian đếm ngược đã kết thúc
      if (distance < 0) {
          document.getElementById("end-sale").innerHTML = "Flash Sale Đã Kết Thúc!";
          document.querySelector(".time-sell-h").innerHTML = "00"; 
          document.querySelector(".time-sell-m").innerHTML = "00"; 
          document.querySelector(".time-sell-s").innerHTML = "00"; 

          clearInterval(interval);
          return;
      }
      
      // Tính số giờ, phút và giây còn lại
      let h = Math.floor((distance / (1000 * 60 * 60)) % 24); 
      let m = Math.floor((distance / (1000 * 60)) % 60); 
      let s = Math.floor((distance / 1000) % 60); 
      console.log(h + ":" + m + ":" + s);
      
      
      // Cập nhật giờ, phút, giây trên giao diện người dùng
      document.querySelector(".time-sell-h").innerHTML = h.toString().padStart(2, '0'); 
      document.querySelector(".time-sell-m").innerHTML = m.toString().padStart(2, '0'); 
      document.querySelector(".time-sell-s").innerHTML = s.toString().padStart(2, '0'); 
  }
  
  // Gọi ngay một lần để cập nhật thời gian ban đầu
  updateCountdown();
  // Lặp lại hàm updateCountdown mỗi giây
  let interval = setInterval(updateCountdown, 1000);
}

// Khi tài liệu HTML đã sẵn sàng, bắt đầu đếm ngược 2 giờ (2 * 60 * 60 * 1000 = 7200000 ms)
document.addEventListener("DOMContentLoaded", function () {
  startCountdown(2 * 60 * 60 * 1000); // Đếm ngược 2 giờ
});



function gotoIndexandSearch() {
  const input = document.getElementById("search-bar").value;
  sessionStorage.setItem("searchKeyword", input);
  window.location.href = "index.html";
}

