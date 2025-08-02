import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Footer from './components/footer/Footer';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import DashboardHome from './pages/dashboardHome/DashboardHome';
import Notes from './pages/notes/Notes';
import Reminders from './pages/reminder/Reminder';
import CreateTask from './pages/createTask/CreateTask';
import GenerateReport from './pages/generateReport/GenerateReport';
import Contact from './pages/ContactPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/otp/verify" element={<VerifyOtp />} />
      <Route path="/password/update" element={<UpdatePassword />} />
      <Route path="/dashboard-home" element={<DashboardHome />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/generate-report" element={<GenerateReport />} />
      <Route path="/contact" element={<ContactPage />} />

    </Routes>
    <Footer />
  </>);
}

export default App;