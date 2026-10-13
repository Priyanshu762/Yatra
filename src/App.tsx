import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastBanner } from './components/ToastBanner';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { PaymentSimulationPage } from './pages/PaymentSimulationPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CabCalculatorPage } from './pages/CabCalculatorPage';


// Admin Pages
import { AdminLayout } from './admin/AdminLayout';
import { AdminOverviewPage } from './admin/AdminOverviewPage';
import { AdminBookingsPage } from './admin/AdminBookingsPage';
import { AdminAllocationsPage } from './admin/AdminAllocationsPage';
import { AdminPackagesPage } from './admin/AdminPackagesPage';
import { AdminDestinationsPage } from './admin/AdminDestinationsPage';
import { AdminVehiclesPage } from './admin/AdminVehiclesPage';
import { AdminDriversPage } from './admin/AdminDriversPage';
import { AdminPaymentsPage } from './admin/AdminPaymentsPage';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Customer Layout Wrapper
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastBanner />
        <Routes>
          {/* Public Customer Routes */}
          <Route path="/" element={<CustomerLayout><HomePage /></CustomerLayout>} />
          <Route path="/destinations" element={<CustomerLayout><DestinationsPage /></CustomerLayout>} />
          <Route path="/destinations/:id" element={<CustomerLayout><DestinationDetailPage /></CustomerLayout>} />
          <Route path="/packages" element={<CustomerLayout><PackagesPage /></CustomerLayout>} />
          <Route path="/packages/:id" element={<CustomerLayout><PackageDetailPage /></CustomerLayout>} />
          <Route path="/calculator" element={<CustomerLayout><CabCalculatorPage /></CustomerLayout>} />
          <Route path="/cabs" element={<CustomerLayout><CabCalculatorPage /></CustomerLayout>} />
          <Route path="/book/:packageId" element={<CustomerLayout><BookingCheckoutPage /></CustomerLayout>} />
          <Route path="/checkout/payment" element={<CustomerLayout><PaymentSimulationPage /></CustomerLayout>} />
          <Route path="/booking-confirmation/:bookingId" element={<CustomerLayout><BookingConfirmationPage /></CustomerLayout>} />
          <Route path="/my-bookings" element={<CustomerLayout><MyBookingsPage /></CustomerLayout>} />
          <Route path="/about" element={<CustomerLayout><AboutPage /></CustomerLayout>} />
          <Route path="/contact" element={<CustomerLayout><ContactPage /></CustomerLayout>} />
          <Route path="/terms" element={<CustomerLayout><TermsPage /></CustomerLayout>} />
          <Route path="/privacy" element={<CustomerLayout><PrivacyPage /></CustomerLayout>} />

          {/* Admin Protected-Looking Demo Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="allocations" element={<AdminAllocationsPage />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="destinations" element={<AdminDestinationsPage />} />
            <Route path="vehicles" element={<AdminVehiclesPage />} />
            <Route path="drivers" element={<AdminDriversPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
          </Route>

          {/* Catch-all Fallback */}
          <Route path="*" element={<CustomerLayout><HomePage /></CustomerLayout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
