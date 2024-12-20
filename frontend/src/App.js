import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import UserProfile from "./Pages/User/UserProfile";
import Home from "./Pages/Home/Home";
import AddAd from "./Pages/AddAd/AddAd";
import EditAd from "./Pages/EditAd/EditAd";
import NavBar from "./Components/NavBar/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdDetails from "./Pages/AdPage/Adpage";
import MyProducts from "./Pages/MyProducts/MyProducts";
import UserAds from "./Pages/UserAds/UserAds";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages protégées */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-ad"
            element={
              <ProtectedRoute>
                <AddAd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-ad/:id"
            element={
              <ProtectedRoute>
                <EditAd />
              </ProtectedRoute>
            }
          />
           <Route 
           path="/ad-details/:id" 
           element={
           <ProtectedRoute>
             <AdDetails />
           </ProtectedRoute>
           } 
           />
          <Route 
          path="/my-products" 
          element={
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
          }
          />
           <Route 
           path="/user-ads/:id" 
           element={
            <ProtectedRoute>
           <UserAds />
           </ProtectedRoute>
           }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
