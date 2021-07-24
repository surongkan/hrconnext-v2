import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input,  DatePicker, Space,  Card} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { savedSuccess} from '../../../../app/components/Alerts';




 const ExperienceDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [experience, setExperience] = useState(props.employee.experience);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

	const addExperience = () => {
		const newDate = moment('2020-01-01','YYYY-MM-DD')
		let exp = {
          begin_year : '',
          finish_year : '',

        }
		setExperience(experience => [...experience, exp])
	};

  const onFinish = () => {
    savedSuccess()
    setVisible(false)
  };


	const handleDelete = () => {
		delete experience[0];
		setExperience(experience => experience.filter(exp => exp.id!=='1'));
	};


  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer
        title="ประสบการณ์การทำงาน"
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
        name="experienceForm"
        onFinish={onFinish}
        scrollToFirstError
      >
      {experience.map((exp,i) => {
				return (<Card title={"ลำดับที่ " + (i+1)}  extra={<Button onClick={handleDelete}  icon={<DeleteOutlined />} size="small">
      </Button>}> 
        <Space direction="vertical">
					<Space>
						<Form.Item  label="ชื่อบริษัท" 
							rules={[{ type:'string', required: true}]}
						>
							<Input defaultValue={exp.company}/>
						</Form.Item>
						<Form.Item  label="หน้าที่ความรับผิดชอบ" 
							rules={[{ type:'string', required: false}]}
						>
							<Input defaultValue={exp.role} />
						</Form.Item>
					</Space>
					<Space>
						<Form.Item  label="เริ่มทำงาน" 
							rules={[{ type:'date', required: true}]}
						>
							{ exp.begin_year !== '' ? 
							<DatePicker picker="month" defaultValue={moment(exp.begin_year,'YYYY')} format="MMM YYYY"/>
              : <DatePicker picker="month" format="MMM YYYY"/> } 
						</Form.Item>
						<Form.Item  label="ถึง" 
							rules={[{ type:'date', required: true}]}
						>
              { exp.finish_year !== '' ? 
							<DatePicker picker="month" defaultValue={moment(exp.finish_year,'YYYY')} format="MMM YYYY"/>
              : <DatePicker picker="month" format="MMM YYYY"/> } 
						</Form.Item>
          </Space>
          <Space>
            <Form.Item  label="ตำแหน่งเริ่มต้น" 
              rules={[{ type:'string', required: true}]}
            >
              <Input defaultValue={exp.first_role}/>
            </Form.Item>
            <Form.Item  label="ตำแหน่งสุดท้าย" 
              rules={[{ type:'string', required: true}]}
            >
              <Input defaultValue={exp.final_role} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item  label="เงินเดือนเริ่มต้น" 
              rules={[{ type:'number', required: false}]}
            >
              <Input defaultValue={exp.start_salary}/>
            </Form.Item>
            <Form.Item  label="เงินเดือนสุดท้าย" 
              rules={[{ type:'number', required: false}]}
            >
              <Input defaultValue={exp.final_salary} />
            </Form.Item>
          </Space>
          <Form.Item  label="เหตุผลที่ออก" 
            rules={[{ type:'number', required: true}]}
          >
            <Input defaultValue={exp.quit_reason} />
          </Form.Item>

					
        </Space>
				</Card>)
      })}

			<Button onClick={addExperience} icon={<PlusOutlined />} size="medium">
				เพิ่มประสบการณ์การทำงาน
      </Button>
      

      </Form>
    </Drawer>
  </>
);
  
}

export default ExperienceDrawer;


