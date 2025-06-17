import React, { useEffect, useRef } from 'react'
import styles from './ImageUpload.module.css'
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ImageUpload({setImageUrl}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddznouau4',
            uploadPreset: 'trellis',

        }, (error, result) => {
            if (error) {
                console.error('Upload error:', error);
            }else if (result.event === "success") {
                setImageUrl(result.info.secure_url);
            }
        });
    }, []);


    return (
        <button className={styles.imageButton} onClick={() => widgetRef.current.open()}>Upload Image<FontAwesomeIcon className={styles.icon} icon={faUpload}/></button>
    )
};

