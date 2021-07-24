import React, { useState } from 'react';
import {Card, Divider, Table, Breadcrumb, Button, Space, Menu, Dropdown } from "antd";
import {Col, Row, Form, Input, Select} from "antd";
import {MenuOutlined, TableOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import HrEmployeeDrawer from "../../app/components/HrDrawers/hr_emp_drawer"
import CardsListProfile from "../../app/components/CardsListProfile"

import {roleList, org1List, org2List, typeList} from '../../constants/select_items';
import {all_emp_list} from '../../constants/dummy_data';


const HrEmployeeList = () => {
  const [visible, setVisible] = useState(false);
  const [dataView, setDataView] = useState(1);
  const [tableView, setTableView] = useState('block');
  const [listView, setListView] = useState('none');
  const [filterID, setFilterID] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterLastname, setFilterLastname] = useState("");
  const [filterRole, setFilterRole] = useState("ทุกตำแหน่ง");
  const [filterOrg1, setFilterOrg1] = useState("ทุกฝ่าย");
  const [filterOrg2, setFilterOrg2] = useState("ทุกแผนก");
  const [filterType, setFilterType] = useState("ทุกประเภท");
  const [filterEmployee, setFilterEmployee] = useState(all_emp_list)


  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  
  function selectTableView() {
    setTableView('block')
    setListView('none')
  };
  function selectListView() {
    setTableView('none')
    setListView('block')
  };

  function searchButtonClicked() {
    let filterdList = []
    let selectedList = []
    cardsList.forEach(emp => {
      if (emp.id.toLowerCase().includes(filterID) && emp.name.toLowerCase().includes(filterName) 
      && emp.lastname.toLowerCase().includes(filterLastname)) {
          selectedList.push(emp)
          // console.log("PUSH: " + emp.id)
        }
    });

    // console.log("F Role : " + filterRole)
    // console.log("F Type : " + filterType)
    // console.log("F Org1 : " + filterOrg1)
    // console.log("F Org2 : " + filterOrg2)
    selectedList.forEach(emp => {
      if (emp.role === filterRole || filterRole === "ทุกตำแหน่ง") {
        if (emp.type === filterType || filterType === "ทุกประเภท") {
          if (emp.org1 === filterOrg1 || filterOrg1 === "ทุกฝ่าย") {
            if (emp.org2 === filterOrg2 || filterOrg2 === "ทุกแผนก") {
              filterdList.push(emp)
            }
          }
        }
      }
    });
    setFilterEmployee(filterdList)

  };

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => a.lastname - b.lastname,
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: 'ฝ่าย',
      dataIndex: 'org1',
      key: 'org1',
      sorter: (a, b) => a.org1 - b.org1,
    },
    {
      title: 'แผนก',
      dataIndex: 'org2',
      key: 'org2',
      sorter: (a, b) => a.org2 - b.org2,
    },
    {
      title: 'ประเภท',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'Action',
      render: (record) => {
        return (<HrEmployeeDrawer type="2"  record={record}> </HrEmployeeDrawer>)
        // return (<Dropdown.Button overlay={<HrEmployeeDrawer type="2"  record={record}> </HrEmployeeDrawer>
        // } icon={<MoreOutlined/>} type="text"></Dropdown.Button>)
      },
    }
];


  return (
    <>
    <Card>
      <Row  >
        <Col xs={12} sm={16} md={16} lg={18} xl={18}>
          <h2>พนักงาน </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">HR</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">ข้อมูลพนักงาน</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <Space>
            <Button size="small" icon={<TableOutlined />} onClick={selectTableView}></Button>
            <Button size="small" icon={<MenuOutlined />} onClick={selectListView}></Button>
            <HrEmployeeDrawer type="1" record={{}}></HrEmployeeDrawer>
          </Space>
        </Col>
      </Row>
      <Row>&nbsp; </Row>
      <Row>
        <Col span={6}><Input placeholder="รหัสพนักงาน" onChange={e => setFilterID(e.target.value.toLowerCase())}/></Col>
        <Col span={6}><Input placeholder="ชื่อ" onChange={e => setFilterName(e.target.value.toLowerCase())}/></Col>
        <Col span={6}><Input placeholder="นามสกุล" onChange={e => setFilterLastname(e.target.value.toLowerCase())}/></Col>
        <Col span={6}>
          <Select placeholder="เลือก ตำแหน่ง" options={roleList} dropdownMatchSelectWidth={true} style={{display:'block'}}
          defaultValue="ทุกตำแหน่ง" onChange={e => setFilterRole(e)}/>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col span={6}>
          <Select placeholder="เลือก ฝ่าย" options={org1List} dropdownMatchSelectWidth={true} style={{display:'block'}}
          defaultValue="ทุกฝ่าย" onChange={e => setFilterOrg1(e)}/>
        </Col>
        <Col span={6}>
          <Select placeholder="เลือก แผนก" options={org2List} dropdownMatchSelectWidth={true} style={{display:'block'}}
          defaultValue="ทุกแผนก" onChange={e => setFilterOrg2(e)}/>
        </Col>
        <Col span={6}>
          <Select placeholder="เลือก ประเภทการจ้าง" options={typeList} dropdownMatchSelectWidth={true} style={{display:'block'}}
          defaultValue="ทุกประเภท" onChange={e => setFilterType(e)}/>
        </Col>
        <Col span={6}><Button type="primary" icon={<SearchOutlined />} block={true} onClick={searchButtonClicked}>ค้นหา</Button></Col>
      </Row>
    </Card>

    <Card style={{paddingTop:20}}  id="tableView" style={{display:tableView,height:"100%"}}>
    <div className="gx-main-content gx-pb-sm-4" >
      <Row>
        { filterEmployee.map((data, index) => (
          <Col span={6}>
            <CardsListProfile key={index} data={data} styleName="gx-card-list"/>
          </Col>
        )) }
      </Row>
    </div>
    </Card>
    <Card id="listView" style={{display:listView,position:"relative"}}>
      <Table className="gx-table-responsive"  columns={columns} dataSource={filterEmployee}
        pagination={{ showTotal:(total,range) =>  `Showing ${range[0]} to ${range[1]} of ${total} entries`
        ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}/>
    </Card>
    </>
  );
};
export default HrEmployeeList;

