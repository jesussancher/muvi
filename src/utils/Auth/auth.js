import * as React from "react";
import {
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Loader } from "../../components";


const authProvider = {
  isAuthenticated: false,
  signin(callback) {
    authProvider.isAuthenticated = true;
    callback();
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    callback();
  }
};

const AuthContextType = {
  user: null,
  signin: () => {},
  signout: () => {},
}

const testUser = {
  // email: 'test@example.com',
  // password: 'TestPass1234'
  email: 'a@b.c',
  password: 'a1234'
}

let passWordRegex =  {
  lowerCase: new RegExp('[a-z]', 'i'),
  upperCase: new RegExp('[A-Z]', 'i'),
  numbers: new RegExp(/[0-9]/, 'i'),
  // specialChar: new RegExp(/[(),.@/*{}]/, 'i'),
};

const passWordRegexTest = (password) => {
  return Object.values(passWordRegex).every( regex =>  {
    return regex.test(password); 
  })
}

let AuthContext = React.createContext(AuthContextType);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  let [isUserValid, setIsUserValid] = React.useState(true);
  let [loading, setLoading] = React.useState(false);

  
  const location = useLocation();
  const navigate = useNavigate();

  let recursionLogin = () => {
      const localUserData = JSON.parse(localStorage.getItem('user-login'));

      const from = location.pathname || "/";

      signin(localUserData, () => {
        navigate(from, { replace: true });
      })
  }

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      if(!newUser) return;
      const isPasswordAllowed = testUser.password === newUser.password ;
      const isEmailAllowed = testUser.email === newUser.email;
      setIsUserValid(isPasswordAllowed && isEmailAllowed && !loading);
      if(isPasswordAllowed && isEmailAllowed) {

        localStorage.setItem('user-login', JSON.stringify(newUser));
        setUser(newUser);
        
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          callback();
        },[3000]); // fake async
      }
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      localStorage.setItem('user-login', null);
      setUser(null);
      callback();
    });
  };

  let value = { user, isUserValid, signin, signout, loading };

  React.useEffect(() => {
    recursionLogin();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return <AuthContext.Provider value={value}>
      {loading ? <Loader parentHeight={'100vh'}/> :children}
    </AuthContext.Provider>;

}

function useAuth() {
  return React.useContext(AuthContext);
}


function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  // console.log("locaiton", location)
  if (!auth.user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
}

export {
  passWordRegexTest,
  AuthProvider,
  RequireAuth,
  useAuth,
}