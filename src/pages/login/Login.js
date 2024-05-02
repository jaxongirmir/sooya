import { Button, Form, Input, message } from "antd";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../slices/loginSlice";
import Avatar from "./img/avatar.svg";
import bg from "./img/bg.svg";
import wave from "./img/wave.png";
import "./style.css";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    dispatch(loginUser(values)).then((res) => {
      if (res.payload) {
        message.success("Login Success");
        navigate("/createUser");
      } else {
        message.error("Login Failed");
      }
    });
  };
  const loading = useSelector((state) => state.login.loading);
  return (
    <>
      <img className="wave" src={wave} alt="..." />
      <div className="container">
        <div className="img-login">
          <img src={bg} alt="..." />
        </div>
        <div className="login-content">
          <Form form={form} className="FormLogin" onFinish={onFinish}>
            <img src={Avatar} alt="login LOGO" />
            <h2 className="title">Welcome</h2>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="inpLog"
                placeholder="Email"
                style={{
                  border: "none",
                  borderBottom: "2px solid #cfcfcf",
                  fontSize: "18px",
                  height: "36px",
                  width: "100%",
                  boxShadow: "none",
                }}
                prefix={<FaUser />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <AiFillEye /> : <AiFillEyeInvisible />
                }
                style={{
                  border: "none",
                  marginTop: "15px",
                  borderBottom: "2px solid #cfcfcf",
                  fontSize: "18px",
                  height: "36px",
                  width: "100%",
                  boxShadow: "none",
                }}
                prefix={<PiLockKeyFill />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btnIN"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
