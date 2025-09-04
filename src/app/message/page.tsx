"use client";
import MessageContainer from "@/components/message_container";
import { footerMessage, MessageArray } from "@/data/message";
import { useState, useEffect, useRef } from "react";
import { Athiti } from "next/font/google";
import "./style.css";
import AudioPlayer from "@/components/audioPlayer";
import { send } from "process";

const athiti = Athiti({ subsets: ["latin"], weight: "500" });

export default function Page() {
    const [msgIndex, setMsgIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [fadeState, setFadeState] = useState<"in" | "out">("in");
    const [showFooter, setShowFooter] = useState<boolean>(false);
    const currentMessage = MessageArray[displayIndex];

    // Add missing states for swipe logic
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Notify backend on button click
    const sendMessage = async (message: string) => {
        const readableTimestamp = new Date().toLocaleString();
        await fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            message: message,
            timestamp: readableTimestamp,
            }),
        });
    };

    // Handle touch/mouse start
    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
    };

    // Handle touch/mouse move
    const handleMove = (clientX: number) => {
        if (!isDragging) return;

        const deltaX = clientX - startX;
        setTranslateX(deltaX);
    };

    // Handle touch/mouse end
    const handleEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        const threshold = 100; // Minimum swipe distance

        if (Math.abs(translateX) > threshold) {
            let nextIndex = msgIndex;
            if (translateX > 0 && msgIndex > 0) {
                nextIndex = msgIndex - 1;
            } else if (translateX < 0 && msgIndex < MessageArray.length - 1) {
                nextIndex = msgIndex + 1;
            }

            if (nextIndex !== msgIndex) {
                sendMessage(`Punpun goes to page ${nextIndex + 1}`);
                setFadeState("out");
                setShowFooter(false);
                setTimeout(() => {
                    setMsgIndex(nextIndex);
                    setDisplayIndex(nextIndex);
                    setFadeState("in");

                    // Show footer for last message
                    if (nextIndex == MessageArray.length - 1) {
                        setTimeout(() => setShowFooter(true), 800); // match duration-800
                    }
                }, 400); // match transition duration
            }
        }
        setTranslateX(0);
    };

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleStart(e.clientX);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    // Touch events
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
        handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
        handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    // Add global mouse event listeners
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                e.preventDefault();
                handleMove(e.clientX);
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDragging) {
                handleEnd();
            }
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleGlobalMouseMove);
            document.addEventListener("mouseup", handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [isDragging, startX, translateX]);
    return (
        <div
            className={`flex min-h-screen min-w-screen flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-background text-text ${athiti.className}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <MessageContainer
                messages={currentMessage.content}
                header={currentMessage.title}
                fadeState={fadeState}
            />
            <div
                className={`text-center text-accent text-sm mt-4 whitespace-pre-line transition-opacity duration-1000 ${
                    showFooter ? "opacity-100" : "opacity-0"
                }`}
            >
                {displayIndex === MessageArray.length - 1 && (
                    <p>{footerMessage}</p>
                )}
            </div>
            <button
                className="bg-accent text-primary py-2 px-4 rounded "
                onClick={() => {
                    if (audioRef.current?.paused) {
                        sendMessage("Punpun Play Music!");
                        audioRef.current.play().catch(() => {});
                    } else {
                        audioRef.current?.pause();
                        sendMessage("PunpunPause Music!");
                    }
                }}
            >
                Play/Pause Music!
            </button>
            <AudioPlayer audioRef={audioRef} />
        </div>
    );
}
