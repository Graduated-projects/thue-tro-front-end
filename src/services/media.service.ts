import { api } from '@/configs/request.api';
import axios from 'axios';

const uploadFiles = (files: FormData) => {
    return axios.post(api.media.UPLOAD_FILES, files, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
};



export const mediaService = {
    uploadFiles,
    
};
