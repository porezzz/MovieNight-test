import { io } from 'socket.io-client';


export const PORT = process.env.PORT || 10000;
export const socket = io(`http://localhost:${PORT}`)


