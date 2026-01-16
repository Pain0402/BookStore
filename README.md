# BookStore Website 📚

A full-stack web application designed for browsing, searching, and purchasing books online. This project is built using native web technologies, providing a lightweight and fast experience without the overhead of heavy frameworks.

## 🚀 Features

### For Users (Customers)
*   **Authentication**: Register and Login functionality.
*   **Browse Books**: View a paginated list of available books with cover images, titles, and ratings.
*   **Search & Filter**: Search for books by keywords and filter by genre or price range.
*   **Book Details**: View detailed information about a specific book (author, description, publishing info).
*   **Shopping Cart**: Add books to a cart (functionality in development).

### For Admins
*   **Dashboard**: Access via `admin.html` (or `manageBook.html`).
*   **Book Management**: Add, Update, and Delete books from the inventory.

## 🛠️ Technology Stack

*   **Frontend**:
    *   HTML5, CSS3 (Custom styles).
    *   JavaScript (Vanilla/Pure JS).
    *   Bootstrap 5 (for responsive layout and modals).
*   **Backend**:
    *   PHP (Native/Pure).
*   **Database**:
    *   MySQL.

## 📂 Project Structure

```
BookStore/
├── backend/            # Server-side logic (API Endpoints)
│   ├── config/         # Database connection configuration
│   ├── books/          # API for book operations (CRUD, Search, Filter)
│   ├── users/          # API for user authentication
│   └── cart/           # API for shopping cart
├── frontend/           # Client-side interface
│   ├── css/            # Stylesheets
│   ├── js/             # Application logic (fetch APIs, DOM manipulation)
│   ├── images/         # Static assets and book covers
│   └── *.html          # HTML Pages (home, login, register, etc.)
├── Database/           # Database SQL dump file
│   └── Bookstore_DB.sql
├── index.php           # Entry point (Backend welcome page)
└── README.md           # Project documentation
```

## ⚙️ Installation & Setup

To run this project locally, you need a local web server environment like **XAMPP**, **WAMP**, or **Laragon**.

### 1. Prerequisites
*   Install [XAMPP](https://www.apachefriends.org/) (or equivalent) with Apache and MySQL.

### 2. Deployment
1.  Navigate to your local server's root directory (e.g., `C:\xampp\htdocs\` or `D:\laragon\www\`).
2.  Clone or move the project folder so that it maps to **`BookStore`**.
    *   Example path: `C:\xampp\htdocs\BookStore`

### 3. Database Configuration
1.  Start **Apache** and **MySQL** services.
2.  Open **phpMyAdmin** (usually at `http://localhost/phpmyadmin`).
3.  Create a new database named `bookstore_db`.
4.  Import the file `Database/Bookstore_DB.sql` into this database.

### 4. Backend Configuration
1.  Open `backend/config/config.php`.
2.  Update the database credentials to match your local setup:
    ```php
    $servername = "127.0.0.1";
    $username = "root";      // Default for XAMPP is 'root'
    $password = "";          // Default for XAMPP is empty
    $dbname = "bookstore_db";
    $port = "3306";
    ```

### 5. Running the App
*   Open your browser and navigate to:
    *   **Frontend (Home)**: `http://localhost/BookStore/frontend/home.html`
    *   **Backend API Check**: `http://localhost/BookStore/index.php`


## 🤝 Contributing
Contributions are welcome! Please feel free to urge suggestions or open pull requests to improve the code quality and security.
