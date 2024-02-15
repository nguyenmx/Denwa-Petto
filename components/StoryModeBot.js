import axios from 'axios';
import { REACT_APP_API_KEY } from "@env";

const testImage = 'https://as1.ftcdn.net/v2/jpg/06/15/90/08/1000_F_615900868_gO6CEKZefpOkrPaUEb1ykBHYzm5lhge2.jpg';
export const generateResponse = async (userInput) => {
  // Check if the user is requesting an image
  const isImageRequest = userInput.toLowerCase().includes("selfie");
  const isDalleRequest = userInput.toLowerCase().includes("dalle");
  if (isImageRequest) {
    // const imageURL = await generateDALLEResponse(userInput);
    // return imageURL; // Return the generated image URL
    return testImage;
    
  } else if (isDalleRequest){
    try {
      const dalleResponse = await generateDALLEResponse(userInput);
      return dalleResponse;
    } catch (error) {
      console.error('Error generating DALLE image:', error);
      return 'Error generating DALLE image';
    }
  }
  
  else {
    const chatGPTResponse = await generateChatGPTResponse(userInput);
    return chatGPTResponse; // Return the GPT-3.5 response
  }
};

const generateDALLEResponse = async (userInput) => {
  try{
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations', {
        userInput,
        n: 1,
        size: "512x512"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REACT_APP_API_KEY}`,
        },
      }
    );
    let url = res?.data?.data[0]?.url;
    console.log('got url of the image: ', url);
    messages.push({role: 'assistant', content: url});
    return Promise.resolve({success: true, data: messages});

  }catch (error) {
    console.error('Error generating image:', error);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const generateChatGPTResponse = async (userInput) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput },
        { role: 'system', content: 'You a character from a dating app that is a duck that talks casually. The duck is flirty, creative, has dry humor, and very friendly' },
        ],
        temperature: 0.8,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REACT_APP_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Error generating response';
  }
};
