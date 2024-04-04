import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Camera = () => {
    const videoRef = useRef(null);
    const [intervalId, setIntervalId] = useState(null);
    const [ocrText, setOcrText] = useState('');
    useEffect(() => {
        // Request camera access
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

        // Set up interval for frame capture
        const id = setInterval(() => {
            captureFrame();
        }, 30000); // Adjust interval time as needed

        setIntervalId(id);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const captureFrame = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob and then to a file-like object for Azure OCR
            canvas.toBlob(blob => {
                analyzeImage(blob);
            }, 'image/jpeg', 0.95);
        }
    };

    const analyzeImage = async (imageBlob) => {
        // Here you'd implement the call to Azure Vision OCR API
        // Similar to previous examples, using Axios or Fetch to POST the image
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

            // Handle the OCR response
            console.log(response.data);

            // Extracting text from the response and joining lines
            const extractedText = response.data.readResult.blocks.map(block => block.lines.map(line => line.text).join('\n')).join('\n');

            // Set the extracted text state
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
