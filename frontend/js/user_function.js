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
  // Lấy dữ liệu người dùng nhập từ các ô input
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const passwordUser = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  try {
    // Gửi yêu cầu đăng ký đến API backend qua phương thức POST
    const response = await fetch("http://localhost/BookStore/backend/users/register.php", {
      method: "POST", // Phương thức HTTP POST
      headers: {
        "Content-Type": "application/json", // Gửi dữ liệu ở định dạng JSON
      },
      body: JSON.stringify({
        // Chuyển dữ liệu người dùng nhập thành chuỗi JSON
        username,
        email,
        phoneNumber,
        passwordUser,
        confirmPassword,
      }),
    });

    // Chuyển kết quả phản hồi thành đối tượng JavaScript
    const result = await response.json();
    console.log(result); // In kết quả ra console để kiểm tra

    // Nếu phản hồi HTTP là thành công 
    if (response.ok) {
      console.log("Registration successful:", result);
      alert(result.message); // Hiển thị thông báo từ server
      window.location.href = "login.html"; // Chuyển hướng sang trang đăng nhập
    } else {
      // Nếu đăng ký thất bại, in và hiển thị thông báo lỗi
      console.error("Registration failed:", result.message);
      alert(`Registration failed: ${result.message}`);
    }
  } catch (error) {
    // Nếu có lỗi khi gửi request hoặc xử lý dữ liệu
    console.error("Error registering user:", error);
    alert("An error occurred during registration. Please try again later.");
  }
}

  
// Hàm đăng nhập người dùng
async function login() {
  // Lấy giá trị username và password từ form nhập
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
      // Gửi yêu cầu đăng nhập tới API bằng phương thức POST
      const response = await fetch("http://localhost/BookStore/backend/users/login.php", {
          method: 'POST',
          headers: { "Content-Type": "application/json" }, // Gửi dữ liệu dưới dạng JSON
          body: JSON.stringify({ username, password }),     // Chuyển object JS thành JSON string
          credentials: "include" // Cho phép gửi cookies phiên (session cookie)
      });

      // Chuyển kết quả từ server trả về thành object JavaScript
      const result = await response.json();

      // Nếu đăng nhập thành công và có tên người dùng trả về
      if (response.ok && result.username) {
          alert(`Welcome, ${result.username}!`);
          // Chuyển hướng tới trang chính (index.html) hoặc trang quản lý sách (nếu là admin)
          window.location.href = result.redirect;
      } else {
          // Thông báo lỗi nếu đăng nhập thất bại
          alert(result.error || "Login failed. Please check your username and password.");
      }
  } catch (error) {
      // Nếu xảy ra lỗi trong quá trình fetch hoặc xử lý
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
          return data.user_id; // Server trả về
      } else {
          console.error("Failed to get user ID");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost/BookStore/backend/users/getuser.php") // API lấy thông tin user
      .then(response => response.json())
      .then(data => {
          let loginBtn = document.getElementById("login-btn");
          if (data.username) {
              loginBtn.textContent = data.username; // Hiển thị tên user
          }
      })
      .catch(error => console.error("Lỗi khi lấy thông tin user:", error));
});
