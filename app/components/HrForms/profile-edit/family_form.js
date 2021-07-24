import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Card} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

import {savedSuccess} from '../../../../app/components/Alerts';
import {relationOptions} from '../../../../constants/select_items';



 const FamilyDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [family, setFamily] = useState(props.employee.family);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

	const addFamily = () => {
		const newDate = moment('2020-01-01','YYYY-MM-DD')
		let fam = {
          name : '',
          relation : '',
          birth_date : '',
          tel : '',
		}
		// family.push(fam)
		setFamily(family => [...family, fam])
	};

  const onFinish = () => {
    savedSuccess()
    setVisible(false)
  };

  const handleNationChange = (event) => {

  };

	const handleDelete = () => {
		delete family[0];
		setFamily(family => family.filter(fam => fam.id!=='1'));
	};


  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer
        title="ช้อมูลครอบครัว"
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
        name="familyForm"
        onFinish={onFinish}
        scrollToFirstError
      >
      {family.map((fam,i) => {
				return (<Card title={"ลำดับที่ " + (i+1)}  extra={<Button onClick={handleDelete}  icon={<DeleteOutlined />} size="small">
      </Button>}> 
					<Space>
						<Form.Item  label="ชื่อ-นามสกุล" 
							rules={[{ type:'string', required: true}]}
						>
							<Input defaultValue={fam.name}/>
						</Form.Item>
						<Form.Item  label="ความสัมพันธ์" 
							rules={[{ type:'string', required: true}]}
						>
							<Select defaultValue={fam.relation} options={relationOptions}/>
						</Form.Item>
					</Space>
					<Space>
						<Form.Item  label="วันเดือนปี เกิด" 
							rules={[{ type:'date', required: false}]}
						>
							{fam.birth_date!='' ?
							<DatePicker defaultValue={moment(fam.birth_date,'YYYY-MM-DD')} format="LL" style={{width:190}}  /> 
              : <DatePicker format="LL"  /> }
						</Form.Item>
						<Form.Item  label="เบอร์โทรศัพท์" 
							rules={[{ type:'string', required: false}]}
						>
							<Input defaultValue={fam.tel}/>
						</Form.Item>
					</Space>
				</Card>)
      })}

			<Button onClick={addFamily} icon={<PlusOutlined />} size="medium">
				เพิ่มคนในครอบครัว
      </Button>
      

      </Form>
    </Drawer>
  </>
);
  
}

export default FamilyDrawer;
