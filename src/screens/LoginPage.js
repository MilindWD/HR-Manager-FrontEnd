import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({location, history}) => {
    return (
        <div>
            <LoginForm location={location} history={history} />
            {console.log(location)}
        </div>
    );
}

export default LoginPage;
