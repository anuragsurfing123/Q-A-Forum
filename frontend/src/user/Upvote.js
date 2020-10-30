import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { upvotequestion } from './helper/userapicall';



const Upvote=(props) =>{

    const getIdByUrl=props.match.params;
const {token,person:{_id,role}}=isAuthenticated()

    const [values, setValues] = useState([]);


    const onSubmit = event => {
        
    
    upvotequestion(getIdByUrl.id,_id,token)
      .then(data => {
       
          setValues(...values );
        
      })
      .catch(console.log("Error in upvting"));
  };

 
  


    return (
        <div>
            Loading...
            {onSubmit()}
        
            <Redirect to="/allquestions"/>
           
        </div>
    )
}

export default Upvote