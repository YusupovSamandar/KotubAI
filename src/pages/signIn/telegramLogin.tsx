import { useEffect } from 'react';

const TelegramLogin = () => {
  useEffect(() => {
    // Function to handle the authentication response from Telegram
    window.onTelegramAuth = (user) => {
      alert(
        'Logged in as ' +
          user.first_name +
          ' ' +
          user.last_name +
          ' (' +
          user.id +
          (user.username ? ', @' + user.username : '') +
          ')'
      );
    };

    // Create the script element for Telegram login
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'Kotibaibot');
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    // Append the script to the body
    document.body.querySelector('#telegram-button').appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="telegram-button"></div>;
};

export default TelegramLogin;
