import { useState, useEffect } from "react"
import axios from 'axios'
import { MdFileUpload } from 'react-icons/md'

const HomeEdit = () => {
    // const [profilePicture, setProfilePicture] = useState('')
    // const [isiProfile, setIsiProfile] = useState('')
    // const onSubmitHome = (e) => {
    //     e.preventDefault()

    //     if(!profilePicture | !isiProfile) {
    //         alert('Please fill your home input')
    //     }

    //     onAddHome({ profilePicture, isiProfile })

    //     setProfilePicture('')
    //     setIsiProfile('')
    // }

    const [home, setHome] = useState('')
    const [gambar, setGambar] = useState('')
    const [preview, setPreview] = useState('')
    useEffect(() => {
        const getHome = async () => {
            const res = await axios.get('http://localhost:8000/api/home/Home-955-60-816');
            console.log(res);
            const myHome = res.data;
            setHome(myHome.desc);
            setPreview(myHome.pic_url);
        }
        getHome()
    }
    , []);

    const changeHome = (e) => {
        e.preventDefault();
        
        const url ='http://localhost:8000/api/home/Home-955-60-816';

        if(gambar === ""){
            let formData = new FormData();
            formData.append('desc', home)
            axios.put(url, formData).then(res => {
                console.log(res)
                alert("Home successfuly changed!")
            }).catch(err =>{
                console.log(err)
            })
        }else{
            let formData = new FormData();
            formData.append('image', gambar);
            formData.append('desc', home)
            axios.put(url, formData).then(res => {
                console.log(res)
                alert("Home successfuly changed!")
            }).catch(err =>{
                console.log(err)
            })
        }
    };

    const handleDesc = (e) => {
        setHome(e.target.value)
    }

    const handleFile = (e) => {
        setGambar(e.target.files[0])
        
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    return (
        <div className="main">
            <div className="content">
            <form onSubmit={changeHome} encType="multipart/form-data">
                <div className="row">
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>Edit Home</h1>
                    <div className="pic">
                        {
                            <img src={preview} alt="" />
                        }
                        <div className="backoverlay">

                        </div>
                        <div className="overlay">
                            <label className="iconover" 
                            htmlFor="image">
                                <i><MdFileUpload /></i>
                            </label>
                            <input className="image" 
                            id="image" type="file" 
                            placeholder="Add Picture" 
                            onChange={handleFile} />
                        </div>
                    </div>
                </div>
                <div className="row isihome">
                    <div className="input-form">
                        <textarea value={home} 
                        onChange={handleDesc} 
                        className="desc" id="desc" 
                        cols="75" rows="20" 
                        placeholder="Add Profile (min 10 letter)"></textarea>
                        {
                            home.length < 10 ? (
                                <input id="savehome disabled" 
                                className="savehome disabled" 
                                type="submit" 
                                value="Save" disabled/>
                            ) : (
                                <input id="savehome" 
                                className="savehome" 
                                type="submit" 
                                value="Save" />
                            )
                        }
                    </div>
                </div>
            </form>
            </div>
        </div>
        
    )
}

export default HomeEdit
