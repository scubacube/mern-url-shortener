import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import 'materialize-css';
import {useRoutes} from "./routes";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    const {login, logout, token, userId, ready} = useAuth();
    const isAthenticated = !!token;

    const routes = useRoutes(isAthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{login, logout, token, userId, isAthenticated}}>
            <BrowserRouter>
                {isAthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
