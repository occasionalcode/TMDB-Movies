export interface HLSResponse {
  headers: Headers;
  provider: string;
  servers: any[];
  url: URL[];
  tracks: SubtitleTrack[];
}

export interface Headers {
  Referer: string;
}

export interface SubtitleTrack {
  lang: string;
  url: string;
}

export interface URL {
  lang: string;
  link: string;
  type: string;
}
