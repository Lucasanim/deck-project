import React, { useEffect, useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../services/user/UserService";
import User from "../../models/user/User";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const { id } = useParams();

  const requestUserData = async () => {
    try {
      if (!id) throw Error("ID not present");
      const user = await getUserDetails(id);
      setUser(user.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestUserData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[60%]">{user && <ProfileComponent user={user} />}</div>
    </div>
  );
};

export default ProfilePage;
