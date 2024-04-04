import axios from 'axios';

const OCRService = {
    analyzeImage: async (imageData) => {
        const apiKey = 'fc3e1e21ada044039a8855e784b99c64';
        const endpoint = 'https://textextractorforimg.cognitiveservices.azure.com/computervision/imageanalysis:analyze';

        try {
            const response = await axios.post(endpoint, imageData, {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Content-Type': 'application/octet-stream'
                },
                params: {
                    features: 'caption,read',
                    'model-version': 'latest',
                    language: 'en',
                    'api-version': '2024-02-01',
                    detectOrientation: 'true'
                }
            });

            return response.data;
        } catch (error) {
            console.error('OCR Analysis Error:', error);
            throw error; // Rethrow the error to handle it in the component
        }
    }
};

export default OCRService;
