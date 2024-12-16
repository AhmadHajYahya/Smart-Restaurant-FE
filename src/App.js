import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp/Signup.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Profile from "./components/profile/Profile.jsx";
import React, { useEffect } from "react";
import { AuthProvider } from "./AuthContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import MenuPage from "./components/Menu/MenuPage.jsx";
import MealOrder from "./components/MealOrder/MealOrder.jsx";
import QrReader from "./components/QrScanner/QrReader.jsx";
import { DataProvider } from "./DataContext.js";
import OrderRealTimeTracker from "./components/MealOrder/OrderRealTimeTracker.jsx";
import WaiterDashboard from "./components/StaffDashoboards/WaiterDashboard.jsx";
import CookDashboard from "./components/StaffDashoboards/CookDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import StaffProfile from "./components/profile/StaffProfile.jsx";
import GuestUserProfile from "./components/profile/GuestUserProfile.jsx";
import StripeProvider from "./components/Stripe/StripeProvider.jsx";
import Booking from "./components/Booking/Booking.jsx";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery.jsx";
import InRestaurant from "./components/profile/InRestaurant.jsx";
import { useAuth } from "./AuthContext.js";
import AppInitializer from "./AppInitializer";
function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <AppInitializer />
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<Signup />}></Route>
              <Route
                path="/profile/:userId"
                element={<ProtectedRoute element={Profile} />}
              ></Route>
              <Route
                path="/take-table"
                element={<ProtectedRoute element={QrReader} />}
              ></Route>
              <Route
                path="/menu"
                element={<ProtectedRoute element={MenuPage} />}
              ></Route>
              <Route
                path="/meal-order"
                element={<ProtectedRoute element={MealOrder} />}
              ></Route>
              <Route
                path="/meal-order/tracker"
                element={<ProtectedRoute element={OrderRealTimeTracker} />}
              ></Route>
              <Route
                path="/waiter-dashboard"
                element={<ProtectedRoute element={WaiterDashboard} />}
              ></Route>
              <Route
                path="/cook-dashboard"
                element={<ProtectedRoute element={CookDashboard} />}
              ></Route>
              <Route
                path="/admin-dashboard"
                element={<ProtectedRoute element={AdminDashboard} />}
              ></Route>
              <Route
                path="/staff-profile/:userId"
                element={<ProtectedRoute element={StaffProfile} />}
              ></Route>
              <Route
                path="/guest-profile/:userId"
                element={<ProtectedRoute element={GuestUserProfile} />}
              ></Route>
              <Route
                path="/checkout"
                element={<ProtectedRoute element={StripeProvider} />}
              ></Route>
              <Route
                path="/booking"
                element={<ProtectedRoute element={Booking} />}
              ></Route>
              <Route
                path="/password-recovery"
                element={<PasswordRecovery />}
              ></Route>
              <Route
                path="/in-restaurant"
                element={<ProtectedRoute element={InRestaurant} />}
              ></Route>
            </Routes>
          </div>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
