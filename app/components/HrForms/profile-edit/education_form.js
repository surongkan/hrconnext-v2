import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { savedSuccess} from '../../../../app/components/Alerts';



 const EducationDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [education, setEducation] = useState(props.employee.education);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

	const addEducation = () => {
		const newDate = moment('2020-01-01','YYYY-MM-DD')
		let ed = {
  
          academy : '',
          faculty : '',
          subject : '',
          degree : '',
          begin_year : '',
          finish_year : '',
          grade : ''
        }
		setEducation(education => [...education, ed])
	};

  const onFinish = () => {
    savedSuccess()
    setVisible(false)
  };


	const handleDelete = () => {
		delete education[0];
		setEducation(education => education.filter(ed => ed.id!=='1'));
	};


  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer
        title="ประวัติการศึกษา-ฝึกอบรม"
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
        name="educationForm"
        
        onFinish={onFinish}
        scrollToFirstError
      >
      {education.map((ed,i) => {
				return (<Card title={"ลำดับที่ " + (i+1)}  extra={<Button onClick={handleDelete}  icon={<DeleteOutlined />} size="small">
      </Button>}> 
        <Space direction="vertical">
				
						<Form.Item  label="สถาบันการศึกษา" 
							rules={[{ type:'string', required: true}]}
						>
							<Input defaultValue={ed.academy}/>
						</Form.Item>
						<Form.Item  label="ระดับการศึกษา" 
							rules={[{ type:'string', required: true}]}
						>
							<Input defaultValue={ed.degree} />
						</Form.Item>

					<Space>
						<Form.Item  label="ปีการศึกษา" 
							rules={[{ type:'date', required: false}]}
						>
							{ ed.begin_year!='' ?
							<DatePicker picker="year" defaultValue={moment(ed.begin_year,'YYYY')} />
              : 	<DatePicker picker="year"/> }
						</Form.Item>
						<Form.Item  label="ถึงปีการศึกษา" 
							rules={[{ type:'date', required: false}]}
						>
              { ed.finish_year!='' ?
							<DatePicker picker="year" defaultValue={moment(ed.finish_year,'YYYY')} />
              :  <DatePicker picker="year"/> }
						</Form.Item>
          </Space>
          <Space>
            <Form.Item  label="คณะ" 
              rules={[{ type:'string', required: false}]}
            >
              <Input defaultValue={ed.faculty}/>
            </Form.Item>
            <Form.Item  label="สาขา" 
              rules={[{ type:'string', required: false}]}
            >
              <Input defaultValue={ed.subject} />
            </Form.Item>
          </Space>
          <Form.Item  label="เกรดเฉลี่ย" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={ed.grade} />
          </Form.Item>
					
        </Space>
				</Card>)
      })}

			<Button onClick={addEducation} icon={<PlusOutlined />} size="medium">
				เพิ่มการศึกษา-อบรม
      </Button>
      

      </Form>
    </Drawer>
  </>
);
  
}

export default EducationDrawer;

