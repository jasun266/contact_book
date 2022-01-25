import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { routes, callApi, postValue } from '../routes';
import styled from 'styled-components';

function EditUser() {

    const { id } = useParams()
    const [input, setInput] = useState({
        name: "",
        email: ""
    })
    useEffect(() => {
        callApi(routes.getUser(id)).then(result => {
            setInput({
                name: result.name,
                email: result.email
            })
        })
    }, [])
    
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const updateValue = e => {
        postValue(routes.editUser, { ...input, id }).then(result => console.log(result))
    }
  return <Wrapper>
      <h1>Edit User</h1>
      <Breadcrumb page="User > Edit" />
      <form role="form" className="text-start">
            <div className="input-group input-group-outline my-3">
                <label className="form-label">{ input.name === "" && 'First Name'}</label>
                <input type="email" value={input.name} name="name" className="form-control" onChange={handleInput}/>
            </div>
            <div className="input-group input-group-outline my-3">
                <label className="form-label">{ input.email === "" && 'Email'}</label>
                <input type="email" value={input.email} name="email" className="form-control" onChange={handleInput}/>
            </div>
    
            <div className="text-center">
                <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={updateValue}>Update</button>
            </div>
        </form>
  </Wrapper>;
}

const Wrapper = styled.div`
    width: 90%;
    max-width: 500px;
`

export default EditUser;
