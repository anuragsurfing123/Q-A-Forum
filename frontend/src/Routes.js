import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./core/Home"
import Login from './user/Login';
import Register from './user/Register';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import Profile from './user/Profile';
import Allquestions from './user/Allquestions';
import Profileinsert from './user/Profileinsert';
import Addquestions from './user/Addquestions';
import Answers from './user/Answers';
import Upvote from './user/Upvote';
import Contactus from './user/Contactus';
import AnswersOfQuestion from './user/AnswerOfQuestion';
import UpdateQuestions from './user/UpdateQuestions';

const  Routes=()=> {
    return (
        <BrowserRouter>
        <switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/allquestions" exact component={Allquestions}/>
            <Route path="/answers/:id" exact component={Answers}/>
            <Route path="/question/answers/:id" exact component={AnswersOfQuestion}/>
            <Route path="/updatequestion/:questionId" exact component={UpdateQuestions}/>
            

            <Route path="/contactus" exact component={Contactus}/>



            <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
            <PrivateRoute path="/user/profile" exact component={Profile}/>
            <PrivateRoute path="/user/profile/insert" exact component={Profileinsert}/>
            <PrivateRoute path="/user/addquestions" exact component={Addquestions}/>
            <PrivateRoute path="/questions/upvote/:id" exact component={Upvote}/>




            <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>

        </switch>
        </BrowserRouter>
    )
}

export default Routes;