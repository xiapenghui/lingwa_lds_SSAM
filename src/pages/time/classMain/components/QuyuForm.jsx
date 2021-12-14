import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'

import {
  getBycustomer,
  getBybillid,
  getbyname
} from '@/services/receivavles/amoutInfo';
import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles
const formItemLayout = globalConfig.table.formItemLayout
const QuyuForm = (props) => {
  const [form] = Form.useForm();
  const {
    quyuModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,
    dispatch,
    tableName,
    ModalTitle,
    areaList,
    currentUser
  } = props


  let newData = data.mergeList
  //取值
  const onSave = (values) => {
    const data = {
      employeeids: newData,
      areaid: values.areaid
    }
    dispatch({
      type: `${tableName}/ModifyArea`,
      payload: {
        ...data,
        type: 'quyuModalVisible'
      }
    })
  }

  console.log('test.', data.customerList)
  //取过来显示
  useEffect(() => {
    form.resetFields()
    return () => {
      console.log('clean useEffect')
    }
  }, [quyuModalVisible])
  return (
    <Modal
      title={ModalTitle}
      visible={quyuModalVisible}
      width={ModalWidth}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSave(values);
          })
          .catch((info) => {
          });
      }}
      onCancel={() => handleModalClose('quyuModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="addModalValueForm"
      >
        <Row>
          <Col span={24} >
            <Form.Item
              name="areaid"
              label="区域"
              {...formItemLayout}
              rules={[{
                required: true, message: '区域不能为空',
              }]}
            >
              <Select
                showSearch>
                {data.areaList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default QuyuForm;
