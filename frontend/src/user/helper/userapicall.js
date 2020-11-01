import { API } from "../../backend";

export const allquestions = () => {
  return fetch(`${API}/questions`, {
       method: "GET" 
    
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};



export const getprofile = (userId,token) => {
  return fetch(`${API}/profile`, {
       method: "GET" ,
       headers:{
        Accept: "application/json",
  
  Authorization: `Bearer ${token}`

    }
    
    })
    .then(response => {
        console.log(response)
      return response.json();
    })
    .catch(err => console.log(err));
};



//find all profile

export const allprofile = () => {
  return fetch(`${API}/profile/find/everyone`, {
       method: "GET" 
    
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};







export const deleteUserProfile=(CurrentProfileId,userId,token)=>{
  return fetch(`${API}/profile`,{
      method:"DELETE",
      headers:{
          Accept: "application/json",
    
    Authorization: `Bearer ${token}`

      }
      
  }).then(response=>{
      return response.json()
  }).catch(err=>console.log(err))
}



export const insertprofile = (userId,token,user) => {
  return fetch(`${API}/profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      
      return response.json();
    })
    .catch(err => console.log(err));
};



export const loadQuestion = (userId,token) => {
  return fetch(`${API}/questions`, {
       method: "GET" ,
       headers:{
         Authorization:`Bearer ${token}`
       }
    
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};


export const insertquestion = (userId,token,question) => {
  return fetch(`${API}/questions`, {
       method: "POST" ,
       headers: {
        Accept: "application/json",
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};





export const insertanswer = (questionId,userId,token,user) => {
  return fetch(`${API}/questions/answers/${questionId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      
      return response.json();
    })
    .catch(err => console.log(err));
};






export const upvotequestion = (questionId,userId,token,upvote) => {
  return fetch(`${API}/questions/upvote/${questionId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(upvote)
  })
    .then(response => {
     
      return response.json();
    })
    .catch(err => console.log(err));
};


export const deleteQuestion=(QuestionId,userId,token)=>{
  return fetch(`${API}/questions/delete/${QuestionId}/${userId}`,{
      method:"DELETE",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,

      }
      
  }).then(response=>{
    
      return response.json()
  }).catch(err=>console.log(err))
}


export const deleteAnswers=(AnswerId,QuestionId,userId,token)=>{
  return fetch(`${API}/questions/delete/${AnswerId}/${QuestionId}/${userId}`,{
      method:"DELETE",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,

      }
      
  }).then(response=>{
    
      return response.json()
  }).catch(err=>console.log(err))
}





export const onequestions = (questionId) => {
  return fetch(`${API}/questions/${questionId}`, {
       method: "GET" 
    
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};




export const updateques = (id,userId,token,question) => {
  return fetch(`${API}/questions/${id}`, {
       method: "PUT" ,
       headers: {
        Accept: "application/json",
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
      
    })
    .then(response => {
        console.log(response)
      return response.json();
    })
    .catch(err => console.log(err));
};


export const deleteProfile=(ProfileId,userId,token)=>{
  return fetch(`${API}/profile/delete/${ProfileId}/${userId}`,{
      method:"DELETE",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,

      }
      
  }).then(response=>{
    
      return response.json()
  }).catch(err=>console.log(err))
}


export const alluser = (userId,token) => {
  return fetch(`${API}/auth/allprofile`, {
       method: "GET" ,
       headers:{
        
  Authorization: `Bearer ${token}`,

    }
    
    })
    .then(response => {
        
      return response.json();
    })
    .catch(err => console.log(err));
};


export const deleteUser=(UserId,currentuserId,token)=>{
  return fetch(`${API}/profile/deleteuser/${UserId}/${currentuserId}`,{
      method:"DELETE",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,

      }
      
  }).then(response=>{
    
      return response.json()
  }).catch(err=>console.log(err))
}
