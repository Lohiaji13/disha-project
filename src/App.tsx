import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultProviders } from "./components/providers/default.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Assessment from "./pages/Assessment.tsx";
import Colleges from "./pages/Colleges.tsx";
import Careers from "./pages/Careers.tsx";
import Resources from "./pages/Resources.tsx";
import Profile from "./pages/Profile.tsx";
import Layout from "@/components/Layout.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          {/* All routes that should share the Navbar go inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
