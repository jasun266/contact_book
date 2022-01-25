import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { postValue, routes } from '../routes';

function Register() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const register = () => {
        postValue(routes.register, input).then(result => {
            console.log(result)
            if(result.error !== undefined) {
                setError("Something went wrong!")
            }
            setMsg("User created")
        })
    }
  return <div>
      <Heading>Register</Heading>
        <div className="main-content mt-0">
            <Cardbody>
                <div className="card-body">
                    <form role="form" className="text-start">
                        <div className="input-group input-group-outline my-3">
                            <label className="form-label">{ input.name === "" && 'First Name'}</label>
                            <input type="email" vaule={input.name} name="name" className="form-control" onChange={handleInput}/>
                        </div>
                        <div className="input-group input-group-outline my-3">
                            <label className="form-label">{ input.email === "" && 'Email'}</label>
                            <input type="email" vaule={input.email} name="email" className="form-control" onChange={handleInput}/>
                        </div>
                        <div className="input-group input-group-outline mb-3">
                            <label className="form-label">{ input.password === "" && 'Password'}</label>
                            <input type="password" value={input.password} name="password" className="form-control" onChange={handleInput} />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                            <label className="form-label">{ input.cpassword === "" && 'Confirm Password'}</label>
                            <input type="password" value={input.cpassword} name="cpassword" className="form-control" onChange={handleInput} />
                        </div>
                        <div className="form-check form-switch d-flex align-items-center mb-3">
                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                            <label className="form-check-label mb-0 ms-2" for="rememberMe">Remember me</label>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={register}>Register</button>
                        </div>
                        <p className="mt-2 text-sm text-center text-success">{msg}</p>
                        <p className="mt-2 text-sm text-center text-danger">{error}</p>

                        <p className="mt-2 text-center"></p><Link to="/"><b>Go Back to Dashboard</b></Link>
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

export default Register;
