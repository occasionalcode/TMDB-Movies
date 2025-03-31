// Base styles for media player and provider (~400B).

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { SubtitleTrack } from "@/types/m3u8-types";

type VideoPlayerProps = {
  url: string;
  subtitleTracks: SubtitleTrack[] | null;
};

export default function VideoPlayer({ url, subtitleTracks }: VideoPlayerProps) {
  return (
    <MediaPlayer
      src={url}
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      crossOrigin
      playsInline
      title="Sprite Fight"
      poster="https://files.vidstack.io/sprite-fight/poster.webp"
    >
      <MediaProvider>
        {subtitleTracks?.map((sub) => (
          <Track
            default={sub.lang.startsWith("English")}
            id={sub.url}
            kind="subtitles"
            src={sub.url}
            label={sub.lang}
            key={sub.url}
          />
        ))}
      </MediaProvider>
      <DefaultVideoLayout
        // thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}
