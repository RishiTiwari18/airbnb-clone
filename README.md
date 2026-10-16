# 🏡 StayScape — Airbnb Clone

A full-stack accommodation booking web application inspired by Airbnb, built using the MERN stack. StayScape allows users to explore properties, search for stays, view property details, manage wishlists, authenticate securely, and interact with property-related features through a modern web interface.

## 🌐 Live Demo

**Live Website:**
https://airbnb-clone-roan-one-93.vercel.app/

**GitHub Repository:**
https://github.com/RishiTiwari18/airbnb-clone

**Backend API:**
https://stayscape-backend-h9ah.onrender.com

> The frontend is deployed on Vercel, the backend is hosted on Render, and MongoDB Atlas provides cloud database hosting.

---

## 📌 Project Overview

StayScape is a full-stack web application developed to demonstrate practical web development concepts, including frontend development, REST API integration, database management, authentication, and deployment.

The application follows a client-server architecture in which the React frontend communicates with an Express.js backend. The backend processes requests and interacts with MongoDB to retrieve or modify application data.

### 🎯 Objectives

* Build a responsive accommodation booking platform.
* Provide an intuitive property discovery experience.
* Implement user authentication and protected operations.
* Connect a React frontend to a Node.js and Express.js backend.
* Store and manage application data using MongoDB.
* Deploy the frontend and backend using cloud hosting services.
* Gain practical experience with full-stack development and deployment.

---

## ✨ Features

### 1. User Authentication

* User registration and login.
* Authentication-aware navigation.
* Protected operations for authenticated users.
* Google sign-in integration, subject to the configured OAuth client and authorized domain.
* User-specific functionality based on authentication status.

### 2. Property Discovery

* Browse property listings.
* View property details.
* Search properties by destination.
* Filter properties by category and supported criteria.
* Retrieve property data through the backend API.

### 3. Property Details

* View property descriptions and images.
* Explore available property information.
* Access pricing, location, amenities, and other details where provided.

### 4. Wishlist

* Save properties for future reference.
* Remove properties from the wishlist.
* Access saved properties through the application.

### 5. Reviews and Ratings

* Display property reviews and ratings.
* Support review-related interactions implemented in the application.

### 6. Host Dashboard

* Access the property-management interface.
* Manage property listings through supported operations.
* Apply appropriate authorization checks to listing-management actions.

### 7. Booking System

* Submit booking requests through the application.
* Select check-in and check-out dates where supported.
* Specify guest counts where supported.
* Validate booking information through backend logic where implemented.
* View or manage bookings through supported functionality.

### 8. Payment Integration

The project can document its Razorpay integration here if the payment flow is enabled in the current implementation.

For development and demonstration, use Razorpay test mode. A successful test payment does not represent a real financial transaction.

### 9. Cloud Deployment

* Frontend deployment using Vercel.
* Backend deployment using Render.
* Cloud database hosting using MongoDB Atlas.
* Environment-based configuration for deployment.
* CORS configuration to allow requests from the deployed frontend.

---

## 🛠️ Technology Stack

### Frontend

| Technology   | Purpose                                             |
| ------------ | --------------------------------------------------- |
| React        | Builds the user interface using reusable components |
| Vite         | Provides frontend development and build tooling     |
| JavaScript   | Implements frontend application logic               |
| CSS          | Styles application components and layouts           |
| React Router | Handles page navigation where configured            |
| Fetch API    | Sends HTTP requests to the backend                  |

### Backend

| Technology | Purpose                                               |
| ---------- | ----------------------------------------------------- |
| Node.js    | JavaScript runtime for the backend                    |
| Express.js | Handles HTTP requests and defines API routes          |
| Mongoose   | Models application data and communicates with MongoDB |
| REST API   | Enables communication between frontend and backend    |
| CORS       | Controls which browser origins may access the API     |
| dotenv     | Loads configuration from environment variables        |

### Database

| Technology    | Purpose                                      |
| ------------- | -------------------------------------------- |
| MongoDB       | Stores application data                      |
| MongoDB Atlas | Provides cloud-hosted MongoDB infrastructure |

### Authentication and Integrations

* Application authentication using the implemented authentication flow.
* Google Identity Services for Google sign-in, where correctly configured.
* Razorpay test mode for payment testing, if enabled in the application.

