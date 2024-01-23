import avatar from '../images/avatar.jpg'
import {Link, useNavigate } from 'react-router-dom'
import { CgLogOut } from "react-icons/cg";
import { AiOutlineProject, AiOutlineFileDone } from "react-icons/ai";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { handleNavigation } from '../features/toggle/NavHeroSlice';


function Sidebar({ sidebar, name }) {
    const hero = useSelector(state => state.hero);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('persist:root');
        setTimeout(() => {
            navigate('/login');
            dispatch(handleNavigation('Current Projects'));
        }, 2200);
    }

  return (
      <div className=''>
      <aside className={`bg-white w-[22%] h-[calc(100vh-2rem)] rounded-2xl overflow-y-auto  no-scrollbar absolute ${sidebar ? 'block' : 'max-lg:hidden'}`}>
          <div className=''>
              <div className='sticky top-0 bg-black-col py-4'>
              <div className='flex items-center justify-center gap-x-4'>
                  <img className='2xl:w-28 2xl:h-28 lg:w-24 lg:h-24 w-20 h-20 object-cover' src={avatar} alt='avatar' />
                  <span className='2xl:text-3xl lg:text-2xl text-xl'>{name}</span>
              </div>
              <div className='flex items-center justify-between flex-wrap px-4 pb-4 pt-8 font-popMed 2xl:text-2xl text-xl'>
                  <p className='text-green-col'>Projects Dashboard</p>
                  <button className='flex items-center gap-x-2' onClick={handleLogout}>
                  <CgLogOut />
                      <span>Logout</span>
                  </button>
              </div>
              </div>
              <div className='px-4 mt-4 font-popMed 2xl:text-xl text-[#3e4b5b] text-lg w-full'>
                  <div className={`py-5 flex justify-between items-center gap-x-4 hover:bg-[#fbfbfb] ${hero.isCurrent && 'text-[#b66dff] font-bold'}`} >
                     <Link to='dashboard/projects/all' onClick={() => dispatch(handleNavigation('Current Projects'))}>Current Projects</Link>
                   <AiOutlineProject fill={`${hero.isCurrent ? '#8102ff' : '#bba8bff5'}`} />
                  </div>
                  <div className={`flex mt-2 justify-between items-center gap-x-4 py-4 hover:bg-[#fbfbfb] ${hero.isArchived && 'text-[#b66dff] font-bold'}`}>
                      <Link to='dashboard/projects/archived' onClick={() => dispatch(handleNavigation('Archived Projects'))}>Archived Projects</Link>
                      <RiArchiveDrawerLine fill={`${hero.isArchived ? '#8102ff' : '#bba8bff5'}`} />
                  </div>
                  <div className={`flex mt-2 justify-between items-center gap-x-4 py-4 hover:bg-[#fbfbfb] ${hero.isCompleted && 'text-[#b66dff] font-bold'}`}>
                     <Link to='dashboard/projects/completed' onClick={() => dispatch(handleNavigation('Completed Projects'))}>Completed Projects</Link>
                  <AiOutlineFileDone fill={`${hero.isCompleted ? '#8102ff' : '#bba8bff5'}`} />
                  </div>
              </div>
          </div>
      </aside>
      </div>
  
  )
}

export default Sidebar                             