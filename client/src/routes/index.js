import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";  // "/home"

import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: "/auth",
            element: <MainLayout />,
            children: [
                { path: "login", element: <LoginPage />},
                { path: "register", element: <RegisterPage />},
                { path: "reset-password", element: <ResetPasswordPage />},
                { path: "new-password", element: <NewPasswordPage />},
            ]
        },
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
                { path: "home", element: <HomeApp /> },
                { path: "enrollment", element: <EnrollmentPage /> },
                { path: "documents", element: <DocumentPage /> },
                { path: "contact", element: <ContactPage /> },
                { path: "q&a", element: <QuoraPage /> },
                { path: "settings", element: <SettingsPage /> },
                { path: "404", element: <Page404 /> },
                { path: "*", element: <Navigate to="/404" replace /> },
            ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}

const LoginPage = Loadable(
    lazy(() => import("../pages/auth/Login")),
);
const ResetPasswordPage = Loadable(
    lazy(() => import("../pages/auth/ResetPassword")),
);
const RegisterPage = Loadable(
    lazy(() => import("../pages/auth/Register")),
);
const NewPasswordPage = Loadable(
    lazy(() => import("../pages/auth/NewPassword")),
);
const HomeApp = Loadable(
    lazy(() => import("../pages/dashboard/HomeApp")),
);
const EnrollmentPage = Loadable(
    lazy(() => import("../pages/dashboard/Enrollment")),
);
const DocumentPage = Loadable(
    lazy(() => import("../pages/dashboard/Document")),
);
const QuoraPage = Loadable(
    lazy(() => import("../pages/dashboard/Quora")),
);
const ContactPage = Loadable(
    lazy(() => import("../pages/dashboard/Contact")),
);
const SettingsPage = Loadable(
    lazy(() => import("../pages/dashboard/Settings")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));