import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../theme';

/**
 * RetroPlayer Component
 * 
 * Plays "What is Love" music when in retro mode
 * Only appears in retro mode and doesn't affect other themes
 */
const RetroPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isRetro } = useTheme();

  // Attempt to autoplay when retro mode is enabled
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
    
    // Pause when leaving retro mode
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
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