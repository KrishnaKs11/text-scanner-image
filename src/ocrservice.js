import axios from 'axios';

const OCRService = {
    analyzeImage: async (imageBlob, setOcrText) => {
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

            if (setOcrText) {
                setOcrText(extractedText);
            } else {
                console.error('setOcrText function is not defined.');
            }
        } catch (error) {
            console.error('OCR Analysis Error:', error);
        }
    }
};

export default OCRService;
