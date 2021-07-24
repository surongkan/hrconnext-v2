import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Avatar, Card, Checkbox, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
const { Option } = Select;

import { savedSuccess} from '../../../../app/components/Alerts';
import {roleList, org1List, org2List, typeList,  statusList} from '../../../../constants/select_items';
import {head_employees} from '../../../../constants/dummy_data';


 const GeneralDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [employee, setEmployee] = useState(props.employee);
  const [cardHouseNumber, setCardHouseNumber] = useState(props.employee.address_card.house_number);
  const [cardAddress, setCardAddress] = useState(props.employee.address_card);
  const [isSameAddress, setIsSameAddress] = useState(props.employee.is_address_same)
  


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

  const toggleAddressCheckbox = () => {
    if (isSameAddress == true) {
      setIsSameAddress(false)
      setCardAddress(employee.address_card);
    } else {
      setIsSameAddress(true)
      setCardAddress(employee.address_current);

    }
  }

    return (
      <>
        <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
        </Button>
        <Drawer
          title="ข้อมูลทั่วไป"
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
            name="generalForm"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Row >
              <Col span={24}>
                <div style={{textAlign:"center",padding:20}}><Avatar size={100} src={'/images/avatar/'+employee.avatar}></Avatar></div>
              </Col>
            </Row>
            <Space>
              <Form.Item name="e_name" label="ชื่อ"
                rules={[{ type:'string', required: true}]}
              >
                <Input defaultValue={employee.name}/>
              </Form.Item>
              <Form.Item name="e_lastname" label="นามสกุล"
                rules={[{ type:'string', required: true}]}
              >
                <Input defaultValue={employee.lastname}/>
              </Form.Item>
            </Space>
            <Space> 
              <Form.Item name="e_birthdate" label="วันเดือนปี เกิด"
                // rules={[{ type:'string', required: false}]}
              >
                <DatePicker style={{width:120}} defaultValue={moment(employee.birth_date,'YYYY-MM-DD')} 
                format="LL" style={{width:180}}/>
              </Form.Item>
              <Form.Item name="e_gender" label="เพศ"
                // rules={[{ type:'string', required: false}]}
              >
                <Select style={{width:150}} defaultValue={employee.gender}>
                  <Option value="ชาย" >ชาย</Option>
                  <Option value="หญิง">หญิง</Option>
                </Select>       
              </Form.Item>
            </Space>

            <Space>
              <Card style={{width:"100%"}}>
                <Form.Item label="ที่อยู่ที่ติดต่อได้"
                  rules={[{ type:'string', required: true}]}
                >
                  <Input defaultValue={employee.address_current.house_number} ></Input>
                </Form.Item>

                <Space>
                  <Form.Item label="จังหวัด"
                    rules={[{ type:'string', required: true}]}
                  >
                    <Input  defaultValue={employee.address_current.province}/>
                  </Form.Item >
                  <Form.Item  label="อำเภอ/เขต"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input defaultValue={employee.address_current.district}/>
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item label="ตำบล/แขวง"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input defaultValue={employee.address_current.sub_district}/>
                  </Form.Item>
                  <Form.Item  label="เบอร์โทรศัพท์"
                    rules={[{ type:'string', required: true}]}
                  >
                    <Input defaultValue={employee.address_current.tel}/>
                  </Form.Item>
                </Space>
                {/* <Space> */}
                  <Form.Item label="ฝ่าย"
                    rules={[{ type:'string', required: true}]}
                  >
                    <Select options={org1List} defaultValue={employee.org1}/>
                  </Form.Item>
                  <Form.Item  label="แผนก"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Select options={org2List} defaultValue={employee.org2}/>
                  </Form.Item>
                {/* </Space> */}
              </Card>
              <Card>
                <Space align="start">
                  <Form.Item label="ที่อยู่ตามบัตรประชาชน"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input id="address_card_number" name="address_card_number" value={cardAddress.house_number}/>
                  </Form.Item>
                  <Form.Item label=""
                    rules={[{ type:'string', required: false}]}
                  >
                    <Checkbox  onChange={toggleAddressCheckbox} checked={isSameAddress}
                    defaultValue={isSameAddress}>
                      <Tooltip title="ใช้ที่อยู่เดียวกันกับที่อยู่ที่ติดต่อได้">
                        <span>Same ?</span>
                      </Tooltip>
                    </Checkbox>
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item label="จังหวัด"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input name="address_card_province" value={cardAddress.province}/>
                  </Form.Item>
                  <Form.Item  label="อำเภอ/เขต"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input name="address_card_district" value={cardAddress.district}/>
                  </Form.Item>
                </Space>
                <Space>
                  <Form.Item label="ตำบล/แขวง"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input name="address_card_sub_district" value={cardAddress.sub_district}/>
                  </Form.Item>
                  <Form.Item  label="เบอร์โทรศัพท์"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Input name="card_tel" value={cardAddress.tel} />
                  </Form.Item>
                </Space>
                {/* <Space> */}
                  <Form.Item label="ตำแหน่ง"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Select options={roleList} defaultValue={employee.role}/>
                  </Form.Item>
                  <Form.Item  label="หัวหน้างาน"
                    rules={[{ type:'string', required: false}]}
                  >
                    <Select options={head_employees} defaultValue={employee.head}/>
                  </Form.Item>
                {/* </Space> */}
              </Card>
              
            </Space>
          </Form>
        </Drawer>
      </>
    );
  
}


export default GeneralDrawer;

