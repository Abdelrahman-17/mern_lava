import React, { useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { MdPhotoCameraBack } from 'react-icons/md'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
const Input = ({ selectedUser, currentUser, activetype, setActivetype }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         setImage(null);
    //         setImagePreview(null);
    //     }
    // };
    const sendMessage = async (e) => {
        setMessage("");
        if (message.trim() !== "") {
            // let imageUrl = null;
            // if (image) {
            //     const storage = getStorage();
            //     const storageRef = ref(storage, image.name);
            //     setUploading(true);
            //     await uploadString(storageRef, imagePreview, "data_url");
            //     imageUrl = await getDownloadURL(storageRef);
            //     setUploading(false);
            //     setImage(null);
            //     setImagePreview(null);
            // }
            await axios.post(`${process.env.BASE_API_URL_HOST}/chat/add-chat`, {
                senderId: currentUser?._id,
                receiverId: selectedUser._id,
                message,
                // imageUrl,
                // timestamp: serverTimestamp()
            })
                .then(res => toast.success(res.data))
                .catch(err => toast.error(err.message))

        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const handleSendClick = () => {
        sendMessage();
        // setActivetype(false)
    };
    return (
        <>
            {/* <div>Input</div> */}
            <div className="bg-slate-100   h-16 border-t border-slate-200 flex items-center px-8 gap-4">
                {/* <label htmlFor="file">
                    <MdPhotoCameraBack
                        className="text-gray-600   w-200 text-4xl cursor-pointer"
                        style={{ fontSize: 28 }}
                    />
                </label>
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                /> 
                 <label htmlFor="file">
                    <ImAttachment
                        className="cursor-pointer text-gray-600  w-200 text-4xl"
                        style={{ fontSize: 28 }}
                    />
                </label> */}
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full rounded-lg h-11 bg-white   shadow px-4"
                        placeholder="Type something..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            // setActivetype(true)
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    {/* {imagePreview && (
                        <div className="absolute bottom-16 left-0 right-0 top-16 border-4 border-slate-400 border-dashed flex justify-center items-center bg-slate-200">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )} */}
                </div>
                <AiOutlineSend
                    className="cursor-pointer text-gray-600  w-200 text-4xl"
                    style={{ fontSize: 28 }}
                    onClick={handleSendClick}
                />
            </div>
        </>
    )
}

export default Input