### Deployment and Development Tools

| Tool               | Purpose                |
| ------------------ | ---------------------- |
| Git                | Version control        |
| GitHub             | Source-code hosting    |
| Visual Studio Code | Code editor            |
| Vercel             | Frontend hosting       |
| Render             | Backend hosting        |
| MongoDB Atlas      | Cloud database hosting |

---

## 🏗️ System Architecture

```text
                 USER
                   |
                   v
          React Frontend
               Vite
                   |
                   | HTTPS Requests
                   v
          Express.js Backend
               Render
                   |
                   v
             API Routes
                   |
                   v
        Controllers / Business Logic
                   |
                   v
              Mongoose
                   |
                   v
             MongoDB Atlas
```

The frontend renders the application interface and sends requests to the backend. The Express.js server processes requests, performs the relevant validation and authorization, and communicates with MongoDB through Mongoose.

The backend returns responses that the frontend uses to display listings, user information, and other application data.

---

## 📁 Project Structure

The following is an illustrative structure. Adjust it to match the actual folders and files in the repository.

```text
airbnb-clone/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Install the following tools:

* Node.js and npm
* Git
* MongoDB Atlas account or a local MongoDB instance
* Visual Studio Code or another code editor

Verify the installations:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/RishiTiwari18/airbnb-clone.git
cd airbnb-clone
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory.

Example configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Use the exact environment-variable names expected by the backend source code. Add other variables only if required by your implementation.

Never commit actual database credentials, JWT secrets, Google client secrets, or payment credentials to GitHub.

### 3. Start the Backend

Run the development script defined in `backend/package.json`.

For example:

```bash
npm run dev
```

If the project does not have a `dev` script, use the start command defined in its `package.json`.

The backend should start on the configured port, commonly `5000`.

### 4. Configure the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create a frontend `.env` file if the application expects one.

Example:

```env
VITE_API_URL=http://localhost:5000
```

The variable name must match the one used by the frontend code.

### 5. Start the Frontend

From the `frontend` directory, run:

```bash
npm run dev
```

Open the local URL printed by Vite, commonly:

http://localhost:5173

Keep the frontend and backend servers running while testing the application.

---

## ☁️ Deployment Configuration

### Frontend — Vercel

The deployed frontend is available at:

https://airbnb-clone-roan-one-93.vercel.app/

Configure the frontend API URL in Vercel's environment variables:

```env
VITE_API_URL=https://stayscape-backend-h9ah.onrender.com
```

Make sure the variable name matches the frontend source code. After changing Vite environment variables, redeploy the frontend for the changes to take effect.

Use the production domain assigned to your project in Vercel's Domains settings. Preview deployment URLs may differ from the production domain.

### Backend — Render

The backend service is available at:

https://stayscape-backend-h9ah.onrender.com

Configure the required environment variables in the Render dashboard.

For example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
FRONTEND_URL=https://airbnb-clone-roan-one-93.vercel.app
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

The exact variable names depend on the backend implementation.

### MongoDB Atlas

The backend uses MongoDB Atlas for cloud database connectivity.

To configure the database:

1. Create or select a MongoDB Atlas cluster.
2. Create a database user with an appropriate password.
3. Configure network access for the deployed backend.
4. Copy the connection string.
5. Store the connection string in the backend environment variables.
6. Confirm the backend can connect to the database.

Avoid leaving database access open to all IP addresses permanently if a narrower, supported network configuration is available.

### CORS Configuration

The backend must allow the frontend's actual origin.

For the current deployment, the frontend origin is:

```text
https://airbnb-clone-roan-one-93.vercel.app
```

For local development, the origin is:

```text
http://localhost:5173
```

Configure CORS to allow the required origins. The Render `FRONTEND_URL` value must match the deployed frontend origin when the backend uses that environment variable.

---

## 🔐 Google OAuth Configuration

Google sign-in requires the correct OAuth client and authorized origins.

In Google Cloud Console:

1. Open **APIs & Services → Credentials**.
2. Select the Web application OAuth client used by the frontend.
3. Add the production frontend origin under **Authorized JavaScript origins**.
4. Add the localhost origin for local development if needed.
5. Save the changes.

Example origins:

```text
https://airbnb-clone-roan-one-93.vercel.app
http://localhost:5173
```

Only add other Vercel deployment origins if Google sign-in is required on those deployments.

The Google Client ID used by the application must match the configured OAuth client. Never publish private client secrets or other credentials.

---

## 🔌 API Overview

The backend exposes a property-listing endpoint:

| Method | Endpoint          | Purpose                    |
| ------ | ----------------- | -------------------------- |
| GET    | `/api/properties` | Retrieve property listings |

The deployed property API can be tested at:

https://stayscape-backend-h9ah.onrender.com/api/properties

Additional routes are organized under the following route prefixes in the backend:

| Route Prefix      | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `/api/properties` | Property listings and related operations |
| `/api/auth`       | Authentication-related operations        |
| `/api/wishlist`   | Wishlist operations                      |
| `/api/bookings`   | Booking-related operations               |
| `/api/reviews`    | Review-related operations                |

The precise HTTP methods, request bodies, authentication requirements, and responses depend on the actual route implementations.

---

## 🧪 Testing Checklist

Use this checklist before publishing changes or presenting the project.

### Authentication

* [ ] Registration works with valid information.
* [ ] Login works with valid credentials.
* [ ] Invalid credentials return an appropriate error.
* [ ] Logout works correctly.
* [ ] Protected operations enforce authentication.
* [ ] Google sign-in works on the production domain.
* [ ] Authentication behaves correctly after a page refresh.

### Property Discovery

* [ ] Property listings load from the backend.
* [ ] Property details open correctly.
* [ ] Destination search works.
* [ ] Category filters work.
* [ ] Missing or invalid property IDs are handled gracefully.

### Wishlist and Reviews

* [x] Properties can be added to and removed from the wishlist.
* [x] Saved properties belong to the correct user.
* [x] Reviews display correctly.
* [x] Review submission works where implemented.

### Host Dashboard and Bookings

* [x] The dashboard displays the appropriate information.
* [x] Listing-management operations enforce authorization.
* [x] Booking inputs are validated.
* [x] Booking data is associated with the correct user.
* [x] Booking availability is checked where implemented.
* [x] Cancellation works where implemented.

### Deployment

* [x] The Vercel production URL loads.
* [x] The backend API responds successfully.
* [x] CORS allows the production frontend origin.
* [x] MongoDB Atlas connectivity works.
* [x] Environment variables are configured correctly.
* [x] No secrets are committed to GitHub.
* [x] The website works on desktop and mobile layouts.

Mark checklist items as complete only after testing them.

---

## 🔒 Security Considerations

* Store sensitive configuration in environment variables.
* Never commit `.env` files containing credentials.
* Validate incoming data on the backend.
* Protect private API routes with the implemented authentication mechanism.
* Verify resource ownership before modifying or deleting user-owned resources.
* Calculate booking prices using trusted backend data.
* Validate booking dates, guest counts, and availability on the server.
* Configure CORS for the intended frontend origins.
* Use test mode for payment development.
* Avoid exposing private credentials in frontend code.

---

## 🚀 Future Enhancements

Potential future improvements include:

* Full payment workflow and booking confirmation.
* Email notifications.
* Map-based property discovery.
* Advanced availability and pricing management.
* Automated frontend and backend tests.
* Improved accessibility.
* Performance optimization and caching.
* Production monitoring and error reporting.

These are possible enhancements, not claims that the functionality is already implemented.

---

## 📚 Learning Outcomes

This project provides practical experience with:

* Building reusable React components.
* Developing REST APIs with Node.js and Express.js.
* Connecting frontend and backend applications.
* Modelling application data with MongoDB and Mongoose.
* Implementing authentication and authorization.
* Integrating third-party sign-in services.
* Configuring environment variables and CORS.
* Deploying a full-stack application.
* Using Git and GitHub for version control.
* Debugging production deployment issues.

---

## 👨‍💻 Author

**Rishi Tiwari**

GitHub: https://github.com/RishiTiwari18

---

## 📄 License

No separate open-source license is specified here. Add a `LICENSE` file if you intend to distribute the project under specific reuse terms.

---

**StayScape — A full-stack accommodation booking application built with React, Node.js, Express.js, and MongoDB.**
