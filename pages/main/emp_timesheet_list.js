import React from "react";
import moment from 'moment';
import {Card, Table, Breadcrumb, Button, Space, Menu, Dropdown, Pagination } from "antd";
import {Col, Row, Form} from "antd";
import Icon from '@ant-design/icons';
import {PlusCircleTwoTone, EditOutlined, DeleteOutlined, MoreOutlined} from '@ant-design/icons';
import TimesheetDrawer from '../../app/components/HrDrawers/emp_timesheet_drawer';
import {timesheet_data} from '../../constants/dummy_data'


const EmpTimesheetList = () => {
  return (
     <>

      <Row >
        <Col xs={12} sm={16} md={16} lg={18} xl={18}>
          <h2> Timesheet พนักงาน </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Timesheet พนักงาน</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={2}>
          <TimesheetDrawer type="1" record={{date:null}}> </TimesheetDrawer>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
    <Card id='card1'>
      <Table className="gx-table-responsive" columns={columns} dataSource={timesheet_data}
        pagination={{ showTotal:(total,range) =>  `Showing ${range[0]} to ${range[1]} of ${total} entries`
        ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}/>
    </Card>
    </>
  );
};


const columns = [
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date - b.date,
      render: (date) => moment(date).format('LL')
    },
    {
      title: 'ชื่อโครงการ',
      dataIndex: 'project',
      key: 'project',
      sorter: (a, b) => a.project - b.project,
    },
    {
      title: 'จำนวน ช.ม.ที่กำหนดให้',
      dataIndex: 'designated_hours',
      key: 'designated_hours',
      sorter: (a, b) => a.designated_hours - b.designated_hours,
    },
    {
      title: 'ช.ม.',
      dataIndex: 'actual_hours',
      key: 'actual_hours',
      sorter: (a, b) => a.actual_hours - b.actual_hours,
    },
    {
      title: 'งาน',
      dataIndex: 'task',
      key: 'task',
      sorter: (a, b) => a.task - b.task,
    },
    {
      title: 'Action',
      // key: 'action',
      render: (record) => {
        return (<TimesheetDrawer type="2" record={record}> </TimesheetDrawer>)
        // return (<Dropdown.Button overlay={<TimesheetDrawer type="2" record={record}> </TimesheetDrawer>} icon={<MoreOutlined/>} 
        // type="text"></Dropdown.Button>)
      },
    }
];

const menu = (
<TimesheetDrawer type="2"> </TimesheetDrawer>
);

export default EmpTimesheetList;
