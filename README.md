---

# YelpCamp

Welcome to YelpCamp, a campground booking web application built by Suraj during a Udemy course!
YelpCamp allows users to explore and book campgrounds for camping adventures. 
The application features full CRUD functionality for campgrounds, user authentication, session management, campground reviews with star ratings, and integration with cloudinary for image storage.

## Features

- Explore and book campgrounds for camping adventures
- Add new campgrounds with title, location, price, description, and images
- Geocoding feature to display campground locations on a map
- Secure input handling to prevent HTML injection and other security vulnerabilities
- User authentication with login and register options
- Session and cookies to remember user login status
- Ability for users to rate and review campgrounds
- Star rating options for campground reviews
- Full CRUD functionality for campgrounds
- Protection against unauthorized changes or deletions of user reviews or campgrounds

## Technologies Used

- MongoDB: Database for storing user data, campground information, and reviews
- Express.js: Web framework for handling server-side logic and routing
- Node.js: JavaScript runtime environment for building server-side applications
- EJS (Embedded JavaScript): Templating engine for generating dynamic HTML content
- EJS Mate: Enhances EJS functionality for better templating experience
- Cloudinary: Cloud-based image management platform for storing and serving images
- Helmet.js: Middleware for securing HTTP headers and preventing common security vulnerabilities
- Joi: Library for input validation
- Leaflet: JavaScript library for interactive maps
- Method-override: Middleware for handling HTTP method overrides
- Mongoose: MongoDB object modeling tool for Node.js
- Multer: Middleware for handling multipart/form-data for file uploads
- Multer-storage-cloudinary: Multer storage engine for uploading files to Cloudinary
- Node-fetch: Library for making HTTP requests in Node.js
- Passport: Authentication middleware for Node.js
- Passport-local: Passport strategy for authenticating with a username and password
- Passport-local-mongoose: Mongoose plugin for simplifying username and password authentication
- Sanitize-html: Library for sanitizing HTML inputs

## Deployment

This web app is deployed using Render.com by Tiger. You can access the live version of the app at https://yelpcamp-grwi.onrender.com

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Rename the `.env.example` file to `.env` and update it with your MongoDB connection URI, Cloudinary credentials, Geoapify API key, and session secret key.
5. Start the server by running `npm start`.
6. Open your web browser and visit `http://localhost:3000` to access YelpCamp.

## Security Considerations

- Ensure that the `.env` file containing sensitive information is not pushed to public repositories for security reasons.
- Regularly update dependencies to mitigate security vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Udemy: For providing the course materials and guidance for building YelpCamp.
- Cloudinary: For providing image storage and management services.
- Helmet.js: For enhancing the security of the application by securing HTTP headers.

---
