import React, { useEffect } from "react";
import axios from "axios";

const FileList = ({userName, fileList, input, setFileList, jwt}) =>{

    useEffect(() => {
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        };
        axios.get('http://localhost:5000/file/'+userName, config)
        .then((res) => {
            let newArray = res.data;
            setFileList(newArray);
        })
        .catch((err) => console.log(err));
    }, [input])

    // handlers
    const handleDelete = (fileName) => {
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        };
        axios.delete('http://localhost:5000/file/del/'+fileName+"/"+userName, config)
        .then((res) => { setFileList(res.data); })
        .catch((err) => console.log(err));
    };

    // downloads files from a file that we own
    const handleDownload = (fileName) => { 
        // since handleDownload it's a stream of data, a request with the auth token is made first to make sure we have the auth, and if it's succesful, the file is downloaded
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        };
        axios.get('http://localhost:5000/file/'+userName, config)
        .then((res) => {
            download(fileName);
        })
        .catch((err) => console.log(err));
    };
    const download = (fileName) => {
        axios.get('http://localhost:5000/file/download/'+fileName+"/"+userName)
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="FileList">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Size</th>
                <th scope="col">Uploaded on</th>
                <th scope="col">Link</th>
                </tr>
            </thead>
            <tbody>
                {fileList.length > 0 ? 
                fileList.map((file) => {
                    return (
                        <tr>
                        <th scope="row">{file.name}</th>
                        <td>{file.size < 1048576 ? (file.size/1024).toFixed(3)+" Kb": (file.size/1048576).toFixed(2)+ "Mb"}</td>
                        <td>{file.date}</td>
                        <td>
                        <button type="button" id="Download" onClick={() => handleDownload(file.name)}>{file.link[0]}</button>  
                        <button type="button" id="Trash" onClick={() => handleDelete(file.name)}>Delete</button>
                        </td>
                        <td></td>
                        </tr>
                    )
                })
                :
                <p>No files were found </p>
                }
            </tbody>
            </table>
        </div>
    );
};

export default FileList;