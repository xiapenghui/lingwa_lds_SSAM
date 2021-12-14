import React from 'react';
import { Modal, Row, Col, } from 'antd';
const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
    maskClosable={false}
      destroyOnClose
      title="新建"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={700}
    >
     <Row gutter={16}>
        <Col className="gutter-row  boxTbale" span={24}>
          {props.children}
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateForm;
