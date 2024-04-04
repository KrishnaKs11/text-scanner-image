import React, { useState } from 'react';
import OCRService from './ocrservice';

const FileUpload = ({ setOcrText }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadAndScan = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                OCRService.analyzeImage(selectedFile)
                    .then(data => {
                        const extractedText = data.regions.map(region =>
                            region.lines.map(line =>
                                line.words.map(word => word.text).join(' ')
                            ).join('\n')
                        ).join('\n\n');
                        setOcrText(extractedText);
                    })
                    .catch(error => {
                        console.error('Analysis failed:', error);
                    });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUploadAndScan} disabled={!selectedFile}>Upload & Scan</button>
        </div>
    );
};

export default FileUpload;
