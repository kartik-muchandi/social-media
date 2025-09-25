import {CLOUD_NAME} from '../utils/config'
import {PRESET_KEY} from '../utils/config'
import {CLOUDINARY_URL} from '../utils/config'

export const checkImage = (file) => {
    if(!file) return "File does not exist.";
    if(file.size > 1024 * 1024) return "File size must be less than 1Mb.";
    if(!['image/jpeg', 'image/png'].includes(file.type)) {
        return "Image must be JPEG or PNG.";
    }
    return "";
}

export const imageUpload = async (images) => {
    const CLOUD_NAME = 'dw4ui2cci';
    const PRESET_NAME = 'nichint';
    const API_KEY = '452479282274577'; // From Cloudinary Dashboard
  
    try {
      const uploads = images.map(async (item) => {
        const file = item.camera || item;
        
        // Validate file
        if (!file.type.match(/image\/(jpeg|png)/)) {
          throw new Error('Only JPEG/PNG images allowed');
        }
  
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', PRESET_NAME);
        formData.append('cloud_name', CLOUD_NAME);
        formData.append('api_key', API_KEY);
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest' // Fixes CORS
            }
          }
        );
  
        const data = await response.json();
        if (data.error) {
          console.error('Cloudinary Error:', data);
          throw new Error(data.error.message);
        }
  
        return {
          public_id: data.public_id,
          url: data.secure_url
        };
      });
  
      return await Promise.all(uploads);
    } catch (err) {
      console.error('Upload Failed:', {
        error: err.message,
        preset: PRESET_NAME,
        cloud: CLOUD_NAME,
        time: new Date().toISOString()
      });
      throw new Error(`Upload failed: ${err.message}`);
    }
  };