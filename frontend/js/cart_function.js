// Hàm hiển thị sách trong giỏ hàng
async function loadCartItems() {
    const userId = await getUserId(); // Lấy userId từ server
  
    if (!userId) {
        alert("Bạn chưa đăng nhập!");
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
                                      <button class="btn btn-outline-secondary btn-minus" type="button">-</button>
                                      <input type="text" class="form-control text-center" value="${item.quantity}">
                                      <button class="btn btn-outline-secondary btn-plus" type="button">+</button>
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

  //Thêm vào giỏ hàng
  async function addToCart(bookId) {
    try {
      const response = await fetch("http://localhost/BookStore/backend/cart/add_to_cart.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          book_id: bookId,
          quantity: 1
        })
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Book has been added to the cart.");
      } else {
        alert(result.error || "Failed to add book to the cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("An error occurred. Please try again later.");
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

  