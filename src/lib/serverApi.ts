import axios from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY, // substitua pela chave correta
  },
});


export default serverApi;