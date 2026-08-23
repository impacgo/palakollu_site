import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollManager from "./components/ScrollManager";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useDocumentTitle from "./hooks/useDocumentTitle";

// Code-split every route except Home (the most common entry point stays
// eager so it never shows a loading flash) — keeps the admin panel's code
// out of the bundle public visitors actually download.
const PlaceDetail = lazy(() => import("./pages/PlaceDetail"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const PlacesIndex = lazy(() => import("./pages/PlacesIndex"));
const PackagesIndex = lazy(() => import("./pages/PackagesIndex"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/Dashboard"));
const PackageManagement = lazy(() => import("./admin/PackageManagement"));
const PackageEditor = lazy(() => import("./admin/PackageEditor"));
const PlaceManagement = lazy(() => import("./admin/PlaceManagement"));
const PlaceEditor = lazy(() => import("./admin/PlaceEditor"));
const Enquiries = lazy(() => import("./admin/Enquiries"));
const SiteSettings = lazy(() => import("./admin/SiteSettings"));

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useSmoothScroll();
  useDocumentTitle();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      {!isAdmin && <Navbar />}
      <main>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/places" element={<PlacesIndex />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/packages" element={<PackagesIndex />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/admin">
              <Route index element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="packages" element={<PackageManagement />} />
                <Route path="packages/:id" element={<PackageEditor />} />
                <Route path="places" element={<PlaceManagement />} />
                <Route path="places/:id" element={<PlaceEditor />} />
                <Route path="enquiries" element={<Enquiries />} />
                <Route path="settings" element={<SiteSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
    </MotionConfig>
  );
}

export default App;
