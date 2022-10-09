export type SpotifyImage = {
  height: number | null;
  url: string;
  width: number | null;
};

export type User = {
  country?: string;
  display_name: string | null;
  email?: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    [key: string]: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: SpotifyImage[];

  // TODO - other types?
  product?: "premium";
  type: "user";
  uri: string;
};
