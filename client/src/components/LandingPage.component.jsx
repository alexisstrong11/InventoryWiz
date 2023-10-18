
import { useState, useEffect } from 'react';
import SignUpForm from './pageElements/SignupForm.component';

const LandingPage = () => {
    return (
      <>
            <div class = "landingPageBox">
                <h1>Welcome to InventoryWiz!</h1>
                
               <SignUpForm/>  
               
               </div>
      </>
    );
  };
  
  export default LandingPage;