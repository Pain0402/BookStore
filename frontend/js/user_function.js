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
        const response = await fetch("http://localhost/BookStore/backend/users/login.php", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }) // Gửi dữ liệu đăng nhập
        });

        const result = await response.json();

        if (response.ok && result.username) {
            console.log("User:", result);

            // Lưu thông tin vào localStorage
            localStorage.setItem("username", result.username);
            localStorage.setItem("userId", result.userId);

            alert(`Welcome, ${result.username}!`);
            window.location.href = "index.html"; // Chuyển hướng đến trang chính
        } else {
            alert(result.error || "Login failed. Please check your username and password.");
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