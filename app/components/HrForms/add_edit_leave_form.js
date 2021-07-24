import moment from 'moment';
import React, {useState} from 'react';
import {AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, Row, Select, Tooltip,Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, TimePicker, InputNumber, Upload } from 'antd';
import {QuestionCircleOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


const RANGE_ALL_DAY = 1
const RANGE_HOURS = 2

class AddEditLeaveNew extends React.Component {
  state = {
    rangeSelected : RANGE_ALL_DAY,
  };

  render() {
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
    const onFinish = values => {
      console.log('Received values of form: ', values);
      console.log(document.getElementById('dw'));
    };
    function disabledDate(current) {
      return current && current < moment().endOf('day');
    };
    const toggleRange = e => {
      console.log('radio checked : ', e.target);

      this.setState({
        rangeSelected : e.target.value,
      });
    };
    // const form = Form.useForm();
    const { rangeSelected  } = this.state;

    return (
    <>
    <Card style={{height:650}} >

      <Form
        {...formItemLayout} layout="vertical"  name="leaveForm" id="leaveForm"
        onFinish={onFinish}
        size="large"

        initialValues={{
            leaveDays : 0,
            availableDays : 0,
            rangeTypeRadio : 1
        }}
        scrollToFirstError
      >
      <Space >
        <Form.Item name="type" label="ประเภทการลา" labelCol={{span:12}}
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
          <Radio.Group id="rad" name="rad" onChange={toggleRange} value={rangeSelected }   >
          <Space>
            <Radio value={1} checked={true}>ตลอดทั้งวัน</Radio>
            <Radio value={2} >ชั่วโมง
            </Radio>
          </Space>
          </Radio.Group>
        </Form.Item>
      </Space>
        {rangeSelected === RANGE_ALL_DAY ?
        <Form.Item name="dateRangePicker" label="จากวันที่ ... ถึงวันที่"
          rules={[
            {type:'array', required: true, message: 'กรุณาระบุวันที่ลา'},
          ]}
        >
          <RangePicker  id="dateRangePicker" disabledDate={disabledDate} />
        </Form.Item> :<div>

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
        </div>}
        <Space>
          <Form.Item name="leaveDays" label="จำนวนวัน"
            rules={[
              { type:'number', required: true, message: 'กรุณาระบุจำนวนวันเป็นตัวเลข'},
            ]}
          >
            <InputNumber min={0} max={1000}  style={{width:120}} />
          </Form.Item>

          <Form.Item name="availableDays" label="คงเหลือวันลา"
            rules={[
              { type:'number', required: true,},
            ]}
          >
            <InputNumber min={0} max={1000}  style={{width:120}} />
          </Form.Item>
        </Space>

        <Form.Item  name="reason" label="เหตุผลการลา/ขออนุญาติ"
          rules={[{ required: true, message: 'กรุณาระบุเหตุผลการลา/ขออนุญาติ'},]}
        >
          <TextArea id="reasonText" rows={2} placeholder="ระบุเหตุผลการลา/ขออนุญาติ"/>
        </Form.Item>

        <Form.Item name="upload" label="แนบไฟล์"
          rules={[{ required: false}]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>


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
    </>
  );
}
}

export default AddEditLeaveNew;



