import VideoPlayer from './videoPlayer';
import './styles.scss';
const subtitles = [
  {
    Id: '640c8d0f11bb48269e9c473c95d8fb9d',
    RecognitionStatus: 'Success',
    DisplayText: 'I am very happy today.',
    Offset: 15100000,
    Duration: 20100000,
    Channel: 0,
  },
  {
    Id: '7430ee61d5d0480590115bb3f43b7829',
    RecognitionStatus: 'Success',
    DisplayText: 'Are you in a good mood?',
    Offset: 53500000,
    Duration: 18000000,
    Channel: 0,
  },
  {
    Id: '7a0c75097d554e4cb75093838b296df9',
    RecognitionStatus: 'Success',
    DisplayText: "I'm usually in a pretty good mood. How are you?",
    Offset: 89600000,
    Duration: 36800000,
    Channel: 0,
  },
];
export default function VideoPlayerWorskpace() {
  return (
    <div className="video-player">
      <VideoPlayer
        videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        subtitles={subtitles}
      />
    </div>
  );
}
