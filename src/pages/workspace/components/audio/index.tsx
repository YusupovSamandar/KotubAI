import { Button, Slider } from 'antd';
import { Pause, Play } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';

function WorkspaceAudioPlayer({ audioUrl }: { audioUrl: string }) {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (play) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [play]);

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration * value) / 100;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="workspace-audio_player">
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />
      <Button
        onClick={() => setPlay(!play)}
        icon={
          play ? (
            <Pause size="17" color="#fff" />
          ) : (
            <Play size="17" color="#fff" />
          )
        }
      ></Button>
      <Slider
        value={(currentTime / (audioRef.current?.duration || 1)) * 100}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default WorkspaceAudioPlayer;
