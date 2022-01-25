import React, { useState, useRef } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import styled from 'styled-components';
import { routes, postFormValue } from '../routes';
function UploadFile() {
    const [input, setInput] = useState({
        filename: "",
    })
    const file = useRef()
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const upload = () => {
        const data = {
            filename: input.filename,
            file: file.current.files[0]
        }
        postFormValue(routes.uploadFile, data).then(result => console.log(result))
    }
    return <Wrapper>
        <Breadcrumb page="File > Upload" />
        <form role="form" className="text-start">
            <div className="input-group input-group-outline my-3">
                <label className="form-label">{input.filename === "" && 'File Name'}</label>
                <input type="email" value={input.filename} name="filename" className="form-control" onChange={handleInput} />
            </div>
            <div className="input-group input-group-outline my-3">
                <input type="file" ref={file} name="filename" className="form-control" />
            </div>
            <div className="text-center">
                <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2" onClick={upload}>Upload</button>
            </div>
        </form>
    </Wrapper>;
}


const Wrapper = styled.div`
    width: 90%;
    max-width: 500px;
`

export default UploadFile;
