
import React, { useState, useEffect } from 'react'
import ReactFileBase64 from 'react-file-base64'

import {Form, Button} from 'react-bootstrap'

import { useNavigate  } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createMemory } from '../actions/memoryActions';

import * as api  from '../axios/index.js'

const SubmitMemory = () => {

    const [memoryData, setMemoryData] = useState({
        title: '',
        content: '',
        creator: '',
        image:''
    })

    const navigate = useNavigate ()
    const dispatch = useDispatch()

  return ( 
  <>
    <Form onSubmit={(e) => {
        e.preventDefault()

        dispatch(createMemory(memoryData))

       // api.createMemory(memoryData)
        navigate('/');

    }}>
        <Form.Group>
            <h1>Bir Anı Yarat</h1>
        </Form.Group>
        <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control 
            name='title' 
            type='text' 
            onChange={(e) => 
            setMemoryData({...memoryData, title: e.target.value})
            }>
            </Form.Control>
        </Form.Group>

         <Form.Group >
            <Form.Label className='pt-3'>Yazar</Form.Label>
            <Form.Control name='auther' type='text'onChange={(e) => 
            setMemoryData({...memoryData, creator: e.target.value})
            }></Form.Control>
        </Form.Group>

         <Form.Group>
            <Form.Label  className='pt-3'>Anınız</Form.Label>
            <Form.Control 
            name='content' 
            type='text' 
            as='textarea' 
            rows={3}
            onChange={(e) => 
            setMemoryData({...memoryData, content: e.target.value})
            }
            ></Form.Control>
        </Form.Group>
        <Form.Group className='py-3'>
            <ReactFileBase64 type='file' multiple={false} onDone={({base64 }) => {
                setMemoryData({ ...memoryData, image:base64})
            }} />
        </Form.Group>
        <Button type='submit' className="w-100">Gönder</Button>
    </Form>
 </>
  )
}

export default SubmitMemory