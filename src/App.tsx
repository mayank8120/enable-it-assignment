import React, { useState, useEffect } from 'react';

import './App.scss';



type User = {
  ID: string;
  JobTitle: string;
  EmailAddress: string;
  FirstNameLastName: string;
  Email: string;
  Phone: string;
  Company: string;
};

const API_ENDPOINT = 'https://give-me-users-forever.vercel.app/api/users/';



function App() {




  const [users, setUsers] = useState<User[]>([]);
  const [nextUserId, setNextUserId] = useState(0);
  const [showList, setshowList] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch(`https://give-me-users-forever.vercel.app/api/users/${nextUserId}/next`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result);

        if (data.users === "No users Left") {
          console.log(data);
          setshowList(false);
        } else {
          setshowList(true);
          setUsers(data.users);
        }


      })
      .catch(error => console.log('error', error));



  };

  const handlePrevClick = () => {
    if (nextUserId >= 10) {
      setNextUserId(nextUserId - 10);
      fetchUsers();
    }
  };

  const handleNextClick = () => {
    setNextUserId(nextUserId + 10);
    fetchUsers();
  };




  return (
    <div className="app">
      <h1>User List</h1>
      <div className="user-list">
        <>
          {

            showList === true && users.length > 0 ?
              users.map(user => (
                <div key={user.ID} className="user-card">
                  <h2>{user.FirstNameLastName}</h2>
                  <p>
                    <strong>Job Title: </strong>
                    {user.JobTitle}
                  </p>
                  <p>
                    <strong>Email Address: </strong>
                    {user.EmailAddress}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {user.Email}
                  </p>
                  <p>
                    <strong>Phone: </strong>
                    {user.Phone}
                  </p>
                  <p>
                    <strong>Company: </strong>
                    {user.Company}
                  </p>
                </div>
              ))
              :
              <h1>No Users Left</h1>
          }
        </>
      </div>
      <div className="button-group">
        <button onClick={handlePrevClick} disabled={nextUserId === 0}>
          Previous
        </button>
        <span>Page {nextUserId / 10 + 1}</span>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

export default App;
