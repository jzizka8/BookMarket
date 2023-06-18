type TickIconProps = {
    className?: string;
};

function TickIcon({ className }: TickIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
            className={className}
            fill="currentColor"
        >
            <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
        </svg>
    );
}

export default TickIcon;