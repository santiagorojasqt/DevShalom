
import logo from './public/img/logo.png';
import message1 from './public/img/messages-1.jpg';
import message2 from './public/img/messages-2.jpg';
import message3 from './public/img/messages-3.jpg';
import profileImg from './public/img/profile-img.jpg';
import { Navigate } from "react-router-dom";
import { useAuth} from "./context/AuthContext";
import axios from 'axios';
import {auth, functions} from './firebase';

function Header() {
  const { user, loading,logout } = useAuth();
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
  const handleLogout = async () => {
    try {
      await logout();
      window.localStorage.clear();
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!user || !validToken()) return (<div></div>);
  else{
    return (
      <header id="header" className="header fixed-top d-flex align-items-center">

      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src={logo} alt=""/>
          <span className="d-none d-lg-block">NiceAdmin</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown">

              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>

            </ul>

          </li>

          <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src={profileImg} alt="Profile" className="rounded-circle"/>
              <span className="d-none d-md-block dropdown-toggle ps-2">{user.email}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.email}</h6>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li>
                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>

              <li>
                <a className="dropdown-item d-flex align-items-center" href='#' onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>

            </ul>
          </li>

        </ul>
      </nav>

    </header>
  );
  }
    
}
export default Header;
