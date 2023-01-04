import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  HeartOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Upload, message, Avatar } from "antd";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addProfileType,
  imageNormFile,
  storeDefault,
  profileDefaultValue,
} from "../Interfaces/InitialInterface";
import { updateProfile } from "firebase/auth";
const { Content } = Layout;

// display name
// pic url
// phone number
const MyProfile = () => {
  const [byDefaultValue, setByDefaultValue] = useState([
    {
      // displayName: "des",
      // email: "asd",
      // id: "asd",
      // phoneNumber: "asdasdfasd",
      // photoURL: "asdasd",
      // userId: "asdaf",
    },
  ]);
  console.log(
    "🚀 ~ file: MyProfile.tsx:32 ~ MyProfile ~ byDefaultValue",
    byDefaultValue
  );

  const store = useSelector((store) => store.currentUser);

  console.log(store, "store ");
  const q = query(collection(db, "users"), where("userId", "==", store.userID));
  useEffect(() => {
    debugger;

    // console.log(q, "check query result", userID);
    const realTimeFeeds = onSnapshot(q, (querysnapshot) => {
      debugger;
      console.log(querysnapshot);
      const temp = [];
      querysnapshot.docs.forEach((doc) => {
        debugger;
        temp.push({ ...doc.data(), id: doc.id });
        // setByDefaultValue({ ...doc.data(), id: doc.id });
      });
      setByDefaultValue(temp);
    });
    return () => {
      realTimeFeeds();
    };
  }, []);

  const [imageUrl, setimageUrl] = useState(null);

  const handleImageUpload = (image) => {
    debugger;
    const { name } = image;
    const imageRef = ref(storage, name);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          debugger;
          setimageUrl(url);
        })
        .catch((err) => {
          alert(err);
        });
    });
  };
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    debugger;
    console.log(values);
    // const queryCreated = query(
    //   collection(db, "users"),
    //   where("userId", "==", store.userID)
    // );
    let q = query(collection(db, "users"), where("userId", "==", store.userID));
    // const documnetRef = doc(
    //   db,
    //   "users",
    //   currentUser,
    //   "data",
    //   selectedDocId
    // );
    debugger;
    console.log(q);
    const findUsers = await getDoc(q);
    debugger;
    console.log(
      "🚀 ~ file: MyProfile.jsx:104 ~ onFinish ~ findUsers",
      findUsers
    );

    let custom = {
      displayName: "des",
      email: "asd",
      id: "asd",
      phoneNumber: "asdasdfasd",
      photoURL: "asdasd",
      userId: "asdaf",
    };
    await setDoc(q, custom);
    // doc(q, values);
    // doc(db, "users"),
    // onSnapshot(q, (doc) => {
    //   debugger;
    //   console.log(doc);
    // });
    // byDefaultValue
  };
  const onFinishFailed = (errorInfo) => {
    debugger;
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    debugger;
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Content className=''>
      <div className=' addProfileWrapper'>
        <div className='formWraper'>
          <Form
            form={form}
            className='widthFull'
            name='basic'
            initialValues={byDefaultValue[0]}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            // initialValues={{
            //   remember: true,
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item
              className=''
              label='Name'
              name='displayName'
              rules={[
                {
                  required: true,
                  message: "Please input your nickName!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your name'
                prefix={<UserOutlined />}
              />
            </Form.Item>{" "}
            <Form.Item
              className=''
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your nickName!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your Email'
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              label='Phone Number'
              name='phoneNumber'
              rules={[
                {
                  required: true,
                  message: "Please input your number!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your number'
                type='number'
                prefix={<HeartOutlined />}
              />
            </Form.Item>
            <Form.Item
              label='photoURL'
              name='photoURL'
              rules={[
                {
                  required: true,
                  message: "Please input your photoURL!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your photoURL'
                prefix={<HeartOutlined />}
              />
            </Form.Item>{" "}
            <Form.Item
              label='userId'
              name='userId'
              rules={[
                {
                  required: true,
                  message: "Please input your userId!",
                },
              ]}>
              <Input
                size='large'
                placeholder='Enter your userId'
                prefix={<HeartOutlined />}
              />
            </Form.Item>
            <Form.Item label='Profile Picture'>
              <Form.Item
                name='image'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                noStyle>
                <Upload.Dragger>
                  <Avatar
                    // name='files'
                    // action='/upload.do'
                    size={64}
                    icon={<UserOutlined />}
                  />
                </Upload.Dragger>
              </Form.Item>
              {/* <Form.Item
                name='image'
                getValueFromEvent={normFile}
                valuePropName='fileList'>
                <Upload
                  className='widthFull'
                  // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  listType='picture'
                  beforeUpload={(e) => {
                    console.log("IMAGE", e);
                    handleImageUpload(e);
                  }}
                  maxCount={1}>
                  <Button size='large' icon={<CloudUploadOutlined />}>
                    Upload Picture
                  </Button>
                </Upload>
              </Form.Item> */}
            </Form.Item>
            {/* <Form.Item
          name='upload'
          label='Upload'
          valuePropName='fileList'
          getValueFromEvent={normFile}
          extra='long'>
          <Upload name='logo' action='/upload.do' listType='picture'>
            <Button
            //   icon={<UploadOutlined />}
            >
              Click to upload
            </Button>
          </Upload>
        </Form.Item> */}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button className='submitForm' type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default MyProfile;
