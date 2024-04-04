import React, { useRef, useEffect, useState } from 'react';
import OCRService from './ocrservice';
import './PhotoCapture.css'; // Import CSS file

const PhotoCapture = ({ setOcrText }) => {
    const videoRef = useRef(null);
    const [ocrText, setOcrTextState] = useState('');
    const [capturedImage, setCapturedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the camera: ", error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

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
        setOcrTextState('');
        setCaption('');
    };

    const handleScan = async () => {
        if (capturedImage) {
            setLoading(true);
            try {
                const response = await OCRService.analyzeImage(capturedImage);

                if (response.captionResult && response.captionResult.text) {
                    setCaption(response.captionResult.text);
                }

                if (response.readResult && response.readResult.blocks) {
                    const extractedText = response.readResult.blocks
                        .map(block => block.lines.map(line => line.text).join('\n'))
                        .join('\n');
                    setOcrTextState(extractedText);
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
            <div>
                <h2>Caption:</h2>
                <pre>{caption}</pre>
                <h2>Extracted Text:</h2>
                <pre>{ocrText}</pre>
            </div>
        </div>
    );
};

export default PhotoCapture;
