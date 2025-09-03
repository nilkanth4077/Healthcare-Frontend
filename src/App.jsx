import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookAppointment from './pages/BookAppointment';
import Login from './pages/Login';
import Register from './pages/Register';
// import Doctorreg from './pages/doctorreg';
// import Patientreg from './pages/patientreg';
// import Appointmentbooking from './pages/appointmentbooking';
// import Index from './pages/Index';
// import Patientlogin from './pages/Patientlogin';
// import Main from './dashboard/main';
// import Card_doc from './pages/Card_doc';
// import DateTimePicker from './pages/DateTimePicker';
// import PatientDashboard from './dashboard/Patient/patientDashboard';
// import Call from './pages/VideoCall';
// import PatientCall from './pages/Patientvideocall';
// import Verifierdashboard from './dashboard/VerifierDash/Verifierdashboard';
// import DoctorDashboard from './dashboard/Doctor/doctorDashboard';
// import Adminlogin from './pages/adminlogin';
// import Verlogin from './pages/verifierlogin';
// import Adminreg from './pages/adminreg';
// import Admindash from './pages/admindash';
// import Verifierreg from './pages/verifierreg';
// import Doclogin from './pages/Doclogin';
import { ToastContainer } from "react-toastify";
import VerifierDashboard from './pages/Verifier/VerifierDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorRegistration from './pages/Doctor/DoctorRegistration';
import AppointmentDetails from './pages/Patient/AppointmentDetails';
import AdminDashHome from './pages/Admin/AdminDashHome';
import DoctorListPage from './pages/Doctor/DoctorListPage';
import DoctorDetails from './pages/Doctor/DoctorDetails';
import DocSlotManagement from './pages/Doctor/DocSlotManagement';
import SlotDetails from './pages/Doctor/SlotDetails';
import PatientVideoCall from './pages/Patient/PatientVideoCall';
import BookedSlots from './pages/Doctor/BookedSlots';



function App() {
  return (
    <>
      <h4 className='font-bold flex justify-center bg-secondary'><span className='mx-3'>Our website is under development, but feel free to explore - some sections may be incomplete !!</span></h4>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doc-registration" element={<DoctorRegistration />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/verifier-dashboard" element={<VerifierDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path='/appointment-details' element={<AppointmentDetails />} />
          <Route path='/admin-dash-home' element={<AdminDashHome />} />
          <Route path='/manage-doctors' element={<DoctorListPage />} />
          <Route path='/doctor/:docId' element={<DoctorDetails />} />
          <Route path='/slot/:slotId' element={<SlotDetails />} />
          <Route path='/doc-slot-management' element={<DocSlotManagement />} />
          <Route path='/call' element={<PatientVideoCall />} />
          <Route path='/doc/appointments' element={<BookedSlots />} />
          {/* <Route path="/datetimepicker" element={<DateTimePicker />} />
          <Route path="/docreg" element={<Doctorreg />} />
          <Route path="/patientreg" element={<Patientreg />} />
          <Route path='/index' element={<Index />} />
          <Route path='/patientlogin' element={<Patientlogin />} />
          <Route path='/dashmain' element={<Main />} />
          <Route path='/selectedspecialist' element={<Card_doc />} />
          <Route path='/patientdashboard' element={<PatientDashboard />} />
          <Route path='/doclogin' element={<Doclogin />} />
          <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/verifierreg' element={<Verifierreg />} />
          <Route path='/verifierlogin' element={<Verlogin />} />
          <Route path='/adminreg' element={<Adminreg />} />
          <Route path='/admindash' element={<Admindash />} />
          <Route path='/verifierdash' element={<Verifierdashboard />} />
          <Route path='/doctordash' element={<DoctorDashboard />} /> */}


          {/* Videocall */}
          {/* <Route path='/VideoCall' element={<Call />} />
          <Route path='/PatientVideoCall' element={<PatientCall />} /> */}

          {/* nilkanth */}
          {/* <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/verifierreg' element={<Verifierreg />} />
          <Route path='/verifierlogin' element={<Verlogin />} />
          <Route path='/adminreg' element={<Adminreg />} />
          <Route path='/admindash' element={<Admindash />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;