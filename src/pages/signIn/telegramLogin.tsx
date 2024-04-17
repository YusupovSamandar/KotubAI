import { useEffect } from 'react';
import { useLoginTelegramMutation } from 'src/app/services/auth';

const TelegramLogin = () => {
  const [loginTelegram, { isLoading }] = useLoginTelegramMutation();

  useEffect(() => {
    // Function to handle the authentication response from Telegram
    window.onTelegramAuth = async (user) => {
      await loginTelegram({
        telegram_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      }).unwrap();
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
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div id="telegram-button"></div>;
};

export default TelegramLogin;
