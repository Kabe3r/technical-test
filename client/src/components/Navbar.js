import { useDispatch, useSelector } from 'react-redux';
import avatar from '../images/avatar.jpg';
import { handleToggle } from '../features/toggle/NavHeroSlice';

function Navbar({ sidebar, user }) {
    const name = useSelector(state => state.hero.name);
    const dispatch = useDispatch();


  return (
      <nav className={`bg-white rounded-lg text-2xl h-20 px-4 pt-[13px] opacity-100`}>
        <div className="flex justify-between items-center">
        <button className="lg:hidden block w-10 h-10 relative focus:outline-none"  onClick={() => dispatch(handleToggle())}>
                <span className="sr-only">Open main menu</span>
                <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span aria-hidden="true" className={`block absolute h-0.5 w-10 bg-current transform transition duration-500 ease-in-out ${sidebar ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                    <span aria-hidden="true" className={`block absolute h-0.5 w-10 bg-current transform transition duration-500 ease-in-out ${sidebar && 'opacity-0'}`}></span>
                    <span aria-hidden="true" className={`block absolute  h-0.5 w-10 bg-current transform transition duration-500 ease-in-out ${sidebar ? '-rotate-45': 'translate-y-1.5'}`}></span>
                </div>
            </button>
            <h2 className="">{name}</h2>
            <div className="flex items-center gap-x-10">
                {/* <div className="flex gap-x-1">
                <span className="text-white text-xs mb-2 px-[2px] bg-[#F66262] rounded-[3px]">3</span>
            <span className="border border-green-col rounded-p[5px] p-1">
            <FaRegBell fill="#14A384" size={15} />
            </span>
                </div> */}
                <div className="flex items-center gap-x-4">
            <img className="w-14 h-14" src={avatar}  alt='avatar' />
            <span className="">{user}</span>
                </div>
            </div>
        </div>
    </nav>

  )
}

export default Navbar