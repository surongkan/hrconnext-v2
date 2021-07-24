import moment from 'moment';
import React, {useState} from 'react';
import {AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, Row, Select, Tooltip,Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, TimePicker, InputNumber, Upload, Divider } from 'antd';
import {QuestionCircleOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
import { useRouter } from 'next/router'


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
const projectSelect = (
  <Select prefix="Type" defaultValue="0" style={{width:150}}>
    <Option value="0" >เลือกประเภทการลา</Option>
    <Option value="1" >ลากิจ</Option>
    <Option value="2">ลาป่วย</Option>
    <Option value="3">ลาพักร้อน</Option>
  </Select>
);
const projectList = [
  {
    label: '61A กระทรวงการท่องเที่ยวและกีฬา',
    value: '1',
    hours_total : 100,
    hours_left : 55,
    deadline : '2021-10-30'
  },
  {
    label: '62B ระบบ POS',
    value: '2',
    hours_total : 40,
    hours_left : 25,
    deadline : '2021-05-20'
  },
  {
    label: '63C ระบบ HR',
    value: '3',
    hours_total : 120,
    hours_left : 120,
    deadline : '2022-01-01'

  }
]


const AddEditTimesheet = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const onFinish = values => {

    var dw = document.getElementById('dw')
    console.log(dw)
    // dw.setVisible(false)
  };


  function disabledDate(current) {
   return current && current < moment().endOf('day');
  }

  function onChangeProject(id) {
    console.log("Project :" + id)
    var selectedProject = null;
    projectList.forEach(project => {
      if (project.value === id)
        selectedProject = project
    });
    document.getElementById('deadlinePicker').value = selectedProject.deadline
    document.getElementById('totalHours').value = selectedProject.hours_total
    document.getElementById('availableHours').value = selectedProject.hours_left
  };

  return (
    <Card className="gx-card"   >
      <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        size="large"
        name="timesheetDetail"
        onFinish={onFinish}
        scrollToFirstError

      >

        <Form.Item name="type" label="Project"
          rules={[
            {
              required: true,
              message: 'กรุณาเลือก Project',
            },
          ]}

        >
          <Select options={projectList} placeholder="เลือก Project" onChange={onChangeProject} ></Select>
        </Form.Item>
        <Space direction="vertical">
        <Space direction="horizontal">
          <Form.Item name="deadlinePicker" label="Deadline" wrapperCol={{span:8}}>
            <DatePicker id="deadlinePicker" disabled style={{width:120}}/>
          </Form.Item>

          <Form.Item name="totalHours" label="จำนวน ชม.รวม" wrapperCol={{span:8}}>
            <InputNumber id="totalHours"  disabled/>
          </Form.Item>
          <Form.Item name="availableHours" label="จำนวน ชม.คงเหลือ" wrapperCol={{span:8}}>
            <InputNumber id="availableHours"  disabled/>
          </Form.Item>

        </Space>
        <Space direction="horizontal">
          <Form.Item name="datePicker" label="วันที่"
            rules={[
              {type:'date', required: true, message: 'กรุณาระบุวันที่'},
            ]}
          >
            <DatePicker style={{width:120}}/>
          </Form.Item>
          <Form.Item name="leaveDays" label="ชม.ปฏิบัติงาน"
            rules={[
              { type:'number', required: true, message: 'กรุณาระบุ ชม.ปฏิบัติงานเป็นตัวเลข'},
            ]}
          >
            <InputNumber min={0} max={99999} />
          </Form.Item>
        </Space>

        <Form.Item name="reason" label="รายละเอียดงาน"
          rules={[
            { required: true, message: 'กรุณาระบุรายละเอียดงาน'},
          ]}
        >
          <TextArea rows={4} placeHolder="ระบุรายละเอียดงาน"/>
        </Form.Item>
        </Space>
        <Form.Item {...tailFormItemLayout} style={{position:"absolute",bottom:0,right:0}}>
            <Space style={{textAlign:"right"}}>
              <Button  >
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit" >
                บันทึก
              </Button>
            </Space>
          </Form.Item>
      </Form>
    </Card>
  );
};

export default AddEditTimesheet;



