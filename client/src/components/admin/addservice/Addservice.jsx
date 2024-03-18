import React, { useEffect, useState } from "react";
import styles from "./Addservice.module.css"
// import Card from "../../ui/Card"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdPhotoCameraBack } from 'react-icons/md'
import { toast } from "react-toastify";
import Loader from '../../loader/Loader'
import { getservices, servicesdata } from '../../../redux/slice/serviceslice'
import { v4 as uuid } from "uuid"
const Addservice = () => {
    const { id } = useParams();
    const services = useSelector(servicesdata)
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const serviceEdite = services.find((pro) => pro.id === id);
    const formkind = (id, f1, f2) => {
        if (id === "Add") {
            return f1;
        }
        return f2;
    }
    const initialservice = {
        title: "",
        serviceprice: "",
        description: "",
        serviceduration: ""
    }
    const [curentservice, setCurentservice] = useState(() => {
        const newstate = formkind(id, { ...initialservice }, serviceEdite)
        return newstate
    })
    useEffect(() => {
        if (curentservice) {
            setImagePreview(curentservice?.ImageUrl);
        }
    }, [curentservice?.ImageUrl])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };
    const inputChange = (e) => {
        const { name, value } = e.target;
        setCurentservice({ ...curentservice, [name]: value });
    }
    const addservice = async (e) => {
        e.preventDefault();
        if (curentservice.title && curentservice.description && curentservice.serviceprice && curentservice.serviceduration) {
            try {
                if (image) {
                    const uid = uuid()
                    setUploading(true)
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: image, uid: uid })
                        .then((res) => {
                            // console.log(res);
                            setUploading(false)
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
                        .then((res) => {
                            // console.log(res)
                            setImageUrl(res.data.data.image)
                            setUploading(false)
                            setImage(null);
                            setImagePreview(null);
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                }
                await axios.post(`${process.env.BASE_API_URL_HOST}/products/add-service`, {
                    title: curentservice.title,
                    ImageUrl: imageUrl,
                    serviceprice: curentservice.serviceprice,
                    description: curentservice.description,
                    serviceduration: curentservice.serviceduration,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("Product Added successful", {
                    position: "top-right",
                })
                navigate('/admin/all-services')
                dispatch(getservices())
            }
            catch (error) {
                toast.error(error.message);
                setUploading(false)
            }
        }
        else {
            toast.info('Please fill out all the fields!')
        }
    };
    const editeservice = async (e) => {
        e.preventDefault();
        if (curentservice?.brand && curentservice?.category && curentservice?.description && curentservice?.itemquantity && curentservice?.serviceprice && curentservice?.brand) {
            try {
                if (image) {
                    const uid = uuid()
                    setUploading(true)
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: image, uid: uid })
                        .then((res) => {
                            // console.log(res);
                            setUploading(false)
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                    await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
                        .then((res) => {
                            // console.log(res)
                            setImageUrl(res.data.data.image)
                            setUploading(false)
                            setImage(null);
                            setImagePreview(null);
                        })
                        .catch((err) => {
                            toast.error(err.message)
                            setUploading(false)
                        })
                }
                await axios.put(`${process.env.BASE_API_URL_HOST}/products/add-service/${id}`, {
                    title: curentservice.title,
                    ImageUrl: imageUrl,
                    serviceprice: curentservice.serviceprice,
                    description: curentservice.description,
                    serviceduration: curentservice.serviceduration,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.success("Product Edited successful", {
                    position: "top-right",
                })
                navigate('/admin/all-services')
                dispatch(getservices())
            }
            catch (error) {
                toast.error(error.message);
                setUploading(false);
            }
        }
    }

    return (
        <div className={styles.container}>
            <h2>{formkind(id, "Add Service", "Edite Service")}</h2>
            <div className={styles.formcard}>
                <form onSubmit={formkind(id, addservice, editeservice)}>
                    <label>Service Name:</label>
                    <input name="title" placeholder="Service name" type="text" value={curentservice?.title} onChange={(e) => inputChange(e)} />
                    <br />
                    <label htmlFor="file" style={{ margin: '0 auto' }}>
                        Image Link:
                        <MdPhotoCameraBack color='black'
                            className="inline-block  translate-x-40 text-4xl"
                        // style={{ fontSize: '28px', display: 'inline-block' }}
                        />
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChange}
                    // onChange={(e) => setImage(e.target.value)}
                    />
                    {imagePreview && (
                        <div>
                            {/* <div className="absolute bottom-16 left-0 right-0 top-16 border-4 border-slate-400 border-dashed flex justify-center items-center bg-slate-200"> */}
                            {uploading && <Loader />}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "50%", maxHeight: "80%" }}
                            />
                        </div>
                    )}
                    <br />
                    <label>Service Price : </label>
                    <input name="serviceprice" placeholder="Service price" type="text" value={curentservice?.serviceprice} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Service duration : </label>
                    <input name="serviceduration" placeholder="Service duration" type="text" value={curentservice?.serviceduration} onChange={(e) => inputChange(e)} />
                    <br />
                    <label>Service Description : </label>
                    <textarea name="description" placeholder="Description" cols={10} rows={5} value={curentservice?.description} onChange={(e) => inputChange(e)}></textarea>
                    <button type="submit">{formkind(id, "Add Service", "Edite Service")}</button>
                </form>
            </div>

        </div>
    )
}
export default Addservice