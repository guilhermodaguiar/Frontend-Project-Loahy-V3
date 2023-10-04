import "./UploadImage.css"

import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {FaFileUpload} from "react-icons/fa";
import {useHistory} from "react-router-dom";
import GetImage from "../../imageComponent/GetImage";

function UploadImage({product}) {
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
            const result = await axios.post(`http://localhost:8080/products/${productId}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`,
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

    return (<>
        {user.roles !== "ROLE_ADMIN" ?
            <h3>Moet ingelogd zijn als Admin</h3> :
            <form onSubmit={() => sendUpdatedImageData(product.productId)}>
                <label htmlFor="itemImage-field">
                    <input
                        className="input-container-all"
                        type="file"
                        id="itemImage-field"
                        name="image"
                        onChange={handleImageChange}
                        required
                        placeholder="Kies Afbeelding"
                    />
                </label>
                {previewUrl && <label className="label-container">
                    Preview:
                    <GetImage src={previewUrl}
                              alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                              className="image-preview"/>
                </label>}
                <button
                    type="submit"
                    className="form-submit-image-button"
                >
                    <FaFileUpload size={22}/>
                    Upload Image
                </button>
            </form>
        }
    </>)
}

export default UploadImage;