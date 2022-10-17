import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";

export default function Description({ video }) {
  const navigate = useNavigate();
  const { id, title, date, description } = video;
  const [deleteVideo, { isLoading, isError, isSuccess }] =
    useDeleteVideoMutation();

  const handleDelete = () => {
    deleteVideo(id);
    if (isSuccess) {
      navigate("/");
    }
  };
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b gap-4">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
        </h2>

        <div className="flex gap-6 w-full justify-end">
          <Link to={`/videos/edit/${id}`}>
            <div className="flex gap-1">
              <div className="shrink-0">
                <img className="w-5 block" src={editImage} alt="Edit" />
              </div>

              <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                Edit
              </span>
            </div>
          </Link>
          <div className="flex gap-1" onClick={handleDelete}>
            <div className="shrink-0">
              <img className="w-5 block" src={deleteImage} alt="Delete" />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
              Delete
            </div>
          </div>
        </div>
      </div>
      {isError && <Error message="There was an error deleting this video!" />}
      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
    </div>
  );
}
