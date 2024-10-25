import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState(
        {
            email: '',
            password: ''
        }
    )

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.valid) {
                    navigate('/')
                }
                else {
                    navigate("/login")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {

                if (res.data.Login) {
                    navigate('/');
                }
                else {
                    alert('No Record')
                }
                console.log(res)
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Sign In</h1>
            <div className='bg-dark text-white rounded w-25 p-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="enter your email" className='rounded-0' name='email' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="enter your password" className='rounded-0' name='password' onChange={handleInput} />
                    </Form.Group>
                    <Button variant='success' type='submit' className='w-100'>Login</Button>
                    <Button variant="outline-light" type='submit' className='mt-3 w-100' onClick={() => navigate('/signup')}>Create Account</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;