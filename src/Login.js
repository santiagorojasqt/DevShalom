import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './public/img/logo.png';
import { useAuth } from "./context/AuthContext";
import { logInWithEmailAndPassword } from "./firebase";
import { Alert } from "./Alert";
import { Navigate } from "react-router-dom";

function Login() {
    
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const { login, loginWithGoogle, resetPassword,user } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    let errorvisibility = "invalid-feedback hidden";
    let errormsg = ""
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("entered");
        setError("");
        try {
            await login(userLogin.email, userLogin.password);
            navigate("/dashboard");
        } catch (error) {
            if(error.message.includes("invalid-email"))
                error.message = "El email es incorrecto";
            else if(error.message.includes("internal-error")){
                error.message = "por favor digita la contraseña";
            }
            else if(error.message.includes("uth/wrong-password")){
                error.message = "Usuario y/o Contraseña incorrectos";
                
            }
            else if(error.message.includes("auth/user-not-found")){
                error.message = "Usuario y/o Contraseña incorrectos";
                
            }
            else if(error.message.includes("auth/invalid-email")){
                error.message = "Usuario invalido";
                
            }
            console.log(error.message);
            setError(error.message);
        }
    };

    const handleChange = ({ target: { value, name } }) =>
    setUserLogin({ ...userLogin, [name]: value });

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };
    if (user) return <Navigate to="/DashBoard" />;
    return (
      
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
  
                <div className="d-flex justify-content-center py-4">
                  <a href="?" className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt=""/>
                    <span className="d-none d-lg-block">Diran Suministros</span>
                  </a>
                </div>
                <div className="card mb-3">
  
                  <div className="card-body">
  
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Inicia sesión en tu cuenta</h5>
                      <p className="text-center small">Ingresa tu Usuario y contraseña para iniciar</p>
                    </div>
  
                    <form className="row g-3 needs-validation" noValidate>
                     {error && <Alert message={error} />}
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Usuario</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input
                              type="text"
                              required
                              name="email"
                              className="form-control"
                              onChange={handleChange}
                              placeholder="E-mail Address"
                          />
                          
                        </div>
                      </div>
  
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Contraseña</label>
                        <input
                          name="password"
                          type="password"
                          required
                          className="form-control"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <div className="invalid-feedback">Porfavor ingresa tu Contraseña!</div>
                      </div>
                      <div className="col-12">
                      <button
                          className="btn btn-primary w-100"
                          onClick={handleSubmit}
                      >Ingresar</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0"><Link to="/Reset">¿Olvidaste tu contraseña?</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
export default Login;