🛒 Basic Frontend E-Commerce Website
**📋 Project Overview**
This is a basic e-commerce website built using HTML, CSS, and JavaScript. The goal of this project was to demonstrate understanding of core JavaScript concepts such as form handling, API integration, local storage management, DOM manipulation, and state handling.

The project includes the following main features:

User registration and login system

Product listing with filtering and searching

Shopping cart functionality with persistent storage

🚀 Features Implemented
✅ Core Features (As Per Assignment)
Register & Login Page

Fields:

Register: Name, Email, Password, Confirm Password

Login: Email, Password

Validations:

All fields are required

Email must be in a valid format

Password must be at least 6 characters

Confirm Password must match Password

User credentials stored in localStorage

User redirected to homepage upon successful login

Home Page

Products fetched from public APIs:

https://fakestoreapi.com/products

Displayed fields: Product Name, Image, Price, Category

Filtering & Searching

Filter products by category using buttons or dropdown

Search products by name using a search bar

Shopping Cart

"Add to Cart" button for each product

Cart items stored in localStorage to persist across sessions

Cart Page shows:

Product Name, Image, Quantity, Price

Total Price calculation

**✨ Extra Features Added**
In addition to the core requirements, the following extra features were implemented:

👥 Multiple User Support
The system allows registration of multiple users.

Each user must have a unique email address.

Registration is blocked if an email already exists in the system.

🛒 User-Specific Persistent Cart
Each registered user has their own cart stored in localStorage.

Cart data is preserved even after logout.

Cart is restored when the user logs in again.

🔐 Current User Session Handling
The user currently logged in is stored in localStorage under a currentUser key.

This enables session tracking and allows personalized cart and homepage experience.