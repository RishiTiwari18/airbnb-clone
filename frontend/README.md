# StayScape — Airbnb Clone

StayScape is a full-stack accommodation booking web application inspired by Airbnb. It allows users to explore property listings, view property details, search for stays, manage wishlists, and interact with property-related features through a modern web interface.

The project is built using the MERN stack, combining React, Node.js, Express.js, and MongoDB.

## Features

### 1. User Authentication

* User registration and login.
* Authentication-aware navigation.
* Protected pages and authenticated operations.
* User-specific features based on authentication status.

### 2. Property Discovery

* Browse available property listings.
* View detailed information about individual properties.
* Search properties by destination.
* Filter properties by category.
* Filter listings according to supported search criteria.

### 3. Property Details

* View property descriptions and images.
* Explore property information such as location, pricing, and amenities where available.
* Review available property information before booking.

### 4. Wishlist

* Save properties for future reference.
* Remove properties from the wishlist.
* Access saved properties through the application.

### 5. Reviews and Ratings

* Display property ratings and reviews.
* Support property review interactions implemented in the application.

### 6. Host Dashboard

* Access the host property-management interface.
* Manage property listings.
* Perform supported listing operations such as creating, editing, and deleting properties.
* Apply authorization checks to property-management operations.

### 7. Booking System

* Select check-in and check-out dates where supported.
* Specify the number of guests.
* Submit booking requests through the application.
* Validate booking information through backend logic where implemented.
* View or manage bookings if the corresponding features are enabled.

**Note:** Feature availability depends on the current implementation. Booking availability checks, cancellation, payments, and other advanced operations should be considered complete only after they have been implemented and tested.

## Technology Stack

### Frontend

* **React:** Builds the user interface using reusable components.
* **Vite:** Provides the frontend development server and build tooling.
* **React Router:** Supports navigation between application pages if configured.
* **CSS:** Styles components and application layouts.
* **JavaScript:** Implements frontend application logic.

### Backend

* **Node.js:** Provides the JavaScript runtime for the backend.
* **Express.js:** Handles HTTP requests and defines REST API routes.
* **Mongoose:** Provides object modelling and database interaction for MongoDB.
* **REST APIs:** Enable communication between the frontend and backend.

### Database

* **MongoDB:** Stores application data.
* **MongoDB Atlas:** Provides a cloud-hosted MongoDB option when configured.

### Development Tools

* **Visual Studio Code:** Code editor.
* **Git:** Version control.
* **GitHub:** Source-code hosting and project collaboration.
* **npm:** Dependency management and script execution.

## Project Architecture

The application follows a frontend-backend architecture.

```text
                 USER
                   |
                   v
          React Frontend
             + Vite
                   |
                   | HTTP Requests
                   v
          Express.js Backend
                   |
                   v
             API Routes
                   |
                   v
          Controllers / Logic
                   |
                   v
              Mongoose
                   |
                   v
               MongoDB
```

The frontend displays the application interface and sends requests to the backend. The backend processes requests, performs validation and authorization where required, interacts with MongoDB, and returns responses to the frontend.

## Project Structure

The project is organized into separate frontend and backend applications.

```text
airbnb-clone/
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- context/
|   |   |-- data/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- package.json
|   `-- index.html
|
|-- backend/
|   |-- src/
|   |   |-- models/
|   |   |-- controllers/
|   |   |-- routes/
|   |   |-- middleware/
|   |   `-- server.js
|   `-- package.json
|
`-- README.md
```

The structure above describes the main organizational pattern. Some directories may differ depending on the current implementation.

## Prerequisites

Before running the project, install:

* Node.js
* npm
* Git
* MongoDB Atlas or a compatible MongoDB instance

Verify your installations:

```bash
node --version
npm --version
git --version
```

## Installation and Setup

### Step 1: Obtain the Project

Clone the repository from its GitHub page:

```bash
git clone <your-repository-url>
cd airbnb-clone
```

Alternatively, download the repository as a ZIP file from GitHub and extract it.

### Step 2: Configure the Backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

Example configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

These are example variable names. Use the exact names expected by your backend code. Keep actual database credentials and signing secrets private.

### Step 3: Start the Backend

Run the development script defined in `backend/package.json`.

For example, if the project defines a `dev` script:

```bash
npm run dev
```

The backend is expected to listen on port `5000` when configured with the example `PORT` value.

Keep this terminal open.

