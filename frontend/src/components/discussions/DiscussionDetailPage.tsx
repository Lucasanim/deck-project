import { useParams } from "react-router-dom";
import DiscussionDetail from "./DiscussionDetail";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { fetchDiscussionById } from "../../services/discussions/DiscussionsService";
import DiscussionDetailModel from "../../models/discussions/DiscussionDetail";

const DiscussionDetailPage: React.FC = () => {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState<DiscussionDetailModel>();

  const getDiscussion = async () => {
    try {
      const response = await fetchDiscussionById(id as string);
      setDiscussion(response.data);
    } catch (e) {

    }
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  return (
    <div className="flex justify-center">
      {!discussion ? (
        <CircularProgress />
      ) : (
        <DiscussionDetail
          discussionDetail={discussion}
        />
      )}
    </div>
  );
};

export default DiscussionDetailPage;
