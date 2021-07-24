import moment from 'moment';
import React, {useState} from 'react';
import {AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, Row, Select, Tooltip,Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, TimePicker, InputNumber, Upload } from 'antd';
import {QuestionCircleOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


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
const leaveTypeSelect = (
  <Select placeholder="เลือกประเภทการลา"  style={{width:200}}>
    <Option value="1" >ลากิจ</Option>
    <Option value="2">ลาป่วย</Option>
    <Option value="3">ลาพักร้อน</Option>
  </Select>
);

const AddEditLeave = () => {
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  var selectedRange = 1;



  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  function disabledDate(current) {
    return current && current < moment().endOf('day');
  };
  const toggleRange = e => {
    if (!e) {
      console.log('no val')
    } else {
      console.log('val = ', e.target.value)
      const rangeValue = e.target.value
      switch(rangeValue) {
        case 1 : // All days
        document.getElementById("datePicker").style.display = 'none'
        document.getElementById("timeRangePicker").style.display = 'none'
        document.getElementById("dateRangePicker").style.display = 'block'

          // form.setFields([
          //   {
          //     name : 'reason',
          //     style : {display:'none'}
          //   }
          // ]);
          return;
        case 2 : // Time Range
        document.getElementById("datePicker").style.display = 'block'
        document.getElementById("timeRangePicker").style.display = 'block'
        document.getElementById("dateRangePicker").style.display = 'none'
          return;
      }
    }
  };

  return (
    <Card className="gx-card">

      <Form
        {...formItemLayout} layout="vertical" form={form} name="register"
        onFinish={onFinish}
        initialValues={{
          selectedRange : 1,
        }}
        scrollToFirstError
      >
      <Space >
        <Form.Item name="type" label="ประเภทการลา"
          rules={[
            {
              required: true,
              message: 'กรุณาระบุประเภทการลา',
            },
          ]}
        >
          {leaveTypeSelect}
        </Form.Item>

        <Form.Item name="rangeTypeRadio" label="ช่วงเวลาที่ต้องการลา" labelCol={{offset:18}}
          rules={[
            {  required: true, message: 'กรุณาระบุช่วงเวลาที่ต้องการลา'}
          ]}
        >
          <Radio.Group onChange={toggleRange}  >
          <Space>
            <Radio value={1} checked={true}>ตลอดทั้งวัน</Radio>
            <Radio value={2} >ชั่วโมง
            </Radio>
          </Space>
          </Radio.Group>
        </Form.Item>
      </Space>
        {selectedRange=== 1 ?
        <Form.Item name="dateRangePicker" label="จากวันที่ ... ถึงวันที่"
          rules={[
            {type:'array', required: true, message: 'กรุณาระบุวันที่ลา'},
          ]}
        >
          <RangePicker  id="dateRangePicker" disabledDate={disabledDate} />
        </Form.Item> :<div>ABC</div>}

        <Form.Item name="datePicker" label="วันที่ต้องการลา"
          rules={[
            {type:'date', required: true, message: 'กรุณาระบุวันที่ลา'},
          ]}
        >
          <DatePicker id="datePicker" />
        </Form.Item>

        <Form.Item name="timeRangePicker" label="เวลาที่ต้องการลา"
          rules={[
            {type:'array', required: true, message: 'กรุณาระบุห้วงเวลาที่ต้องการลา'},
          ]}
        >
          <TimePicker.RangePicker id="timeRangePicker" format="HH:mm" minuteStep={15} showNow={true}	 />
        </Form.Item>

        <Space>
          <Form.Item name="leaveDays" label="จำนวนวัน"
            rules={[
              { type:'number', required: true, message: 'กรุณาระบุจำนวนวันเป็นตัวเลข'},
            ]}
          >
            <InputNumber min={0} max={1000} defaultValue={0} />
          </Form.Item>

          <Form.Item name="availableDays" label="คงเหลือวันลา"
            rules={[
              { type:'number', required: true,},
            ]}
          >
            <InputNumber min={0} max={1000} defaultValue={0} />
          </Form.Item>
        </Space>

        <Form.Item  name="reason" label="เหตุผลการลา/ขออนุญาติ"
          rules={[{ required: true, message: 'กรุณาระบุเหตุผลการลา/ขออนุญาติ'},]}
        >
          <TextArea id="reasonText" rows={4} placeHolder="ระบุเหตุผลการลา/ขออนุญาติ"/>
        </Form.Item>

        <Form.Item name="upload" label="แนบไฟล์"
          rules={[{ required: false}]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            บันทึก
          </Button>
        </Form.Item>

      </Form>
    </Card>
  );
};

export default AddEditLeave;



