import { useParams } from "react-router-dom";
import DiscussionDetail from "./DiscussionDetail";

const DiscussionDetailPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="flex justify-center">
      <DiscussionDetail
        writerUserName="username"
        creationDate={new Date()}
        title="How to do something"
        body="The best way of doing it is.."
      />
    </div>
  );
};

export default DiscussionDetailPage;
