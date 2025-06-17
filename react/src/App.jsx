import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import AuthService from './services/AuthService';
import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import UserProfileView from './views/UserProfileView/UserProfileView';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import CreateCampaignView from './views/CreateCampaignView/CreateCampaignView';
import CampaignDetailsView from './views/CampaignDetailsView/CampaignDetailsView';
import UpdateCampaignView from './views/UpdateCampaign/UpdateCampaignView';
import ManageCampaignsView from './views/ManageCampaignsView/ManageCampaignsView';
import ExploreView from './views/ExploreView/ExploreView';

export default function App() {
  const [user, setUser] = useState(() => getTokenFromStorage());

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    // Remove auth data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear auth token from axios
    delete axios.defaults.headers.common['Authorization'];

    // Clear the auth context
    setUser(null);
  }

  // When a user comes back to the app or refreshes the page, check for user/token in local storage and validate it
  function getTokenFromStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      // Set the token in the axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make asynchronous API request to ensure token is still valid
      AuthService.getUserProfile(user.id)
        .then(() => {
          // Token is still valid, do nothing because user is already set to state
        })
        .catch(() => {
          // Token is not valid, act like user just logged out
          handleLogout();
        });

      // Return the user object, even if it's not validated yet
      return user;
    }
    // no user/token in local storage, return null
    return null;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/explore" element={<ExploreView />} />
          <Route path="/createCampaign" element={<CreateCampaignView />} />
          <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
          <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} />
          <Route path="/register" element={<RegisterView />} />
          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfileView />
              </ProtectedRoute>
            }
          />
          <Route path='campaign/:id' element={<CampaignDetailsView />} />
          <Route
            path='/campaign/:id/update'
            element={
              <ProtectedRoute>
                <UpdateCampaignView />
              </ProtectedRoute>
            }
          />
          <Route path="/campaign/user/:id" element={
            <ProtectedRoute>
              <ManageCampaignsView />
            </ProtectedRoute>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
