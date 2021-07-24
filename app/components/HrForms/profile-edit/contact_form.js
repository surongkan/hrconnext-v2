import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Select, Space, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const { Option } = Select;
import { savedSuccess} from '../../../../app/components/Alerts';
import {relationOptions} from '../../../../constants/select_items';


 const ContactDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [employee, setEmployee] = useState(props.employee);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const onFinish = () => {
    savedSuccess()
    setVisible(false)
  };

  const handleNationChange = (event) => {

  }

  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer
        title="บุคคลที่ติดต่อได้"
        onClose={onClose}
        visible={visible}
        maskClosable={false}
        keyboard={false}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              ยกเลิก
            </Button>
            <Button onClick={onFinish} type="primary">
              บันทึก
            </Button>
          </div>
        }
      >
      <Form
        layout="vertical" size="small"
        name="contactForm"
        size="large"
        onFinish={onFinish}
        scrollToFirstError
      >
      <Card title="ลำดับที่ 1"> 
        <Space>
          <Form.Item  label="ชื่อ-นามสกุล" 
            rules={[{ type:'string', required: true}]}
          >
            <Input defaultValue={employee.contact.contact1.name}/>
          </Form.Item>
          <Form.Item  label="ความสัมพันธ์" 
            rules={[{ type:'string', required: true}]}
          >
            <Select defaultValue={employee.contact.contact1.relation} options={relationOptions} />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item  label="เบอร์โทรศัพท์ 1" 
            rules={[{ type:'string', required: true}]}
          >
            <Input defaultValue={employee.contact.contact1.tel1}/>
          </Form.Item>
          <Form.Item  label="เบอร์โทรศัพท์ 2" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={employee.contact.contact1.tel2}/>
          </Form.Item>
        </Space>
      </Card>
      <Card title="ลำดับที่ 2"> 
        <Space>
          <Form.Item  label="ชื่อ-นามสกุล" 
            rules={[{ type:'string', required: true}]}
          >
            <Input defaultValue={employee.contact.contact2.name}/>
          </Form.Item>
          <Form.Item  label="ความสัมพันธ์" 
            rules={[{ type:'string', required: true}]}
          >
            <Select defaultValue={employee.contact.contact2.relation} options={relationOptions}/>
          </Form.Item>
        </Space>
        <Space>
          <Form.Item  label="เบอร์โทรศัพท์ 1" 
            rules={[{ type:'string', required: true}]}
          >
            <Input defaultValue={employee.contact.contact2.tel1}/>
          </Form.Item>
          <Form.Item  label="เบอร์โทรศัพท์ 2" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={employee.contact.contact2.tel2}/>
          </Form.Item>
        </Space>
      </Card>
      </Form>
    </Drawer>
  </>
);
  
}

export default ContactDrawer;



