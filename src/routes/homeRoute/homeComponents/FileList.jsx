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
        .catch((err) => console.err(err));
    }, [])

    return (
        <div className="FileList">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Size</th>
                <th scope="col">Uploaded</th>
                <th scope="col">Link</th>
                </tr>
            </thead>
            <tbody>
                {fileList.length > 0 ? 
                fileList.map((file) => {
                    return (
                        <tr>
                        <th scope="row">{file.name}</th>
                        <td>{file.size}</td>
                        <td>to do date</td>
                        <td>to do link</td>
                        <td></td>
                        </tr>
                    )
                })
                :
                <h4>Your files will be diplayed here</h4>
                }
            </tbody>
            </table>
        </div>
    );
};

export default FileList;