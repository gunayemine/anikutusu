import React, { useState } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Message from '../components/Message.js'
import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google'
import { AiOutlineGoogle } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'
import { singup, signin } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'

const AuthScreen = () => {
    const initialFormData = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }

    const navigate = useNavigate();

    const userState = useSelector((state) => state.user)
    const { error } = userState

    const [form, setForm] = useState(initialFormData)
    const [login, setLogin] = useState(true)

    const dispatch = useDispatch()

    const googleSuccess = (res) => {
        const user = res ? res.clientId : null
        const accessToken = res ? res.credential : null
        const googleLogin = 'google'

        console.log('res',res)

        try {
            dispatch({type: 'AUTH', payload: {user, accessToken, googleLogin}})

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (err) => {
        console.log(err)
    }

    return <>
    <Container>
        <Row className='justify-content-center'>            
            <Col xs={12} md={6}>
                {login ?  (
                <Form
                onSubmit={(e) =>{
                    e.preventDefault()
                    if(login) {
                        dispatch(signin(form, navigate))
                    }
                }}
                className='align-content-center mt-3'>
                    <h1 className='text-center mb-3'>Giris Yap</h1>

                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <Form.Control
                        type='email'
                        placeholder='Email adresinizi Girin'
                        onChange={(e)=> setForm({...form, email: e.target.value})}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Şifre</FormLabel>
                        <Form.Control
                        type='password'
                        placeholder='Şifrenizi Girin'    
                        onChange={(e)=> setForm({...form, password: e.target.value})}                    
                        ></Form.Control>
                    </FormGroup>

                    <Button className="w-100  mt-2" type='sumbit'>
                        Giriş Yap
                    </Button>

                    <GoogleOAuthProvider clientId='453045024857-79oi76uq6v60j27dp8ijded48j1m19hq.apps.googleusercontent.com'>
                    <GoogleLogin
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    render={renderProps => (
                      <Button 
                         onClick={renderProps.onClick} 
                         disabled={renderProps.disabled}
                         className="w-100  mt-2"
                         block
                      >
                     <AiOutlineGoogle size={22} className='text-center  mr-2'/>
                      Google Hesabınız İle giriş Yapın
                     </Button>
                    )}
                    />
                    </GoogleOAuthProvider>
                    <Form.Text className='w-100 mt-2' as='Large'>
                        Henüz bir hesabın yok mu?{' '} 
                        <span 
                        onClick={(e) => setLogin(!login)} 
                        style={{fontWeight:'bold', cursor:'pointer'}}>
                            Hesap Oluştur
                        </span>
                    </Form.Text>
                </Form>
                ) : (
                     <Form
                     
                     onSubmit={(e)=>{
                    e.preventDefault()
                    if(!login) {
                        dispatch(singup(form, navigate))
                    }
                }}
                className='align-content-center mt-3'>
                        <h1 className='text-center mb-3'>Kayıt Ol</h1>
                        {error && <Message> {error} </Message>}
                        <Form.Group style={{display:'flex'}}>
                            <Form.Control
                            type='text'
                            placeholder='İlk Adınız'
                            className='mr-2'
                            onChange={(e) => setForm({...form, firstName: e.target.value})}
                            ></Form.Control>

                            <Form.Control
                            type='text'
                            placeholder='Soy Adınız'
                            className='ml-2'
                            onChange={(e) => setForm({...form, lastName: e.target.value})}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email adresinizi girin'
                                onChange={(e) => setForm({...form, email: e.target.value})}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Şifrenizi girin'
                                onChange={(e) => setForm({...form, password: e.target.value})}
                            ></Form.Control>
                        </Form.Group>

                         <Form.Group>
                            <Form.Label>Şifre Tekrar</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Şifrenizi Doğrulayın'
                                onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                            ></Form.Control>
                        </Form.Group>

                        <Button className='w-100 mt-2' type='sumbit'>
                            Kayıt Ol
                        </Button>

                        <Form.Text as='Large' className='text-center mt-2' >

                            Zaten bir hesabınız var mı? {' '}
                            <span onClick={(e) => setLogin(!false)}
                            style={{fontWeight: 'bold', cursor:'pointer'}}>
                                Giriş Yap
                            </span>
                        </Form.Text>
                    </Form>
                )}
            </Col>
        </Row>
    </Container>
    </>
}
export default AuthScreen