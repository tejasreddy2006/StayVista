# StayVista

A complete Airbnb-style web application built with Node.js, Express, MongoDB, and EJS.

## Features

- **User Authentication**: Registration, login, logout with Passport.js
- **Listing Management**: Create, view, edit, delete property listings
- **Booking System**: Reserve properties with date selection
- **Reviews**: Add and view reviews for listings
- **Admin Dashboard**: Manage users and listings
- **Role-based Access**: Customer and Admin roles
- **Responsive UI**: Bootstrap 5 styling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Local Strategy
- **Templates**: EJS with EJS-Mate
- **Frontend**: Bootstrap 5, JavaScript
- **Session Management**: Express Session

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the application:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Database Connection

The application connects to MongoDB at:
```
mongodb://127.0.0.1:27017/wanderlust
```

## Default Routes

- **Home**: `/`
- **Listings**: `/listings`
- **Register**: `/register`
- **Login**: `/login`
- **Dashboard**: `/dashboard` (protected)
- **Admin Dashboard**: `/admin/dashboard` (admin only)

## User Roles

- **Customer**: Can create listings, book properties, and leave reviews
- **Admin**: Full access to all features including admin dashboard

## Project Structure

```
wanderlust/
├── models/          # MongoDB models
├── routes/          # Express routes
├── controllers/     # Route controllers
├── views/           # EJS templates
├── public/          # Static assets
├── middleware.js    # Custom middleware
├── app.js          # Main application file
└── package.json    # Dependencies
```

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Role-based access control
- Protected routes with middleware
- Input validation

## Contributing

Feel free to submit issues and enhancement requests!
