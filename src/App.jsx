import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import { fetchUserIfTokenExists } from "./utils/api";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
import Loading from "@/components/Loading";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import NotFound from "./pages/404";
import { API_TOKEN } from "./app-constants";
import SettingsLayout from "./layout/settings";
import ForgotPasswordPage from "./pages/forgot-password";
import PasswordResetPage from "./pages/password-reset";
import { queryClient } from "./providers/react-query";
import merchantDetailsLoader from "./utils/route-loaders/merchant-details";
import riderDetailsLoader from "./utils/route-loaders/riders-details";
const Riders = lazy(() => import("./pages/riders"));
const RiderDetails = lazy(() => import("./pages/riders/rider-details"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/orders/[id]"));
const Profile = lazy(() => import("./pages/profile"));
const Security = lazy(() => import("./pages/security"));
const Wallet = lazy(() => import("./pages/wallet"));
const Merchants = lazy(() => import("./pages/merchants"));
const MerchantDetails = lazy(() => import("./pages/merchants/[id]"));
const Users = lazy(() => import("./pages/customers"));
const Loans = lazy(() => import("./pages/loans"));
const LoanDetails = lazy(() => import("./pages/loans/[id]"));

async function loader() {
  try {
    await fetchUserIfTokenExists();

    return null;
  } catch (error) {
    return new Response("", {
      status: 302,
      headers: {
        Location: `/login?from=${location.pathname}`,
      },
    });
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route
        path="/"
        loader={() => {
          if (
            localStorage.getItem(API_TOKEN) ||
            sessionStorage.getItem(API_TOKEN)
          ) {
            return new Response("", {
              status: 302,
              headers: {
                Location: "/dashboard",
              },
            });
          } else {
            return new Response("", {
              status: 302,
              headers: {
                Location: "/login",
              },
            });
          }
        }}
      />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetPage />}
        />
      </Route>
      <Route loader={loader} path="/*" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="riders" element={<Riders />} />
        <Route
          path="riders/:id"
          element={<RiderDetails />}
          loader={riderDetailsLoader}
        />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="commissions" element={<Wallet />} />
        <Route path="merchants" element={<Merchants />} />
        <Route
          path="merchants/:id"
          element={<MerchantDetails />}
          loader={merchantDetailsLoader}
        />
        <Route path="loans" element={<Loans />} />
        <Route path="loans/:id" element={<LoanDetails />} />
        <Route path="customers" element={<Users />} />
        <Route element={<SettingsLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);
function App() {
  return (
    <main className="App relative">
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </main>
  );
}

export default App;
