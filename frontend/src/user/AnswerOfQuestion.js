import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import Menu from '../core/Menu'
import { allquestions, insertanswer,deleteAnswers } from './helper/userapicall'

import Collapsible from 'react-collapsible';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
 const AnswerOfQuestion=(props)=> {

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





    const deleteAnswersOfQuestion=AnswerId=>{
        deleteAnswers(AnswerId,getIdByUrl.id,_id,token).then(data=>{
            console.log(data);
            if(data.error){
                console.log(data.error)
            }else{
                loadAllQuestions();
            }
      
        })
      }


















    return (
        <div>

<Base title="Answers of Question" description="See Answers And Delete">

{questions.map((questions,index)=>{
  if(questions._id===getIdByUrl.id){
      console.log(questions)
    return(
        <div key={index}>
             <div>
                    <span className="badge badge-danger mr-2">Question {index+1} </span>
                  <h3>{questions.textone}</h3> 
                  
                    
                    <h5 className="text-secondary">{questions.texttwo}</h5>
                    <span className="badge badge-success mr-2">{questions.name}</span>
                    <span className="badge badge-success mr-2">{questions.date.slice(0,10)} {questions.date.slice(11,16)}</span>
                   
                    <hr/>
                    {questions.answers.map((answers,index)=>{
                        return(
                //             <div key={index}>
                //              <span className="badge badge-danger mr-2">Question {index+1} </span>
                //   <h3>{answers.text}</h3>

                //         </div>
                <div key={index} className="container">
  <div className="row">
    <div className="col-6">
    <span className="badge badge-info mr-2">Answer {index+1} </span>
                   <h3>{answers.text}</h3>
    </div>
    <div className="col-3">
      
    </div>
    <div className="col-3">
    {isAuthenticated&&<button onClick={()=>{deleteAnswersOfQuestion(answers._id)}} className="btn btn-danger">Delete</button>}
    </div>
  </div>
</div>



                        )

                    }
                    )}
                    
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
export default AnswerOfQuestion