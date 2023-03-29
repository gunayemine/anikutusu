import React, {useEffect, useState} from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { MdModeEdit, MdDelete} from 'react-icons/md'

import { Card } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import { useDispatch } from 'react-redux'

import { deleteMemory } from '../actions/memoryActions'

const Memory = ({memory}) => {

  const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    const  userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [userState])



  const dispatch = useDispatch()
  return (
      <Card className='rounded py-3 my-3'>
      <Card.Img variant="top" src={memory.image} />
      <Card.Body>
        <Card.Title style={{color:'darkblue'}}>{memory.title}</Card.Title>
        <Card.Text>
          {memory.content}
        </Card.Text>
        <Card.Title>
            <span style={{color:'darkblue'}}>Yazar : {memory.creator}</span>
            </Card.Title>
        <Card.Subtitle>{moment(memory.createdAt).fromNow()}</Card.Subtitle>
      </Card.Body>

      { 
        user && user.user && (user.user._id === memory.creatorId) ||
        user && user.user && (user.user.googleId === memory.creatorId )? (
          <Card.Footer style={{display:'flex', justifyContent:'space-between'}} className='bg-white pb-0'>

        <LinkContainer to={`/update/${memory._id}`} style={{cursor: 'pointer'}}>
            <MdModeEdit size={25} color='blue' />
            </LinkContainer>

            <MdDelete 
            size={25} 
            style={{cursor: 'pointer'}} 
            color='red' 
            onClick={() => { dispatch(deleteMemory(memory._id))
            }}></MdDelete>
      </Card.Footer>
        )  : null
      }      
    </Card>
  )
  
}

export default Memory