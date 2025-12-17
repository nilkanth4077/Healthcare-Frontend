import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookAppointment from './pages/BookAppointment';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from "react-toastify";
import VerifierDashboard from './pages/Verifier/VerifierDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorRegistration from './pages/Doctor/DoctorRegistration';
import AppointmentDetails from './pages/Patient/AppointmentDetails';
import DoctorListPage from './pages/Doctor/DoctorListPage';
import DoctorDetails from './pages/Doctor/DoctorDetails';
import DocSlotManagement from './pages/Doctor/DocSlotManagement';
import SlotDetails from './pages/Doctor/SlotDetails';
import BookedSlots from './pages/Doctor/BookedSlots';
import MyAppointments from './pages/Patient/MyAppointments';
import AdminHome from './pages/Admin/AdminHome';
import PatientListPage from './pages/Doctor/PatientListPage';
import PatientDetails from './pages/Doctor/PatientDetails';

function App() {
  return (
    <>
      {/* <h4 className='font-bold flex justify-center bg-secondary'><span className='mx-3'>Our website is under development, but feel free to explore - some sections may be incomplete !!</span></h4> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doc-registration" element={<DoctorRegistration />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/verifier-dashboard" element={<VerifierDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path='manage-doctors' element={<DoctorListPage />} />
            <Route path='manage-patients' element={<PatientListPage />} />
            <Route path='doctor/:docId' element={<DoctorDetails />} />
            <Route path='patient/:patientId' element={<PatientDetails />} />
          </Route>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path='/appointment-details' element={<AppointmentDetails />} />
          <Route path='/slot/:slotId' element={<SlotDetails />} />
          <Route path='/doc-slot-management' element={<DocSlotManagement />} />
          <Route path='/doc/appointments' element={<BookedSlots />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;