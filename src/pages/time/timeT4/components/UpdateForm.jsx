import React from 'react';
import { Modal , Row, Col, } from 'antd';

const UpdateForm = (props) => {
  const { modalVisible, onCancel } = props
  return (
    <Modal
    maskClosable={false}
      destroyOnClose
      title={props.title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
       {props.children}
    </Modal>
  );
};

export default UpdateForm;
