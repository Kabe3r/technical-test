import { Link } from "react-router-dom"
import { FaGithub, FaProjectDiagram, FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useGetCompletedProjectsQuery } from "../../services/completedApi/completedApi";
import moment from "moment";

function CompletedProject() {
    const [formSort, setFormSort] = useState({
        sort: 'a-z',
        search: ''
    })

    const { data, isLoading, error} = useGetCompletedProjectsQuery({
        sort: formSort.sort,
        search: formSort.search 
    });

    const handleSort = (e) => {
        const { name, value } = e.target;
        setFormSort(prevSort => ({ ...prevSort, [name]: value }));
    }

  return (
      <section className="mt-8 h-[calc(100vh-9.6rem)] overflow-auto">
      <div className="flex justify-between items-center mt-10">
      <input type="text" name='search' className="bg-white px-4 py-2 rounded-xl border border-opacity-60 border-white outline-none font-popBold" placeholder="Search by Project Name" size={40} value={formSort.search} onChange={handleSort} />
      <select
                name="sort"
                className="block w-60 bg-white border border-gray-400 rounded-md py-2 px-4 leading-tight focus:outline-none text-gray-400"
                value={formSort.sort}
               onChange={handleSort}
              >
                <option value='a-z'>A-Z</option>
                <option value='z-a'>Z-A</option>
                <option value='latest'>Latest</option>
                <option value='oldest'>Oldest</option>
              </select>
      </div>

      {data?.count >= 1 ? (

      <div className="flex flex-wrap gap-10 justify-center text-2xl mt-10">

      {data?.projects?.map(pro => ((
      <div key={pro?._id} className="bg-white w-96 rounded-lg">
      <img class="bg-cover bg-center w-96 h-64 rounded-2xl" src={`http://localhost:3000${pro?.image}`} alt="" />
      <div className="px-4">
                <div class="my-5 py-4">
                <div className="flex items-center justify-between">
                <h2 className="">{pro?.name}</h2>
                <FaRegEdit fill="#047edf" />
                </div>
                 <p className="mt-4 w-96 text-base font-medium text-gray-400">{pro?.description}</p>   
                </div>
                <div class="capitalize text-sm font-bold">
                <div className="flex justify-between items-center">
                    <h2 className="text-[#f57f3d]">Label</h2>
                    <p className="text-[#ffbf96]">{pro?.label}</p>
                </div>
                <div className="flex justify-between items-center py-4">
                    <h2>Github Repo</h2>
                    <Link to={`${pro?.githubRepoLink}`}>
                        <FaGithub />
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-[#07cdae]">Project Url</h2>
                    <Link to={`${pro?.liveUrl}`}>
                        <FaProjectDiagram fill="#84d9d2"  />
                    </Link>
                </div>
                </div>
                <div className="mt-5 text-sm font-light flex justify-between items-center">
                <p className="">{moment(pro?.updatedAt).format('ll')}</p>
                </div>
      </div>
      </div>
      )))}

      </div>

      ): (
      <h4 className="mt-10 text-center capitalize text-2xl">{`${formSort.search && `no project exist by this ${formSort.search} name`}`}</h4>
      )}

      </section>
  )
}

export default CompletedProject;