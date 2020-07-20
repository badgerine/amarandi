import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    onLogin: () => { }
})

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        setIsAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{ isAuth: isAuthenticated, onLogin: loginHandler }} >
            { props.children }
        </AuthContext.Provider >
    )
}

export default AuthContextProvider;