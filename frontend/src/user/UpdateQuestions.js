import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import {insertquestion,updateques,loadQuestion,onequestions} from './helper/userapicall'
const UpdateQuestions=({match}) =>{
    const {token,person:{_id,email,role}}=isAuthenticated();





   
    const [question,setQuestion]=useState([]);
    const [error,setError]=useState(false);


    const loadAllQuestions=(questionId)=>{
      onequestions(questionId).then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                
                setQuestion({
                  textone: data[0].textone,
        texttwo: data[0].texttwo,
        name: data[0].name,
        
        
        success: false
                })
                
                
                
            }
        })
    }
  

    useEffect(()=>{
        loadAllQuestions(match.params.questionId)
        

    },[])







    
    
      const { textone,texttwo,name,  success } = question;
    
      const handleChange = name => event => {
        setQuestion({ ...question, error: false, [name]: event.target.value });
      };
    




      const onSubmit = event => {
        event.preventDefault();
        setQuestion({ ...question, error: false });
        updateques(match.params.questionId,_id,token,{ textone,texttwo,name})
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
                
                success: true,

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
                  Update Question
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
                Question Updated Sussfully
                
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
            <Base title="Update Questions" description="Update User Questions">
            {successMessage()}
            {errorMessage()}
            {InsertProfileForm()}
            
            
            </Base>
        </div>
    )
}

export default UpdateQuestions