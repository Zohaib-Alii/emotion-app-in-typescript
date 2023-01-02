import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { currentLike, emptyArray, feeds } from "../Interfaces/InitialInterface";

// bydefault set image here
export const defaultImg =
  "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png";

//  likes showing in tooltip when user hover the like icon
export const handleLikerName = (feeds: emptyArray) => {
  // debugger;
  let array: {}[] = [];
  feeds?.likes?.map(
    (
      like: any
      // like: {
      //   likedOn: {};
      //   likerName: string;
      //   likerId: string;
      //   status: string;
      // }[]
      // like: (currentLike | null)[])| any
      // , index: number, array: {}
    ) => array.push(like?.likerName)
    // console.log(index, array)
  );
  debugger;
  return array.map((like: any, ind: number) => <div key={ind}>{like}</div>);
};

//  likes handler method
export const handleLike = async (
  postId: string,
  currentUserId: string,
  currentUserName: string
) => {
  debugger;
  const docRef = doc(db, "usersData", postId);
  const currentDoc: any = await getDoc(docRef);
  debugger;
  const prevLikes = await currentDoc.data().likes;
  if (prevLikes.length > 0) {
    const alreadyLike = prevLikes.find(
      (item: any) => item.likerId === currentUserId
    );
    debugger;
    // remove likes
    if (alreadyLike) {
      const disLike = prevLikes.filter(
        (item: any) => item.likerId !== currentUserId
      );
      await updateDoc(docRef, {
        likes: [...disLike],
      });
    } else {
      // already likes and add new likes
      await updateDoc(docRef, {
        likes: [
          ...prevLikes,
          {
            likerName: currentUserName,
            likerId: currentUserId,
            likedOn: new Date(),
            status: "liked",
          },
        ],
      });
    }
  } else {
    // add first like
    await updateDoc(docRef, {
      likes: [
        {
          likerName: currentUserName,
          likerId: currentUserId,
          likedOn: new Date(),
          status: "liked",
        },
      ],
    });
  }
};
