import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Navbar, Nav, Button} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

import { json, useLocation, useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import {AiOutlineLogin} from 'react-icons/ai'
import {RiLogoutCircleLine} from 'react-icons/ri'

import {logout, getAccessToken} from '../actions/userAction.js'


import decode from 'jwt-decode'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)

  const exit = async (id) => {
    await dispatch(logout(id))
    setUser(null)
    navigate('/');
  }

  const renewAccessToken =  async (id) =>  {
    if(!userState.googleLogin){
    await dispatch(getAccessToken(id))
    setUser(JSON.parse(localStorage.getItem('user')))
    } 
  }

  useEffect(()=> {
    if( localStorage.getItem('user') && !user) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    const interval = setInterval(() => {
    const accessToken = user ? user.accessToken : null;

    if (accessToken) {
      const decodedAccessToken = decode(accessToken)

        if(decodedAccessToken.exp * 1000 < new Date().getTime()){
          renewAccessToken(user.user._id)
        }
    }
  }, 5000)
  return () => {
    clearInterval(interval)
  }
  }, [location, user])
  
  return (
 <header>
     <Navbar bg="light" expand="lg" collapseOnSelect>
        <LinkContainer to='/'>
                <Navbar.Brand href="#home">Anı Kutusu</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
              <Nav>
                {
                  user ? (
                    <>
                     <LinkContainer to='/create'>
                   <Nav.Link>
                     <Button variant='outline-dark'>
                      <FiEdit className='mr-2' size={20}/>
                     Bir Anı Paylaş                     
                     </Button>
                    </Nav.Link>
                </LinkContainer>

                <Nav.Link>
                  <Button
                  onClick={(e) => {
                    exit(user.user_id)
                  }}
                  variant='outline-danger'>
                    <RiLogoutCircleLine size={20} className='mr-2'/>
                      Çıkış Yap
                  </Button>
                </Nav.Link>
                    </>
                  ):(
                <LinkContainer to='/auth'>
                   <Nav.Link>
                     <Button variant='outline-dark'>
                      <AiOutlineLogin size={20} className='mr-2'/>
                      Giriş Yap</Button>
                    </Nav.Link>
                </LinkContainer>
                  )
                }                
              </Nav>
          </Navbar.Collapse>
    </Navbar>
 </header>
  )
}

export default Header