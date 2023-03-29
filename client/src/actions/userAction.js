import {AUTH, 
    SIGNUP_FAIL, 
    SIGNIN_FAIL, 
    LOGOUT, 
    LOGOUT_FAILED, 
    REFRESH_ACCESS_TOKEN_SUCCESS, 
    REFRESH_ACCESS_TOKEN_FAILED
} from  '../constants/actionConstants.js'
import * as api from '../axios'


export const singup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)

        dispatch({type: AUTH, payload: data})

        navigate('/');
    } catch (error) {
        dispatch({type: SIGNUP_FAIL, payload:
        error.response && error.response.data.message
    ? error.response.data.message
    : error.message,
    })
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try{
    const {data} = await api.signIn(formData)

    dispatch({type: AUTH, payload:data})

    navigate('/');
}
catch(error){
     dispatch({type: SIGNIN_FAIL, 
        payload:
        error.response && error.response.data.message
         ? error.response.data.message
         : error.message,
    })
}
}
export const logout = (id) => async (dispatch) => {
    try {
        const { message } = await api.logOut(id)

        dispatch({type: LOGOUT, payload: message })
    } catch (error) {
      dispatch({type: LOGOUT_FAILED,
     payload:
    error.response && error.response.data.message
    ?error.response.data.message
    : error.message,
    })
    }
}

export const getAccessToken = (id) => async (dispatch) => {
    try {
        const { data } = await api.refreshAcessToken(id)

        dispatch({type: REFRESH_ACCESS_TOKEN_SUCCESS, payload: data})
    } catch (error) {
          dispatch({type: REFRESH_ACCESS_TOKEN_FAILED,
          payload:
          error.response && error.response.data.message
          ?error.response.data.message
          : error.message,
    })
  }
}