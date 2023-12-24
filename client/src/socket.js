import { io } from 'socket.io-client';


export const PORT = process.env.PORT || 3000;
export const socket = io(`http://localhost:${PORT}`)


