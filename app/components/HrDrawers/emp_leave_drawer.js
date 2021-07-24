import moment from 'moment';
import React, { useState } from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Row, Select,Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, TimePicker, InputNumber, Upload, Drawer } from 'antd';
import {QuestionCircleOutlined, EditOutlined, UploadOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import swal from 'sweetalert';
import {confirmDelete, savedSuccess} from '../../../app/components/Alerts';


const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


const LeaveDrawer = (props) => {
  const [visible, setIsDrawerVisible] = useState(false);
  const [rangeSelected, setRangeSelected] = useState(props.record.is_full_day);
  const [absentObject, setAbsentObject] = useState(props.absent);
  const [record, setRecord] = useState(props.record);
  // const [days, setDays] = useState(9)


  const showModal = () => {
    // if (props.type != "1") {
    //   document.getElementById('menu').style.visibility = "hidden";
    //   // document.getElementById('menu').style.display = "none";
    //   // document.getElementById('days').click()
    //   console.log("HIDE")
    // }
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    // if (props.type != "1")  {
    //   // document.getElementById('menu').style.display = "block";
    //   document.getElementById('menu').style.visibility = "inherit	";
    //   // eventFire(document.getElementById('menu'), 'click');
    //   console.log("Show")
    // }
    setIsDrawerVisible(false);
  };

  const onFinish = values => {
    savedSuccess();
    onClose();
  };
  function disabledDate(current) {
    return current && current < moment().endOf('day');
  };
  const toggleRange = e => {
    document.getElementById('days').value = 0
    setRangeSelected(e.target.value)
  };

  const calculateDays =(dates) => {
    var days=0
    if (dates != null && dates != undefined) {
      var fdate = dates[0]
      var tdate = dates[1]
      days = tdate.diff(fdate, 'days')
      days = days + 1 
      console.log("DIFF = " + days)
      document.getElementById('days').value = days
    }
  };

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
    <Select placeholder="เลือกประเภทการลา"  style={{width:200}} >
      <Option value="ลากิจ" >ลากิจ</Option>
      <Option value="ลาป่วย">ลาป่วย</Option>
      <Option value="ลาพักร้อน">ลาพักร้อน</Option>
    </Select>
  );

  return (
    <>
      {
        props.type==="1" ?
        <Button type="primary" onClick={showModal} >
          + สร้างใบลาใหม่
        </Button> : 
        <Dropdown.Button  icon={<MoreOutlined/>} type="text"
          overlay={<Menu mode="vertical" id="menu">
                    <Menu.Item key="1" icon={<EditOutlined />} onClick={showModal}>แก้ไขใบลา</Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />} onClick={confirmDelete}>ลบใบลา</Menu.Item>
          </Menu>}>
        </Dropdown.Button>
      }
      <Drawer
        id="dw"
        name="dw"
        title="แก้ไขใบลา"
        headerStyle={{textAlign:'center'}}
        onClose={onClose}
        onCancel={onClose}
        visible={visible}
        closable={true}
        maskClosable={false}
        keyboard={false}

        >
        
      
      <Form
        {...formItemLayout} layout="vertical"  name="leaveForm" id="leaveForm"
        onFinish={onFinish}
        size="large"
        initialValues={{
            type : record.type,
            leaveDays : record.day,
            availableDays : absentObject.available,
            rangeTypeRadio : record.is_full_day,
            reason : record.reason,
            // dateRangePicker :[moment(record.fromdate,'YYYY-MM-DD') ,moment(record.todate,'YYYY-MM-DD')],
            // datePicker : moment(record.fromdate,'YYYY-MM-DD')
        }}
        scrollToFirstError
      >
      <Space >
        <Form.Item name="type" label="ประเภทการลา" labelCol={{span:24}}
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
          <Radio.Group id="rad" name="rad" onChange={toggleRange} value={rangeSelected}>
          <Space>
            <Radio value={1} >ตลอดทั้งวัน</Radio>
            <Radio value={0} >ชั่วโมง</Radio>
          </Space>
          </Radio.Group>
        </Form.Item>
      </Space>
        { rangeSelected === 1 ?
        <Form.Item name="dateRangePicker" label="จากวันที่ ... ถึงวันที่"
          rules={[
            {type:'array', required: true, message: 'กรุณาระบุวันที่ลา'},
          ]}
        >
          { record.fromdate == null || record.todate == null ?
            <RangePicker  id="dateRangePicker" format="LL"  onChange={calculateDays}/> :
            <RangePicker  id="dateRangePicker" onChange={calculateDays}
            defaultValue={[moment(record.fromdate,'YYYY-MM-DD') ,moment(record.todate,'YYYY-MM-DD')]}
            format="LL"/>
          }
        </Form.Item> :<div>

        <Form.Item name="datePicker" label="วันที่ต้องการลา"
          rules={[
            {type:'date', required: true, message: 'กรุณาระบุวันที่ลา'},
          ]}
        >
          { props.type === "1" ?
          <DatePicker id="datePicker" format="LL"   placeholder="เลือกวันลา"/>:
          <DatePicker id="datePicker" format="LL"   defaultValue={moment(record.fromdate,'YYYY-MM-DD')}/>
          }
        </Form.Item>

        <Form.Item name="timeRangePicker" label="เวลาที่ต้องการลา"
          rules={[
            {type:'array', required: true, message: 'กรุณาระบุห้วงเวลาที่ต้องการลา'},
          ]}
        >
          { props.type === "1" ?
          <TimePicker.RangePicker id="timeRangePicker" format="HH:mm" minuteStep={15} showNow={true} 	
          placeholder={["เวลาเริ่ม","เวลาสิ้นสุด"]}/> :
          <TimePicker.RangePicker id="timeRangePicker" format="HH:mm" minuteStep={15} showNow={true} 	
          defaultValue={[moment(record.fromtime,"hh:mm"),moment(record.totime,"hh:mm")]} />
          }
        </Form.Item>
        </div>}
        <Space>
          <Form.Item name="leaveDays" label="จำนวนวัน" 
            rules={[
              { type:'number', required: true, message: 'กรุณาระบุจำนวนวันเป็นตัวเลข'},
            ]}
          >
            <InputNumber id="days" min={0} max={1000}  style={{width:120}}  />
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
          <TextArea id="reasonText" rows={2} placeholder="ระบุเหตุผลการลา/ขออนุญาติ" />
        </Form.Item>
 
        <Form.Item name="upload" label="แนบไฟล์" rules={[{ required: false}]}>
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item> 


        <Form.Item {...tailFormItemLayout} style={{position:"absolute",bottom:0,right:0}}>
          <Space style={{textAlign:"right"}}>
            <Button onClick={onClose} > ยกเลิก </Button>
            <Button type="primary" htmlType="submit" > บันทึก </Button>
          </Space>
        </Form.Item>

      </Form>
      </Drawer>
    </>
  );
};



export default LeaveDrawer;
