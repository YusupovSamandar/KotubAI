import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setNotify } from 'src/app/slices/notifySlice';
import { useAppDispatch } from 'src/app/store';
const Message = ({ notification, hidden }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (hidden.id) {
      dispatch(setNotify({ id: hidden.id }));
    }
  }, []);
  return (
    <Link to={'/' + hidden.id}>
      <div id="notificationHeader">
        {/* image is optional */}
        {notification.image && (
          <div id="imageContainer">
            <img src={notification.image} width={100} />
          </div>
        )}
        <span>{notification.title}</span>
      </div>
      <div id="notificationBody">{notification.body}</div>
    </Link>
  );
};

export default Message;
