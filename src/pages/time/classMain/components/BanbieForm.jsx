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
const BanbieForm = (props) => {
  const [form] = Form.useForm();
  const {
    banbieModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,
    dispatch,
    tableName,
    ModalTitle,
    mergeList,
    shiftTypeList,
    currentUser
  } = props

  let newData = data.mergeList
  //取值
  const onSave = (values) => {
    const data = {
      employeeids: newData,
      defalutshifttypeid: values.defalutshifttypeid
    }
    dispatch({
      type: `${tableName}/ModifyShiftType`,
      payload: {
        ...data,
        type: 'banbieModalVisible'
      }
    })
  }

  //取过来显示
  useEffect(() => {

    return () => {

    }
  }, [banbieModalVisible])
  return (
    <Modal
      title={ModalTitle}
      visible={banbieModalVisible}
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
      onCancel={() => handleModalClose('banbieModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="addModalValueForm"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="defalutshifttypeid"
              label="班别"
              {...formItemLayout}
              rules={[{
                required: true, message: '班别不能为空',
              }]}
            >
              <Select
                showSearch>
                {data.shiftTypeList.map(function (item, index) {
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

export default BanbieForm;
