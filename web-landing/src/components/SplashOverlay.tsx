import { useCallback, useEffect, useRef, useState } from 'react';

const SPLASH_BG = '#0f0f0f';
const EXIT_MS = 400;
const LOGO_HOLD_MS = 2000;
const VIDEO_MAX_MS = 15000;

type Props = { onDone: () => void };

/**
 * Mirrors mobile splash: teal screen → centered logo (~2s) → crossfade to contained video → fade out to site.
 */
export function SplashOverlay({ onDone }: Props) {
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [shellOpacity, setShellOpacity] = useState(1);
  const [playVideo, setPlayVideo] = useState(false);
  const exiting = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    setShellOpacity(0);
    window.setTimeout(onDone, EXIT_MS);
  }, [onDone]);

  useEffect(() => {
    const startVideo = window.setTimeout(() => {
      setPlayVideo(true);
      setLogoOpacity(0);
      setVideoOpacity(1);
    }, LOGO_HOLD_MS);
    return () => window.clearTimeout(startVideo);
  }, []);

  useEffect(() => {
    if (!playVideo) return;
    const el = videoRef.current;
    if (el) {
      el.play().catch(() => {
        window.setTimeout(finish, 2500);
      });
    }
    const cap = window.setTimeout(finish, VIDEO_MAX_MS);
    return () => window.clearTimeout(cap);
  }, [playVideo, finish]);

  const onVideoEnded = () => finish();

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-[400ms] ease-out"
      style={{ backgroundColor: SPLASH_BG, opacity: shellOpacity }}
      aria-busy="true"
      aria-label="SEVA loading">
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-out"
        style={{ opacity: logoOpacity }}>
        <img
          src="/seva_logo_new.png"
          alt="SEVA"
          className="mx-auto w-[min(42vw,200px)] max-w-[200px] min-w-[120px] object-contain drop-shadow-lg"
          width={200}
          height={200}
        />
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-300 ease-out"
        style={{ opacity: videoOpacity, backgroundColor: SPLASH_BG }}>
        <div className="relative w-full max-w-[min(100vw,420px)] overflow-hidden rounded-sm" style={{ aspectRatio: '1080/1920' }}>
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            style={{ backgroundColor: SPLASH_BG }}
            muted
            playsInline
            preload="auto"
            onEnded={onVideoEnded}
            onError={() => finish()}>
            <source src="/seva_splash.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Safety: don’t trap users if video is huge */}
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 text-xs font-semibold text-[#A7B9BA] underline decoration-white/30 underline-offset-4 transition-colors hover:text-[#EAF3F3]">
        Skip intro
      </button>
    </div>
  );
}
