import * as React from "react";
import {
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";


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
  email: 'test@example.com',
  password: 'TestPass1234'
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

  
  const location = useLocation();
  const navigate = useNavigate();

  let recursionLogin = React.useCallback(() => {
      const localUserData = JSON.parse(localStorage.getItem('user-login'));

      const from = location.state?.from?.pathname || "/";

      signin(localUserData, () => {
        navigate(from, { replace: true });
      })
    },
  )

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      console.log("userLogin", newUser, testUser)

      const isPasswordAllowed = testUser.password === newUser.password ;
      const isEmailAllowed = testUser.email === newUser.email;
      setIsUserValid(isPasswordAllowed && isEmailAllowed);
      if(isPasswordAllowed && isEmailAllowed) {
        localStorage.setItem('user-login', JSON.stringify(newUser));
        setUser(newUser);
        callback();
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

  let value = { user, isUserValid, signin, signout, recursionLogin };

  React.useEffect(() => {
    recursionLogin();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

function useAuth() {
  return React.useContext(AuthContext);
}


function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export {
  passWordRegexTest,
  AuthProvider,
  RequireAuth,
  useAuth,
}