type LogoutIconProps = {
  className?: string;
};

function LogoutIcon({ className }: LogoutIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      className={className}
      fill="currentColor"
    >
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621-612l43-43 176 176-174 174Z" />
    </svg>
  );
}

export default LogoutIcon;
