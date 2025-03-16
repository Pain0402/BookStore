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
      const response = await fetch("http://localhost/BookStore/backend/users/register.php", {
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
      console.log(result);
  
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
            body: JSON.stringify({ username, password }),
            credentials: "include" // Cho phép gửi cookies phiên
        });

        const result = await response.json();

        if (response.ok && result.username) {
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
    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();

    if (!email || !newPassword || !confirmPassword) {
        alert("Please fill in all required fields.");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("Password confirmation does not match.");
        return;
    }

    try {
        console.log("Sending request with data:", { email, newPassword });

        const response = await fetch("http://localhost/BookStore/backend/users/resetpassword.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, newPassword, confirmPassword })
        });

        const responseData = await response.json();
        console.log("Server response:", responseData);

        if (responseData.error) {
            alert(`Error: ${responseData.error}`);
        } else {
            alert(responseData.message);
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        alert("An error occurred while connecting to the server.");
    }
}

//Lấy userID từ session
async function getUserId() {
  try {
      const response = await fetch("http://localhost/BookStore/backend/users/checklogin.php", {
          credentials: "include", // Gửi session cookie
      });

      if (response.ok) {
          const data = await response.json();
          return data.user_id; // Server trả về { userId: 123 }
      } else {
          console.error("Failed to get user ID");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
  }
}

