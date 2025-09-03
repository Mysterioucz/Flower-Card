interface props{
    messages: string;
}

const MessageContainer: React.FC<props> = ({ messages }) => {
    return (
        <div className="flex flex-col w-full h-full p-4 space-y-2 overflow-y-auto">
            {messages}
        </div>
    );
};

export default MessageContainer;
