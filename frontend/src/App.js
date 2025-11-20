import { BrowserRouter,Routes, Route } from 'react-router-dom';
// import './App.css';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import animation from './images/animation.lottie';
import Login from './logins/Login.js';
import SignupForm from './logins/signup.js';
import ErrorPage from './pages/errorPage.js';
import ForgotForm from './logins/forgotpass.js';
import Home from './pages/homePage.js';
import  { ProtectedRoute } from '../src/Routes/protect.js';
import Profile from './pages/profile.js';
import EmployerHome from './pages/employerHome.js';
import AddJob from './pages/postjob.js';
import About from './pages/about.js';
import ApplyJobs from './pages/applyjobs.js';
import Apply from './pages/apply.js';
import FindTalent from './pages/findtalent.js';
import Scratch from './pages/scratchcard.js';
import StatusPage from './pages/applicationstatus.js';

const App = () => {
  return (
    <>
 <BrowserRouter>
    <Routes>
		  <Route path="*" element={<ErrorPage />} /> {/* WildCard Routing  */}
      <Route path="/" element={<Login />}/>
      {/* <Route path="/employee/login" element={<EmployeeLogin />}/>
      <Route path="/jobseeker/login"  element={<EmployeeLogin />}/> */}

      <Route path="/forgot"  element={<ForgotForm />}/>
      <Route path="/employee/forgotpassword"  element={<ForgotForm />}/>
      <Route path="/jobseeker/forgotpassword"  element={<ForgotForm />}/>

      <Route path="/signup"  element={<SignupForm />}/>
      {/* <Route path="/employee/signup"  element={<SignupForm />}/>
      <Route path="/jobseeker/signup"  element={<SignupForm />}/> */}

       <Route path="/jobseeker/home" element= {
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />

            <Route path="/employer/home" element= {
            <ProtectedRoute>
              <EmployerHome />
            </ProtectedRoute>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applyjobs"
            element={
              <ProtectedRoute>
                <ApplyJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
           <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="/find-talent" element= {
            <ProtectedRoute>
              <FindTalent />
            </ProtectedRoute>} />
            
         <Route path="/scratch-card" element= {
            <ProtectedRoute>
              <Scratch />
            </ProtectedRoute>} />

            <Route path="/application-status" element= {
            <ProtectedRoute>
              < StatusPage/>
            </ProtectedRoute>} />


          </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
