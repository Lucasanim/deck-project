import React, { useState } from "react";
import SearchInput from "../SearchInput";
import { searchUsersByUsername } from "../../services/user/UserService";
import User from "../../models/user/User";
import UsersList from "./UsersList";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../router/NavigationRoutes";

const SearchUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const handleInputChange = async (input: string) => {
    try {
      if (input) {
        const users = await searchUsersByUsername(input);
        setUsers(users.data);
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUserClick = (user: User) => {
    navigate(NavigationRoutes.APP + NavigationRoutes.PROFILE + "/" + user.id);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[60%]">
        <div className="flex justify-between mb-4">
          <SearchInput handleInputChange={handleInputChange} />
        </div>
        <UsersList users={users} onClick={handleUserClick} />
      </div>
    </div>
  );
};

export default SearchUsersPage;
