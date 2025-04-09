// Hàm hiển thị sách trong giỏ hàng
async function loadCartItems() {
    const userId = await getUserId(); // Lấy userId từ server
  
    if (!userId) {
        alert("You are not logged in!");
        return;
    }
  
    try {
        const response = await fetch("http://localhost/BookStore/backend/cart/view_cart.php", {
            credentials: "include", // Đảm bảo session hoạt động
        });
  
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
                              <img src="${item.book_cover}" class="img-fluid rounded-start" alt="${item.title}">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h5 class="card-title">${item.title}</h5>
                                  <p class="card-text">${item.price}đ</p>
                                  <div class="input-group mb-3" style="max-width: 120px;">
                                    <button class="btn btn-outline-secondary btn-minus" type="button" onclick="decreaseQuantity(${item.cart_id})">-</button>
                                    <input id="quantity-${item.cart_id}" type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                    <button class="btn btn-outline-secondary btn-plus" type="button" onclick="increaseQuantity(${item.cart_id})">+</button>
                                  </div>
                                  <button class="btn btn-danger" onclick="removeCartItem(${item.cart_id})">Remove</button>
                              </div>
                          </div>
                      </div>
                  </div>
                `;
                cartContainer.appendChild(cartItemElement);
            });
        } else {
            console.error("Failed to load cart items.");
            alert("Failed to load cart items. Please try again later.");
        }
    } catch (error) {
        console.error("Error loading cart items:", error);
        alert("An error occurred while loading cart items.");
    }
  }

  // Hàm thêm sách vào giỏ hàng
async function addToCart(bookId) {
  try {
    // Gửi yêu cầu POST đến API thêm vào giỏ hàng
    const response = await fetch("http://localhost/BookStore/backend/cart/add_to_cart.php", {
      method: "POST", // Phương thức HTTP POST
      headers: {
        "Content-Type": "application/json" // Gửi dữ liệu ở định dạng JSON
      },
      body: JSON.stringify({
        book_id: bookId, // ID của sách được thêm
        quantity: 1       // Mặc định thêm 1 quyển
      })
    });

    // Chuyển phản hồi từ server thành đối tượng JSON
    const result = await response.json();

    // Kiểm tra nếu yêu cầu thành công 
    if (response.ok) {
      alert("Book has been added to the cart."); // Thông báo thêm thành công
    } else {
      // Nếu có lỗi từ server, hiển thị thông báo lỗi
      alert(result.error || "Failed to add book to the cart. Please try again.");
    }
  } catch (error) {
    // Bắt lỗi nếu có sự cố khi gửi request
    console.error("Error adding book to cart:", error);
    alert("An error occurred. Please try again later."); // Thông báo lỗi chung
  }
}

  
   //Xóa khỏi giỏ hàng
   async function removeCartItem(cartId) {
    console.log("Sending:", JSON.stringify({ cart_id: cartId }));
    try {
        const response = await fetch("http://localhost/BookStore/backend/cart/remove_from_cart.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cart_id: cartId }) 
        });

        const result = await response.json();
        if (response.ok) {
            alert("Book has been removed from the cart.");
            window.location.reload();
        } else {
            alert(result.error || "Failed to remove book from the cart. Please try again.");
        }
    } catch (error) {
        console.error("Error removing book:", error);
        alert("An error occurred. Please try again later.");
    }
}

//Giảm số sách trong cart
function decreaseQuantity(cartId) {
    // Lấy ô input tương ứng với cartId
    const inputEl = document.getElementById(`quantity-${cartId}`);
    let currentQuantity = parseInt(inputEl.value, 10);
    if (currentQuantity > 1) { // Giảm chỉ khi số lượng > 1
      updateCartQuantity(cartId, currentQuantity - 1);
    } else {
      alert("The quantity cannot be reduced below 1.");
    }
  }
  
  //Tăng số sách trong cart
  function increaseQuantity(cartId) {
    const inputEl = document.getElementById(`quantity-${cartId}`);
    let currentQuantity = parseInt(inputEl.value, 10);
    updateCartQuantity(cartId, currentQuantity + 1);
  }

  //Cập nhật số sách trong cart
  async function updateCartQuantity(cartId, newQuantity) {
    try {
      // Gửi request PUT đến API
      const response = await fetch("http://localhost/BookStore/backend/cart/update_cart.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId, quantity: newQuantity })
      });
  
      const result = await response.json();
      if (response.ok) {
        // Cập nhật hiển thị trên giao diện
        document.getElementById(`quantity-${cartId}`).value = newQuantity;
      } else {
        alert(result.error || "Failed to update cart quantity. Please try again.");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      alert("An error occurred. Please try again later.");
    }
  }
  

  