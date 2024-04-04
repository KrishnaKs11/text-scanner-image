import React, { useState } from 'react';
import OCRService from './ocrservice';

const FileUpload = ({ setOcrText }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const convertImageToBlob = async (imageData) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const blob = new Blob([new Uint8Array(e.target.result)], { type: 'application/octet-stream' });
                resolve(blob);
            };
            reader.onerror = function(e) {
                reject(new Error('Error reading file: ' + e.target.error.code));
            };
            reader.readAsArrayBuffer(imageData);
        });
    };

    const handleUploadAndScan = async () => {
        if (selectedFile) {
            setLoading(true);
            try {
                const blob = await convertImageToBlob(selectedFile);
                const response = await OCRService.analyzeImage(blob);
                const extractedText = response.readResult.blocks.map(block =>
                    block.lines.map(line => line.text).join('\n')
                ).join('\n\n');
                setOcrText(extractedText);
            } catch (error) {
                console.error('OCR Analysis Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUploadAndScan} disabled={!selectedFile || loading}>
                {loading ? 'Scanning...' : 'Upload & Scan'}
            </button>
        </div>
    );
};

export default FileUpload;
