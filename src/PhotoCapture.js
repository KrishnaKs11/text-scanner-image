import React, { useRef, useEffect, useState } from 'react';
import OCRService from './ocrservice';
import './PhotoCapture.css';

const PhotoCapture = ({ setOcrText, setCaptionText }) => { // Corrected props destructuring here
    const videoRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Capture the current value of videoRef.current in a variable
        const videoElement = videoRef.current;
    
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                // Use the captured videoElement instead of videoRef.current directly
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
            }
        };
    
        startCamera();
    
        return () => {
            // Use the captured videoElement in your cleanup logic
            if (videoElement && videoElement.srcObject) {
                const tracks = videoElement.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []); // Since videoRef is a ref object, we don't need to include it in the dependencies array
    

    const captureFrame = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a Blob
            canvas.toBlob(blob => {
                setCapturedImage(blob);
            }, 'image/jpeg', 0.95);
        }
    };

    const handleCapture = () => {
        captureFrame();
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setCaptionText(''); // Clear the caption text as well on retake
    };

    const handleScan = async () => {
        if (capturedImage) {
            setLoading(true);
            try {
                const response = await OCRService.analyzeImage(capturedImage);

                if (response.captionResult && response.captionResult.text) {
                    setCaptionText(response.captionResult.text);
                }

                if (response.readResult && response.readResult.blocks) {
                    const extractedText = response.readResult.blocks
                        .map(block => block.lines.map(line => line.text).join('\n'))
                        .join('\n');
                    setOcrText(extractedText);
                }
            } catch (error) {
                console.error('OCR Analysis Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="photo-capture-container">
            <div className="video-wrapper">
                <video ref={videoRef} autoPlay playsInline className="video-feed"></video>
                {capturedImage && (
                    <img src={URL.createObjectURL(capturedImage)} alt="Captured" className="captured-image" />
                )}
            </div>
            <div>
                {capturedImage ? (
                    <div>
                        <button onClick={handleRetake}>Retake</button>
                        <button onClick={handleScan} disabled={loading}>Scan</button>
                    </div>
                ) : (
                    <button onClick={handleCapture}>Capture</button>
                )}
            </div>
        </div>
    );
};

export default PhotoCapture;
