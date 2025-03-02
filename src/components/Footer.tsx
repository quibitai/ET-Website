import React from 'react';
import { useRetro } from '../contexts/RetroContext';

const Footer: React.FC = () => {
  const { isRetro } = useRetro();

  if (!isRetro) {
    return null;
  }

  return (
    <footer className="mt-8 border-t border-yellow-300 pt-4">
      <div className="flex flex-col items-center gap-4">
        {/* Web Ring */}
        <div className="flex items-center gap-2">
          <a href="#prev" className="text-yellow-300 hover:text-yellow-200">[Previous]</a>
          <img 
            src="data:image/gif;base64,R0lGODlhEAAQAKIAAP///8z//8zMzJmZmWZmZgAAAAAAAAAAACH5BAEAAAEALAAAAAAQABAAAAMpGLrc/jBKOIIZ4DQQFmAKYCgRBGlhnqgJmGopjBoPeGZD3TkLZM8yKQA7" 
            alt="Web Ring"
            className="w-6 h-6"
          />
          <a href="#next" className="text-yellow-300 hover:text-yellow-200">[Next]</a>
        </div>

        {/* Best Viewed With */}
        <div className="flex items-center gap-2">
          <img 
            src="data:image/gif;base64,R0lGODlhEAAQAKIAAP///8z//8zMzJmZmWZmZgAAAAAAAAAAACH5BAEAAAEALAAAAAAQABAAAAMvGLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPSAEAOw==" 
            alt="Netscape Now!"
            className="w-20 h-20"
          />
          <img 
            src="data:image/gif;base64,R0lGODlhEAAQAKIAAP///8z//8zMzJmZmWZmZgAAAAAAAAAAACH5BAEAAAEALAAAAAAQABAAAAMvGLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPSAEAOw==" 
            alt="Internet Explorer"
            className="w-20 h-20"
          />
        </div>

        {/* Copyright and Email */}
        <div className="text-center text-yellow-300 text-sm">
          <div>© 2024 Echo Tango - All Rights Reserved</div>
          <div className="animate-pulse">
            <a href="mailto:webmaster@echotango.com" className="hover:text-yellow-200">
              📧 Email the Webmaster 📧
            </a>
          </div>
        </div>

        {/* GeoCities Badge */}
        <div className="flex items-center gap-2">
          <img 
            src="data:image/gif;base64,R0lGODlhEAAQAKIAAP///8z//8zMzJmZmWZmZgAAAAAAAAAAACH5BAEAAAEALAAAAAAQABAAAAMvGLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPSAEAOw==" 
            alt="GeoCities"
            className="w-24 h-24"
          />
          <div className="text-yellow-300 text-xs">
            This site is hosted by<br />
            GeoCities/SiliconValley/4096
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 