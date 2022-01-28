import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";


const authProvider = {
  isAuthenticated: false,
  signin(callback) {
    authProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
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

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      const isPasswordValid = passWordRegexTest(newUser.password);
      const isPasswordAllowed = testUser.password === newUser.password && newUser.password !== '';
      const isEmailAllowed = testUser.email === newUser.email  && newUser.email !== '';
      setIsUserValid(isPasswordAllowed && isEmailAllowed);
      console.log(testUser.email, newUser.email, testUser.password, newUser.password)
      console.log("isEmailAllowed",isEmailAllowed)
      console.log("isPasswordAllowed",isPasswordAllowed)
      if(isPasswordValid && isUserValid) {
        setUser(newUser);
        callback();
      }
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, isUserValid, signin, signout };

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