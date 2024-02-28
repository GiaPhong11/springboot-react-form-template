import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Switch, Radio, Button, Select, Typography } from 'antd';
import "./FormComponent.css";
import { sendPost, sendPut } from '../api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { Group: RadioGroup } = Radio;

const { Option } = Select;

const FormComponent: React.FC = () => {
  // Trong component FormComponent
  const location = useLocation();
  const { user, isEdit } = location.state || {};

  useEffect(() => {
    if (isEdit) {
      console.log("Edit User");
      if (user) {
        form.setFieldsValue({
          userName: user.userName,
          password: user.password,
          textField: user.note,
        });
        // Tìm kiếm phần tử trong mảng options dựa trên giá trị của user.dropdownOption và set giá trị cho dropdown
        const dropdownValue = options.find(option => option.value === user.dropdownOption);
        form.setFieldsValue({
          dropdown: dropdownValue ? dropdownValue.value : null,
        });
      }

      setRememberMe(user.remember)
      setRadioValue(user.radioSelection)
      setSwitchValue(user.switchMode)
    } else {
      console.log("Add User");
    }
  }, [user])
  useEffect(() => {
  })
  const navigate = useNavigate();
  const inputText = [
    {
      title: 'Username',
      value: 'userName',
      type: 'text',
      placeHolder: 'Enter username',
      error: 'Please input your username!',
    },
    {
      title: 'Password',
      value: 'password',
      type: 'password',
      note: 'Your password is betwween 4 and 12 characters',
      placeHolder: 'Enter password',
      error: 'Please input your password!',

    },
    {
      title: 'Text Field',
      value: 'textField',
      type: 'text',
      placeHolder: 'Input Field',
      error: 'Please input text field!',
    },
  ];

  const [rememberMe, setRememberMe] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState("Radio Selection 1");

  const handleSwitchChange = (checked: boolean) => {
    setSwitchValue(checked);
  };

  const handleRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  const handleCancel = () => {
    navigate(`/`);
  };


  const finishForm = async (value: any) => {
    const submitData = {
      userName: value.userName,
      password: value.password,
      note: value.textField,
      remember: rememberMe,
      switchMode: switchValue,
      radioSelection: radioValue,
      dropdownOption: value.dropdown,
    };
    console.log(user);

    if (isEdit) {
      console.log(submitData);
      await sendPut(`updateEmployees/${user.id}`, submitData);
    } else {
      console.log(submitData);
      await sendPost(`addEmployees`, submitData);
    }
    navigate(`/`);
  };

  const options = [
    { label: 'Dropdown Option', value: 'Dropdown Option' },
    { label: 'Dropdown Option 1', value: 'Dropdown Option 1' },
    { label: 'Dropdown Option 2', value: 'Dropdown Option 2' },
  ];
  const [form] = Form.useForm();

  return (
    <div className="form-container">
      <Form form={form} onFinish={finishForm}>
        <div className='form-content'>
          {inputText.map((item) => (
            <div
              key={item.value}
              className='form-group'
            >
              <Typography.Text className='title'>{item.title}</Typography.Text>
              <div>
                <Form.Item
                  name={item.value}
                  rules={[
                    {
                      required: true,
                      message: item.error,
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (item.value === 'password') {
                          if (value.length < 4 || value.length > 12) {
                            callback('Password must be between 4 and 12 characters!');
                          } else {
                            callback();
                          }
                        } else {
                          callback();
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    type={item.type}
                    placeholder={item.placeHolder}
                  />
                </Form.Item>
                <div className='notice text-shadow'>
                  <span>{item.note}</span>
                </div>
              </div>
            </div>
          ))}
          <div className='content-down'>
            <div className='form-group'>
              <Form.Item name={"checkboxForm"}>
                <Checkbox
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item>
                <Switch
                  checked={switchValue}
                  onChange={handleSwitchChange}
                />
                <span className='switch-mode'>
                  {switchValue ? "On" : "Off"}</span>
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item>
                <RadioGroup
                  onChange={handleRadioChange}
                  value={radioValue}>
                  <div>
                    <Radio value="Radio Selection 1">Radio Selection 1</Radio>
                  </div>
                  <div>
                    <Radio value="Radio Selection 2">Radio Selection 2</Radio>
                  </div>
                  <div>
                    <Radio value="Radio Selection 3">Radio Selection 3</Radio>
                  </div>
                </RadioGroup>
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item>
                <label className="dropdown-title">Dropdown Title</label>
                <Form.Item name="dropdown">
                  <Select className='dropdown' placeholder="Dropdown Option">
                    {options.map(option => (
                      <Option key={option.value} value={option.value} className="custom-option">
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>
            </div>
            <div className='form-buttons'>
              <Form.Item>
                <Button onClick={handleCancel} className='cancelBtn'> Cancel </Button>
                <Button type="primary" htmlType={"submit"} className='nextBtn'> Next </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;