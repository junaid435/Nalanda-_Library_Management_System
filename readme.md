# 📚 Nalanda Library Management System

## Overview

The **Nalanda Library Management System** is a comprehensive backend solution for managing library operations, including user and book management, borrowing, and reporting. Built with **Node.js, Express,** and **MongoDB**, it offers RESTful APIs for seamless interaction.

The system incorporates JWT-based authentication and role-based access control, ensuring secure access for users. With the MongoDB aggregation framework, it provides advanced reporting capabilities for improved operational insights.

## Features

### 🧑‍💻 User Management
- **User Registration**: Users can register with their name, email, and password.
- **User Login**: Users can log in using their email and password.
- **User Roles**: The system supports two roles: Admin and Member. Admins have full access, while Members have restricted access.

### 📚 Book Management
- **Add Book**: Admins can add new books with details such as title, author, ISBN, publication date, genre, and number of copies.
- **Update Book**: Admins can update existing book details.
- **Delete Book**: Admins can remove books from the library.
- **List Books**: All users can view a list of books with pagination and filtering options.

### 📖 Borrowing System
- **Borrow Book**: Members can borrow books, ensuring availability.
- **Return Book**: Members can return borrowed books.
- **Borrow History**: Members can view their borrowing history.

### 📊 Reports and Aggregations
- **Most Borrowed Books**: Report on the most borrowed books.
- **Active Members**: List the most active members based on their borrowing history.
- **Book Availability**: Summary report of book availability, including total, borrowed, and available books.

## 🛠 Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: RESTful API
- **Authentication**: JWT-based authentication with role-based access control
- **Documentation**: Swagger for RESTful API documentation

## 🚀 Setup Instructions

### Prerequisites
- Node.js 
- MongoDB
- Git

### Installation
1. **Clone the repository**
   ```bash
   git clone [<repository-url>](https://github.com/muhammedjunaid123/Nalanda-_Library_Management_System.git)
   cd Nalanda-_Library_Management_System
   npm install

# Running the Application

To run the application, use the appropriate command based on your needs:

- **Development Mode**: `npm run start`
- **Watch Mode**: `npm run dev`

## Contact

For any questions, suggestions, or support, feel free to reach out:

- **Email:** [junaidvinu133@gmail.com](mailto:junaidvinu133@gmail.com)



 If you have any feedback or need assistance, don't hesitate to contact me.


## Environment Setup

Ensure you have a `.env` file in the root directory with the following environment variables:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017
JWT_SECRET=fasdfjishrfweihfi

```

# Error Handling in My Project

In my project, I have implemented global error handling using promises and higher-order functions. This approach ensures that errors are managed consistently across the application, providing a better user experience and easier debugging.

## API Documentation

For more information about the API and its endpoints, you can refer to the Swagger documentation I created:

[API Documentation](http://localhost:3000/api-docs)

Feel free to explore the API and see how error handling is implemented throughout the application!
