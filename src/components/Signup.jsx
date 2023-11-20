import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import apiConnection from '../apiConnection';
import Notify from './alerts/Notify';
import { apiEndpoint, httpMethods } from '../constant';


export default function Signup() {

    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        password: ''

    })
    const [showNotify, setShowNotify] = useState(false)
    const [notifyData, setNotifyData] = useState({
        type:'',
        message:''
    })


    const setFormData = (e) => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
    }

    const registerUser = async (e) => {

        try {
            e.preventDefault();
            console.log(signUpFormData)
            const data = await apiConnection(apiEndpoint.REGISTER_USER_ENDPOINT, httpMethods.Get, signUpFormData)
            console.log(data)
            if (data.status === 201) {
                setShowNotify(true)
                setNotifyData({...notifyData,message: data.data.message, type:'success'})
            }
        } catch {
            setShowNotify(true)
            setNotifyData({...notifyData, message: 'ERR:Please reload your app', type:'danger'})
         }
    }

   

    return (
        <div className='signup w-m-25 p-5 border border-dark m-5'>
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter name" onChange={(e) => setFormData(e)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => setFormData(e)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" onChange={(e) => setFormData(e)} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit" onClick={(e) => registerUser(e)}>
                    Register
                </Button>
            </Form>
            <br></br>
            {showNotify && <Notify message={notifyData.message} type={notifyData.type} setShowNotify={setShowNotify}/>}

        </div>
    )
}
