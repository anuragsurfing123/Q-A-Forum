import React,{useState,useEffect} from 'react'
import Base from '../core/Base';
import Menu from '../core/Menu'
import { allquestions, insertanswer} from './helper/userapicall'

import Collapsible from 'react-collapsible';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

 const Allquestions=()=> {


    
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





    //For Submitting answers

//get current posts


    
    
    return (
        <Base title="All Questions and Answers" description="All Questions Answers by all users">
    {isAuthenticated()&& <Link className="btn btn-info rounded" to="/user/addquestions">Add Questions</Link>}
        <div>
           
           
            <div className="p-5">
                
                {questions.map((questions,index)=>{
                
                    return(
                        
<div key={index}>
                    <div>
                    <span className="badge badge-danger mr-2">Question {index+1} </span>
                  <h3 className="text-info">{questions.textone}</h3> 
                    
                    <h5 className="text-secondary">{questions.texttwo}</h5>
                    <span className="badge badge-success mr-2">{questions.name}</span>
                    <span className="badge badge-success mr-2">{questions.date.slice(0,10)} {questions.date.slice(11,16)}</span>
                    {isAuthenticated()&&<Link className="btn btn-info rounded" to={`/answers/${questions._id}`}>Give Answer</Link>}
                    
                    <hr/>
                    </div>
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3">
                                <div className="text-center pt-5">
                                    <h4>Upvotes</h4>

                                    {isAuthenticated()&&<Link className="btn btn-warning" to={`/questions/upvote/${questions._id}`}>Upvote</Link>}
                                    <h4 key={index}>{questions.upvotes.length}</h4>
                                    {/* {questions.upvotes.map((upvotes,index)=>{
                                        return(
                                            <h4 key={index}>{questions.upvotes.length}</h4>
                                            
                                        )
                                    })
                                    
                                    } */}
                                    </div>

                                </div>
                                <div className="col-sm-9">
                                {questions.answers.map((answers,index)=>{
                            return(
                                <div className="col-sm-9" key={index}>
                                    <h4 className="text-danger">Answer {index+1}</h4>
                                <h3 >{answers.text}</h3>
                                <span className="badge badge-info mr-2">{answers.name}</span>
                                <span className="badge badge-info mr-2">{answers.date.slice(0,10)} {answers.date.slice(11,16)}</span>



                               

                                
                                <hr style={{borderTop: "dotted 1px"}} />










                                
                                </div>

                            )
                        })}







                        
                        
                                </div>
                            </div>

<div className="row">

<div className="col-12">
<hr/>


    </div>

</div>




                        </div>
                    </div>
                    </div>
                    )

                })}
                <div>
                    
                </div>
            </div>
        </div>





        
        </Base>
    )
}
export default Allquestions