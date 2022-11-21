import Link from "next/link";
import React from "react";

function Proximamente() {
  return (
    <div className="min-h-screen bg-principal desktop:my-5">
      <button className="btn glass m-5">
        <Link href="/home">Back To Home</Link>
      </button>
      <div className="hero ">
        <div className="hero-content text-center">
          <div className="text-light max-w-md">
            <h1 className="text-5xl p-10 font-bold">Hello there</h1>
            <div className="card w-96 glass shadow-xl">
              <div className="card-body">
                <p className="text-3xl">This section will be available soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proximamente;
