
import { useState, useEffect } from 'react';
import SignUpForm from './pageElements/SignupForm.component';
import LoginForm from './pageElements/LoginForm.component';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

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