import React from 'react';

const OCRResult = ({ caption, text }) => {
    return (
        <div>
            <h2>Caption:</h2>
            <p>{caption}</p>
            <h2>Text:</h2>
            <p>{text}</p>
        </div>
    );
};

export default OCRResult;
