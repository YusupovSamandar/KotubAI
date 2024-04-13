import { useLocation } from 'react-router-dom';
import { useTypedSelector } from 'src/app/store';

export default function useHelper() {
  const { colors } = useTypedSelector((state) => state.layout);
  // This will call the updateColor function every 1000 milliseconds (1 second)
  var intervalId = setInterval(updateColor, 100);

  function updateColor() {

  }

  //   const location = useLocation();

  //   usewEffect(() => {
  //     setInterval(updateColor, 100);
  //   }, []);

  // When you want to stop the interval, call clearInterval with the interval ID
  // For example, to stop it after 10 seconds you could use:

  setTimeout(function () {
    clearInterval(intervalId);
  }, 5000);

  return {};
}
function usewEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error('Function not implemented.');
}
