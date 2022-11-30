import React from 'react';
import { useRouter } from "next/router";
import { AuthAction, withAuthUser } from 'next-firebase-auth';



const ThanksU = () => {
    const router = useRouter();
    return (
        <div className='min-h-screen my-8 bg-principal'>
            <div className='p-10 '>
                <button onClick={() => {router.push("/home");}} className="btn glass">Back To Home</button>
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="text-light max-w-md">
                            <h1 className="text-5xl p-10 font-bold">Hello there</h1>
                            <div className="card w-96 glass shadow-xl">
                                <div className="card-body">
                                    <p className="text-3xl">Thank you! 🎉</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  })(ThanksU);