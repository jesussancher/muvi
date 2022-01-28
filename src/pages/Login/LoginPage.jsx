import classNames from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Input, 
  MuviLogo 
} from '../../components';
import { useAuth } from '../../utils/Auth/auth';
import './LoginStyles.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
  
    const from = location.state?.from?.pathname || "/";
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");
      const userData = {
        username, password
      };

      auth.signin(userData, () => {
        navigate(from, { replace: true });
      });

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
      </div>
    );
  }

