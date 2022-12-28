import { Button, Form, Input, Layout } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import "../login/style.css";
import { errorInfo, formSubmitValues } from "../../Interfaces/InitialInterface";
const Signup = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const onFinish = (values: formSubmitValues) => {
    const { email, password, Name }: formSubmitValues = values;
    console.log(
      "🚀 ~ file: Signup.tsx:12 ~ onFinish ~ email, password, Name ",
      email,
      password,
      Name
    );

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: Name,
        });
        navigate("/login");
        console.log(user, "user created successfully");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    debugger;
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Layout style={{ height: "100vh" }} className='login-wrapper'>
        <Content className='login-container'>
          <div className='from-wrapper'>
            <Form
              name='basic'
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'>
              <Form.Item
                label={<label className='inputLabels'>Name</label>}
                name='Name'
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}>
                <Input className='loginInputs' />
              </Form.Item>
              <Form.Item
                label={<label className='inputLabels'>Email</label>}
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}>
                <Input className='loginInputs' />
              </Form.Item>
              <Form.Item
                label={<label className='inputLabels'>Password</label>}
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <Input.Password className='loginInputs' />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 19,
                }}>
                <span className='loginbtn-createAcc'>
                  <span className='alreadySignup'>
                    Already a member?
                    <Link to='/login'>
                      <span> Login</span>
                    </Link>
                  </span>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </span>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Signup;