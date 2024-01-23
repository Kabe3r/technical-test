import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbCameraPlus } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import { useAddProjectMutation, useGetSingleProjectQuery, useUpdateProjectMutation } from '../../services/currentApi/currentApi';
import Spinner from '../../components/Spinner';
import { useDispatch } from 'react-redux';
import { handleNavigation } from '../toggle/NavHeroSlice';

export default function Project() {
      const params = useParams();
      const navigate = useNavigate();

      const [formState, setFormState] = useState({
            name: '',
            description: '',
            startDate: '',
            labels: '',
            githubRepoLink: '',
            liveUrl: '',
            image: null,
            isArchived: false,
            isCompleted: false,
      });
      const { data, isLoading, isError } = useGetSingleProjectQuery(params.id);
      const [addProject, { isLoading: loader }] = useAddProjectMutation();
      const [updateProject, { isLoading: loading }] = useUpdateProjectMutation();
      const dispatch = useDispatch()

      useEffect(() => {
        setFormState(prevState => {
          return {
            ...prevState,
            name: data?.project?.name,
            description: data?.project?.description,
            startDate: data?.project?.startDate,
            labels: data?.project?.labels,
            githubRepoLink: data?.project?.githubRepoLink,
            liveUrl: data?.project?.liveUrl,
            image: data?.project?.image,
            isArchived: data?.project?.isArchived,
            isCompleted: data?.project?.isCompleted
          }
        })
      }, [data])
      

      console.log(formState)

      const handleChange = (event) => {
        const { name, value, files, type, checked } = event.target;
      
        setFormState((prevFormState) => {
          if (name === 'isArchived') {
            return {
              ...prevFormState,
              [name]: checked,
              isCompleted: checked,
            };
          }
      
          return { ...prevFormState, [name]: type === 'checkbox' ? checked : (name === 'image' ? files?.[0] : value) };
        });
      };
      
      
          const postForm = async (e) => {
            e.preventDefault();
            const formData = new FormData();

            Object.entries(formState).forEach(([key, value]) => {
              formData.append(key, value);
            });

            try {
              if (params.id === 'add') {
                await addProject(formData).unwrap();
                toast.success('Project Added Successfully');
              } else {
                await updateProject({id: params.id, formData}).unwrap();
                toast.success('Project Updated Successfully');
              }
              setTimeout(() => {
                navigate('/dashboard/projects/all')
                dispatch(handleNavigation('Current Projects'))
              }, 2200);

            } catch (err) {
              toast.error(err?.data?.msg)
            }
          }



  return (
      <div className="bg-white mt-10 w-full rounded-lg px-8 py-10 text-2xl h-[calc(100vh-9.6rem)] overflow-auto ">
        <ToastContainer />
    <form onSubmit={postForm} className="font-popLte mt-6">
        <div>
        <label className="block">Name</label>
            <input type='text' name='name' value={formState?.name} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} placeholder='Enter project name' onChange={handleChange} />
        </div>
        <div className="mt-5">
        <label className="block">Description</label>
            <input type='text' name="description" value={formState?.description} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} placeholder="Enter description" onChange={handleChange} />
        </div>
        <div className="mt-5">
        <label className="block">Date</label>
            <input type='date' name='startDate' value={formState?.startDate} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} onChange={handleChange} />
        </div>
        <div className="mt-5">
        <label className="block">Label</label>
            <input type='text' name='labels' value={formState?.labels} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} placeholder="Enter Label" onChange={handleChange} />
        </div>
        <div className="mt-5">
        <label className="block">Github Repo Link</label>
            <input type='text' name="githubRepoLink" value={formState?.githubRepoLink} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} placeholder="Enter Github Repo Link" onChange={handleChange} />

        </div>
        <div className="mt-5">
        <label className="block">Project Live Link</label>
            <input type='text' name="liveUrl" value={formState?.liveUrl} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} placeholder="Enter Project Url" onChange={handleChange} />

        </div>
        <div className="mt-5 flex gap-x-4 items-center">
        <label className="block">isArchived</label>
            <input type='checkbox' name="isArchived" value={formState?.isArchived} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} onChange={handleChange} />
        <label className="block">isCompleted</label>
            <input type='checkbox' name="isCompleted" value={formState?.isCompleted} className='max-md:w-full border border-gray-400 bg-transparent text-lg p-3 mt-2 rounded-md' size={45} onChange={handleChange} />

        </div>
        <div className="mt-10 border w-16 ">
              <label for="file-input" className="cursor-pointer">
                <TbCameraPlus className="mx-auto" size={28} />
              </label>
              <input
                type="file"
                id="file-input"
                name='image'
                className="hidden"
                onChange={handleChange}
              />
            </div>
            <figure className='mt-5'>
                  <img className='w-28 h-28' src={`http://localhost:3000/uploads/${formState?.image}`} alt={formState?.image} />
            </figure>
        <div className="flex gap-x-2 mt-16 items-center text-xl">
        <Link to='/dashboard/projects/all' className="border border-[#14A384] w-60 rounded-[5px] py-1 text-center">Cancel</Link>
        <button type='submit' className="bg-[#14A384] w-60 rounded-[5px] py-1 text-white">
            <div className="flex items-center justify-center gap-x-3">
            {loader || loading ? (
              <Spinner />
            ) : null 
            } 
            Save
            </div>
            </button>
        </div>
    </form>
</div>
  )
}
