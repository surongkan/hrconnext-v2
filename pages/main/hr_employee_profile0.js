import React, {useState} from 'react';
import {Card, Divider, Table, Breadcrumb, Button, Space, Avatar, Menu, Dropdown } from "antd";
import {Col, Row, Drawer, Tabs, Timeline, Form, Input } from "antd";
import {EditOutlined} from '@ant-design/icons';
const  {TabPane} = Tabs;
import moment from 'moment';

import GeneralDrawer from '../../app/components/HrForms/profile-edit/general_form';
import PersonalDrawer from '../../app/components/HrForms/profile-edit/personal_form';
import ContactDrawer from '../../app/components/HrForms/profile-edit/contact_form';
import BankDrawer from '../../app/components/HrForms/profile-edit/bank_form';
import FamilyDrawer from '../../app/components/HrForms/profile-edit/family_form';
import EducationDrawer from '../../app/components/HrForms/profile-edit/education_form';
import ExperienceDrawer from '../../app/components/HrForms/profile-edit/experience_form';

import {emp_profile} from '../../constants/dummy_data';

const HrEmployeeProfile = () => {
  const [visible, setVisible] = useState(false);
  const cardEdit = (
    <Button icon={<EditOutlined />} size="small" onClick={showDrawer}></Button>
  );
  const cardHeader = {position:"absolute",top:0,right:0,zIndex:500,border:0}
  const showDrawer = (e) => {
    setVisible(true);
    console.log(e)
  };
  const onClose = () => {
    setVisible(false);
  };

  const saveData = (e_name) => {
    emp_profile.name = e_name
  }

    return (
      <>
      <Row >
        <Col span={20}>
          <h2> ประวัติพนักงาน </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">ประวัติพนักงาน</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row> &nbsp; </Row>
      <Tabs  tabPosition="bottom"	defaultActiveKey="1"  >
        <TabPane tab="ข้อมูลพนักงาน" key="1" >
          <div className="site-card-wrapper" >
            {/* <Card extra={<Button id="a1" icon={<EditOutlined />} size="small" onClick={showDrawer}></Button>} headStyle={cardHeader}	> */}
            <Card extra={<GeneralDrawer employee={emp_profile} />} headStyle={cardHeader}	>
              <Row>
                <Col span={4}>
                  <Avatar size={150} src={'/images/avatar/'+emp_profile.avatar}></Avatar>
                </Col>
                <Col span={6}>
                  <p style={ps}>{emp_profile.name}&nbsp;{emp_profile.lastname}
                  </p>
                  <p style={ps}>{emp_profile.type}</p>
                  <p style={ps}>{emp_profile.role}</p>
                  <p style={ps}>รหัสพนักงาน : {emp_profile.id}</p>
                  <p style={ps}>วันที่เริ่มงาน : {moment(emp_profile.join_date).format('LL')}</p>
                  <p style={ps}><Button type='primary'>ส่งข้อความ</Button></p>
                </Col>
                <Col span={9}>
                  <Row>
                    <Col span={6}><p style={ps}>เบอร์โทร : </p></Col>
                    <Col span={18}><p style={ps}>{emp_profile.tel}</p></Col>
                  </Row>
                  <Row>
                    <Col span={6}><p style={ps}>Email : </p></Col>
                    <Col span={18}><p style={ps}>{emp_profile.email}</p></Col>
                  </Row>
                  <Row>
                    <Col span={6}><p style={ps}>วันเดือนปีเกิด: </p></Col>
                    <Col span={18}><p style={ps}>{moment(emp_profile.birth_date).format('LL')}</p></Col>
                  </Row>
                  <Row>
                    <Col span={6}><p style={ps}>ที่อยู่ : </p></Col>
                    <Col span={18}><p style={ps}>{emp_profile.address_card.house_number}</p></Col>
                  </Row>
                  <Row>
                    <Col span={6}><p style={ps}>เพศ : </p></Col>
                    <Col span={18}><p style={ps}>{emp_profile.gender}</p></Col>
                  </Row>
                  <Row>
                    <Col span={6}><p style={ps}>หัวหน้างาน : </p></Col>
                    <Col span={3}><Avatar size="small" src={'/images/avatar/'+emp_profile.head_avatar}></Avatar></Col>
                    <Col span={15}><p style={ps}>{emp_profile.head}</p></Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </TabPane>
        <TabPane tab="โครงการ (Projects)" key="2" >
          <Card>
            <div style={{height:250}}>
              Projects
            </div>
          </Card>
        </TabPane>
        <TabPane tab="ธนาคารและรายการหัก (Admin Only)" key="3">
          <Card>
            <div style={{height:250}}>
              ธนาคารและรายการหัก
            </div>
          </Card>
        </TabPane>
      </Tabs>

      <div className="site-card-wrapper">
        <Row>
          <Col span={12}>
            <Card   extra={<PersonalDrawer employee={emp_profile} />} headStyle={cardHeader}>
              <Row><Col span={24}><h4>ข้อมูลส่วนตัว </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Row>
                <Col span={12}><p style={ps}>เลขที่ บัตรประชาชน/พาสปอร์ต</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.thai_id_card}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>วันที่ พาสปอร์ต หมดอายุ</p></Col>
                <Col span={12}><p style={ps}>{moment(emp_profile.card_expire_date).format('LL')}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>เบอร์โทรศัพท์</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.tel}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>สัญชาติ</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.nation}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>ศาสนา</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.religion}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>สถานภาพการสมรส</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.marital}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>การจ้างงานคู่สมรส</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.spouse_occupation}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>จำนวนบุตร-ธิดา</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.children}</p></Col>
              </Row>

            </Card>
          </Col>
          <Col span={12}>
            <Card  extra={<ContactDrawer employee={emp_profile} />} headStyle={cardHeader}>
              <Row><Col span={24}><h4>บุคคลที่ติดต่อได้ </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Row><Col span={24}><p style={ps}>ลำดับที่ 1</p></Col></Row>
              <Row>
                <Col span={12}><p style={ps}>ชื่อ-สกุล</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact1.name}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>ความสัมพันธ์</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact1.relation}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>เบอร์โทรศัพท์</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact1.tel1}, {emp_profile.contact.contact1.tel2}</p></Col>
              </Row>
              <Divider></Divider>
              <Row><Col span={24}><p style={ps}>ลำดับที่ 2</p></Col></Row>
              <Row>
                <Col span={12}><p style={ps}>ชื่อ-สกุล</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact2.name}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>ความสัมพันธ์</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact2.relation}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>เบอร์โทรศัพท์</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.contact.contact2.tel1}, {emp_profile.contact.contact2.tel2}</p></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card  extra={<BankDrawer employee={emp_profile}/>} headStyle={cardHeader}>
              <Row><Col span={24}><h4>บัญชีธนาคาร </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Table className="gx-table-responsive" columns={account_columns} dataSource={emp_profile.account}
              pagination={false}
              />
              {/* <Row><Col span={24}><h4>บัญชีธนาคาร </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Row>
                <Col span={12}><p style={ps}>ธนาคาร</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.bank}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>เลขบัญชี</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.account_number}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>ประเภทบัญชี</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.account_type}</p></Col>
              </Row> */}
              {/* <Row>
                <Col span={12}><p style={ps}>IFSC Code</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.ifcs_code}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p style={ps}>PAN No.</p></Col>
                <Col span={12}><p style={ps}>{emp_profile.pan_no}</p></Col>
              </Row> */}
            </Card>
          </Col>
          <Col span={12}>
            <Card  extra={<FamilyDrawer employee={emp_profile} />} headStyle={cardHeader}>
              <Row><Col span={24}><h4>ข้อมูลครอบครัว </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Table className="gx-table-responsive" columns={family_columns} dataSource={emp_profile.family}
              pagination={false} size="middle"  
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card  extra={<EducationDrawer employee={emp_profile} />} headStyle={cardHeader}>
              <Row><Col span={24}><h4>การศึกษา </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Timeline size="large"  >
              {emp_profile.education.map((obj)=> {
                return <Timeline.Item>
                  <div><p style={ps}><b>{obj.academy}</b></p></div>
                  <div><p style={ps}>{obj.degree} in {obj.subject}</p></div>
                  <div><p style={ps}>{obj.begin_year}-{obj.finish_year}</p></div>
                </Timeline.Item>
              })}
              </Timeline>
            </Card>
          </Col>
          <Col span={12}>
            <Card extra={<ExperienceDrawer employee={emp_profile} />} headStyle={cardHeader}>
              <Row><Col span={24}><h4>ประสบการณ์ </h4></Col></Row>
              <Row>&nbsp;</Row>
              <Timeline>
              {emp_profile.experience.map((obj)=> {
                return <Timeline.Item>
                  <div><p style={ps}><b>{obj.role} at {obj.company}</b></p></div>
                  <div><p style={ps}>{obj.begin_year}-{obj.finish_year} ({obj.period})</p></div>
                </Timeline.Item>
              })}
              </Timeline>
            </Card>
          </Col>
        </Row>
      </div>
      </>
    )
}

export default HrEmployeeProfile


const family_columns = [
    {
      title: 'ชื่อ-สกุล',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'ความสัมพันธ์',
      dataIndex: 'relation',
      key: 'relation',
      sorter: (a, b) => a.relation - b.relation,
    },
    {
      title: 'วันเดือนปี เกิด',
      dataIndex: 'birth_date',
      key: 'birth_date',
      sorter: (a, b) => a.birth_date - b.birth_date,
      render: (birth_date) => (
        <p style={ps}>{moment(birth_date).format('ll')} </p>
        ),
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'tel',
      key: 'tel',
      sorter: (a, b) => a.tel - b.tel,
    }
]
const account_columns = [
    {
      title: 'ธนาคาร',
      dataIndex: 'bank',
      key: 'bank',
      sorter: (a, b) => a.bank - b.bank,
    },
    {
      title: 'เลขบัญชี',
      dataIndex: 'account_number',
      key: 'account_number',
      sorter: (a, b) => a.account_number - b.account_number,
    },
    {
      title: 'ประเภท',
      dataIndex: 'account_type',
      key: 'account_type',
      sorter: (a, b) => a.account_type - b.account_type,
    },

]

const ps = {
  fontSize: '1.15em',
};