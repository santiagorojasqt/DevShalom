import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useAuth } from "./context/AuthContext";
import { logInWithEmailAndPassword } from "./firebase";
import { Alert } from "./Alert";
function Reset(e) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { login, loginWithGoogle, resetPassword } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    let errorvisibility = "invalid-feedback hidden";
    let errormsg = ""

    const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Ingresa un Email valido");
        try {
            await resetPassword(user.email);
            setError('Enviamos un email a tu cuenta por favor revisalo')
        } catch (error) {
            if(error.message == "Write an email to reset password")
                error.message = "El email es incorrecto";
            else if(error.message.includes("auth/user-not-found")){
                error.message = "Usuario y/o Contraseña incorrectos";
            }
            else if(error.message.includes("auth/invalid-email")){
                error.message = "Usuario invalido";
                
            }
            console.log(error);
            setError(error.message);
        }
    };
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-4">
                <a href="?" className="logo d-flex align-items-center w-auto">
                  <img src="./public/img/logo.png" alt=""/>
                  <span className="d-none d-lg-block">Diran Suministros</span>
                </a>
              </div>
              <div className="card mb-3">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Recuperar contraseña</h5>
                    <p className="text-center small">Ingresa tu usuario o email para recuperar tu contraseña</p>
                  </div>

                  <form className="row g-3 needs-validation" noValidate>
                    {error && <Alert message={error} />}
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">Usuario</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="E-mail Address"
                        />
                        <div className="invalid-feedback">Por favor ingresa tu usuario.</div>
                      </div>
                    </div>
                    <div className="col-12">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleResetPassword}
                    >
                        Recuperar contraseña
                    </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0"><Link to="/">Iniciar Sesión</Link></p>
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
export default Reset;