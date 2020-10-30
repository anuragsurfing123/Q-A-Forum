import React,{Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (


<div>

  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>


      <li className="nav-item">
        <Link style={currentTab(history, "/allquestions")} className="nav-link" to="/allquestions">
          All Questions
        </Link>
      </li>
      
      {isAuthenticated() && isAuthenticated().person.role===0 &&(
        <li className="nav-item">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard"
        >
          U.Dashboard
        </Link>
      </li>
      )}
      




      {isAuthenticated() && isAuthenticated().person.role===0 &&(
        <li className="nav-item">
        <Link
          style={currentTab(history, "/user/profile")}
          className="nav-link"
          to="/user/profile"
        >
          User Profile
        </Link>
      </li>
      )}
      

      {isAuthenticated() && isAuthenticated().person.role===1 &&(
        <li className="nav-item">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard"
        >
          A. Dashboard
        </Link>
      </li>
      )}


      {!isAuthenticated() && (
          <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/register")}
              className="nav-link"
              to="/register"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/login")}
              className="nav-link"
              to="/login"
            >
              Sign In
            </Link>
          </li>
          </Fragment>
      )}


      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>


  </div>
);

export default withRouter(Menu);