### Step 4: Configure the Frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
```

If the frontend uses an environment variable for the backend URL, configure it in the frontend environment file using the variable name expected by the code.

For example:

```env
VITE_API_URL=http://localhost:5000
```

This example applies only if the frontend actually reads `VITE_API_URL`. If the API URL is hardcoded or uses a different variable, follow the existing implementation.

### Step 5: Start the Frontend

From the `frontend` directory, run:

```bash
npm run dev
```

Vite will display the local development URL in the terminal. The default is commonly:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

### Step 6: Verify the Application

With both servers running, check:

1. The home page loads.
2. Property listings appear.
3. Property details open correctly.
4. Registration and login work.
5. Search and category filters behave as expected.
6. Wishlist operations work for authenticated users.
7. The Host Dashboard loads and enforces appropriate permissions.
8. Booking-related features work as implemented.
9. The browser console and backend terminal do not show unexpected errors.

## Environment Configuration

Environment variables keep configuration separate from application source code.

| Configuration             | Purpose                                                                |
| ------------------------- | ---------------------------------------------------------------------- |
| Backend port              | Defines the port used by the Express server                            |
| MongoDB connection string | Connects the backend to MongoDB                                        |
| JWT signing secret        | Supports token signing and verification if JWT authentication is used  |
| Frontend API base URL     | Defines the backend address used by frontend requests, if configurable |

The actual variable names must match the application's source code.

Never commit real `.env` files, database passwords, private API keys, or authentication secrets to GitHub.

## API Overview

The frontend communicates with the backend through HTTP requests.

The property-listing API used by the current application is:

| Method | Endpoint          | Purpose                    |
| ------ | ----------------- | -------------------------- |
| GET    | `/api/properties` | Retrieve property listings |

Other API routes depend on the route files and router configuration in the backend.

The application may also contain API operations for authentication, property details, wishlists, reviews, bookings, and host property management.

To document an additional endpoint accurately, check the corresponding route definition and how that router is mounted in the backend server.

## Security Considerations

Security is important for applications that handle user accounts, property listings, and bookings.

Recommended practices include:

* Store secrets in environment variables.
* Validate incoming request data on the backend.
* Protect private routes using the authentication mechanism implemented by the application.
* Verify resource ownership before modifying or deleting user-owned resources.
* Calculate booking prices using trusted server-side data.
* Validate booking dates, guest limits, and availability on the backend.
* Avoid exposing private credentials in frontend code.
* Return appropriate error responses for invalid or unauthorized requests.
* Configure production CORS settings for the intended frontend origin.

These practices should be verified against the actual implementation before the project is considered production-ready.

## Testing Checklist

Use this checklist to verify the application before publishing a final release.

### Authentication

* [x] Registration works with valid input.
* [x] Login works with valid credentials.
* [x] Invalid credentials produce an appropriate error.
* [x] Protected routes enforce authentication.
* [x] Logout behaves correctly.

### Property Discovery

* [x] Property listings load successfully.
* [x] Property detail pages display the correct property.
* [x] Destination search works.
* [x] Category filters work.
* [x] Invalid property IDs are handled gracefully.

### Wishlist

* [x] Properties can be added to the wishlist.
* [x] Properties can be removed from the wishlist.
* [x] Saved properties are associated with the correct user.

### Reviews and Ratings

* [x] Reviews display correctly.
* [x] Review submission works where implemented.
* [x] Invalid review data is handled appropriately.

### Host Dashboard

* [x] The dashboard displays the appropriate property information.
* [x] Listing creation works where implemented.
* [x] Listing updates work where implemented.
* [x] Listing deletion works where implemented.
* [x] Users cannot modify properties they are not authorized to manage.

### Booking System

* [x] Booking dates are validated.
* [x] Check-out is later than check-in.
* [x] Guest limits are enforced.
* [x] Prices are calculated using backend data.
* [x] Conflicting bookings are rejected where availability checking is implemented.
* [x] Users can access only their own booking records.
* [x] Cancellation works where implemented.

### General

* [x] The application works on desktop and mobile layouts.
* [x] API errors are handled appropriately.
* [x] No private credentials are committed to GitHub.
* [x] Installation instructions have been tested on a clean setup.

## Future Improvements

Possible future improvements include:

* Online payment integration.
* Email notifications for booking events.
* Map-based property discovery.
* Advanced pricing and availability management.
* Automated frontend and backend tests.
* Improved accessibility.
* Production deployment and monitoring.
* Performance optimization and caching.

These items represent potential improvements and are not claims that the functionality already exists.

## Learning Outcomes

This project provides practical experience with:

* Building reusable React components.
* Managing frontend application state.
* Connecting a frontend to REST APIs.
* Developing backend routes and request handlers.
* Modelling application data with MongoDB and Mongoose.
* Implementing authentication and authorization.
* Building property discovery and filtering features.
* Organizing a full-stack JavaScript project.
* Managing source code with Git and GitHub.
* Debugging frontend and backend integration issues.

## License

This project is available for personal learning and portfolio demonstration.

No separate open-source license is specified in this repository. Unless a license is added, other users should not assume that they have permission to redistribute or reuse the project's code.

---

**Built as a full-stack web development learning project using React, Node.js, Express.js, and MongoDB.**
