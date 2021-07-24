import React, { useState } from 'react';
import moment from 'moment';
import {Card, Table, Breadcrumb, Button, Space, Avatar, Menu, Dropdown, Pagination } from "antd";
import {Col, Row, Drawer, Form, Input, Select, DatePicker} from "antd";
import Icon from '@ant-design/icons';
import {MoreOutlined, SearchOutlined} from '@ant-design/icons';
import SalaryDrawer from '../../app/components/HrDrawers/add_edit_salary_drawer';
import {roleList, org1List } from '../../constants/select_items';
import {emp_data } from '../../constants/dummy_data';
// import 'moment/locale/th';
// import locale from 'antd/es/date-picker/locale/th_TH';


const HrSalary = () => {
  const [emp, setEmp] = useState(emp_data);
  const [initEmp, setInitEmp] = useState(emp_data);
  const [filterRole, setFilterRole] = useState("ทุกตำแหน่ง");
  const [filterOrg, setFilterOrg] = useState("ทุกฝ่าย");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");


  const handleSearch = () => {
    let filteredList = [];
    let selectedList = [];
    const fname = document.getElementById('fname').value;
    initEmp.forEach(emp => {
      if (filterRole==="ทุกตำแหน่ง" && filterOrg==="ทุกฝ่าย"){
        if (emp.name.includes(fname)) {
          selectedList.push(emp)
        }
      }  else if (filterRole==="ทุกตำแหน่ง" && filterOrg!=="ทุกฝ่าย" ) {
        if (emp.name.includes(fname) && emp.org===filterOrg) {
          selectedList.push(emp)
        }
      } else if (filterRole!=="ทุกตำแหน่ง" && filterOrg==="ทุกฝ่าย" ) {
        if (emp.name.includes(fname) && emp.role===filterRole) {
          selectedList.push(emp)
        }
      } else {
        if (emp.name.includes(fname) && emp.role===filterRole && emp.org===filterOrg ){
          selectedList.push(emp)
        }
      }
    });

    if (filterStart!=="" && filterEnd==="") {
      selectedList.forEach(selected => {
        const start = document.getElementById('fstart').value
        if (selected.start_date < start){
          filteredList.push(selected)
        }
      });
    }
    else if (filterStart==="" && filterEnd!==""){
      selectedList.forEach(selected => {
        const end = document.getElementById('fend').value
        if ((selected.end_date > end) || (selected.end_date===""))
          filteredList.push(selected)
      });
    }
    else if (filterStart!=="" && filterEnd!==""){
      selectedList.forEach(selected => {
        const start = document.getElementById('fstart').value
        const end = document.getElementById('fend').value
        if ((selected.end_date === "" && selected.start_date <= end)
        || (selected.end_date !=="" && selected.end_date <= end && selected.end_date >= start )
        || (selected.end_date !=="" && selected.end_date >= end && selected.start_date <= end )
        )
          filteredList.push(selected)
      });
    }
    else {
      filteredList = selectedList
    }
    selectedList = [];
    setEmp(filteredList);
  };

  function handleRoleChanged(selected){
    setFilterRole(selected)
  };
  function handleOrgChanged(selected){
    setFilterOrg(selected)
  };
  function handleStartChanged(selected){
    if (selected===null)
      setFilterStart("")
    else {
      setFilterStart(selected)
    }
  };
  function handleEndChanged(selected){
    if (selected===null)
      setFilterEnd("")
    else 
      setFilterEnd(selected)
  };


    return (
      <>
      <Row >
        <Col xs={12} sm={14} md={14} lg={16} xl={18}>
          <h2> ข้อมูลเงินเดือนพนักงาน </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">ข้อมูลเงินเดือนพนักงาน</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={12} sm={8} md={8} lg={6} xl={5}>
          <SalaryDrawer type="1" record={{begin_date:undefined}}/>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col span={4}>
     
            <Input  style={{display:"block"}} id="fname" placeholder="ชื่อ-สกุล"/>
   
        </Col>

        <Col span={4}>

            <Select options={roleList}   style={{display:"block"}} 
              defaultValue="ทุกตำแหน่ง" onChange={handleRoleChanged}>
            </Select>

        </Col>

        <Col span={4}>

            <Select options={org1List} style={{display:"block"}} 
              defaultValue="ทุกฝ่าย" onChange={handleOrgChanged} >
            </Select>

        </Col>
        
        <Col span={4}>
          <DatePicker placeholder="From" style={{display:"block"}} id="fstart" format="LL"
          onChange={handleStartChanged} ></DatePicker>
        </Col>
        <Col span={4}>
          <DatePicker placeholder="To" style={{display:"block"}} id="fend" format="LL"
          onChange={handleEndChanged} ></DatePicker>
        </Col>
        <Col span={4}>
          <Button type="secondary" icon={<SearchOutlined />} block
          onClick={handleSearch}>
            ค้นหา
          </Button>
        </Col>
      </Row>
      <Card>
        <Table className="gx-table-responsive" columns={salary_columns} dataSource={emp}
          pagination={{ showTotal:(total,range) =>  `Showing ${range[0]} to ${range[1]} of ${total} entries`
          ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}/>
      </Card>


      </>
    )
}

export default HrSalary
// const org1_options = [
//   { label: 'ทุกฝ่าย', value: 'ทุกฝ่าย' },
//   { label: 'พัฒนาซอฟต์แวร์', value: 'พัฒนาซอฟต์แวร์' },
//   { label: 'การตลาด', value: 'การตลาด' },
// ]

const salary_columns = [
      {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
          <Space>
            <Avatar src={'/images/avatar/'+avatar}></Avatar>
          </Space>
        ),
    },
  { title: 'ชื่อ-นามสกุล', dataIndex: 'name', key: 'role' , defaultSortOrder: 'descend', sorter: (a, b) => a.name - b.name,},
  { title: 'รหัสพนักงาน', dataIndex: 'id', key: 'id', defaultSortOrder: 'descend', sorter: (a, b) => a.id - b.id,},
  { title: 'email', dataIndex: 'email', key: 'email', defaultSortOrder: 'descend', sorter: (a, b) => a.email - b.email,},
  { title: 'วันที่เริ่มงาน', dataIndex: 'start_date', key: 'start_date',  defaultSortOrder: 'descend', sorter: (a, b) => a.start_date - b.start_date,
    render: (start_date) => (moment(start_date).format('LL'))
  },
  { title: 'ตำแหน่ง', dataIndex: 'role', key: 'role', defaultSortOrder: 'descend', sorter: (a, b) => a.role - b.role,},
  { title: 'เงินเดือน', dataIndex: 'salary', key: 'salary', defaultSortOrder: 'descend', sorter: (a, b) => a.salary - b.salary,},
  { title: 'Slip เงินเดือน', dataIndex: 'slip', key: 'slip',
  render: (slip) => (
      <Button  type="primary" href={'/slips/'+slip+'-'+moment().format('YYYY[-]MM')   +'.pdf'} target="_blank">Generate Slip</Button>
    )},

  { title: 'Action',
  render: (record) => {
   return (<SalaryDrawer type="2" record={record}></SalaryDrawer> )
  },
  },
];


