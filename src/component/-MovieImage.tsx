import { cn } from "@/lib/utils";

type MovieImageType = {
  imgLink: string | null;
  alt: string | null;
  className?: string | null;
};

export default function MovieImage({
  imgLink,
  alt,
  className,
}: MovieImageType) {
  return (
    <img
      className={cn("", className)}
      src={`https://image.tmdb.org/t/p/w500/${imgLink}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`}
      alt={`${alt}`}
    />
  );
}
