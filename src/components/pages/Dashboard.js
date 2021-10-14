import Card from "../elements/Card";
import useGetData from "../../hooks/useGetData";
import { useState, useEffect, useRef, useContext } from "react";

const Dashboard = () => {

  const [searchUrl, setUrl] = useState('file?keyword=');
  const [files, setFiles] = useState(null);

  const { data, loading } = useGetData(searchUrl);

  const serchBox = useRef();


  // for trigger serach
  const searchFiles = () => {
    setUrl(`file/?keyword=${serchBox.current.value}`);
  }

  //for checking data after serach
  useEffect(() => {
    if (data && data.length) {
      setFiles(data);
    } else {
      setFiles(null);
    }
  }, [data])


  return (
    <>
      <header>
        <h2 className="text-green-500 text-4xl font-semibold mt-1">
          File Search App
        </h2>
        <h3 className="text-green-300 text-sm font-semibold font-sub-font tracking-wider">
          Upload and search pdf files
        </h3>
      </header>

      <div>

        <div className='flex justify-items-start my-2'>
          <input ref={serchBox} className='mr-2 w-1/2 text-gray-800' type="text" onKeyPress={e => {
            if (e.key === 'Enter') {
              searchFiles()
            }
          }} />
          <button onClick={() => searchFiles()} className='btn'>Search</button>
        </div>


        <div className="mt-4 grid md:grid-cols-6 gap-2">
          {files && files.map((file) => (
            <Card key={file._id} info={file} />
          ))}
          {!files &&
            <div className='my-10'>
              <h1 className='text-2xl'>No files found</h1>
            </div>
          }
          {loading &&
            <div className='my-10'>
              <h1 className='text-1xl'>Searching files..</h1>
            </div>
          }

        </div>

      </div>
    </>
  );
};

export default Dashboard;
