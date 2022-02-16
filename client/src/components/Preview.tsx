import React from "react";
import axios from "axios";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";

const trailer: string =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

function Preview({ id, type }: { id?: number; type?: string }) {
  const [video] = useVideo({ type, id });
  return (
    <div className="wrapper absolute top-0 left-0 w-full overflow-hidden rounded-t-md pb-[56.25%]">
      <iframe
        src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${video?.key}&start=15`}
        title={video?.name}
        className="pointer-events-none absolute top-0  left-0 h-full w-full scale-150 border-none"
      />
    </div>
  );
}

export default Preview;

export function useVideo({ type, id }: { type?: string; id?: number }) {
  if (type === "tv") type = "series";
  const [video, setVideo] = React.useState<Video | null>(null);
  React.useEffect(() => {
    const getVideo = async () => {
      const res = await axios.get(`/movies/${id}/video`, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
        },
        params: {
          type,
        },
      });
      setVideo(res.data);
      console.log({ videodata: res });
    };
    getVideo();
  }, [id, type]);
  return [video];
}
