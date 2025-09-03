"use client";
import MessageContainer from "@/components/message_container";
import { MessageArray } from "@/data/message";
import { useState } from "react";

export default function Page() {
    const [msgIndex, setMsgIndex] = useState(0);

    return (
        <div className="flex flex-col w-full h-full">
            <MessageContainer messages={MessageArray[msgIndex]} />
        </div>
    );
}
