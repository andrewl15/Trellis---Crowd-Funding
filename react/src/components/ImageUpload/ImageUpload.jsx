import React, { useEffect, useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export default function ImageUpload() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddznouau4',
            uploadPreset: 'trellis',
            uploadParams: {
                public_id: 'test-campaign-image'
            }
        }, (error, result) => {
            if (error) {
                console.error('Upload error:', error);
            } else if (result.event === "success") {
                console.log('Uploaded with public_id:', result.info.public_id);
            }
        });
    }, []);


    return (
        <button onClick={() => widgetRef.current.open()}>Upload Campaign Image</button>
    )

    //   const cld = new Cloudinary({ cloud: { cloudName: 'ddznouau4' } });

    //   // Use this sample image or upload your own via the Media Explorer
    //   const img = cld
    //         .image('cld-sample-5')
    //         .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    //         .quality('auto')
    //         .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

    //   return (<AdvancedImage cldImg={img}/>);
};

