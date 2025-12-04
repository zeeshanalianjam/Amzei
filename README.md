# Amzei

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)

## 📝 Description

Discover the wonders of Dubai and the UAE with Amzei, your ultimate tourism companion. Built with React for a seamless and engaging user experience, Amzei brings the beauty and excitement of the Emirates to your fingertips. Explore a wealth of information powered by a robust API and database, providing you with up-to-date details on attractions, events, and hidden gems. Whether you're planning your dream vacation or seeking local adventures, Amzei's user-friendly web interface makes exploring Dubai and the UAE easier than ever before.

## ✨ Features

- 🌐 Api
- 🗄️ Database
- 🕸️ Web


## 🛠️ Tech Stack

- ⚛️ React


## 📦 Key Dependencies

```
@react-three/drei: ^10.7.6
@react-three/fiber: ^9.3.0
@reduxjs/toolkit: ^2.9.0
axios: ^1.12.2
framer-motion: ^12.23.16
jwt-decode: ^4.0.0
react: ^19.1.1
react-dom: ^19.1.1
react-hot-toast: ^2.6.0
react-icons: ^5.5.0
react-redux: ^9.2.0
react-router-dom: ^7.9.1
recharts: ^3.2.1
three: ^0.180.0
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`


## 📁 Project Structure

```
.
├── admin
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── admin
│   │   │   ├── AdminBookings.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDestinationForm.jsx
│   │   │   ├── AdminDestinations.jsx
│   │   │   ├── AdminEventForm.jsx
│   │   │   ├── AdminEvents.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AdminTourForm.jsx
│   │   │   ├── AdminTourPackagesBookings.jsx
│   │   │   ├── AdminTours.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── adminStore
│   │   │   ├── adminSlice.js
│   │   │   ├── adminStore.js
│   │   │   └── dashboardSlice.js
│   │   ├── api
│   │   │   └── fetchAdminData.js
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── common
│   │   │   ├── axios.js
│   │   │   └── summaryApi.js
│   │   ├── components
│   │   │   ├── BookingDetailsPopup.jsx
│   │   │   ├── ComingSoon.jsx
│   │   │   ├── ComingSoonCSS3D.jsx
│   │   │   ├── ConfirmPopup.jsx
│   │   │   ├── ForgotPasswordPopup.jsx
│   │   │   ├── OTPPage.jsx
│   │   │   ├── PageNotFound.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   └── StatusPopup.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── client
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── 13153069_2160_3840_30fps.mp4
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── common
│   │   │   ├── axios.js
│   │   │   └── summaryApi.js
│   │   ├── components
│   │   │   ├── AboutUs.jsx
│   │   │   ├── CallToAction.jsx
│   │   │   ├── Destinations.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Tours.jsx
│   │   │   └── TravelTips.jsx
│   │   ├── data
│   │   │   ├── Destinations.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Tours.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AllDestinations.jsx
│   │   │   ├── AllToursPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── BookingSuccess.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── DestinationPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── TourConfirmationPage.jsx
│   │   │   ├── TourDetailPage.jsx
│   │   │   └── ToursPage.jsx
│   │   ├── store
│   │   │   ├── placesSlice.js
│   │   │   ├── store.js
│   │   │   ├── tourBookingSlice.js
│   │   │   └── userSlice.js
│   │   └── utils
│   │       ├── LoadingPopup.jsx
│   │       └── useAuthCheck.js
│   ├── tailwind.config.js
│   ├── todo.md
│   ├── vercel.json
│   └── vite.config.js
└── server
    ├── package.json
    └── src
        ├── app.js
        ├── controllers
        │   ├── destination.controller.js
        │   ├── event.controller.js
        │   ├── tour.controller.js
        │   ├── tourBooking.controller.js
        │   ├── tourPackage.controller.js
        │   └── user.controller.js
        ├── db
        │   └── dbConnection.js
        ├── index.js
        ├── middlewares
        │   ├── auth.middleware.js
        │   └── multer.middleware.js
        ├── models
        │   ├── destination.model.js
        │   ├── event.model.js
        │   ├── tour.model.js
        │   ├── tourBooking.model.js
        │   ├── tourPackage.model.js
        │   └── user.model.js
        ├── routes
        │   ├── destination.routes.js
        │   ├── event.routes.js
        │   ├── tour.routes.js
        │   ├── tourBooking.routes.js
        │   ├── tourPackage.routes.js
        │   └── user.routes.js
        ├── services
        │   ├── cloudinary.js
        │   └── verifyEmail.js
        └── utils
            ├── apiError.js
            ├── apiResponse.js
            ├── asyncHandler.js
            ├── verifyEmailTemplate.js
            └── welcomeEmailTemplate.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/zeeshanalianjam/Amzei.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

