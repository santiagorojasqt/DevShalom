import logo from './logo.svg';
import './public/css/style.css';
import './public/vendor/bootstrap/css/bootstrap.min.css';
import './public/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/vendor/boxicons/css/boxicons.min.css';
import './public/vendor/quill/quill.snow.css';
import './public/vendor/quill/quill.bubble.css';
import './public/vendor/remixicon/remixicon.css';
import './public/vendor/simple-datatables/style.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reset from './Reset';
import Dashboard from './Dashboard';
import {auth} from './firebase'
import {useState,useEffect} from 'react'
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Branch from './Branch';
import BranchCreate from './BranchCreate';
import Contract from './Contract';
import Delivery from './Delivery';
import Requirement from './Requirement';
import Sidebar from './Sidebar';
import Header from './Header';
import ContractCreate from './ContractCreate';
import Footer from './Footer';
import ServiceCreate from './ServiceCreate';
import DeliveryCreate from './DeliveryCreate';
import Contact from './Contact';
import ContactCreate from './ContactCreate';
import User from './User';
import UserCreate from './UserCreate';
import Service from './Service';
import RequirementCreate from './RequirementCreate';
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className="App">
        
        
        <Router>
          <AuthProvider>
            <Header/>
            <Sidebar/>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route exact path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route exact path="/Branch" element={
                <ProtectedRoute>
                  <Branch />
                </ProtectedRoute>
              } />
               <Route exact path="/Branch/Create/"  element={
                <ProtectedRoute>
                  <BranchCreate key='BranchCreation' />
                </ProtectedRoute>
              } />
              <Route exact path="/Contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
               <Route exact path="/Contact/Create/"  element={
                <ProtectedRoute>
                  <ContactCreate key='ContactCreation' />
                </ProtectedRoute>
              } />
              <Route exact path="/Contract" element={
                <ProtectedRoute>
                  <Contract />
                </ProtectedRoute>
              } />
              <Route exact path="/Contract/Create" element={
                <ProtectedRoute>
                  <ContractCreate />
                </ProtectedRoute>
              } />
              <Route exact path="/User" element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              } />
              <Route exact path="/User/Create" element={
                <ProtectedRoute>
                  <UserCreate />
                </ProtectedRoute>
              } />
              <Route exact path="/Delivery" element={
                <ProtectedRoute>
                  <Delivery />
                </ProtectedRoute>
              } />
              <Route exact path="/Delivery/Create" element={
                <ProtectedRoute>
                  <DeliveryCreate />
                </ProtectedRoute>
              } />
              <Route exact path="/Service" element={
                <ProtectedRoute>
                  <Service />
                </ProtectedRoute>
              } />
              <Route exact path="/Service/Create" element={
                <ProtectedRoute>
                  <ServiceCreate />
                </ProtectedRoute>
              } />
              <Route exact path="/Requirement" element={
                <ProtectedRoute>
                  <Requirement />
                </ProtectedRoute>
              } />
              <Route exact path="/Requirement/Create" element={
                <ProtectedRoute>
                  <RequirementCreate />
                </ProtectedRoute>
              } />
              
            </Routes>
            
          </AuthProvider>
          
        </Router>
        <Footer/>
    </div>
  );
}

export default App;