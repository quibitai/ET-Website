import React, { useState, useRef } from "react";

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="bg-[#FFEB94] dark:bg-[#3A3D45] p-8 h-full">
      <h3 className="text-[#FF3B31] dark:text-[#FFEB94] font-medium uppercase text-lg mb-5">
        DROP US A LINE...
      </h3>
      <div className="mb-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          placeholder="You know the drill"
          className="w-full p-4 bg-[#F0EBE6] dark:bg-[#2A2D36] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FFEB94]/60 placeholder-opacity-50 focus:outline-none resize-none min-h-[100px]"
        />
      </div>
      <button className="w-full bg-[#F0EBE6] dark:bg-[#2A2D36] text-[#FF3B31] dark:text-[#FFEB94] rounded-full py-3 px-8 transition-all duration-300 hover:bg-[#FF3B31] dark:hover:bg-[#FFEB94]/20 hover:text-white dark:hover:text-[#FFEB94]">
        Send Message
      </button>
    </div>
  );
};

export default ContactForm;
