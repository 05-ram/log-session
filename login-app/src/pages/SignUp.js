import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [values, setValues] = useState(
        {
            name: '',
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log(res)
                navigate('/')
            }
            )
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Sign Up</h1>
            <div className='bg-dark text-white rounded w-25 p-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="enter your name" name='name' className='rounded-0' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="enter your email" className='rounded-0' name='email' onChange={handleInput} />
                    </Form.Group> <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="enter your password" className='rounded-0' name='password' onChange={handleInput} />
                    </Form.Group>
                    <Button variant='success' type='submit' className='mt-2 w-100'>Sign Up</Button>
                </Form>
            </div>
        </div>
    )
}

export default SignUp