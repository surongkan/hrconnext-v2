import moment from 'moment';
import React, {useState} from 'react';
import { Button, Col, Form, Input, Row, Select, Menu, Dropdown} from 'antd';
import { Space, DatePicker, InputNumber, Divider, Drawer } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
const {TextArea} = Input;
import { useRouter } from 'next/router'
import {confirmDelete, savedSuccess} from '../../../app/components/Alerts';
import {project_list} from '../../../constants/dummy_data';
// import 'moment/locale/th';
// import locale from 'antd/es/date-picker/locale/th_TH';


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

const TimesheetDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter()
  const [record, setRecord] = useState(props.record);
  const [project, setProject] = useState(pj(props.record.project));

  function pj(pj_name){
    let temp_pj = {};
    project_list.forEach(project => {
      if(pj_name === project.value) {
        temp_pj = project
      }
    });
    return temp_pj;
  };
  // const [project, setProject] = useState(props.record.project);

  const showDrawer = () => {
    setVisible(true);
  };
function disabledDate(current) {
   return current && current < moment().endOf('day');
  }

  function onChangeProject(id) {
    console.log("Project :" + id)
    var selectedProject = null;
    project_list.forEach(pp => {
      if (pp.value === id){
        selectedProject = pp
        console.log("OK : " + pp)
      }
    });
    document.getElementById('deadlinePicker').value = moment(selectedProject.deadline).format('LL')
    document.getElementById('totalHours').value = selectedProject.hours_total
    document.getElementById('availableHours').value = selectedProject.hours_left
  };
  const onFinish = values => {
    savedSuccess()
    setVisible(false)
  };

  const onClose = () => {

    setVisible(false);
  };


  return (
    <>
      {props.type==="1" ?
        <Button type="primary" onClick={showDrawer}>
          + เพิ่ม Timesheet วันนี้
        </Button>: 
        <Dropdown.Button  icon={<MoreOutlined/>} type="text"
          overlay={<Menu mode="vertical" visible={false}>
                  <Menu.Item key="1" icon={<EditOutlined />} onClick={showDrawer}>แก้ไข Timesheet</Menu.Item>
                  <Menu.Item key="2" icon={<DeleteOutlined />} onClick={confirmDelete}>ลบ Timesheet</Menu.Item>
                </Menu>}
        >
        </Dropdown.Button>
      }
      <Drawer
        id='dw'
        title="เพิ่มข้อมูลงานวันนี้"
        placement="right"
        bodyStyle={{width:500}}
        closable={true}
        keyboard={false}
        onClose={onClose}
        visible={visible}
        maskClosable={false}

      >
      <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        name="timesheetDetail"
        onFinish={onFinish}
        size="large"
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
          <Select options={project_list} placeholder="เลือก Project" 
          onChange={onChangeProject} defaultValue={record.project}></Select>
        </Form.Item>
        <Space direction="vertical">
        <Space direction="horizontal">
          
          <Form.Item name="deadlinePicker" label="Deadline" wrapperCol={{span:8}}>
          { project.deadline == null || project.date == undefined ?
            <DatePicker id="deadlinePicker" disabled style={{width:150}} format="LL" /> :
            <DatePicker id="deadlinePicker" disabled style={{width:150}} 
            defaultValue={moment(project.deadline, 'YYYY-MM-DD')} format="LL"/>
          }
          </Form.Item>

          <Form.Item name="totalHours" label="จำนวน ชม.รวม" wrapperCol={{span:8}}>
            <InputNumber id="totalHours"  disabled defaultValue={project.hours_total}/>
          </Form.Item>
          <Form.Item name="availableHours" label="จำนวน ชม.คงเหลือ" wrapperCol={{span:8}}>
            <InputNumber id="availableHours"  disabled defaultValue={project.hours_left}/>
          </Form.Item>

        </Space>
        <Space direction="horizontal">
          <Form.Item name="datePicker" label="วันที่"
            rules={[
              {type:'date', required: true, message: 'กรุณาระบุวันที่'},
            ]}
          >
          { record.date == null || record.date == undefined ?
            <DatePicker style={{width:150}} format="LL"  /> :
            <DatePicker style={{width:150}} defaultValue={moment(record.date,'YYYY-MM-DD')} format="LL"  /> }
          </Form.Item>
          <Form.Item name="leaveDays" label="ชม.ปฏิบัติงาน"
            rules={[
              { type:'number', required: true, message: 'กรุณาระบุ ชม.ปฏิบัติงานเป็นตัวเลข'},
            ]}
          >
            <InputNumber min={0} max={99999} defaultValue={record.designated_hours}/>
          </Form.Item>
        </Space>

        <Form.Item name="reason" label="รายละเอียดงาน"
          rules={[
            { required: true, message: 'กรุณาระบุรายละเอียดงาน'},
          ]}
        >
          <TextArea rows={4} placeholder="ระบุรายละเอียดงาน" defaultValue={record.task}/>
        </Form.Item>
        </Space>
        <Form.Item {...tailFormItemLayout} style={{position:"absolute",bottom:0,right:0}}>
            <Space style={{textAlign:"right"}}>
              <Button  onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit" >
                บันทึก
              </Button>
            </Space>
          </Form.Item>
      </Form>
      </Drawer>

    </>
  );
};

export default TimesheetDrawer;
