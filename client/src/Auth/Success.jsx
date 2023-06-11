import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Delete from './img/delete.svg';
import Add from './img/add.svg';
function Success(){
    const [cookies, setCookie] = useCookies(['auth']);
    const [token,setToken] = useState(()=>cookies.auth);
    const [issues, SetIssues]=useState(null);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!cookies.auth) navigate("/login")
    },[])
    useEffect(() => {
      const fetchIssues = async () => {
        try {
          const response = await axios.get('https://gitlab.com/api/v4/projects/45224080/issues', {
            headers: {
              Authorization: 'Bearer glpat-hegedP8XpmMJLzb3zY2R',
            },
          });
          SetIssues(response.data);
        } catch (error) {
          console.error('Failed to fetch issues:', error);
        }
      };
      fetchIssues();
    }, []);
      //Delete Issues
      const [issueId, setIssueId] = useState(null);
      const handleDelete = async (issueId) => {
        try {
          const response = await axios.delete(`http://localhost:3031/gitlab/issues/${issueId}`,{
            headers: {
              Authorization: 'JWT Mft26100##'
            }
          });
          alert("Issue deleted successfully");
          navigate('/')
          console.log(response.data);
          // Perform any necessary actions after successful deletion
        } catch (error) {
          console.error('Failed to delete issue:', error);
        }
      };

    return(
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="row">
                <h1 className="text-rose-500 my-5 text-center font-bold text-2xl font-mono">All Issues gitlab</h1>
            </div>
            <div className="row">
              <button className='flex w-full justify-center bg-sky-500 px-20 ml-3 py-3 rounded-lg text-center text-white hover:bg-sky-600 my-4'
              onClick={()=>{navigate('/addIssues')}}
              >
              <img src={Add} className="mr-2"/>
                Create New Issue
              </button>
            </div>
            <table className="w-full mx-4 text-sm text-center text-slate-900">
                <thead className="capitalize">
                    <tr>
                        <th>Project id</th>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>State</th>
                        <th>Author</th>
                        <th>Author state</th>
                        <th>Type</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="bg-white hover:bg-gray-50 text-slate-800 my-2">
                    {issues && issues.map((i)=>(
                        <tr key={i.id}>
                            <td className="px-6 py-3">{i.project_id}</td>
                            <td className="px-6 py-3" value={issueId} onChange={(e) => setIssueId(e.target.value)}>{i.iid}</td>
                            <td className="px-6 py-3">{i.title}</td>
                            <td className="px-6 py-3">{i.description}</td>
                            <td className="px-6 py-3"><span className={i.state=="opened"?"bg-cyan-400 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg":"bg-orange-400 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg"}>{i.state}</span></td>
                            <td className="px-6 py-3">{i.author.name}</td>
                            <td className="px-6 py-3"><span className={i.author.state=="active"?"bg-lime-400 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg":"bg-red-700 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg"}>{i.author.state}</span></td>
                            <td className="px-6 py-3">{i.type}</td>
                            <td>
                              <button type='button' className="flex w-full rounded-md bg-red-600 text-white justify-center px-3 py-1.5 hover:bg-red-400"
                              onClick={() => handleDelete(i.iid)}
                              >
                                <img src={Delete} className="mr-2"/>
                                Delete
                              </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Success;