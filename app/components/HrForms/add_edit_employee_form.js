import moment from 'moment';
import React, {useState} from 'react';
import {AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Input, Row, Select, Tooltip,Menu} from 'antd';
import {Dropdown, Space, Radio, DatePicker, TimePicker, InputNumber, Upload, Divider, Drawer, Table } from 'antd';
import {QuestionCircleOutlined, EditOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
import { useRouter } from 'next/router'
import swal from 'sweetalert';



const AddEditEmployee = (props) => {
  const [visible, setVisible] = useState(false);
	const [nationRadio, setNationRadio] = useState(1);
  const [record, setRecord] = useState({});
	const DEFAULT_COMPANY = "บริษัท ทดสอบ จำกัด";
  const isNewEmployee = "1"

  const [form] = Form.useForm();
  const router = useRouter()

  const [permission , setPermission] = useState({})

  const onCheckedPermission = (e) => {
    console.log("check ! : " + e.target)
  };

  const onChange = e => {
    console.log("Checked :>> " + e.target )
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onFinish = values => {
    timesheetSentAlert()
    setVisible(false)
  };

  const toggleNation = e => {
    console.log('radio checked : ', e.target);
    setNationRadio(e.target.value)
  };

  function saveAlert () {
    swal({
        title: "การบันทึกข้อมูลพนักงาน",
        text: "ยืนยันการบันทึกข้อมูลพนักงาน",
        icon: "success",
        buttons: false,
        dangerMode: false,
        timer: 3000
      })
  };

  function confirmDelete () {
      swal({
          title: "ยืนยันการลบ พนักงาน",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("ลบ พนักงาน เรียบร้อย", {
              icon: "success",
            });
          } else {
            swal("ยกเลิกการลบ พนักงาน");
          }
        });
  };

const columns = [
    {
      title: 'Module Permission',
      dataIndex: 'module',
      key: 'module',
      // sorter: (a, b) => a.module - b.module,
    },
    {
      title: 'Read',
      dataIndex: 'read',
      key: 'read',
      // sorter: (a, b) => a.read - b.read,
			render: (read) => (
            <Checkbox defaultChecked={read} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Write',
      dataIndex: 'write',
      key: 'write',
      // sorter: (a, b) => a.write - b.write,
			render: (write) => (
            <Checkbox defaultChecked={write} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Create',
      dataIndex: 'create',
      key: 'create',
      // sorter: (a, b) => a.create - b.create,
			render: (create) => (
            <Checkbox defaultChecked={create} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Delete',
      dataIndex: 'del',
      key: 'del',
      // sorter: (a, b) => a.del - b.del,
			render: (del) => (
            <Checkbox defaultChecked={del} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Import',
      dataIndex: 'imp',
      key: 'imp',
      // sorter: (a, b) => a.imp - b.imp,
			render: (imp) => (
            <Checkbox defaultChecked={imp} onChange={onChange}></Checkbox>
        ),
    },
    {
      title: 'Export',
      dataIndex: 'exp',
      key: 'exp',
      // sorter: (a, b) => a.exp - b.exp,
			render: (exp) => (
            <Checkbox defaultChecked={exp} onChange={onChange}></Checkbox>
        ),
    },

];
  return (
    <>


        <Form
            // {...formItemLayout}
            layout="vertical"
            form={form}
            name="employeeAddEdit"
            onFinish={onFinish}
            scrollToFirstError
						size="large"
        >
					<Card title="ข้อมูลทั่วไป">
          <Space direction="vertical">
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
							<Input defaultValue={record.nickname}/>
						</Form.Item>   
					</Space>
					<Space>
						<Form.Item  label="ชื่อ (EN)" block
						rules={[{  required: true, message: 'กรุณาระบุชื่อ (EN)'}]}
						>
							<Input defaultValue={record.name_en}/>
						</Form.Item>   
						<Form.Item  label="นามสกุล (EN)" block
						rules={[{  required: true, message: 'กรุณาระบุนามสกุล (EN)'}]}>
							<Input defaultValue={record.lastname_en}/>
						</Form.Item>   
						<Form.Item  label="เบอร์โทรศัพท์" block>
							<Input defaultValue={record.tel}/>
						</Form.Item>   
					</Space>
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
						<Input defaultValue={record.passport_id}/>
					</Form.Item>

					<Space>
						<Form.Item  label="เลขใบอนุญาตทำงาน " block
							rules={[{  required: true, message: 'กรุณาระบุเลขใบอนุญาตทำงาน'}]}
						>
							<Input defaultValue={record.work_permit_id}/>
						</Form.Item>
						<Form.Item  label="วันที่ออกใบอนุญาต " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่ออกใบอนุญาตทำงาน'}]}
						>
              {
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.work_permit_date, 'YYYY-MM-DD')} format="LL" style={{width:180}}/>
                : <DatePicker format="LL"/>
              }
						</Form.Item>
						<Form.Item  label="วันที่ใบอนุญาตหมดอายุ " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่ใบอนุญาตทำงานหมดอายุ'}]}
						>
              {
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.work_permit_expire_date, 'YYYY-MM-DD')} format="LL" style={{width:180}}/>
                : <DatePicker format="LL"/>
              }						
            </Form.Item>
					</Space>
					</>}
				</Card>
				<Card title="ข้อมูลสำหรับการเข้าใช้งานระบบ">
        <Space direction="vertical">
					<Space>
						<Form.Item  label="Username" block
							rules={[{  required: true, message: 'กรุณาระบุ Username'}]}
						>
							<Input defaultValue={record.username}/>
						</Form.Item> 
						<Form.Item  label="Email" block
							rules={[{  required: true, message: 'กรุณาระบุ Email'}]}
						>
							<Input defaultValue={record.email}/>
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
        </Space>
				</Card>

				<Card title="ข้อมูลการทำงาน">
        <Space direction="vertical">
					<Space>
						<Form.Item  label="รหัสพนักงาน" block
							rules={[{  required: true, message: 'กรุณาระบุรหัสพนักงาน'}]}
						>
							<Input defaultValue={record.id}/>
						</Form.Item> 
						<Form.Item  label="วันที่เริ่มงาน " block
							rules={[{  required: true, message: 'กรุณาระบุเลขวันที่เริ่มงาน'}]}
						>
							{
                isNewEmployee !== "1" ? 
                <DatePicker defaultValue={moment(record.join_date, 'YYYY-MM-DD')} format="LL" style={{width:180}}/>
                : <DatePicker format="LL"/>
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
							<Input defaultValue={record.company}/>
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
          </Space>
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
						<Button type="primary" htmlType="submit" size="middle" >
							บันทึก
						</Button>
					</Space>
				</Form.Item>

        </Form>
    </>
  );
};



export default AddEditEmployee;


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

const statusList = [
	{ label: 'พนักงานทดลองงาน', value: '1' },
	{ label: 'บรรจุ', value: '2' },
	{ label: 'ฝึกงาน', value: '3' },
]
const roleList = [
  { label: 'Software Engineer', value: 'Software Engineer' },
  { label: 'Web Designer', value: 'Web Designer' },
  { label: 'Team Leader', value: 'Team Leader' },
  { label: 'Project Manager', value: 'Project Manager' },
]
const org1List = [
  { label: 'ฝ่ายเทคโนโลยีสารสนเทศ', value: 'ฝ่ายเทคโนโลยีสารสนเทศ' },
  { label: 'ฝ่ายทดสอบ', value: 'ฝ่ายทดสอบ' },
]
const org2List = [
  { label: 'แผนกพัฒนาซอฟต์แวร์', value: 'แผนกพัฒนาซอฟต์แวร์' },
  { label: 'แผนกการตลาด', value: 'แผนกการตลาด' },
]
const typeList = [
  { label: 'พนักงาน', value: 'พนักงาน' },
  { label: 'Freelance', value: 'Freelance' },
  { label: 'นักศึกษาฝึกงาน', value: 'นักศึกษาฝึกงาน' },
  { label: 'Management Team', value: 'Management Team' },
]


