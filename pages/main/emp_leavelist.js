import React, { useState } from 'react';
import moment from 'moment';
import {Card, Divider, Table, Breadcrumb, Button, Space, Avatar, Menu, Dropdown, Pagination } from "antd";
import {Col, Row} from "antd";
import Icon from '@ant-design/icons';
import {PlusCircleTwoTone, EditOutlined, DeleteOutlined, MoreOutlined} from '@ant-design/icons';
import IconWithTextCard from "../../app/components/Metrics/IconWithTextCard";
import LeaveDrawer from '../../app/components/HrDrawers/emp_leave_drawer';
import {absent_data, employee_absents} from '../../constants/dummy_data'
// import * as dayjs from 'dayjs'
// import DayJS from 'react-dayjs';


// var dayjs = require('dayjs')
// dayjs.locale('th')


const empleavelist = () => {
  const [absentObject, setAbsentObject] = useState(null);
  const [absents] = useState(absent_data);

  const columns = [
    {
      title: 'ประเภทการลา',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'จากวันที่',
      dataIndex: 'fromdate',
      key: 'fromdate',
      sorter: (a, b) => a.fromdate - b.fromdate,
      render: (fromdate) => moment(fromdate).format('LL')
    },
    {
      title: 'ถึงวันที่',
      dataIndex: 'todate',
      key: 'todate',
      sorter: (a, b) => a.todate - b.todate,
      render: (todate) => moment(todate).format('LL')
      
    },
    {
      title: 'จำนวนวัน',
      dataIndex: 'day',
      key: 'day',
      sorter: (a, b) => a.day - b.day,
      render: (day) => (
        <div>{day} วัน</div>
        ),
    },
    {
      title: 'เหตุผล',
      dataIndex: 'reason',
      key: 'reason',
      sorter: (a, b) => a.reason - b.reason,
    },
    {
      title: 'สถานภาพ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <div>
          <Button icon={<PlusCircleTwoTone twoToneColor={statusColor(status)} />} block>{status}</Button>
        </div>

        ),
    },
    {
      title: '',
      dataIndex: 'aimage',
      key: 'aimage',
      render: (aimage) => (
          <Space>
            <Avatar src={'/images/avatar/'+aimage}></Avatar>
          </Space>
        ),
    },
    {
      title: 'ผู้อนุมัติ',
      dataIndex: 'approver',
      key: 'approver',
      sorter: (a, b) => a.approver - b.approver,
    },

    {
      title: 'Action',
      // dataIndex: 'reason',
      render: (record) => {
        return (<LeaveDrawer type="2" absent={absents}  record={record}> </LeaveDrawer>)
        // return (<Dropdown.Button id="dd" overlay={<LeaveDrawer type="2" absent={absents}  record={record}> </LeaveDrawer>
        // } icon={<MoreOutlined/>} type="text"></Dropdown.Button>)
      },
    }
];
  return (
     <>
      <Row >
        <Col xs={12} sm={16} md={16} lg={18} xl={20}>
          <h2> การลา </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Leaves</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={2}>
          <LeaveDrawer type="1"  absent={absents}  record={
            {is_full_day:1, todate:null, fromdate: null
            }}> </LeaveDrawer>

        </Col>
      </Row>

      <Row>&nbsp;</Row>

      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="burger" iconColor="blue" subTitle={absents.holiday} title="ลาพักร้อน"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="add-circle" iconColor="primary" subTitle={absents.sick} title="ลาป่วย"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="auth-screen" iconColor="geekblue" subTitle={absents.other} title="อื่นๆ"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="calendar" iconColor="blue" subTitle={absents.available} title="คงเหลือวันลารวม"/>
        </Col>
      </Row>


    <Card>
      <Table className="gx-table-responsive" columns={columns} dataSource={employee_absents}
        pagination={{ showTotal:(total,range) =>  `Showing ${range[0]} to ${range[1]} of ${total} entries`
        ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}/>
    </Card>
    </>
  );
};



export default empleavelist;


const COLOR_NEW_STATUS = 'purple';
const COLOR_APPROVED_STATUS = 'green';
const COLOR_DECLINED_STATUS = 'red';

function statusColor(status) {
  let color = '';
  switch(status) {
    case 'New':
      color = COLOR_NEW_STATUS;
      break;
    case 'Approved':
      color = COLOR_APPROVED_STATUS;
      break;
    case 'Declined':
      color = COLOR_DECLINED_STATUS;
      break;
  }
  return color;
}


