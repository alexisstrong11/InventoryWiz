
import { useState, useEffect } from 'react';
import SignUpForm from './pageElements/SignupForm.component';

const LandingPage = () => {
    return (
      <>
            <div className="landingPageBox">
                <h1>Welcome to InventoryWiz!</h1>
                
               <SignUpForm/>  
               
               </div>
      </>
    );
  };
  
  export default LandingPage;