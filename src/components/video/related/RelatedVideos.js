import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const {
    data: videos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ id, title });

  let content;
  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }
  if (isError) {
    content = <Error message="There was an error" />;
  }
  if (!isLoading && !isError && videos.length === 1) {
    content = <Error message="No related videos here!"></Error>;
  }
  if (!isLoading && !isError && videos.length > 1) {
    const relatedVideosToShow = videos.filter((video) => video?.id !== id);
    content = relatedVideosToShow.map((video) => (
      <RelatedVideo key={video?.id} video={video} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
