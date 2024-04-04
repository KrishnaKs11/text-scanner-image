import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Camera = () => {
    const videoRef = useRef(null);
    const [ocrText, setOcrText] = useState('');

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(error => {
                    console.error("Error accessing the camera: ", error);
                });
        }

        const captureFrame = () => {
            if (videoRef.current) {
                const canvas = document.createElement('canvas');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(blob => {
                    analyzeImage(blob);
                }, 'image/jpeg', 0.95);
            }
        };

        const id = setInterval(captureFrame, 30000);

        return () => clearInterval(id);
    }, []); // Effect dependencies are empty, indicating this effect runs once on mount

    const analyzeImage = async (imageBlob) => {
        const apiKey = 'fc3e1e21ada044039a8855e784b99c64';
        const endpoint = 'https://textextractorforimg.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2024-02-01';

        try {
            const response = await axios.post(endpoint, imageBlob, {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Content-Type': 'application/octet-stream'
                },
                params: {
                    language: 'unk',
                    detectOrientation: 'true'
                }
            });

            const extractedText = response.data.readResult.blocks.map(block => block.lines.map(line => line.text).join('\n')).join('\n');

           
            setOcrText(extractedText);
        } catch (error) {
            console.error('OCR Analysis Error:', error);
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '40%' }}></video>
            <div>
                <h2>Extracted Text:</h2>
                <pre>{ocrText}</pre>
            </div>
        </div>
    );
};

export default Camera;
