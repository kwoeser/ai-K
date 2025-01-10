import React from 'react'
import { IKContext, IKImage } from 'imagekitio-react';

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;


const urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>';
const publicKey = '<YOUR_IMAGEKIT_PUBLIC_KEY>'; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3001/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const upload = () => {

    const onError = err => {
        console.log("Error", err);
    };
      
    const onSuccess = res => {
        console.log("Success", res);
    };
      
    const onUploadProgress = progress => {
        console.log("Progress", progress);
    };
      
    const onUploadStart = evt => {
        console.log("Start", evt);
    };


    return (
        <div className="App">
          <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
          >
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
                UseUniqueFileName={true}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
            />
          </IKContext>
          {/* ...other SDK components added previously */}
        </div>
    );
}

export default upload