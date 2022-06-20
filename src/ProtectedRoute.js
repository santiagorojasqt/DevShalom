import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import axios from 'axios';
import {auth, functions} from './firebase';
export function ProtectedRoute({ children }) {

  const validToken = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/ValidateToken',
      { example: 'data' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      ).then(function(resp){
          console.log(resp.data);
          return resp;
      })
      .catch(function(err){
          console.log(err);
      });
  }
  
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user || !validToken()) return <Navigate to="/" />;
  

  return <>{children}</>;
}