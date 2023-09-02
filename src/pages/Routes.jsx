import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';

import Frontend from './Frontend';
import Auth from './Auth';

export default function Index() {
  const { isAuth } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoute Component={Frontend} />} />
        <Route
          path="/auth/*"
          element={!isAuth ? <Auth /> : <Navigate to="/" />}
        />
        {/* <Route path="/dashboard/*"element={<PrivateRoute Component={Frontend} />}/> */}
      </Routes>
    </>
  );
}
