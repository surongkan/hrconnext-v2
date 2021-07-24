import moment from 'moment';
import React, {useState} from 'react';
import {Button, Card,  Checkbox, Col, Form, Input, Row, Select, Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, Drawer, Table } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
import { useRouter } from 'next/router'
import {roleList, org1List, org2List, typeList, statusList} from '../../../constants/select_items'
import { all_emp_list, DEFAULT_COMPANY } from '../../../constants/dummy_data'
import { savedSuccess, confirmDelete } from '../../../app/components/Alerts';



const HrEmployeeDrawer = (props) => {
  const [visible, setVisible] = useState(false);
	const [nationRadio, setNationRadio] = useState(props.record.nation);
  const [record, setRecord] = useState(props.record);

  const isNewEmployee = props.type

  const [form] = Form.useForm();
  const router = useRouter()

  const [permission ] = useState(props.record.permission)


  const onChange = e => {
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onFinish = values => {
    savedSuccess()
    setVisible(false)
  };

  const toggleNation = e => {
    setNationRadio(e.target.value)
  };



const columns = [
    {
      title: 'Module Permission',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Read',
      dataIndex: 'read',
      key: 'read',
			render: (read) => (
            <Checkbox defaultChecked={read} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Write',
      dataIndex: 'write',
      key: 'write',
			render: (write) => (
            <Checkbox defaultChecked={write} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Create',
      dataIndex: 'create',
      key: 'create',
			render: (create) => (
            <Checkbox defaultChecked={create} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Delete',
      dataIndex: 'del',
      key: 'del',
			render: (del) => (
            <Checkbox defaultChecked={del} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Import',
      dataIndex: 'imp',
      key: 'imp',
			render: (imp) => (
            <Checkbox defaultChecked={imp} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Export',
      dataIndex: 'exp',
      key: 'exp',
			render: (exp) => (
            <Checkbox defaultChecked={exp} onChange={onChange}></Checkbox>
        ),
    },

];
  return (
    <>
      {props.type==="1" ?
        <Button type="primary" onClick={showDrawer}>
          + เพิ่มพนักงาน
        </Button>: 
        <Dropdown.Button icon={<MoreOutlined/>} type="text" 
          overlay={<Menu mode="vertical">
                    <Menu.Item key="1" icon={<EditOutlined />} onClick={showDrawer}>แก้ไข พนักงาน</Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />} onClick={confirmDelete}>ลบ พนักงาน</Menu.Item>
                  </Menu>}
          >
        </Dropdown.Button>
      }
      <Drawer
        title="แก้ไข/เพิ่มข้อมูลพนักงาน"
        headerStyle={{textAlign:'center'}}
        closable={true}
        onClose={onClose}
        visible={visible}
        width={'100%'}
        keyboard={false}
        maskClosable={false}
      >
        <Form
            layout="vertical"
            form={form}
            name="employeeAddEdit"
            onFinish={onFinish}
            scrollToFirstError
						size="large"
        >
					<Card title="ข้อมูลทั่วไป">
					<Space>
						<Form.Item  label="ชื่อ (TH)" block
						rules={[{  required: true, message: 'กรุณาระบุชื่อ (TH)'}]}
						>
							<Input defaultValue={record.name} placeholder="ชื่อ ภาษาไทย"/>
						</Form.Item>   
						<Form.Item  label="นามสกุล (TH)" block
						rules={[{  required: true, message: 'กรุณาระบุนามสกุล (TH)'}]}
						>
							<Input defaultValue={record.lastname} placeholder="นามสกุล ภาษาไทย"/>
						</Form.Item>   
						<Form.Item  label="ชื่อเล่น" block>
							<Input defaultValue={record.nickname} placeholder="ชื่อเล่น"/>
						</Form.Item>   
					</Space>
					<Space>
						<Form.Item  label="ชื่อ (EN)" block
						rules={[{  required: true, message: 'กรุณาระบุชื่อ (EN)'}]}
						>
							<Input defaultValue={record.name_en} placeholder="ชื่อ ภาษาอังกฤษ"/>
						</Form.Item>   
						<Form.Item  label="นามสกุล (EN)" block
						rules={[{  required: true, message: 'กรุณาระบุนามสกุล (EN)'}]}>
							<Input defaultValue={record.lastname_en} placeholder="นามสกุล ภาษาอังกฤษ"/>
						</Form.Item>   
						<Form.Item  label="เบอร์โทรศัพท์" block>
							<Input defaultValue={record.tel} placeholder="เบอร์โทรศัพท์มือถือ/บ้าน"/>
						</Form.Item>   
					</Space>


					<Form.Item name="nationRadio" label="สัญชาติ"
						rules={[{  required: true, message: 'กรุณาระบุสัญชาติ'}]}
        	>
						<Radio.Group onChange={toggleNation}  defaultValue={record.nation}   >
							<Space>
								<Radio value="ไทย" >ไทย</Radio>
								<Radio value="ต่างชาติ" >ต่างชาติ </Radio>
							</Space>
						</Radio.Group>
        	</Form.Item>
					{nationRadio==="ไทย" ?
					<Form.Item  label="หมายเลขบัตรประจำตัวประชาชน " block
						rules={[{  required: true, message: 'กรุณาระบุหมายเลขบัตรประจำตัวประชาชน'}]}
					>
						<Input defaultValue={record.thai_id_card}/>
					</Form.Item> :<>

					<Form.Item  label="Passport ID " block
						rules={[{  required: true, message: 'กรุณาระบุ Passport ID'}]}
					>
						<Input defaultValue={record.passport_id} placeholder="Passport ID"/>
					</Form.Item>

					<Space>
						<Form.Item  label="เลขใบอนุญาตทำงาน " block
							rules={[{  required: true, message: 'กรุณาระบุเลขใบอนุญาตทำงาน'}]}
						>
							<Input defaultValue={record.work_permit_id} placeholder="เลขใบอนุญาตทำงาน"/>
						</Form.Item>
						<Form.Item  label="วันที่ออกใบอนุญาต " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่ออกใบอนุญาตทำงาน'}]}
						>
              {
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.work_permit_date, 'YYYY-MM-DD')} format="LL" style={{width:180}} />
                : <DatePicker format="LL" />
              }
						</Form.Item>
						<Form.Item  label="วันที่ใบอนุญาตหมดอายุ " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่ใบอนุญาตทำงานหมดอายุ'}]}
						>
              {
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.work_permit_expire_date, 'YYYY-MM-DD')} format="LL" style={{width:180}} />
                : <DatePicker format="LL" />
              }						
            </Form.Item>
					</Space>
					</>}
				</Card>
				<Card title="ข้อมูลสำหรับการเข้าใช้งานระบบ">
					<Space>
						<Form.Item  label="Username" block
							rules={[{  required: true, message: 'กรุณาระบุ Username'}]}
						>
							<Input defaultValue={record.username} placeholder="Username"/>
						</Form.Item> 
						<Form.Item  label="Email" block
							rules={[{  required: true, message: 'กรุณาระบุ Email'}]}
						>
							<Input defaultValue={record.email} placeholder="Email Address"/>
						</Form.Item> 
					</Space>
					<Space>
						<Form.Item  label="Password" block
							rules={[{  required: true, message: 'กรุณาระบุ Password'}]}
						>
							<Input.Password defaultValue={record.password}/>
						</Form.Item> 
						<Form.Item  label="Password Confirm" block
							rules={[{  required: true, message: 'กรุณาระบุยืนยัน Password'}]}
						>
							<Input.Password/>
						</Form.Item> 
					</Space>
				</Card>

				<Card title="ข้อมูลการทำงาน">
					<Space>
						<Form.Item  label="รหัสพนักงาน" block
							rules={[{  required: true, message: 'กรุณาระบุรหัสพนักงาน'}]}
						>
							<Input defaultValue={record.id} placeholder="รหัสพนักงาน"/>
						</Form.Item> 
						<Form.Item  label="วันที่เริ่มงาน " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่เริ่มงาน'}]}
						>
							{
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.join_date, 'YYYY-MM-DD')} format="LL" style={{width:180}} />
                : <DatePicker format="LL" />
              }	
						</Form.Item>
					</Space>

					<Space>
						<Form.Item  label="สถานภาพพนักงาน" block
								rules={[{  required: true, message: 'กรุณาระบุสถานภาพพนักงาน'}]}
							>
							<Select options={typeList} dropdownMatchSelectWidth={true} 
              placeholder="-- เลือกสถานภาพ --" defaultValue={record.type}> </Select>
						</Form.Item> 
						<Form.Item  label="บริษัท" block
								rules={[{  required: true, message: 'กรุณาระบุบริษัท'}]}
							>
							<Input defaultValue={record.company} placeholder="บริษัท"/>
						</Form.Item> 
					</Space>

					<Space>
						<Form.Item  label="ฝ่าย" block
							rules={[{  required: true, message: 'กรุณาระบุฝ่าย'}]}
						>
							<Select options={org1List} dropdownMatchSelectWidth={true}
               placeholder="-- เลือกฝ่าย --" defaultValue={record.org1}> </Select>
						</Form.Item> 
						<Form.Item  label="แผนก" block
							rules={[{  required: true, message: 'กรุณาระบุแผนก'}]}
						>
							<Select options={org2List} dropdownMatchSelectWidth={true}
               placeholder="-- เลือกแผนก --" defaultValue={record.org2}> </Select>
						</Form.Item> 
					</Space>

						<Form.Item  label="ตำแหน่งงาน" block
							rules={[{  required: true, message: 'กรุณาระบุตำแหน่งงาน'}]}
						>
							<Select options={roleList} dropdownMatchSelectWidth={true} 
              placeholder="-- เลือกตำแหน่ง --" defaultValue={record.role}> </Select>
						</Form.Item> 
				</Card>

				<Card title="ข้อมูล Permission การใช้งานโมดูลต่างๆ	ของระบบ">
          { 
            isNewEmployee !== "1" ? 
					  <Table className="gx-table-responsive" columns={columns} dataSource={permission} pagination={false} ></Table>
            : <Table className="gx-table-responsive" columns={columns} dataSource={empty_permission} pagination={false} ></Table>
          }
				</Card>

				<Form.Item  size="middle" style={{bottom:0,float:"right"}}>
					<Space style={{textAlign:"right"}}>
						<Button onClick={onClose} size="middle" >
							ยกเลิก
						</Button>
						<Button type="primary" htmlType="submit" size="middle" onClick={onFinish}>
							บันทึก
						</Button>
					</Space>
				</Form.Item>

        </Form>
      </Drawer>
    </>
  );
};

export default HrEmployeeDrawer;


const empty_permission = [
  {
    key: '1',
    module: 'วันหยุด',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '2',
    module: 'การลา',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '3',
    module: 'ลูกค้า',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '4',
    module: 'Projects',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '5',
    module: 'งาน',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '6',
    module: 'Chats',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '7',
    module: 'ทรัพย์สินของบริษัท',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
  {
    key: '8',
    module: 'Timing Sheets',
    read : false,
    write : false,
    create : false,
    del : false,
    imp : false,
    exp : false,
  },
]
