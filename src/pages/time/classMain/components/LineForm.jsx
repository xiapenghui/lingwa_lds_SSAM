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
const LineForm = (props) => {
  const [form] = Form.useForm();
  const {
    lineModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,
    dispatch,
    tableName,
    ModalTitle,
    // customerList,
    currentUser
  } = props


  let newData = data.mergeList
  //取值
  const onSave = (values) => {
    const data = {
      employeeids: newData,
      defaultlineid: values.defaultlineid
    }
    dispatch({
      type: `${tableName}/ModifyLine`,
      payload: {
        ...data,
        type: 'lineModalVisible'
      }
    })
  }
 
  //取过来显示
  useEffect(() => {
    form.resetFields()
    return () => {
      console.log('clean useEffect')
    }
  }, [lineModalVisible])
  return (
    <Modal
      title={ModalTitle}
      visible={lineModalVisible}
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
      onCancel={() => handleModalClose('lineModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="addModalValueForm"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="defaultlineid"
              label="线体"
              {...formItemLayout}
              rules={[{
                required: true, message: '线体不能为空',
              }]}
            >
              <Select
                showSearch>
                {data.lineList.map(function (item, index) {
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

export default LineForm;
