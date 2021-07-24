import React, {useRef} from "react";
import moment from 'moment';
import Link from "next/link"
import {Image, Descriptions } from "antd";
import {Card,  Table, Breadcrumb, Button, Space  } from "antd";
import {Col, Row} from "antd";

import Icon from '@ant-design/icons';
import {PlusCircleTwoTone, EditOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined} from '@ant-design/icons';
import IconWithTextCard from "../../app/components/Metrics/IconWithTextCard";
import { useReactToPrint } from 'react-to-print'
import {payslip } from '../../constants/dummy_data'

class EmpSalarySlip extends React.Component {


render() {
  return (
     <>
    <Card bodyStyle={{padding:100, }}>
      <Row justify="center">
        <Col>
          <h3>ใบสลิปเงินเดือน สำหรับเดือน {payslip.month_year}</h3>
        </Col>
      </Row>
      <Row justify="end">
        <Col>PAYSLIP #{payslip.key}</Col>
      </Row>
      <Row justify="end">
        <Col>สำหรับ เดือน: {payslip.month_year}</Col>
      </Row>

      <Row>
        <Col>
          <Image width={200} src="/images/logoHR.png" />
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>{payslip.company_name}</Row>
      <Row>{payslip.company_address1}</Row>
      <Row>{payslip.company_address2}</Row>
      <Row>&nbsp;</Row>
      <Row>{payslip.emp_name} </Row>
      <Row>{payslip.emp_role} </Row>
      <Row>{payslip.emp_org1} </Row>
      <Row>{payslip.emp_org2} </Row>
      <Row>&nbsp;</Row>

      <Row>
        <Col span={12}>
          <Descriptions bordered column={1} title="เงินรายได้" size="small" contentStyle={{textAlign: 'right'}} >
            <Descriptions.Item label="เงินเดือนค่าจ้าง">{payslip.inc_salary.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="ค่าล่วงเวลา">{payslip.inc_overtime.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="เงินประจำตำแหน่ง">{payslip.inc_position.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="เบี้ยขยัน">{payslip.inc_diligence.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="รวมรับ">{payslip.inc_total.toLocaleString()} บาท</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions bordered column={1} title="รายการหัก" size="small" contentStyle={{textAlign: 'right'}} >
            <Descriptions.Item label="ภาษี ณ ที่จ่าย">{payslip.exp_tax.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="กองทุนสำรองเลี้ยงชีพ">{payslip.exp_fund.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="เช่าซื้อโน้ตบุ้ค">{payslip.exp_leasing_notebook.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="ชำระเงินกู้รายเดือน">{payslip.exp_monthly_loan.toLocaleString()} บาท</Descriptions.Item>
            <Descriptions.Item label="รวมเงินรายการหัก">{payslip.exp_total.toLocaleString()} บาท</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row><b>คงเหลือสุทธิ : {payslip.net_total.toLocaleString()} บาท ({payslip.net_total_string}บาทถ้วน) </b></Row>
    </Card>
    </>
  );
};
}

const Ex = () => {
  const componentRef = useRef()
  const print = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <Row >
        <Col span={18}>
          <h2> ใบสลิปเงินเดือน </h2>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Payslip</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={6}>
          <Space>
            <Button size="small" href={'/slips/'+payslip.slip+'-'+moment().format('YYYY[-]MM')   +'.csv'} target="_blank">CSV</Button>
            <Button size="small" href={'/slips/'+payslip.slip+'-'+moment().format('YYYY[-]MM')   +'.pdf'} target="_blank">PDF</Button>
            <Button size="small" icon={<PrinterOutlined />} onClick={print}>Print</Button>
          </Space>
        </Col>
      </Row>
      <br/>
      <EmpSalarySlip ref={componentRef} />
    </div>
  )
}


export default Ex;
