type BookIconProps = {
  fill: string,
  className?: string,
}

function BookIcon({ fill, className }: BookIconProps) {
return (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" className={className}>
    <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v506q51-33 107-49.5T700-300q36 0 78.5 7t81.5 29v-505q9.886 3.75 19.443 7.875Q889-757 898-752q10 6 16 15.677 6 9.678 6 20.323v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm60-167v-353l260-260v387L540-327Zm-120 63v-439q-34-19-79-28t-81-9q-47 0-87.5 10T100-704.467V-264q35-17 75.5-26.5t85-9.5q44.5 0 84.5 9.5t75 26.5Zm0 0v-439 439Z" fill={fill} />
  </svg>
);
}

export default BookIcon;
