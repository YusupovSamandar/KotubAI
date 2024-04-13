import './auth.scss';

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="auth">
      <div className="auth-form-wrap">
        {children}
        <img
          src="/img/auth-form-bg.png"
          alt="background"
          className="auth-form-bg"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
