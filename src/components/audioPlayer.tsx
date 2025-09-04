"use client";
import React, { useRef, useEffect } from "react";

interface Props {
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioPlayer = ({ audioRef }: Props) => {
    return <audio ref={audioRef} src="/song/understand.mp3" loop></audio>;
};

export default AudioPlayer;
