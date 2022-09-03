import React, { useState, useEffect } from 'react';
import Header from "components/Header";
import Feed from "./Profile.Form";
import UserDocument from 'interfaces/User.Interface';
import { GetProfile } from 'services/Setting.Service';
import Spinner from 'components/Spinner';

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserDocument>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });

  useEffect(() => {
    GetProfile()
      .then(res => {
        setUser(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);


  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <Feed data={user} />
        )
      }
    </>
  )
}

export default ProfilePage
