import { useGetVideosQuery } from "../../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

import Video from "./Video";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content = null;
  if (isLoading) {
    content = <VideoLoader />;
  }
  if (isError) {
    content = <Error />;
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <p>No videos found!</p>;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }
  return <>{content}</>;
}
