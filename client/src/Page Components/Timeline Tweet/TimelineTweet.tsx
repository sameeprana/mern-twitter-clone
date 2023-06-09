import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import TweetContainer from "../../Components/TweetContainer/TweetContainer";
import { HTTPMethods } from "../../Utils/HTTPMethods";
const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const { profileIdOfUsers } = useSelector((state: any) => state.user);
  let followingList = currentUser.following;
  const [userProfile, setUserProfile] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchTweet = async () => {
      await HTTPMethods.get(`/tweets/timeline/${currentUser._id}`)
        .then((res) => {
          setTimeLine(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      HTTPMethods.get(`/users/find/${profileIdOfUsers}`)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTweet();
  }, [currentUser._id, location]);
  return (
    <div>
      {timeLine != undefined &&
        timeLine.map((tweet: { _id: number }, index) => {
          return (
            <div key={index}>
              <TweetContainer
                // @ts-ignore
                profileImage={userProfile?.profilePicture}
                idNumber={tweet._id}
                tweet={tweet}
                editTweet={setTimeLine}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
