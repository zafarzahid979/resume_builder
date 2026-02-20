import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const verifyCaptcha = async (req, res, next) => {
  const token = req.body.captchaToken;

  if (!token) {
    return res.status(400).json({ message: 'Captcha token is required' });
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    // For test keys, success is enough. For production, check score > 0.5
    const isValid = response.data.success && (response.data.score === undefined || response.data.score > 0.5);

    if (isValid) {
      next();
    } else {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }
  } catch (error) {
    console.error('Captcha verification error:', error);
    return res.status(500).json({ message: 'Captcha verification error' });
  }
};

export default verifyCaptcha;
