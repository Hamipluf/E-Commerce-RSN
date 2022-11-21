import React, { useRef, useState } from 'react';

import { auth } from "../feature/firebase-config";
import { login, selectUser } from '../feature/user/userSlice';

import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';



function SignIn() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [error, setError] = useState();




    // Registrando Usuario 
    const register = async (e) => {
        e.preventDefault();
        setError(""); // borro el mensaje de error en reintento 
        try {
            await auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value,
            )
            dispatch(login());
            <Link href='/home'/>
        } catch (err) {
            // console.log(err.message);
            setError(err.message)
        }
    }


    return (
        <div>
            <div className="hero min-h-screen bg-signin text-dark">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign In now!</h1>
                        <p className="py-6">Register with your email and password of your choice.</p>
                    </div>
                    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-light">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-dark">Your Email</span>
                                </label>
                                <input ref={emailRef} type="email" placeholder="email" className="input text-light input-bordered input-accent w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-dark">Create Password</span>
                                </label>
                                <input ref={passwordRef} type="password" placeholder="******" className="input text-light  input-bordered input-accent w-full max-w-xs" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-dark">Forgot password?</a>
                                </label>
                            </div>
                            {error && <h2 className='text-error text-lg font-bold'>{error}</h2>}
                            <div className="form-control mt-6">
                                <button onClick={register} className="btn btn-accent">Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn