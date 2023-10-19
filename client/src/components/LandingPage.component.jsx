
import { useState, useEffect } from 'react';
import SignUpForm from './pageElements/SignupForm.component';

const LandingPage = () => {
    return (
      <>
            <div className="landingPageBox">
                <h1>Welcome to InventoryWiz!</h1>

                <h3>Experience the power of InventoryWiz: </h3>
                <h3>the ultimate solution for managing your pantry effortlessly. </h3>
                <h3>Sign up now to start optimizing your inventory management!</h3>
                
               <SignUpForm/>  
               
               </div>
      </>
    );
  };
  
  export default LandingPage;