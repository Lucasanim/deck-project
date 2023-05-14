import React, { useEffect, useState } from "react"
import { fetchDiscussions } from "../../services/DiscussionsService";
import Discussion from "../../models/Discussion";

const DiscussionList: React.FC = () => {
    const [discussions, setDiscussions] = useState<Discussion[]>([]);

    const getDiscussions = async () => {
        try {
            const discussions = await fetchDiscussions();
            setDiscussions(discussions.data);
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getDiscussions();
    }, [])

    return <div>
        {
            discussions.map(discussion => (
                <div>
                    {discussion.body}
                </div>
            ))
        }
    </div>
}

export default DiscussionList;
