import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AddIssues(){
    const navigate=useNavigate();
    const [title,SetTitle]=useState('');
    const [description,SetDescription]=useState('');
    const [Err,SetErr]=useState('')
    const HandleAddIssues=async ()=>{
        const headers={ headers:
            {Authorization: "JWT Mft26100##"}
        }
        try{
            const response= await 
            axios.post('http://localhost:3031/gitlab/issues/',{title , description},{headers})
            .then( navigate('/') )
        }catch(error){
            console.error(error);
            SetErr('Failed to create Gitlab Issues')
        }
    }
    return(
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Issue</h1>
            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Title&nbsp;{title=="" && <span className="text-red-600">*</span>}
                </label>
                <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={title}
                    onChange={(t)=>SetTitle(t.target.value)} 
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Description&nbsp;{description=="" && <span className="text-red-600">*</span>}
                </label>
                <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(d)=>SetDescription(d.target.value)} 
                />
            </div>
            <div className="flex justify-center">
                <button className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        onClick={HandleAddIssues}>Add
                </button>
            </div>
            {Err && <div className="text-slate-50 bg-red-600 text-center my-2 py-3 rounded-lg">{Err}</div>}
        </div>
    )
}
export default AddIssues;