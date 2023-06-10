type LoginIconProps = {
  className?: string;
};

function LoginIcon({ className }: LoginIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      className={className}
      fill="currentColor"
    >
      <path d="M489-120v-60h291v-600H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366-612l43-43 176 176-174 174Z" />
    </svg>
  );
}

export default LoginIcon;
