import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '../../components/Spinner';
import { useLoginMutation } from '../../services/api/api';

function Login() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: '',
        passowrd: '',
    })
    const [login, { isLoading: loader }] = useLoginMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    const postForm =  async (e) => {
        e.preventDefault();

        try {
            await login(formState).unwrap();
            toast.success("You've Logged In Successfully!");
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
        <div className='bg-[linear-gradient(to_right,_#84d9d2,_#07cdae_99%)] bg-opacity-70 py-10 w-[46rem] h-[31rem] max-sm:px-4 shadow-[10px_20px_30px_#0000004D] rounded-3xl'>
            <form onSubmit={postForm} className='flex flex-col mx-auto gap-y-6 items-center'>
                <h3 className='sm:text-3xl text-xl my-10'>Dashboard Login</h3>
                <input type='text' name='email' className='p-4 sm:w-[21.7rem] text-[#212121] outline-none  w-60 max-sm:text-xs rounded-md' placeholder='Email' onChange={handleChange} />
                <input type='text' name='password' className='p-4 sm:w-[21.7rem] w-60 max-sm:text-xs text-[#212121]' placeholder='Enter Password' onChange={handleChange}  />
               
             <button type='submit' className='bg-[linear-gradient(to_right,_#da8cff,_#9a55ff_99%)] font-popReg mt-10 rounded-3xl shadow-[10px_20px_30px_#14A3844D] sm:w-80 w-40 py-3 mb-5 text-xl'>
             <div className="flex justify-center items-center gap-x-3">
             {loader ? (
              <Spinner />
              ) : null 
            }  
                Login
                </div>
                </button>
            </form>
            <Link to='/register' className='pl-6 underline underline-offset-4'>Back to Register</Link>
        </div>
        </div>
</div>
    </div>

  )
}

export default Login