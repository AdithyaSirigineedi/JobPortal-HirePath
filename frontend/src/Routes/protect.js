import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('Email') && localStorage.getItem('Password');
  return isLoggedIn ? children : <Navigate to="" replace />;
};