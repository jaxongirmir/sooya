import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../slices/userSlice";
import MAIN_URL from "../../url/Urls";
import "./User.css";

const inputs = [
  {
    label: "Name",
    name: "name",
    rules: [
      {
        required: true,
        message: "Please input your name!",
        pattern: /^[a-zA-Z\s]*$/,
      },
    ],
  },
  {
    label: "Surname",
    name: "surname",
    rules: [
      {
        required: true,
        message: "Please input your surname!",
        pattern: /^[a-zA-Z\s]*$/,
      },
    ],
  },
  {
    label: "Email",
    name: "email",
    rules: [
      {
        required: true,
        message: "Please input your email!",
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      },
    ],
  },
  {
    label: "Password",
    name: "password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
        pattern: /^[a-zA-Z0-9\s]*$/,
      },
    ],
  },
];

function User() {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log({ token });
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(MAIN_URL + "/users", { headers })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onFinish = (values) => {
    let body = {
      ...values,
    };
    console.log(body);
    dispatch(updateUser({ id, userData: body }));
    handleCancel();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (_, item) => {
        // return item?.teacher || 'topilmadi'
        return item?.teacher ? (
          <p style={{ color: "aqua" }}>Techaer</p>
        ) : (
          <p style={{ color: "red" }}>Student</p>
        );
      },
    },
    {
      title: "Controll",
      dataIndex: "id",
      key: "teacher",
      render: (_, item) => {
        return (
          <div className="userControll">
            {/* delete confirm */}
            <Popconfirm
              title="Ushbu userni o'chirmoqchimisiz?"
              onConfirm={() => handleDelete(item.id)}
            >
              <DeleteOutlined style={{ color: "crimson" }} />
            </Popconfirm>

            {/* edit confirm */}
            <EditOutlined
              onClick={() => {
                setOpen(item.id);
                setId(item.id);
                form.setFieldValue("name", item.name);
                form.setFieldValue("surname", item.surname);
                form.setFieldValue("email", item.email);
                // form.setFieldValue("surname", item.surname);
              }}
              style={{ color: "green" }}
            />
            <Form
              form={form}
              onFinish={(v) => onFinish(v)}
              layout="vertical"
              autoComplete="off"
              style={{ position: "absolute" }}
            >
              <Modal
                title="Update student"
                open={open === item.id}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okButtonProps={{ htmlType: "submit" }}
                okText="Update"
              >
                {inputs.map((input) => (
                  <Form.Item
                    label={input.label}
                    name={input.name}
                    rules={input.rules}
                  >
                    <Input autoComplete="off" />
                  </Form.Item>
                ))}
              </Modal>
            </Form>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        size="smoll"
        bordered={true}
        dataSource={users}
        rowKey="id"
        columns={columns}
      />
    </div>
  );
}

export default User;
