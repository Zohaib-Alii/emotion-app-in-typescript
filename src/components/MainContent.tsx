import React, { useEffect, useState } from "react";
import { EllipsisOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";
import "./style.css";
import { useSelector } from "react-redux";
import { defaultImg, handleLike, handleLikerName } from "../utils/Reusable";
import {
  alreadyLikeChecked,
  emptyArray,
  feeds,
  storeDefault,
} from "../Interfaces/InitialInterface";
const { Meta } = Card;
const MainContent = ({ feeds }: feeds) => {
  debugger;
  console.log("🚀 ~ file: MainContent.tsx:10 ~ MainContent ~ feeds", feeds);

  const [alreadyLike, setAlreadyLike] = useState(false);
  const { image } = feeds;
  const { userID: currentUserId, userName: currentUserName } = useSelector(
    (store: storeDefault) => store.currentUser
  );
  // to check user already like or not
  useEffect(() => {
    debugger;
    if (feeds.likes) {
      const checkk: any = feeds?.likes.find(
        (item: any) => item.likerId === currentUserId
      );
      setAlreadyLike(checkk);
      console.log("🚀 ~ file: MainContent.tsx:33 ~ useEffect ~ checkk", checkk);
    }
  }, [feeds]);

  return (
    <div className='mainContent content-wrapper'>
      <Card
        style={{
          width: 600,
        }}
        cover={
          image && <img className='coverImg' alt='Feed_Image' src={image} />
        }
        actions={[
          <span>
            {alreadyLike ? (
              <LikeFilled
                className='likedIcon'
                key='filled'
                onClick={() =>
                  handleLike(feeds.id, currentUserId, currentUserName)
                }
              />
            ) : (
              <LikeOutlined
                key='like'
                onClick={() =>
                  handleLike(feeds.id, currentUserId, currentUserName)
                }
              />
            )}
          </span>,
          <span>
            {feeds?.likes?.length > 0 ? (
              <Tooltip placement='topLeft' title={() => handleLikerName(feeds)}>
                <span>{feeds?.likes?.length}- likes</span>
              </Tooltip>
            ) : (
              <span>First like </span>
            )}
          </span>,
        ]}>
        <Meta
          avatar={<Avatar src={image ? image : defaultImg} />}
          title={feeds?.nickName}
          description={feeds?.Bio}
        />
        {feeds?.likes.find((item: any) => item === currentUserId) && (
          <EllipsisOutlined key='ellipsis' />
        )}
      </Card>
    </div>
  );
};

export default MainContent;
