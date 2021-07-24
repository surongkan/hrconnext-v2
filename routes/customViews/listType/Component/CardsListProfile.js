import React from "react";
import {Button, Dropdown, Menu, Space} from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';


function CardsListProfile({styleName, data}) {
  const {avatar, name, lastname, role, org1, org2} = data;
  return (
    <div className={`gx-user-list ${styleName}`} style={{paddingBottom:0,maxHeight:170}}>
    <Space direction='vertical'>
      <img alt="..." src={'/images/avatar/'+avatar} className="gx-avatar-img gx-border-0"
      style={{position:'relative',top:-50}}/>
      <p style={{position:'relative',top:-50}}>{name} {lastname}</p>
        <p style={{position:'relative',top:-60}} className="gx-text-grey gx-mb-2">{role }</p>
        <p style={{position:'relative',top:-70}} className="gx-text-grey gx-mb-2">{org1}</p>
        <p  style={{position:'relative',top:-80}}className="gx-text-grey gx-mb-2">{org2}</p>
    </Space>
      <div className="gx-card-list-header">
        <Dropdown.Button overlay={menu} icon={<MoreOutlined/>} type="text"></Dropdown.Button>
      </div>
    </div>
  );
}

export default CardsListProfile;
const menu = (
  <Menu mode="horizontal">
    <Menu.Item key="1" icon={<EditOutlined />} >แก้ไข</Menu.Item>
    <Menu.Item key="2" icon={<DeleteOutlined />} >ลบ</Menu.Item>
  </Menu>
);
