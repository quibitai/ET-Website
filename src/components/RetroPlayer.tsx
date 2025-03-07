import { useState, useRef, useEffect } from 'react';
import { useRetro } from '../contexts/RetroContext';

const RetroPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isRetro } = useRetro();

  useEffect(() => {
    if (isRetro && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        });
    }
  }, [isRetro]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="retro-player bg-black border-2 border-yellow-300 p-2 flex items-center gap-2 shadow-glow">
      <audio ref={audioRef} src="/music/whatislove.mp3" loop />
      <button 
        onClick={togglePlay}
        className="text-yellow-300 hover:text-yellow-200 transition-colors"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '⏸' : '▶️'}
      </button>
      <span className="text-yellow-300 text-sm">What is Love</span>
    </div>
  );
};

export default RetroPlayer; 