import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import Menu from '../core/Menu'
import { allquestions, insertanswer } from './helper/userapicall'

import Collapsible from 'react-collapsible';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
 const Answers=(props)=> {

    const getIdByUrl=props.match.params;


    const {token,person:{_id,email,role}}=isAuthenticated();
    const [questions,setQuestions]=useState([]);
    const [error,setError]=useState(false);


    const loadAllQuestions=()=>{
        
        allquestions().then(data=>{
            if(error.data){
                setError(data.error)
            }
            else{
                
                setQuestions(data)
                
            }
        })
    }
  

    useEffect(()=>{
        loadAllQuestions()

    },[])

















    const [values, setValues] = useState({
        name: "",
        text:"",
        error: "",
        success: false
      });
    
      const { name,text, success } = values;
    
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        insertanswer(getIdByUrl.id,_id,token,{ name, text })
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                name: "",
               text:"",
                error: "",
                success: true
              });
            }
          })
          .catch(console.log("Error in signup"));
      };
  




      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div  className="alert alert-success"  style={{ display: success ? "" : "none" }} >
                Answer Submitted Successfully
                
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

<Base title="Answer the Question" description="Give Answers Of Questions">

{questions.map((questions,index)=>{
  if(questions._id===getIdByUrl.id){
    return(
        <div key={index}>
             <div>
                    <span className="badge badge-danger mr-2">Question {index+1} </span>
                  <h3>{questions.textone}</h3> 
                    
                    <h5 className="text-secondary">{questions.texttwo}</h5>
                    <span className="badge badge-success mr-2">{questions.name}</span>
                    <span className="badge badge-success mr-2">{questions.date.slice(0,10)} {questions.date.slice(11,16)}</span>
                   
                    <hr/>
                    {successMessage()}
                    {errorMessage()}
                    <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input className="form-control" onChange={handleChange("name")} type="text" value={name} />
            </div>
            <div className="form-group">
              <label className="text-dark">Answer</label>
              <textarea  className="form-control"   onChange={handleChange("text")}  type="text"  value={text} />
            </div>

            
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
                    </div>
            
            
            </div>
    
        )
    }else{
        return(
            <div></div>
        )
    }
   
}
          
        
    )
}
</Base>

</div>
    )
}
export default Answers