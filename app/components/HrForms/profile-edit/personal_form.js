import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space,  Card,  Radio } from 'antd';
import {  EditOutlined } from '@ant-design/icons';
const { Option } = Select;

import { savedSuccess} from '../../../../app/components/Alerts';
import {nationOptions, maritalOptions, religionOptions} from '../../../../constants/select_items';

// import {head_employees} from '../../../../constants/dummy_data';



 const PersonalDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [employee, setEmployee] = useState(props.employee);
  const [nation, setNation] = useState(props.employee.nation)

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
    if (event.target.value=='ไทย') {
      setNation('ไทย')
    } else if (event.target.value=='ต่างชาติ') {
      setNation('ต่างชาติ')
    }
  }

  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer 
        title="ข้อมูลส่วนตัว"
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
        layout="vertical" size="large"
        name="personalForm"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item name="e_gender" label="เลือกประเภท" 
          rules={[{ type:'string', required: true}]}
        >
          <Radio.Group onChange={handleNationChange} value={employee.nation} 
          defaultValue={employee.nation} options={nationOptions}
          optionType="button" buttonStyle="solid">
          </Radio.Group>
        </Form.Item>
       {nation==='ไทย' ? 
          <Space>
            <Form.Item label="เลขบัตรประชาชน"
              rules={[{ type:'string', required: true}]}
            >
              <Input defaultValue={employee.thai_id_card}/>
            </Form.Item> 
            <Form.Item label="วันที่บัตรประชาชนหมดอายุ"
                rules={[{ type:'date', required: true}]}
              >
              <DatePicker  defaultValue={moment(employee.card_expire_date,'YYYY-MM-DD')} format="LL"
               style={{width:180}}/>
            </Form.Item> 
          </Space> : 
          <Space direction="vertical">
            <Space>
              <Form.Item label="เลขที่พาสปอร์ต"
                rules={[{ type:'string', required: false}]}
              >
                <Input defaultValue={employee.passport_id}/>
              </Form.Item> 
              <Form.Item label="วันที่พาสปอร์ตหมดอายุ"
                rules={[{ type:'date', required: false}]}
              >
                <DatePicker defaultValue={moment(employee.passport_expire_date,'YYYY-MM-DD')} format="LL"
                 style={{width:180}}/>
              </Form.Item> 
            </Space>
            <Space>
              <Form.Item label="เลขใบอนุญาตทำงาน"
                rules={[{ type:'string', required: false}]}
              >
                <Input defaultValue={employee.work_permit_id}/>
              </Form.Item> 
              <Form.Item label="วันที่ออกใบอนุญาต"
                rules={[{ type:'date', required: false}]}
              >
                <DatePicker defaultValue={moment(employee.work_permit_date,'YYYY-MM-DD')} format="LL" 
                 style={{width:180}}/>
              </Form.Item> 
              <Form.Item label="วันที่ใบอนุญาตหมดอายุ"
                rules={[{ type:'date', required: false}]}
              >
                <DatePicker defaultValue={moment(employee.work_permit_expire_date,'YYYY-MM-DD')} format="LL" 
                 style={{width:180}} />
              </Form.Item> 
            </Space>
       </Space> }
       <Space direction="vertical">
            <Space>
              <Form.Item label="เบอร์โทรศัพท์"
                rules={[{ type:'string', required: true}]}
              >
                <Input defaultValue={employee.tel}/>
              </Form.Item> 
              <Form.Item label="ศาสนา"
                rules={[{ type:'string', required: false}]}
              >
                <Select options={religionOptions} defaultValue={employee.religion} style={{width:120}}/>
              </Form.Item> 
            </Space>
            <Space>
              <Form.Item label="สถานภาพการสมรส"
                rules={[{ type:'string', required: true}]}
              >
                <Select options={maritalOptions}  defaultValue={employee.marital} style={{width:120}}/>
              </Form.Item> 
              <Form.Item label="การจ้างงานคู่สมรส"
                rules={[{ type:'string', required: false}]}
              >
                <Input defaultValue={employee.spouse_occupation}/>
              </Form.Item> 
              <Form.Item label="จำนวนบุตร-ธิดา"
                rules={[{ type:'string', required: false}]}
              >
                <Input defaultValue={employee.children}/>
              </Form.Item> 
            </Space>
          </Space>
      </Form>
    </Drawer>
  </>
);
  
}


export default PersonalDrawer;



