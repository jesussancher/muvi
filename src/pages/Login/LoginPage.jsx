import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Input, 
  Modal, 
  MuviLogo 
} from '../../components';
import { useAuth } from '../../utils/Auth/auth';
import './LoginStyles.css';

export default function LoginPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const from = location.state?.from?.pathname || "/";
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      const userData = {
        email, password
      };

      setIsModalOpen(!auth.isUserValid);

      auth.signin(userData, () => {
        navigate(from, { replace: true });
      });
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }

    return (
      <div className={classNames('login-page flex-column flex-column-center-land')}>
        <div className={classNames('logo-section flex-column flex-center')}>
          <MuviLogo width="120"/>
        </div>
        <div className={classNames('form-section flex-column flex-center')}>
          <form onSubmit={handleSubmit} className={classNames('flex-column flex-center')}>
              <Input name="email" type="email" text="Email" placeholder="myemail@domain.com"/>
              <Input name="password" type="password" text="Password" placeholder="Password"/>
              <Button type="submit" text="Let's go!" />
          </form>
        </div>
        {(!auth.isUserValid && isModalOpen) && <Modal title={modalTexts.title} text={modalTexts.text} close={closeModal}/>}
      </div>
    );
  }

  const modalTexts = {
    title: 'Email and Password / does not match',
    text: 'Please try with a new one'
  }

