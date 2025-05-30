import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  

  const onLogout = () => {
    localStorage.clear()
    navigate("/users/signin");
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };

  const onClearSearch = ()=>{
    setSearchQuery("")
    handleClearSearch()
  }

  return (

    <div className="bg-white flex items-center justify-between px-6 py-4 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      {userInfo && (
        <>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
         setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </>
    )}
    </div>
  );
};

export default Navbar;
