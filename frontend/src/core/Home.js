import React,{useState,useEffect} from 'react';

import Base from './Base'
import "../style.css"
import { Link } from 'react-router-dom';
export default function Home() {

    

    return (
<Base title="Q & A Website" description="Question & answer Website" className="bgimage  p-4">
        
<div>

<div class="container fordeveloper">
<h1 className="text-center">For developers, by developers</h1>
<p className="pl-5 pr-5 text-center pt-4">Stack Overflow is an open community for anyone that codes. We help you get answers to your toughest coding questions, share knowledge with your coworkers in private, and find your next dream job.</p>


  <div class="row pt-4">
    <div class="col-sm gridcolgap">
      <img src="./images/public-qa.svg"/>
      <p>Get answers to more than 16.5 million questions and give back by sharing your knowledge with others. Sign up for an account.</p>
    
    </div>
    <div class="col-sm gridcolgap">
    <img src="./images/private-qa.svg"/>
      <p>Level up with Stack Overflow while you work. Share knowledge privately with your coworkers using our flagship Q&A engine.</p>
    
    </div>
    <div class="col-sm gridcolgap">
    <img src="./images/jobs.svg"/>
      <p>Find the right job through high quality listings and search for roles based on title, technology stack, salary, location, and more.

</p>
    
    </div>
  </div>
</div>


</div>








<div className="container grow">
    <h1 className="text-cenetr">Learn and grow with Stack Overflow</h1>
    <h2 className="text-cenetr pt-4">Questions are everywhere, answers are on Stack Overflow
</h2>
  <div className="row pt-4">
    <div className="col-sm">
    <img src="./images/developer.svg"/>
    <h5>Write the script of the future</h5>
      <p>Get your coding questions answered to learn, build, and level up whether you’re beginning with JavaScript or a React professional.


      </p>
      
    </div>
    <div className="col-sm">
    <img src="./images/open-source.svg"/>
    <h5>Support open source</h5>
      <p>Reach users of your project by following tags, answering newcomer questions, and empowering experts in the community. Read the curl project creator’s story.
          
      </p>
    </div>
    <div className="col-sm">
    <img src="./images/advocate.svg"/>
    <h5>Acquire and share knowledge</h5>
      <p>Answer questions and gain insights from an audience of developers using your technology on Stack Overflow.
          
      </p>
    </div>

    <div className="col-sm">
    <img src="./images/career-switcher.svg"/>
    <h5>Find career opportunities</h5>
      <p>Create a profile that shows off your expertise and credentials to help you make your next move. Start your Developer Story
          
      </p>
    </div>

  </div>
</div>



<div className="container homerow">
    <h1 className="text-center pb-5 pt-5">For businesses, by developers</h1>
  <div className="row">
    <div className="col-sm homecol">
        <div className="row">
            <div className="col-3">
     <img src="./images/private-questions.svg"/>
     </div>
     <div className="col-9">
     <p>Quickly find and share internal knowledge with Private Q&A</p>
     </div>
     </div>

    </div>
    <div className="col-sm homecol">
    <div className="row">
            <div className="col-3">
     <img src="./images/find-candidate.svg"/>
     </div>
     <div className="col-9">
     <p>Find the perfect candidate for your growing technical team with Talent solutions</p>
     </div>
     </div>
    </div>
    <div className="col-sm homecol">
    <div className="row">
            <div className="col-3">
     <img src="./images/accelerate.svg"/>
     </div>
     <div className="col-9">
     <p>Accelerate the discovery of your products or services through our Advertising platform</p>
     </div>
     </div>
    </div>
  </div>
</div>




<div className="container">
  <div className="row hire">
    <div className="col-sm">
    <img src="./images/find-candidate.svg"/>
    <h1>Hire your technical talent</h1>
      <p>We help expand your technical hiring strategy to promote your employer brand and highlight relevant open roles to our community of over 100 million developers and technologists.
</p>
<button className="btn btn-info rounded">StackOverflow Talent</button>
    </div>
    <div className="col-sm">
    <img src="./images/accelerate.svg"/>
    <h1>Reach developers worldwide</h1>
      <p>Use the world’s largest resource for people who code to help you increase awareness and showcase your product or service across Stack Overflow’s network of Q&A sites.</p>
      <Link className="btn btn-info rounded" to="/allquestions">All Question</Link>
    </div>
    
  </div>
</div>







        </Base>
       
    )
}
