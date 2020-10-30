import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import {insertquestion} from './helper/userapicall'
const Addquestions=() =>{
    const {token,person:{_id,email,role}}=isAuthenticated();

    const [question, setQuestion] = useState({
        textone: "",
        texttwo: "",
        name: "",
        
        error: "",
        success: false
      });
    
      const { textone,texttwo,name, error, success } = question;
    
      const handleChange = name => event => {
        setQuestion({ ...question, error: false, [name]: event.target.value });
      };
    




      const onSubmit = event => {
        event.preventDefault();
        setQuestion({ ...question, error: false });
        insertquestion(_id,token,{ textone,texttwo,name})
          .then(data => {
            if (data.error) {
              setQuestion({ ...question, error: data.error, success: false });
            } else {
              setQuestion({
                ...question,
                textone: "",
                texttwo: "",
                name: "",
                error: "",
                success: true
              });
            }
          })
          .catch(console.log("Error in Creating Question"));
      };












    const InsertProfileForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-dark">Question</label>
                  <input className="form-control"  onChange={handleChange("textone")} type="text" value={textone} />
                </div>
                <div className="form-group">
                  <label className="text-dark">Description</label>
                  <input   className="form-control"   onChange={handleChange("texttwo")}  type="text"  value={texttwo} />
                </div>
    
                <div className="form-group">
                  <label className="text-dark">Name</label>
                  <input  onChange={handleChange("name")} className="form-control" type="text"  value={name} />
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
                Question Added Sussfully
                
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

export default Addquestions