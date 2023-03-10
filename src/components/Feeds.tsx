import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import MainContent from "./MainContent";
import { onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { collection, where } from "firebase/firestore";
import { handleFeeds } from "../redux/UserSlice";
import {
  emptyArray,
  State,
  storeDefault,
} from "../Interfaces/InitialInterface";
const { Content } = Layout;

const Feeds = () => {
  const { userID } = useSelector((store: storeDefault) => store.currentUser);
  const dispatch = useDispatch();
  console.log(userID, "userID");
  const [feedsData, setFeedsData] = useState([]);
  console.log(feedsData, "*****");
  useEffect(() => {
    // debugger;
    const q = query(collection(db, "usersData"), where("id", "==", userID));
    // console.log(q, "check query result", userID);
    const realTimeFeeds = onSnapshot(q, (querysnapshot) => {
      const temp: any = [];
      querysnapshot.docs.forEach((doc) => {
        debugger;
        temp.push({ ...doc.data(), id: doc.id });
      });
      setFeedsData(temp);
      dispatch(handleFeeds(temp));
    });
    return () => {
      realTimeFeeds();
    };
  }, []);

  return (
    <Content className='content-wrapper'>
      {feedsData.map((feed: any) => (
        <MainContent feeds={feed} />
      ))}
    </Content>
  );
};

export default Feeds;
