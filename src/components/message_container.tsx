interface props {
    header: string;
    messages: string;
    fadeState?: "in" | "out";
}

const MessageContainer: React.FC<props> = ({
    header,
    messages,
    fadeState = "in",
}) => {
    return (
        <div
            className={`flex flex-col items-center gap-8 w-full max-w-2xl h-full p-4 space-y-2 overflow-y-auto transition-opacity duration-400 ${
                fadeState === "in" ? "opacity-100" : "opacity-0"
            }`}
        >
            <h2 className="text-3xl font-semibold">{header}</h2>
            <div className="message-content text-lg">{messages}</div>
        </div>
    );
};

export default MessageContainer;
