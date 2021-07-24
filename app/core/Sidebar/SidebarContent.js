import React, {useEffect} from "react";
import {Menu} from "antd";
import Link from "next/link";

import {useRouter} from 'next/router'
import CustomScrollbars from "../../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../../constants/ThemeSetting";
import IntlMessages from "../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {setPathName} from "../../../redux/actions";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = () => {

  const dispatch = useDispatch();
  const router = useRouter()
  let {navStyle, themeType, pathname} = useSelector(({settings}) => settings);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  useEffect(() => {
    dispatch(setPathName(router.pathname))
  }, [router.pathname]);

  const selectedKeys = router.pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
          {/* <AppsNavigation/> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
              <Menu.Item key="main/empleavelist">
                <Link href="/main/emp_leavelist"><a> <i className="icon icon-card" style={{color:"white"}}/>
                  <span><IntlMessages id="sidebar.emp_leaves_list"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="main/empleavedetail">
                <Link href="/main/emp_leavedetail"><a><i className="icon icon-card" style={{color:"yellow"}}/>
                  <span><IntlMessages id="sidebar.emp_leaves_detail"/></span></a></Link>
              </Menu.Item> */}

              <Menu.Item key="main/salarylist">
                <Link href="/main/layouts"><a><i className="icon icon-card" />
                  <span> <IntlMessages id="sidebar.emp_salary_list"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="main/salaryslip">
                <Link href="/main/emp_salary_slip"><a><i className="icon icon-card" style={{color:"white"}}/>
                  <span> <IntlMessages id="sidebar.emp_salary_slip"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="main/emp_timesheet_list">
                <Link href="/main/emp_timesheet_list"><a><i className="icon icon-card" style={{color:"white"}}/>
                  <span> <IntlMessages id="sidebar.emp_timesheet_list"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="main/emp_timesheet_detail">
                <Link href="/main/emp_timesheet_detail"><a><i className="icon icon-card" style={{color:"yellow"}}/>
                  <span> <IntlMessages id="sidebar.emp_timesheet_detail"/></span></a></Link>
              </Menu.Item> */}

              <Menu.Item key="main/emp_consent_list">
                <Link href="/main/layouts"><a><i className="icon icon-card"/>
                  <span> <IntlMessages id="sidebar.emp_consent_list"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="main/emp_consent_detail">
                <Link href="/main/layouts"><a><i className="icon icon-card"/>
                  <span> <IntlMessages id="sidebar.emp_consent_detail"/></span></a></Link>
              </Menu.Item> */}

            </MenuItemGroup>

            <MenuItemGroup key="in-built-apps" className="gx-menu-group" title={<IntlMessages id="sidebar.hr"/>}>
              {/* <Menu.Item key="hr-dashboard">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_dashboard"/></span></a></Link>
              </Menu.Item> */}

              <Menu.Item key="hr_emplist">
                <Link href="/main/hr_employee_list"><a><i
                  className="icon icon-contacts" style={{color:"white"}}/><span><IntlMessages
                  id="sidebar.hr_employee_list"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="hr_empcrud">
                <Link href="/main/employee"><a><i className="icon icon-contacts"  style={{color:"yellow"}}/><span><IntlMessages
                  id="sidebar.hr_employee_crud_employee"/></span></a></Link>
              </Menu.Item> */}

              <SubMenu key="hr_employee_profile" popupClassName={getNavStyleSubMenuClass(navStyle)}
                       title={<span><i className="icon icon-dasbhoard" style={{color:"white"}}/>
                         <span><IntlMessages id="sidebar.hr_employee_profile"/></span></span>}>

              <Menu.Item key="hr_emp_profile0">
                <Link href="/main/hr_employee_profile0"><a><i className="icon icon-contacts" style={{color:"white"}}/><span><IntlMessages
                  id="sidebar.hr_employee_profile0"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="hr_emp_profile1">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile1"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile2">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile2"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile3">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile3"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile4">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile4"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile5">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile5"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile6">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile6"/></span></a></Link>
              </Menu.Item> */}

              <Menu.Item key="hr_emp_profile7">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile7"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile8">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile8"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile9">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile9"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile10">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile10"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_emp_profile11">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_employee_profile11"/></span></a></Link>
              </Menu.Item>
              </SubMenu>


              <SubMenu key="hr_employee_finance" popupClassName={getNavStyleSubMenuClass(navStyle)}
                       title={<span><i className="icon icon-crypto" style={{color:"white"}}/>
                         <span><IntlMessages id="sidebar.hr_finance"/></span></span>}>

              <Menu.Item key="sidebar.hr_salary">
                <Link href="/main/hr_salary"><a><i className="icon icon-contacts" style={{color:"white"}}/><span><IntlMessages
                  id="sidebar.hr_salary"/></span></a></Link>
              </Menu.Item>
              <Menu.Item key="sidebar.hr_salary_master">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_salary_master"/></span></a></Link>
              </Menu.Item>
              <Menu.Item key="sidebar.hr_salary_pf">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_salary_pf"/></span></a></Link>
              </Menu.Item>
              <Menu.Item key="sidebar.hr_salary_ot">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_salary_ot"/></span></a></Link>
              </Menu.Item>

            </SubMenu>

            {/* เมนูที่ไม่ใช้งาน */}

              <Menu.Item key="hr_vacation">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_vacation"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_org_leave">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_org_leave"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_leave_setting">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_leave_setting"/></span></a></Link>
              </Menu.Item>

              {/* <Menu.Item key="hr_org_timesheet">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_org_timesheet"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_org_timesheet">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_org_timesheet"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="hr_org_timesheet">
                <Link href="/main/layouts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.hr_org_timesheet"/></span></a></Link>
              </Menu.Item> */}

            </MenuItemGroup>

            {/* <MenuItemGroup key="in-built-apps" className="gx-menu-group"
                           title={<IntlMessages id="sidebar.inBuiltApp"/>}>
              <Menu.Item key="in-built-apps/mail">
                <Link href="/in-built-apps/mail"><a><i className="icon icon-email"/><span><IntlMessages
                  id="sidebar.mailApp"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="in-built-apps/todo">
                <Link href="/in-built-apps/todo"><a><i
                  className="icon icon-check-square-o"/><span><IntlMessages
                  id="sidebar.todoApp"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="in-built-apps/contacts">
                <Link href="/in-built-apps/contacts"><a><i className="icon icon-contacts"/><span><IntlMessages
                  id="sidebar.contactsApp"/></span></a></Link>
              </Menu.Item>

              <Menu.Item key="in-built-apps/chat">
                <Link href="/in-built-apps/chat"><a><i
                  className="icon icon-chat-bubble -flex-column-reverse"/><span><IntlMessages
                  id="sidebar.chatApp"/></span></a></Link>
              </Menu.Item>
            </MenuItemGroup> */}

            {/* <MenuItemGroup key="social-apps" className="gx-menu-group" title={<IntlMessages id="sidebar.social"/>}>
              <Menu.Item key="social-apps/profile">
                <Link href="/social-apps/profile">
                  <a><i className="icon icon-profile2"/>
                    <span><IntlMessages id="sidebar.extensions.profile"/></span>
                  </a></Link>
              </Menu.Item>

              <Menu.Item key="social-apps/wall">
                <Link href="/social-apps/wall">
                  <a><i className="icon icon-avatar -flex-column-reverse"/>
                    <span><IntlMessages id="sidebar.wall"/></span>
                  </a></Link>
              </Menu.Item>
            </MenuItemGroup> */}

            {/* <MenuItemGroup key="components" className="gx-menu-group" title={<IntlMessages id="sidebar.components"/>}>

              <SubMenu key="general" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span><i className="icon icon-all-contacts"/>
                   <span><IntlMessages id="sidebar.components.general"/></span>
              </span>}>
                <Menu.Item key="components/general/button">
                  <Link href="/components/general/button">
                    <span><IntlMessages id="sidebar.general.button"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="components/general/icon">
                  <Link href="/components/general/icon">
                    <span><IntlMessages id="sidebar.general.icon"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="navigation" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <i className="icon icon-navigation"/>
                  <span><IntlMessages id="sidebar.components.navigation"/></span>
              </span>}>
                <Menu.Item key="components/navigation/affix">
                  <Link href="/components/navigation/affix">
                    <span><IntlMessages
                      id="sidebar.navigation.affix"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/breadcrumb">
                  <Link href="/components/navigation/breadcrumb">
                    <span><IntlMessages
                      id="sidebar.navigation.breadcrumb"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/dropdown">
                  <Link href="/components/navigation/dropdown">
                    <span><IntlMessages
                      id="sidebar.navigation.dropdown"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/menu">
                  <Link href="/components/navigation/menu">
                    <span><IntlMessages
                      id="sidebar.navigation.menu"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/pagination">
                  <Link href="/components/navigation/pagination">
                    <span><IntlMessages
                      id="sidebar.navigation.pagination"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/navigation/steps">
                  <Link href="/components/navigation/steps">
                    <span><IntlMessages
                      id="sidebar.navigation.steps"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="data-entry" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span>
                  <i className="icon icon-data-entry"/>
                  <span><IntlMessages id="sidebar.components.dataEntry"/></span>
              </span>}>
                <Menu.Item key="components/data-entry/auto-complete">
                  <Link href="/components/data-entry/auto-complete">
                    <span><IntlMessages
                      id="sidebar.dataEntry.autoComplete"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/checkbox">
                  <Link href="/components/data-entry/checkbox">
                    <span><IntlMessages
                      id="sidebar.dataEntry.checkbox"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/cascader">
                  <Link href="/components/data-entry/cascader">
                    <span><IntlMessages
                      id="sidebar.dataEntry.cascader"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/date-picker">
                  <Link href="/components/data-entry/date-picker">
                    <span><IntlMessages
                      id="sidebar.dataEntry.datePicker"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/form">
                  <Link href="/components/data-entry/form">
                    <span><IntlMessages
                      id="sidebar.dataEntry.form"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/input-number">
                  <Link href="/components/data-entry/input-number">
                    <span><IntlMessages
                      id="sidebar.dataEntry.inputNumber"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/input">
                  <Link href="/components/data-entry/input">
                    <span><IntlMessages
                      id="sidebar.dataEntry.input"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/mention">
                  <Link href="/components/data-entry/mention">
                    <span><IntlMessages
                      id="sidebar.dataEntry.mention"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/rate">
                  <Link href="/components/data-entry/rate">
                    <span><IntlMessages
                      id="sidebar.dataEntry.rate"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/radio">
                  <Link href="/components/data-entry/radio">
                    <span><IntlMessages
                      id="sidebar.dataEntry.radio"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/switch">
                  <Link href="/components/data-entry/switch">
                    <span><IntlMessages
                      id="sidebar.dataEntry.switch"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/slider">
                  <Link href="/components/data-entry/slider">
                    <span><IntlMessages
                      id="sidebar.dataEntry.slider"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/select">
                  <Link href="/components/data-entry/select">
                    <span><IntlMessages
                      id="sidebar.dataEntry.select"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/tree">
                  <Link href="/components/data-entry/tree-select">
                    <span><IntlMessages
                      id="sidebar.dataEntry.treeSelect"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/transfer">
                  <Link href="/components/data-entry/transfer">
                    <span><IntlMessages
                      id="sidebar.dataEntry.transfer"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/time-picker">
                  <Link href="/components/data-entry/time-picker">
                    <span><IntlMessages
                      id="sidebar.dataEntry.timePicker"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-entry/upload">
                  <Link href="/components/data-entry/upload">
                    <span><IntlMessages
                      id="sidebar.dataEntry.upload"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="data-display" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span><i className="icon icon-data-display"/>

                    <span><IntlMessages id="sidebar.components.dataDisplay"/></span>

              </span>}>
                <Menu.Item key="components/data-display/avatar">
                  <Link href="/components/data-display/avatar">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.avatar"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/badge">
                  <Link href="/components/data-display/badge">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.badge"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/collapse">
                  <Link href="/components/data-display/collapse">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.collapse"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/carousel">
                  <Link href="/components/data-display/carousel">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.carousel"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/card">
                  <Link href="/components/data-display/card">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.card"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/calendar">
                  <Link href="/components/data-display/calendar">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.calender"/></span></Link>
                </Menu.Item>

                <Menu.Item key="components/data-display/popover">
                  <Link href="/components/data-display/popover">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.popover"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/tree">
                  <Link href="/components/data-display/tree">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.tree"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/tooltip">
                  <Link href="/components/data-display/tooltip">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.toolTips"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/timeline">
                  <Link href="/components/data-display/timeline">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.timeLine"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/tag">
                  <Link href="/components/data-display/tag">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.tag"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/data-display/tabs">
                  <Link href="/components/data-display/tabs">
                    <span><IntlMessages
                      id="sidebar.dataDisplay.tabs"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="feedBack" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span><i className="icon icon-feedback"/>
                    <span><IntlMessages id="sidebar.components.feedBack"/></span>

              </span>}>
                <Menu.Item key="components/feedBack/alert">
                  <Link href="/components/feedBack/alert">
                    <span><IntlMessages
                      id="sidebar.feedBack.alert"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/modal">
                  <Link href="/components/feedBack/modal">
                    <span><IntlMessages
                      id="sidebar.feedBack.modal"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/message">
                  <Link href="/components/feedBack/message">
                    <span><IntlMessages
                      id="sidebar.feedBack.message"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/notification">
                  <Link href="/components/feedBack/notification">
                    <span><IntlMessages
                      id="sidebar.feedBack.notification"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/progress">
                  <Link href="/components/feedBack/progress">
                    <span><IntlMessages
                      id="sidebar.feedBack.progress"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/popconfirm">
                  <Link href="/components/feedBack/popconfirm">
                    <span><IntlMessages id="sidebar.feedBack.popConfirm"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="components/feedBack/spin">
                  <Link href="/components/feedBack/spin">
                    <span><IntlMessages
                      id="sidebar.feedBack.spin"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="others" popupClassName={getNavStyleSubMenuClass(navStyle)} title={
                <span><i className="icon icon-inbox"/>
                    <span><IntlMessages id="sidebar.components.other"/></span>

              </span>}>
                <Menu.Item key="components/others/anchor">
                  <Link href="/components/others/anchor">
                    <span><IntlMessages
                      id="sidebar.other.anchor"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/others/backtop">
                  <Link href="/components/others/backtop">
                    <span><IntlMessages
                      id="sidebar.other.backTop"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/others/divider">
                  <Link href="/components/others/divider">
                    <span><IntlMessages
                      id="sidebar.other.divider"/></span></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="table" popupClassName={getNavStyleSubMenuClass(navStyle)}
                       title={
                         <span><i className="icon icon-table"/>

                             <span><IntlMessages id="sidebar.dataDisplay.table"/></span>

                         </span>}>
                <Menu.Item key="components/table/basic">
                  <Link href="/components/table/basic">
                    <span><IntlMessages
                      id="sidebar.view.basicTable"/></span></Link>
                </Menu.Item>
                <Menu.Item key="components/table/data">
                  <Link href="/components/table/data">
                    <span><IntlMessages
                      id="sidebar.view.dataTable"/></span></Link>
                </Menu.Item>
              </SubMenu>

            </MenuItemGroup> */}




          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
