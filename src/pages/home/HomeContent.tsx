import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { handleFeeds } from "../../redux/UserSlice";
import MainContent from "../../components/MainContent";
import { emptyArray, feedsType } from "../../Interfaces/InitialInterface";
const { Content } = Layout;
const HomeContent = () => {
  const [timeline, setTimeline] = useState([]);
  const dispatch = useDispatch();

  // emptyArray[]
  useEffect(() => {
    const realTimeFeeds = onSnapshot(
      collection(db, "usersData"),
      (querysnapshot) => {
        const temp: any = [];
        querysnapshot.docs.forEach((doc) => {
          debugger;
          console.log("querysnapshot", doc);
          temp.push({ ...doc.data(), id: doc.id });
        });
        setTimeline(temp);
        dispatch(handleFeeds(temp));
      }
    );
    return () => {
      realTimeFeeds();
    };
  }, []);
  return (
    <>
      <Content className='content-wrapper'>
        {timeline.map((feed: feedsType) => (
          <MainContent feeds={feed} />
        ))}
      </Content>
    </>
  );
};

export default HomeContent;
