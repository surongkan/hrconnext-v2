import React from "react";
import {Button, Dropdown, Menu, Space} from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import HrEmployeeDrawer from "../../app/components/HrDrawers/hr_emp_drawer"



function CardsListProfile({styleName, data}) {
  const {avatar, name, lastname, role, org1, org2} = data;
  return (
    <div className={`gx-user-list ${styleName}`} style={{paddingBottom:0}}>
    <Space direction='vertical'>
      <img alt="..." src={'/images/avatar/'+avatar} className="gx-avatar-img gx-border-0"
      style={{position:'relative'}}/>
      <p style={{position:'relative'}}>{name} {lastname}</p>
        <p style={{position:'relative'}} className="gx-text-grey gx-mb-2">{role }</p>
        <p style={{position:'relative'}} className="gx-text-grey gx-mb-2">{org1}</p>
        <p  style={{position:'relative'}}className="gx-text-grey gx-mb-2">{org2}</p>
    </Space>
      <div className="gx-card-list-header">
        <HrEmployeeDrawer type="2"  record={data}> </HrEmployeeDrawer>
      </div>
    </div>
  );
}

export default CardsListProfile;

