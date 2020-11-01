import React,{useState,useEffect} from 'react'
import { allprofile,deleteProfile } from './helper/userapicall'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';

const FindEveryone=() =>{
    const{token,person:{_id,name,email,role}}=isAuthenticated()


    const [profiles,setProfiles]=useState([]);
    const [error,setError]=useState(false);


    const loadAllProfiles=()=>{
        allprofile().then(data=>{
            if(error.data){
                setError(data.error)
            }
            else{
                console.log(data)
                setProfiles(data)

                
            }
        })
    }
  

    useEffect(()=>{
        
        loadAllProfiles()
        

    },[])



    const deleteThisProfile=ProfileId=>{
        deleteProfile(ProfileId,_id,token).then(data=>{
            
            if(data.error){
                console.log(data.error)
            }else{
                loadAllProfiles();
            }
      
        })
      }


    return (
        <Base title="All Profiles" description="See All Profiles">
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">website</th>
      <th scope="col">Country</th>
      <th scope="col">Programming Languages</th>
    </tr>
  </thead>  
        {profiles.map((profile,index)=>{
            return(
                

  <tbody key={index}>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{profile.username}</td>
      <td>{profile.website}</td>
      <td>{profile.country}</td>
      <td>{profile.languages}</td>
      <td>{isAuthenticated&&<button onClick={()=>{deleteThisProfile(profile._id)}} className="btn btn-danger">Delete</button>}</td>
    </tr>
    
  </tbody>



            )
        })}
        </table>
        </Base>
    )
}
export default FindEveryone