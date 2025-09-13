
# Zee Hospital Management System

[![GitHub stars](https://img.shields.io/github/stars/jaiswaldev/Zee-Hospital-Management.svg)](https://github.com/jaiswaldev/Zee-Hospital-Management/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/jaiswaldev/Zee-Hospital-Management.svg)](https://github.com/jaiswaldev/Zee-Hospital-Management/network/members)

[![GitHub issues](https://img.shields.io/github/issues/jaiswaldev/Zee-Hospital-Management.svg)](https://github.com/jaiswaldev/Zee-Hospital-Management/issues)

A comprehensive system to manage hospital operations and patient information efficiently. This project is designed to streamline the workflow of a hospital, from patient registration to billing and discharge.

---

## 📝 Table of Contents

- [About The Project](#about-the-project)
- [✨ Key Features](#key-features)
- [🛠️ Built With](#built-with)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🖼️ Screenshots](#screenshots)
- [🗺️ Roadmap](#roadmap)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [📧 Contact](#contact)
- [🙏 Acknowledgements](#acknowledgements)

---

## 🧐 About The Project

The Zee Hospital Management System is a full-stack web application built to modernize hospital administration. Traditional paper-based systems are often inefficient and prone to errors. This project aims to solve these problems by providing a centralized and digital platform for managing all aspects of a hospital's operations.

Here's why this project is useful:
* **For Patients:** It simplifies the process of booking appointments and accessing their medical records.
* **For Doctors:** It allows for easy access to patient histories and management of their schedules.
* **For Administrators:** It provides a powerful dashboard for overseeing hospital resources, staff, and finances.

---

## ✨ Key Features

* **Patient Management:** Register new patients, manage patient records, and view medical history.
* **Appointment Scheduling:** Book, reschedule, and cancel appointments with doctors.
* **Doctor Management:** Maintain a database of doctors, their specializations, and their schedules.
* **Billing and Invoicing:** Generate bills for medicines at store and manage patient payments.
* **Bed Management:** Track bed availability and assign beds to patients.
* **Admin Dashboard:** A comprehensive overview of the hospital's key metrics.
* **Role-Based Access Control:** Different user roles (Admin, Doctor, Patients) with different permissions.

---

## 🛠️ Built With

This section should list all the major frameworks and libraries that your project uses.

**Frontend:**
*  React.js with Tailwind CSS
*  Javascript 
*  Redis
*  Socket.io
*  JWT 


**Backend:**
*  Node.js with Express.js
*  JWT for Auth

**Database:**
*  MongoDB


---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

List all the software and tools that need to be installed on a user's machine before they can run your project.

* **Node.js** (v14 or later)
* **npm** (Node Package Manager)
    ```sh
    npm install npm@latest -g
    ```
* **MongoDB Server**

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/jaiswaldev/Zee-Hospital-Management.git](https://github.com/jaiswaldev/Zee-Hospital-Management.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd Zee-Hospital-Management
    ```
3.  **Install server-side dependencies**
    ```sh
    npm install
    ```
4.  **Navigate to the directories (frontend/backend/backend2.0/dashboard)**
    ```sh
    cd "directory"
    npm install
    ```
5.  **Set up your database**
    * Create a database named `zee_hospital`.

6.  **Configure environment variables**
    * Create a `.env` file in the root (backend) directory for Admin.
    * Add the following variables with your credentials:
        ```
        PORT = YOUR PORT ADDRESS (e.g 3000)
        CORS_ORIGIN = YOUR_CORS_ORIGIN_URL
        MONGO_URI = YOUR_MONGODB_URL

        CLOUDINARY_CLOUD_NAME = "YOUR_CLOUDINARY_USERNAME"
        CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_PUBLIC_KEY"
        CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"


        ACCESS_TOKEN_SECRET  = 
        ACCESS_TOKEN_EXPIRY  = 1d // May change
        REFRESH_TOKEN_SECRET = 
        REFRESH_TOKEN_EXPIRY = 10d

        COOKIE_EXPIRE = 7
        ```

        **Run the application**
        
        *start the backend development server:*
        ```sh
        cd backend
        npm run dev
        ```
    * Create a `.env` file in the root (backend2.0) directory for Patient and Doctors.
    * Add the following variables with your credentials:
        ```
        PORT = YOUR PORT ADDRESS (e.g 3001) 
        CORS_ORIGIN = YOUR_CORS_ORIGIN_URL
        MONGODB_URL = YOUR_MONGODB_URL


        CLOUDINARY_CLOUD_NAME = "YOUR_CLOUDINARY_USERNAME"
        CLOUDINARY_API_KEY    = "YOUR_CLOUDINARY_PUBLIC_KEY"
        CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"


        ACCESS_TOKEN_SECRET  = 
        ACCESS_TOKEN_EXPIRY  = 1d
        REFRESH_TOKEN_SECRET = 
        REFRESH_TOKEN_EXPIRY = 10d

        NODE_ENV = production
        ```

        **Run the application**
        
        *start the backend2.0 development server:*
        ```sh
        cd backend2.0
        npm run dev
        ```
    
7.    * Create a `.env` file in the root (frontend) directory.

        *Add the following variables with your credentials:*
        ```
        VITE_BACKEND_URL = HOST_URL
        VITE_CLOUDINARY_CLOUD_NAME = "YOUR_CLOUDINARY_USERNAME"
        VITE_CLOUDINARY_API_KEY = "YOUR_CLOUDINARY_PUBLIC_KEY"
        CLOUDINARY_API_SECRET = "YOUR_CLOUDINARY_API_SECRET"
        ```
        **Run the application**
        
        *start the frontend development server:*
        ```sh
        cd frontend
        npm run dev
        ```

 
8.  **Run the application**

     *start the dashboard development server:*
    ```
        cd dashboard
        npm run dev
    ```
        
---

## 🗺️ Roadmap

See the [open issues](https://github.com/jaiswaldev/Zee-Hospital-Management/issues) for a list of proposed features and known issues.

- [ ] Implement a pharmacy management module.
- [ ] Add a laboratory and radiology module.
- [ ] Integrate a secure messaging system for doctors and patients.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License
All Rights Reserved by ZeeCare.


---

## 📧 Contact

Dev Jaiswal - [Dev Jaiswal](https://www.linkedin.com/in/dev-jaiswal-144922253/) - jaiswaldev479@gmail.com

Aditya Raj Boum - [Aditya Raj Boum](https://www.linkedin.com/in/aditya-raj-boum-596485255/) - adityarajboum@gmail.com

Shashwat Tripathi - [Shashwat Tripathi](https://www.linkedin.com/in/shashwat-tripathi-83a156282/) - adityarajboum@gmail.com

Project Link: [https://github.com/jaiswaldev/Zee-Hospital-Management](https://github.com/jaiswaldev/Zee-Hospital-Management)