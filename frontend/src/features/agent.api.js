import api from "../utils/axios";


export const sendPrompt =async(payload)=>{

 const { data } =await api.post( "/api/agent/chat",payload);
console.log(data)
 return data;

};