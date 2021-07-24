import React, {useState} from "react";
import moment from 'moment';

import { Drawer, Form, Button, Col, Row, Input, Space, Card, Select } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { savedSuccess } from '../../../../app/components/Alerts';
import { accountTypes } from '../../../../constants/select_items';




 const BankDrawer = (props) => {

  const [visible, setVisible] = useState(false);
  const [employee, setEmployee] = useState(props.employee);
  const [account, setAccount] = useState(props.employee.account);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const onFinish = () => {
    savedSuccess()
    setVisible(false)
  };

  const addAccount = () => {
		let acc = {
          account_number : '',
          bank : '',
          account_type : '',
		}
		setAccount(Account => [...Account, acc])
	};

  const handleDelete = () => {
		delete account[0];
		setAccount(account => account.filter(acc => acc.id!=='1'));
	};

  return (
    <>
      <Button onClick={showDrawer}  icon={<EditOutlined />} size="small">
      </Button>
      <Drawer
        title="บัญชีธนาคาร"
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
        name="bankForm"
        onFinish={onFinish}
        scrollToFirstError
      >
      {account.map((acc,i) => { 
       return (<Card title={"ลำดับที่ " + (i+1)}  extra={<Button onClick={handleDelete}  icon={<DeleteOutlined />} size="small">
      </Button>}> 
        <Space>
          <Form.Item  label="ธนาคาร" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={acc.bank}/>
          </Form.Item>
          <Form.Item  label="เลขบัญชี" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={acc.account_number}/>
          </Form.Item>
          <Form.Item  label="ประเภทบัญชี" 
            rules={[{ type:'string', required: false}]}
          >
            <Select defaultValue={acc.account_type} options={accountTypes}/>
          </Form.Item>

        </Space>

        {/* <Space>
          <Form.Item  label="IFCS Code" 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={employee.ifcs_code}/>
          </Form.Item>
          <Form.Item  label="PAN No." 
            rules={[{ type:'string', required: false}]}
          >
            <Input defaultValue={employee.pan_no}/>
          </Form.Item>
        </Space> */}
      </Card>)
      })}

      <Button onClick={addAccount} icon={<PlusOutlined />} size="medium">
				เพิ่มบัญชีธนาคาร
      </Button>
      

      </Form>
    </Drawer>
  </>
);

}

export default BankDrawer;

