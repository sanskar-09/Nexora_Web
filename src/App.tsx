import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { RequireAuth } from './components/RequireAuth'
import { RequireDoctor } from './components/RequireDoctor'
import { RequirePatient } from './components/RequirePatient'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SymptomChecker from './pages/SymptomChecker'
import Medications from './pages/Medications'
import Telemedicine from './pages/Telemedicine'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import DoctorDashboard from './pages/DoctorDashboard'
import Predictions from './pages/Predictions'
import Emergency from './pages/Emergency'
import Appointments from './pages/Appointments'
import HealthRecords from './pages/HealthRecords'
import Community from './pages/Community'
import DietExercise from './pages/DietExercise'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* App routes: redirect to home (landing) if not logged in */}
        {/* Patient & doctor pages: require login. Doctors can access all of these. */}
        <Route path="symptom-checker" element={<RequireAuth><RequirePatient><SymptomChecker /></RequirePatient></RequireAuth>} />
        <Route path="medications" element={<RequireAuth><Medications /></RequireAuth>} />
        <Route path="telemedicine" element={<RequireAuth><Telemedicine /></RequireAuth>} />
        <Route path="dashboard" element={<RequireAuth><RequirePatient><Dashboard /></RequirePatient></RequireAuth>} />
        <Route path="devices" element={<RequireAuth><Devices /></RequireAuth>} />
        <Route path="predictions" element={<RequireAuth><Predictions /></RequireAuth>} />
        <Route path="emergency" element={<RequireAuth><Emergency /></RequireAuth>} />
        <Route path="appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
        <Route path="health-records" element={<RequireAuth><HealthRecords /></RequireAuth>} />
        <Route path="community" element={<RequireAuth><Community /></RequireAuth>} />
        <Route path="diet-exercise" element={<RequireAuth><DietExercise /></RequireAuth>} />
        <Route path="analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
        {/* Doctor only: patients are redirected to dashboard */}
        <Route path="doctor" element={<RequireDoctor><DoctorDashboard /></RequireDoctor>} />
      </Route>
    </Routes>
  )
}
