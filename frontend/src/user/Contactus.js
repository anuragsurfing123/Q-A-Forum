import React from 'react'
import Base from '../core/Base'

const Contactus=()=> {
    return (
        <Base title="Contact Us" description="Contact Us by Given Email">
        <div>
        <div class="container">
  <div class="row">
    <div class="col-sm">
      <label>Email:</label>
      <label>abc@gmail.com</label>
      <br/>
      <label>Phone:</label>
      <label>7894561230</label>
    </div>
    <div class="col-sm">
    <label>Address:</label>
      <label>45,Abc Street</label>
    </div>
    
  </div>
</div>
        </div>
        </Base>
    )
}


export default Contactus