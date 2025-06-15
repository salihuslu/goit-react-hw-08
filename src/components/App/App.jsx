import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";


import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout"; // çünkü Layout src/components/Layout/Layout.jsx içinde
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';

// lazy-loaded pages
const Home = lazy(() => import("../../pages/Home/Home"));
const Login = lazy(() => import("../../pages/Login/Login"));
const Registration = lazy(() => import("../../pages/Registration/Registration"));
const Contacts = lazy(() => import("../../pages/Contacts/Contacts")); // varsa

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Refreshing user...</div>; // Sayfa yenilenirken kullanıcı yükleniyor
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Registration />} />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<Login />} />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
