import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, routes, postValue } from '../routes';

function Login({ setLoggedIn, setIsAdmin }) {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const [error, setError] = useState("");
    const signIn = async () => {
        postValue(routes.login, input).then(result => {
            console.log(result)
            if(result.error !== undefined) {
                setError(result.error);                
            } else {
                setAuthToken(result.token, result.user.id)
                setLoggedIn(true)
                if(result.user.type === 'admin') {
                    setIsAdmin(true)
                }
                navigate("/")
            }
            
        })
    }
    return <div>
        <Heading>Login</Heading>
        <div className="main-content mt-0">
            <Cardbody>
                <div className="card-body">
                    <form role="form" className="text-start">
                        <div className="input-group input-group-outline my-3">
                            <label className="form-label">{ input.email === "" && 'Email'}</label>
                            <input type="email" vaule={input.email} name="email" className="form-control" onChange={handleInput}/>
                        </div>
                        <div className="input-group input-group-outline mb-3">
                            <label className="form-label">{ input.password === "" && 'Password'}</label>
                            <input type="password" value={input.password} name="password" className="form-control" onChange={handleInput} />
                        </div>
                        <div className="form-check form-switch d-flex align-items-center mb-3">
                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                            <label className="form-check-label mb-0 ms-2" for="rememberMe">Remember me</label>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={signIn}>Sign in</button>
                        </div>
                        <p className="mt-2 text-sm text-center text-danger">{error}</p>
                    </form>
                </div>
            </Cardbody>

        </div>
    </div>;
}

const Heading = styled.h1`
    text-align: center;
    margin-top: 50px;
`
const Cardbody = styled.div`
    width: 50%;
    max-width: 400px;
    margin: 0 auto;
`
export default Login;
