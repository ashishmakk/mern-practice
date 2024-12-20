import React from "react";
import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className=''>
      <nav className='bg-[#ebebeb] py-6'>
        <div className='alignment'>
          <Logo />
        </div>
      </nav>
      <div className='alignment grid gap-y-4 mt-12'>
        <h1>New Job portal App</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
          pariatur ipsam quibusdam eum possimus. Quaerat nostrum voluptates
          sapiente quis quia quasi optio obcaecati dolores laborum distinctio
          deleniti dicta, perspiciatis laudantium?
        </p>
        <div className='flex gap-x-4'>
          <Link to='/register' className='btn'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
