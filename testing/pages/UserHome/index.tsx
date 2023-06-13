import React from 'react';
import SideBar from '../../components/SideBar';
import Feed from '../../components/Feed';

const UserHome = () => {
  return (
    <div>
      <SideBar />
      <div className="flex gap-6">
        <Feed />
      </div>
    </div>
  );
};

export default UserHome;
