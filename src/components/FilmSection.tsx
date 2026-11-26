"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

const FILM = {
  src: "/videos/mkbot-demo.mp4",
  poster: "/videos/mkbot-demo-poster.jpg",
  label: "MKbot.ai 시연 영상. 휴대폰과 사무실 PC에서 봇이 브라우저 업무를 단계별로 처리하는 모습을 보여 준다.",
} as const;

export default function FilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        // Playback can be refused (e.g. data saver); the poster stays visible.
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section aria-label="MKbot.ai 시연 영상" className="container-x pb-24 md:pb-36">
      <div className="film-backdrop relative overflow-hidden rounded-3xl px-4 py-10 sm:px-10 sm:py-14 lg:px-24 lg:py-20">
        <div className="overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_-30px_rgb(40_20_120/0.55)]">
          <video
            ref={videoRef}
            className="block h-auto w-full"
            src={FILM.src}
            poster={FILM.poster}
            aria-label={FILM.label}
            width={1152}
            height={664}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-white">
          <p className="text-sm sm:text-base">MKbot.ai가 일하는 모습 · 실제 앱 화면 구성을 옮긴 시연 · 샘플 데이터</p>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/25 px-4 text-sm backdrop-blur transition-colors hover:bg-white/35"
          >
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
            {playing ? "일시정지" : "재생"}
          </button>
        </div>
      </div>
    </section>
  );
}
