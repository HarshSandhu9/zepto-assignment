import React, { useEffect, useRef, useState } from 'react';
import { Users } from './User';
import './SearchBar.css';
import CrossIcon from './Images/cross.png'

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState(Users);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef();
  const listRef = useRef();
  const selectedUserRef = useRef();

  const handleOutsideClick = (event) => {
    // console.log(listRef.current !== event.target)
    console.log(listRef.current)
    // if ((searchRef.current && !searchRef.current.contains(event.target)) &&
    // (listRef.current && !listRef.current.contains(event.target))) {
    //   console.log('hi')
    //   setIsSearchFocused(false);
    // }
  }

  useEffect(() => {
    document.addEventListener("cilck", handleOutsideClick);

    return () => {
      document.addEventListener("click", handleOutsideClick);
    }
  }, [handleOutsideClick])

  const handleUserSelect = (user) => {
    const updatedSourceArray = users.filter(item => item.id !== user.id);
    setUsers(updatedSourceArray);
    setSelectedUser([...selectedUser, user]);
  };

  const handleUserDelete = (user) => {
    const temp = [...users, user].sort((a, b) => a.id - b.id);
    setUsers(temp);
    setSelectedUser(
      selectedUser.filter(a =>
        a.id !== user.id
      )
    );
  };


  return (
    <div className='body'>
      <div className="heading">
        <h1>Pick User</h1>
      </div>
      <div className='searchBar'>
        <div className='displayUsers' >
          {selectedUser.map((user) => (
            <div key={user.id} className='selectedUsers' ref={selectedUserRef}>
              <img src={user.img} alt="Profile pic" height={'25px'} />
              <div>{user.name}</div>
              <div className="crossIcon">
                <img
                  src={CrossIcon}
                  alt="cross"
                  height={'15px'}
                  onClick={(e) => handleUserDelete(user)}
                  
                />
              </div>
            </div>

          ))}
          <div style={{ 'position': 'relativ' }}>
            <input
              ref={searchRef}
              type="text"
              placeholder="Add new user..."
              className='search'
              onChange={(e) => setQuery(e.target.value)}
              onClick={() => setIsSearchFocused(true)}
            />
            {isSearchFocused && <ul className='list' >
              {(users.filter(user => user.name.toLowerCase().includes(query))).map((user) => (
                <div key={user.id} className="user" onClick={(e) => handleUserSelect(user)}
                ref={listRef}>
                  <li className="listItems">
                    <img src={user.img} alt="Profile pic" height={'50px'} />
                  </li>
                  <li className="listItems">
                    {user.name}
                  </li>
                  <li className="listItems">
                    {user.email}
                  </li>
                </div>
              ))}
            </ul>}
          </div>
        </div>
        <hr className='line' />
      </div>
    </div>
  );
};

export default SearchBar;