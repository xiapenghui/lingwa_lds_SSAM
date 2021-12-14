import React from "react";
import { Modal, Row, Col, Upload, message, Button, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImportExcel = (props) => {
  const { modalVisible, onCancel } = props;
  const dataInfo = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: (file) => {
      debugger;
      if (
        file.type !== "application/vnd.ms-excel" ||
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error(`${file.name} 格式不正确`);
      }
      return file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ? true
        : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  
  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="导入文件"
      visible={modalVisible}
      cancelText={Modal.confirm}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Upload {...dataInfo}>
        <Button icon={<UploadOutlined />}>请选择文件</Button>
        <div style={{ marginTop: "10px" }}>
          <Tag color="red">文件必须是:xlsx 或 xls</Tag>
        </div>
      </Upload>
    </Modal>
  );
};

export default ImportExcel;
