import React from 'react'
import Menu from './Menu';
import "../style.css"
import { Link } from 'react-router-dom';

 const Base=({
     title="My Title",
     description="My Description",
     className="bg-light text-black p-4",
     children
 })=> {
    return (
        <div>
           <Menu/>
            <div className="container-fluid p-0">
                <div className="jumbotron  text-black text-center bgimg">
                    <h2 className="display-4">{title}</h2>
    <p className="lead">{description}</p>

                </div>
    <div className={className}>{children}</div>
            </div>


            {/* <footer className="footer bg-light  mt-auto py-3">
                <div className="container-fluid bg-success text-black text-center py-3">
                    <h4>If You Got any question Feel free to react out</h4>
                    <Link className="btn btn-info btn-lg" to="/contactus">Contact US</Link>

                </div>
                <div className="container">
                    <span className="text-muted">
                        Made BY <span className="text-black">Anurag Mishra</span>
                    </span>
                </div>
            </footer> */}
<footer className="footer bg-dark  mt-auto py-3">
<div className="container text-white">
  <div className="row">
    <div className="col-6">
      <h3>About Us</h3>
      <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
    </div>
    <div className="col-3">
        <h3>Links</h3>
    <Link className="btn text-white" to="/contactus">Contact US</Link><br/>
    <Link className="btn text-white" to="/allquestions">All Questions</Link><br/>
    <Link className="btn text-white" to="/register">Register</Link><br/>
    <Link className="btn text-white" to="/login">Login</Link><br/>
    </div>
    <div className="col-3">
    <h3>Social</h3>
    <Link className="btn text-white" to="/contactus">Facebook</Link><br/>
    <Link className="btn text-white" to="/contactus">Instagram</Link><br/>
    <Link className="btn text-white" to="/contactus">Github</Link><br/>
    </div>
  </div>
</div>
</footer>











            
        </div>
    )
}


export default Base;