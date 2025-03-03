import React, { useState, useRef, useCallback, memo } from "react";

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Message sent: " + message);
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [message]);

  return (
    <div className="bg-[#FFEB94] dark:bg-[#3A3D45] p-8 h-full">
      <h3 className="text-[#FF3B31] dark:text-[#FFEB94] font-medium uppercase text-lg mb-5" id="contact-form-heading">
        DROP US A LINE...
      </h3>
      <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
        <div className="mb-4">
          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            placeholder="You know the drill"
            className="w-full p-4 bg-[#F0EBE6] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FFEB94]/60 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] resize-none min-h-[100px]"
            aria-required="true"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#F0EBE6] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FFEB94] rounded-full py-3 px-8 transition-all duration-300 hover:bg-[#FF3B31] dark:hover:bg-[#FFEB94]/20 hover:text-white dark:hover:text-[#FFEB94] focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FFEB94]"
          aria-label="Send message"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default memo(ContactForm);
