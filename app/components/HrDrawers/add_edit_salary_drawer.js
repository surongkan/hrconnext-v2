import moment from 'moment';
import React, {useState} from 'react';
import { Button, Col, Form, Input, Row, Select, Menu, Dropdown} from 'antd';
import {Space,  TimePicker, InputNumber, Upload, Divider, Drawer } from 'antd';
import {EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
import { useRouter } from 'next/router'
import {confirmDelete, savedSuccess} from '../../../app/components/Alerts';
import {no_salary_list} from '../../../constants/dummy_data';


const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



const SalaryDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  // const [employee, setEmployee] = useState({
  //   id: '',
  //   email : '',
  //   start_date : '',
  //   role : ''
  // })
  const [employee, setEmployee] = useState(props.record);

  const [form] = Form.useForm();
  const router = useRouter()

  const showDrawer = () => {

    setVisible(true);
  };

  const onFinish = values => {
    savedSuccess()
    setVisible(false)
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleEmployeeSelected = (id) => {
    let selectedEmployee = {}
    console.log("SEARCH...")
    no_salary_list.forEach(emp => {
      if (id===emp.id) {
        console.log("Founs :" + id)
        // selectedEmployee = emp
        document.getElementById('eid').value = id
        document.getElementById('eemail').value = emp.enail
        document.getElementById('erole').value = emp.role
        document.getElementById('estart').value = emp.start_date

        console.log("EMP :" +  emp.id)
        // setEmployee(emp)
      }
    });
    

  }


  return (
    <>
      {props.type==="1" ?
        <Button type="primary" onClick={showDrawer} block>
          + เพิ่มข้อมูลเงินเดือน
        </Button>: 
        <Dropdown.Button  icon={<MoreOutlined/>} type="text"
        overlay={<Menu mode="vertical" visible={false}>
                  <Menu.Item key="1" icon={<EditOutlined />} onClick={showDrawer}>แก้ไขข้อมูล</Menu.Item>
                  <Menu.Item key="2" icon={<DeleteOutlined />} onClick={confirmDelete}>ลบข้อมูล</Menu.Item>
                </Menu>} >
        </Dropdown.Button>
      }
      <Drawer
        title="เพิ่ม/แก้ไข ข้อมูลเงินเดือนพนักงาน"
        placement="right" bodyStyle={{width:500}}
        closable={true} keyboard={false} maskClosable={false}
        onClose={onClose}
        visible={visible}
        footer={
          <div style={{ textAlign: 'right' }}>
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
        {...formItemLayout}
        layout="vertical" name="salaryDetail" size="large"
        form={form} onFinish={onFinish}
        scrollToFirstError
				style={{paddingTop:20}}
        initialValues={{
          name : employee.name,
          id : employee.id,
          email : employee.email,
          start_date : moment(employee.start_date).format('LL'),
          role : employee.role,
          salary : employee.salary,

        }}
      >
        {  props.type === "1" ?
          <Form.Item label="กรุณาเลือก พนักงานที่ยังไม่มีข้อมูลเงินเดือน" name="employeeSelect"
            rules={[{ required: true, message: 'กรุณาเลือก พนักงานที่ยังไม่มีข้อมูลเงินเดือน'}]}
          >
            <Select options={no_salary_list} placeholder="เลือกพนักงาน" onChange={handleEmployeeSelected} ></Select>
          </Form.Item> : <div></div>
        }
        {  props.type === "2" ?
          <Form.Item label="ชื่อ" name="name" >
            <Input  disabled/>
          </Form.Item> : <div></div>
        } 
        <Space direction="vertical">

					<Space direction="horizontal">
						<Form.Item label="รหัสพนักงาน" name="id" >
          		<Input id="eid"  disabled/>
        		</Form.Item>
						<Form.Item label="Email" name="email" >
          		<Input id="eemail" value={employee.email} disabled/>
        		</Form.Item>
					</Space>
					<Space direction="horizontal">
						<Form.Item label="วันที่เริ่มงาน" name="start_date" >
          		<Input id="estart" value={employee.start_date} disabled/>
        		</Form.Item>
						<Form.Item label="ตำแหน่ง" name="role">
          		<Input id="erole" value={employee.role} disabled/>
        		</Form.Item>
					</Space>
					<Form.Item label="เงินเดือน (บาท)" name="salary" 
						rules={[{ type:'number',required: true, message: 'กรุณาระบุเงินเดือนพนักงาน'}]}
					>
						<Input type="number" min="0" placeholder="ระบุเงินเดือนพนักงาน (บาท)" />
					</Form.Item>
				</Space>
      </Form>
      </Drawer>

    </>
  );
};

export default SalaryDrawer;
