import "./AdminUploadImage.css"

import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaFileUpload} from "react-icons/fa";
import {useHistory} from "react-router-dom";


function AdminUploadImage({product}) {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
    async function sendUpdatedImageData(productId) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post(`http://localhost:8080/products/${productId}/image`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                }).then(savedPicture);
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    function savedPicture() {
        history.push('/admin/profile/#admin_add_new_product')
    }

    return (
        <>
            {user.roles !== "ROLE_ADMIN" ? (
                <div className="admin-route-container">
                    <div className="admin-route">
                        <h1>U moet ingelogd zijn als
                            <br/> ADMINISTRATOR
                            <br/>om deze content te mogen zien..
                        </h1>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="form-container-all">
                        <form onSubmit={sendUpdatedImageData(product.productId)}>
                            <label htmlFor="itemImage-field">
                                Kies Afbeelding
                                <input
                                    className="input-container-all"
                                    type="file"
                                    id="itemImage-field"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {previewUrl &&
                                <label className="label-container">
                                    Preview:
                                    <img src={previewUrl}
                                         alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                                         className="image-preview"/>
                                </label>
                            }
                            <button
                                type="submit"
                                className="form-submit-image-button"
                            >
                                <FaFileUpload size={22}/>
                                Upload Image
                            </button>
                        </form>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default AdminUploadImage;