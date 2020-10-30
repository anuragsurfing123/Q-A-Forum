import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import {insertprofile} from './helper/userapicall'
const Profileinsert=() =>{
    const {token,person:{_id,name,email,role}}=isAuthenticated();

    const [values, setValues] = useState({
        username: "",
        website: "",
        country: "",
        languages:"",
        error: "",
        success: false
      });
    
      const { username, website, country,languages, error, success } = values;
    
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    




      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        insertprofile(_id,token,{ username,website,country,languages })
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                username: "",
                website: "",
                country: "",
                languages:"",
                error: "",
                success: true
              });
            }
          })
          .catch(console.log("Error in Creating Profile"));
      };












    const InsertProfileForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-dark">Username</label>
                  <input className="form-control"  onChange={handleChange("username")} type="text" value={username} />
                </div>
                <div className="form-group">
                  <label className="text-dark">Website</label>
                  <input   className="form-control"   onChange={handleChange("website")}  type="text"  value={website} />
                </div>
    
                <div className="form-group">
                  <label className="text-dark">Country</label>
                  <input  onChange={handleChange("country")} className="form-control" type="text"  value={country} />
                </div>

                <div className="form-group">
                  <label className="text-dark">Language</label>
                  <input  onChange={handleChange("languages")} className="form-control" type="text"  value={languages} />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };
    



      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div  className="alert alert-success"  style={{ display: success ? "" : "none" }} >
                Profile Created Successfiully
                
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger"  style={{ display: error ? "" : "none" }} >
                {error}
              </div>
            </div>
          </div>
        );
      };
    



    return (
        <div>
            <Base title="Insert Profile" description="Insert User Profile">
            {successMessage()}
            {errorMessage()}
            {InsertProfileForm()}
            
            
            </Base>
        </div>
    )
}

export default Profileinsert