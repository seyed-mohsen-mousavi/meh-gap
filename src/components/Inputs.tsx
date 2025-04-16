"use client";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/fa.json";
import {
  FaceSmileIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  StopIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function Inputs() {
  const [message, setMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunks.current = [];

      mediaRecorder.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setMediaBlobUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const clearBlobUrl = () => {
    setMediaBlobUrl(null);
    setRecordingTime(0);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
    setEmojiPickerVisible(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("پیام:", message);
      setMessage("");
    } else if (mediaBlobUrl) {
      console.log("ارسال صدای ضبط‌شده:", mediaBlobUrl);
      clearBlobUrl();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      setRecordingTime(0);
      timer = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      {emojiPickerVisible && (
        <motion.div
          className="absolute bottom-16 left-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Picker
            locale="fa"
            theme="light"
            data={data}
            i18n={i18n}
            onEmojiSelect={handleEmojiSelect}
          />
        </motion.div>
      )}

      <div className="mx-2 flex items-center overflow-hidden rounded-full">
        <button
          type={message.length > 0 || mediaBlobUrl ? "submit" : "button"}
          onClick={(e) => {
            if (message.length > 0 || mediaBlobUrl) {
              handleSubmit(e);
            } else if (isRecording) {
              stopRecording();
            } else {
              startRecording();
            }
          }}
          className="cursor-pointer bg-black/30 p-3 transition-colors ease-linear hover:bg-black/40"
        >
          {message.length > 0 || mediaBlobUrl ? (
            <PaperAirplaneIcon className="size-7 stroke-1" />
          ) : isRecording ? (
            <StopIcon className="size-7 stroke-1 text-red-500" />
          ) : (
            <MicrophoneIcon className="size-7 stroke-1" />
          )}
        </button>

        {mediaBlobUrl && (
          <button
            type="button"
            onClick={clearBlobUrl}
            className="cursor-pointer bg-black/30 p-3 text-red-400 transition-colors ease-linear hover:bg-black/40"
          >
            <TrashIcon className="size-7" />
          </button>
        )}
      </div>

      <div className="relative flex flex-1 items-center rounded-full bg-black/30 px-2 py-1">
        {isRecording || mediaBlobUrl ? (
          <div className="flex items-center gap-1 text-xs text-white">
            <span className="size-3 animate-pulse rounded-full bg-red-400"></span>
            {formatTime(recordingTime)}
          </div>
        ) : (
          <label className="group cursor-pointer rounded-full p-2 hover:bg-black/20">
            <PaperClipIcon className="size-6 stroke-1 text-white transition-all ease-in-out group-hover:text-white/90" />
            <input
              type="file"
              accept="*"
              onChange={(e) => console.log(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        )}

        <input
          disabled={isRecording || !!mediaBlobUrl}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="my-4 h-full w-full border-none px-3 text-lg text-white outline-none placeholder:text-gray-400 disabled:opacity-80"
          placeholder="پیام"
          autoComplete="off"
        />

        <motion.button
          type="button"
          onClick={toggleEmojiPicker}
          disabled={isRecording || !!mediaBlobUrl}
          className="group cursor-pointer rounded-full p-1 hover:bg-black/20 disabled:cursor-default disabled:opacity-80 disabled:hover:bg-transparent"
        >
          <FaceSmileIcon className="size-7 stroke-1 text-white transition-all ease-in-out group-hover:text-white/90" />
        </motion.button>
      </div>
    </form>
  );
}

export default Inputs;
