"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import { Athiti } from "next/font/google";
import "../style.css";
import { spotifyData, SpotifyData } from "@/data/spotify";
import { useRouter } from "next/navigation";
import { MessageArray } from "@/data/message";

const athiti = Athiti({ subsets: ["latin"], weight: "500" });

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

function SpotifyContainer(spotify: SpotifyData) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const inIframe = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (
                document.activeElement &&
                document.activeElement === iframeRef.current
            ) {
                if (!inIframe.current) {
                    // Detected iframe focus (user clicked iframe)
                    console.log(`Punpun click on ${spotify.title} `);
                    sendMessage(`Punpun click on ${spotify.title} `);
                    inIframe.current = true;
                }
            } else {
                inIframe.current = false;
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);
    return (
        <div
            className={`flex flex-col w-full max-w-2xl p-4 bg-secondary rounded-xl shadow-lg transition-opacity duration-400`}
        >
            <h2 className="text-lg font-semibold mb-2">{spotify.title}</h2>
            <iframe
                ref={iframeRef}
                src={spotify.src}
                width="100%"
                height="152"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded"
                tabIndex={0}
            ></iframe>
        </div>
    );
}

function SpotifyList() {
    return (
        <div
            className={`flex flex-col items-center gap-4 w-full max-w-2xl h-full p-4 space-y-2 overflow-y-auto transition-opacity duration-400`}
        >
            <h2 className="text-lg font-semibold mb-2">เอาเพลงมาฝากจ๊ะ</h2>
            {spotifyData.map((spotify, index) => (
                <SpotifyContainer key={index} {...spotify} />
            ))}
        </div>
    );
}

function SpotifyPageContent() {
    const router = useRouter();

    // Add missing states for swipe logic
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

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
            if (translateX > 0) {
                sendMessage(`Punpun goes to message page `);
                router.push(`/message?index=${MessageArray.length - 1}`);
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
            <SpotifyList />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <SpotifyPageContent />
        </Suspense>
    );
}
