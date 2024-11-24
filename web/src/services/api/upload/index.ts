import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
});

const fileUpload = async () => {
    const res = await axiosInstance.post('/upload/fileChunkUpload')
    console.log(res, 'res')
}

export {
    fileUpload
}