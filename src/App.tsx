// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaztnnIaxkvKxafAlEeeikGfCqeEYBKIQ",
  authDomain: "ishanya-6d293.firebaseapp.com",
  projectId: "ishanya-6d293",
  storageBucket: "ishanya-6d293.firebasestorage.app",
  messagingSenderId: "1004044682669",
  appId: "1:1004044682669:web:b0ffab961b7e0048a1cd24",
  measurementId: "G-X2MFP41GJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import your other components
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboardPage from "./pages/AdminDashboard.js";
import EmployeeDashboardPage from "./pages/EmployeeDashboard.js";
import ParentDashboardPage from "./pages/ParentDashboard";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Define the App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
