
import Base from '../core/Base'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { allquestions,loadQuestion,deleteQuestion } from './helper/userapicall'


const AdminDashBoard=()=> {
    const{token,person:{_id,name,email,role}}=isAuthenticated()



    
    const [questions,setQuestions]=useState([]);
    const [error,setError]=useState(false);


    const loadAllQuestions=()=>{
        loadQuestion(_id,token).then(data=>{
            if(data.error){
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

    const deleteThisQuestion=QuestionId=>{
        deleteQuestion(QuestionId,_id,token).then(data=>{
            console.log(data);
            if(data.error){
                console.log(data.error)
            }else{
                loadAllQuestions();
            }
      
        })
      }


      const allanswers=QuestionId=>{
          loadAllQuestions()
      }

    return (

        <Base title="Welcome to Admin Area" description="Manage Question And Answers" className="container">
            {isAuthenticated&&<Link className="btn btn-info rounded" to={`/find/everyone`}>All Profiles</Link>}
            {isAuthenticated&&<Link className="btn btn-info rounded m-4" to={`/allprofile`}>All Users</Link>}
        <div>
            <h3 className="p-5 text-info">All Questions</h3>
        {questions.map((questions,index)=>{
            return(
                <div class="container">
<div class="row">
  <div class="col-6">
            <h4>{questions.textone}</h4><h6>{questions.texttwo}</h6><br/>
  </div>
  <div class="col-2">
  {isAuthenticated()&&<Link className="btn btn-success rounded" to={`/question/answers/${questions._id}`}>Answers</Link>}
  </div>
  <div class="col-2">
  {isAuthenticated&&<Link className="btn btn-info rounded" to={`/updatequestion/${questions._id}`}>Update</Link>}
  </div>
  <div class="col-2">
  {isAuthenticated&&<button onClick={()=>{deleteThisQuestion(questions._id)}} className="btn btn-danger">Delete</button>}
  </div>
</div>
</div>
            )


       
        }
        )}
        </div>
        </Base>
    )
}
export default AdminDashBoard 