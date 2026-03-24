"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/components/LanguageProvider";
import type { LocalAudioTrack } from "@/types/blog";

type Position = {
  x: number;
  y: number;
};

type TracksPayload = {
  tracks?: LocalAudioTrack[];
  source?: "local" | "demo";
};

const POS_KEY = "bobo_music_widget_pos";
const OPEN_KEY = "bobo_music_widget_open";

function pickRandomTracks(tracks: LocalAudioTrack[], count: number) {
  const shuffled = [...tracks];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function clampPosition(pos: Position) {
  if (typeof window === "undefined") {
    return pos;
  }

  const width = 320;
  const height = 380;

  return {
    x: Math.min(Math.max(12, pos.x), window.innerWidth - width - 12),
    y: Math.min(Math.max(12, pos.y), window.innerHeight - height - 12),
  };
}

export function MusicWidget() {
  const [open, setOpen] = useState(true);
  const [tracks, setTracks] = useState<LocalAudioTrack[]>([]);
  const [trackSource, setTrackSource] = useState<"local" | "demo">("local");
  const [recommendedTracks, setRecommendedTracks] = useState<LocalAudioTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 24, y: 24 });
  const [loading, setLoading] = useState(true);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ active: false, offsetX: 0, offsetY: 0 });

  const { isChinese, toggleLanguage } = useLanguage();
  const t = useTranslations("musicWidget");

  const currentTrack = useMemo(() => recommendedTracks[currentIndex], [recommendedTracks, currentIndex]);

  const refreshRecommendations = useCallback(() => {
    if (!tracks.length) {
      setRecommendedTracks([]);
      setCurrentIndex(0);
      return;
    }

    setRecommendedTracks(pickRandomTracks(tracks, 5));
    setCurrentIndex(0);
  }, [tracks]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialX = window.innerWidth - 340;
    const initialY = window.innerHeight - 420;

    const savedOpen = window.localStorage.getItem(OPEN_KEY);
    if (savedOpen !== null) {
      setOpen(savedOpen === "1");
    }

    const savedPos = window.localStorage.getItem(POS_KEY);
    if (savedPos) {
      try {
        const parsed = JSON.parse(savedPos) as Position;
        setPosition(clampPosition(parsed));
      } catch {
        setPosition(clampPosition({ x: initialX, y: initialY }));
      }
    } else {
      setPosition(clampPosition({ x: initialX, y: initialY }));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadTracks() {
      try {
        const response = await fetch("/api/music/tracks", { cache: "no-store" });
        const payload = (await response.json()) as TracksPayload;
        if (!mounted) {
          return;
        }

        setTracks(payload.tracks ?? []);
        setTrackSource(payload.source === "demo" ? "demo" : "local");
      } catch {
        if (!mounted) {
          return;
        }

        setTracks([]);
        setTrackSource("demo");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTracks();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(OPEN_KEY, open ? "1" : "0");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    refreshRecommendations();
  }, [open, refreshRecommendations, tracks]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragState.current.active) {
        return;
      }

      const next = clampPosition({
        x: event.clientX - dragState.current.offsetX,
        y: event.clientY - dragState.current.offsetY,
      });
      setPosition(next);
    };

    const onUp = () => {
      if (!dragState.current.active) {
        return;
      }

      dragState.current.active = false;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(POS_KEY, JSON.stringify(position));
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [position]);

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!panelRef.current) {
      return;
    }

    const rect = panelRef.current.getBoundingClientRect();
    dragState.current.active = true;
    dragState.current.offsetX = event.clientX - rect.left;
    dragState.current.offsetY = event.clientY - rect.top;
  }

  function nextTrack() {
    if (!recommendedTracks.length) {
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % recommendedTracks.length);
  }

  function prevTrack() {
    if (!recommendedTracks.length) {
      return;
    }

    setCurrentIndex((prev) => (prev - 1 + recommendedTracks.length) % recommendedTracks.length);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`pixel-panel fixed bottom-4 right-4 z-40 rounded-pixel px-3 py-2 hover:-translate-y-[2px] ${
          isChinese ? "font-cn text-sm tracking-[0.04em]" : "font-pixel text-[10px] uppercase tracking-[0.12em]"
        }`}
      >
        {t("open")}
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className={`pixel-panel fixed z-40 w-[320px] max-w-[calc(100vw-24px)] rounded-pixel ${isChinese ? "font-cn" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div
        onPointerDown={startDrag}
        className="flex cursor-move items-center justify-between border-b-2 border-line bg-paper px-3 py-2"
      >
        <p className={isChinese ? "text-sm tracking-[0.04em] text-ink" : "font-pixel text-[10px] uppercase tracking-[0.12em] text-ink"}>
          {t("title")}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`pixel-tag px-2 py-1 ${isChinese ? "text-xs" : "text-[9px]"}`}
          >
            {t("language")}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`pixel-tag px-2 py-1 ${isChinese ? "text-xs" : "text-[9px]"}`}
          >
            {t("close")}
          </button>
        </div>
      </div>

      <div className="space-y-3 p-3">
        {loading ? <p className="text-sm text-mute">{t("loading")}</p> : null}

        {!loading && currentTrack ? (
          <>
            <div className="rounded-pixel border-2 border-line bg-paper p-2">
              <p className={isChinese ? "text-sm tracking-[0.04em] text-ink" : "font-pixel text-[10px] uppercase tracking-[0.12em] text-ink"}>
                {t("nowPlaying")}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-ink">{currentTrack.title}</p>
              <p className="mt-1 line-clamp-1 text-xs text-mute">{currentTrack.filename}</p>
              <p className="mt-1 text-xs text-mute">
                {trackSource === "local" ? t("sourceLocal") : t("sourceDemo")}
              </p>
            </div>

            <audio key={currentTrack.id} src={currentTrack.url} controls autoPlay className="w-full" />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevTrack}
                className={`pixel-tag px-3 py-1 ${isChinese ? "text-xs" : "text-[9px]"}`}
              >
                {t("prev")}
              </button>
              <button
                type="button"
                onClick={nextTrack}
                className={`pixel-tag px-3 py-1 ${isChinese ? "text-xs" : "text-[9px]"}`}
              >
                {t("next")}
              </button>
              <button
                type="button"
                onClick={refreshRecommendations}
                className={`pixel-tag px-3 py-1 ${isChinese ? "text-xs" : "text-[9px]"}`}
              >
                {t("shuffle")}
              </button>
            </div>

            <p className={isChinese ? "text-xs tracking-[0.05em] text-mute" : "font-pixel text-[9px] uppercase tracking-[0.12em] text-mute"}>
              {t("recommended")} ({recommendedTracks.length})
            </p>

            <div className="max-h-28 space-y-1 overflow-auto pr-1">
              {recommendedTracks.map((track, index) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`block w-full truncate rounded-pixel border-2 px-2 py-1 text-left text-xs ${
                    index === currentIndex ? "border-line bg-paper text-ink" : "border-line/50 bg-milk text-mute"
                  }`}
                >
                  {track.title}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {!loading && !currentTrack ? (
          <div className="space-y-1 text-sm text-mute">
            <p>{t("emptyTitle")}</p>
            <p>{t("emptyHint")}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
