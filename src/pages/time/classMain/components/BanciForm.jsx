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
const BanciForm = (props) => {
  const [form] = Form.useForm();
  const {
    banciModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,
    dispatch,
    tableName,
    ModalTitle,
    mergeList,
    DeleteIdArray,
    shifList,
    currentUser
  } = props


  // 取过来显示
  useEffect(() => {
    return () => {
      console.log('clean useEffect')
    }
  }, [banciModalVisible])

  let newData = data.mergeList
  //取值
  const onSave = (values) => {
    const data = {
      employeeids: newData,
      defaultshiftclassid: values.defaultshiftclassid
    }
    dispatch({
      type: `${tableName}/Modifyshiftclass`,
      payload: {
        ...data,
        type: 'banciModalVisible'
      }
    })
  }


  return (
    <Modal
      title={ModalTitle}
      visible={banciModalVisible}
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
      onCancel={() => handleModalClose('banciModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="addModalValueForm"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="defaultshiftclassid"
              label="班次"
              {...formItemLayout}
              rules={[{
                required: true, message: '班次不能为空',
              }]}
            >
              <Select
                showSearch
              >
                {data.shifList.map(function (item, index) {
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

export default BanciForm;
