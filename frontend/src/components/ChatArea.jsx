import { useState } from "react";
import AIBanner from "./AiBanner";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import MessageList from "./MessageList";
import Navbar from "./Navbar";


function ChatArea() {
  const [banner,setBanner]=useState({
    open:false,
    title:"",
    message:""
});
  return (
    <div className="flex-1 flex flex-col min-w-0">

      <Navbar />

      <MessageList />
      <AIBanner

   open={banner.open}

   title={banner.title}

   message={banner.message}

   onClose={()=>

      setBanner({
         ...banner,
         open:false
      })

   }

/>

     <ChatInput
  setBanner={setBanner}
/>

    </div>
  );
}

export default ChatArea;