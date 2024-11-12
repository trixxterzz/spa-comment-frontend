import { useState, useEffect } from 'react';
import Captcha from 'captcha-mini';
import { Button, TextInput } from 'flowbite-react';

const CaptchaComponent = ({ onValidate }) => {
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
  
    const generateCaptcha = () => {
      const captcha = new Captcha();
      captcha.draw(document.querySelector('#captcha'), (text) => {
        setCaptchaText(text);
      });
    };

    const validateCaptcha = () => {
      const isValid = userInput.toLowerCase() === captchaText.toLowerCase();
      onValidate(isValid);
      if (!isValid) generateCaptcha();
    };
  
    useEffect(() => {
      generateCaptcha();
    }, []);
  
    return (
      <div className='my-5 py-2'>
        <canvas className='m-3' id="captcha" width="100" height="40" />
        <TextInput
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter captcha text"
          className='mx-3 max-w-48'
        />
        <Button className='inline m-3 bg-indigo-600' onClick={validateCaptcha}>Check</Button>
        <Button className='inline m-3 bg-red-600' onClick={generateCaptcha}>Update captcha</Button>
      </div>
    );
  };

export default CaptchaComponent;
