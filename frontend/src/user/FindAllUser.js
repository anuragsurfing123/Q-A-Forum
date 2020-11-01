import React,{useEffect,useState} from 'react'
import Base from '../core/Base';
import { isAuthenticated} from '../auth/helper';
import { alluser,deleteUser } from './helper/userapicall'
 const FindAllUser=()=> {





    const{token,person:{_id,name,email,role}}=isAuthenticated()


    const [users,setUsers]=useState([]);
    const [error,setError]=useState(false);


    const loadAllUsers=()=>{
        alluser(_id,token).then(data=>{
            if(error.data){
                setError(data.error)
            }
            else{
                console.log(data)
                setUsers(data)

                
            }
        })
    }
  

    useEffect(()=>{
        
        loadAllUsers()
        

    },[])


    const deleteThisUser=ProfileId=>{
        deleteUser(ProfileId,_id,token).then(data=>{
            
            if(data.error){
                console.log(data.error)
            }else{
                loadAllUsers();
            }
      
        })
      }





    return (
        <div>
            <Base title="All Users" description="Manage All Users in Q & A Forum">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      
      <th scope="col"></th>
    </tr>
  </thead>  
        {users.map((profile,index)=>{
            return(
                

  <tbody key={index}>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{profile.name}</td>
      
      <td>{profile.email}</td>
      {/* <td>{isAuthenticated&&<button onClick={()=>{deleteThisUser(profile._id)}} className="btn btn-danger">Delete</button>}</td> */}
    </tr>
    
  </tbody>



            )
        })}
        </table>
            
            </Base>
        </div>
    )
}


export default FindAllUser;