import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../../components/Spinner';
import { useRegisterMutation } from '../../services/api/api';

function Register() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [register, { isLoading: loader }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const postForm = async (e) => {
    e.preventDefault();

    try {
      await register(formState).unwrap();
      toast.success("Registered SuccessFully, Redirecting To Login Page");
      setTimeout(() => {
        navigate('/dashboard/projects/all');
      }, 2200);
    } catch (err) {
      toast.error(err.data.msg);
    }
  }

  return (
      <div className='px-6 w-full text-white'>
      <ToastContainer />
  <div className='pt-16 flex h-screen justify-center sm:items-center'>
      <div className=''>
      <div className='bg-[linear-gradient(to_right,_#90caf9,_#047edf_99%)] bg-opacity-70 py-10 w-[46rem] h-[36rem] max-sm:px-4 shadow-[10px_20px_30px_#0000004D] rounded-3xl'>
          <form onSubmit={postForm}  className='flex flex-col mx-auto gap-y-6 items-center'>
              <h3 className='sm:text-3xl text-xl my-10'>Register</h3>
              {/* <div> */}
              <input type='text' name='name' className='p-4 sm:w-[21.7rem] text-[#212121] outline-none  w-60 max-sm:text-xs rounded-md' placeholder='Name' onChange={handleChange} />
              <input type='text' name='email' className='p-4 sm:w-[21.7rem] text-[#212121] outline-none  w-60 max-sm:text-xs rounded-md' placeholder='Email' onChange={handleChange} />
              <input type='text' name='password' className='p-4 sm:w-[21.7rem] w-60 max-sm:text-xs text-[#212121]' placeholder='Enter Password' onChange={handleChange} />
           <button type='submit' className='bg-[linear-gradient(to_right,_#da8cff,_#9a55ff_99%)] font-popReg mt-10 rounded-3xl shadow-[10px_20px_30px_#14A3844D] sm:w-80 w-40 py-3 mb-5 text-xl'>
           <div className="flex justify-center items-center gap-x-3">
           {loader ? (
            <Spinner />
            ) : null 
          }  
              Register
              </div>
              </button>
          </form>
          <Link to='/login' className='pl-6 underline underline-offset-4'>Back to Login</Link>
              {/* </form> */}
      </div>
      </div>
</div>
  </div>
  )
}

export default Register