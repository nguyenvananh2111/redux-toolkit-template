import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeUsername,
    changeUsernameWithFailedAsync
} from './userSlice';

export function User() {
    const inputNameRef = useRef(null);
    const userState = useSelector(state => {
        return state.user;
    });
    const dispatch = useDispatch();
    
    return (
        <div>
            <p>USER:{userState.name}</p>
            {userState.loading && <h1>LOADING...</h1>}
            {userState.errorMessage && <h2>{userState.errorMessage}</h2>}
            <input type="text" ref={inputNameRef} defaultValue={userState.name}/>
            <br/>
            <button onClick={() => {
                dispatch(changeUsername(inputNameRef.current.value));
            }}>SUBMIT CHANGE NAME</button>
            <br/>
            <button onClick={() => {
                dispatch(changeUsernameWithFailedAsync(inputNameRef.current.value));
            }}>SUBMIT CHANGE NAME WITH FAILED</button>
        </div>
    )
}
