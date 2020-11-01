import React,{useState,useEffect} from 'react'
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index";
import { Link, Redirect } from 'react-router-dom';
import { getprofile,deleteUserProfile } from './helper/userapicall';


const Profile=()=> {
const {token,person:{_id,name,email,role}}=isAuthenticated();







const [profile,setProfile]=useState([]);
const [error,setError]=useState(false);


const loadProfile=()=>{
    
    getprofile(_id,token).then(data=>{
       
       console.log(data)
        if(error){
            
            
            setError(data.error)
        }
        else{
           
            setProfile(data)
            console.log(data)
            
        }
    })
}


useEffect(()=>{
   loadProfile()
    



},[])




const deleteCurrentProfile=(ProfileId)=>{
    deleteUserProfile(ProfileId,_id,token).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
           return( <Redirect to="/signout"/>)
            
           
        }

    })
}








const adminRightSide=()=>{
    
  
    return(
     
        <div className="card mb-4">
            <h4 className="card-header">User Information</h4>
        {/* {isAuthenticated&&<button className="p-3" onClick={()=>{deleteCurrentProfile(profile._id)}} className="btn btn-danger">Delete</button>} */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span>
                    {name}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Email:</span>
                    {email}
                </li>

                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Role:</span>
                    User
                </li>


<div>
                <li className="list-group-item">
                    <span className="badge badge-danger mr-2">User Profile</span>
                    
                   {profile.error?( <Link className="btn btn-success float-right" to="/user/profile/insert">Insert UserProfile</Link>):""}
                   
                </li>



                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Username:</span>
                    {profile.username?profile.username:profile.error}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Country:</span>
                    {profile.country?profile.country:profile.error}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Website:</span>
                    {profile.website?profile.website:profile.error}
                </li>

                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Languages:</span>
                    
                       {profile.languages?profile.languages:profile.error}
                        
                    
                </li>



                
                
                </div>
            </ul>
            {/* <button className="btn btn-danger rounded" onClick={()=>{deleteThisUserProfile(_id)}}>Delete User Profile</button> */}
        </div>

    )

}


    return (
        <Base title="Welcome to User Area" description="Check Your Profile" className="container bg-success p-4">
            <div className="row">
                
                <div className="col-lg-9 col-md-9 col-sm-12">{adminRightSide()}</div>
            </div>
        
        
        </Base>
    )
}
export default Profile