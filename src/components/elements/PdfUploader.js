import { useState, useRef, useEffect, useContext } from "react";
import usePostData from '../../hooks/usePostData';

import { SearchContext } from "../../App";

const PdfUploader = (props) => {

    const filePreview = 'images/upload.png';
    //props from parent
    const [file_src, setFileSrc] = useState(filePreview);
    const [file_error, setFileError] = useState(null);

    //to store selected file
    const [fileObj, setFile] = useState(null);
    const [file_form, setFileForm] = useState(null);

    const [uploadButton, enableUpload] = useState(false);

    //trigger click on hidden input field when 
    //clicking on preview
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    //for upload image
    const uploadFile = () => {
        console.log(fileObj);
        const temp_form = new FormData();
        temp_form.append('file', fileObj);
        setFileForm(temp_form);
    }

    //file selected event
    const handleChange = (e) => {
        if (e.target.files[0].size > 10e6) {
            setFileError('File should be less than 8 MB');
        } else {
            setFileSrc(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
            e.target.value = null;
        }
    };

    //for reset file
    const resetFile = () => {
        setFile(null);
        setFileForm(null);
        setFileSrc(filePreview);
        enableUpload(false);
    }



    useEffect(() => {
        if (fileObj) {
            enableUpload(true);
        }
    }, [fileObj]);

    const { keyword, setKeyword } = useContext(SearchContext);



    const { data: file_data, error: image_error, loading: loading_image } = usePostData('file/add', file_form, "multipart/form-data");

    // for rerendering search component / Dashbord when upload is completed
    useEffect(() => {
        if (file_data) {
            setKeyword(Math.random() + 1);
            resetFile();
        }
    }, [file_data]);


    return (
        <div className='items-center'>
            <input
                accept="application/pdf"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                type="file"
                onChange={handleChange}
            />
            <embed onClick={handleClick} className='image-upload-preview cursor-pointer' key={file_src} src={file_src} />
            {file_error && <div className='text-left my-2 text-red-500' > {file_error} </div>}

            {uploadButton &&
                <>
                    <button onClick={() => uploadFile()} className='btn mt-2 w-full'>Upload</button>
                    <button onClick={() => resetFile()} className='btn mt-2 w-full'>Reset</button>
                </>
            }

        </div>
    );

}

export default PdfUploader;