import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ExportJsonExcel from "js-export-excel";

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/product/line";

const lineComponent = ({ line, dispatch }) => {
  const { productList, areaList } = line;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataList, setDataList] = useState([]);

  const getColumns = () => [
    {
      title: "线体编号",
      dataIndex: "lineno",
      valueType: "text",
      align: "center",
      width: 300,
      initialValue: IsUpdate ? UpdateDate.lineno : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "线体编号不能为空!",
          },
        ],
      },
    },
    {
      title: "线体名称",
      dataIndex: "linename",
      valueType: "text",
      align: "center",
      width: 300,
      initialValue: IsUpdate ? UpdateDate.linename : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "线体名称不能为空!",
          },
        ],
      },
    },

    {
      title: "所属产品族",
      dataIndex: "productareaid",
      valueType: "text",
      align: "center",
      valueEnum: areaList.length == 0 ? {} : areaList,
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.productareaid
        ? UpdateDate.productareaid.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(areaList)) {
            newList.push({ key: key, label: value.text });
          }
          return (
            <Select allowClear showSearch optionFilterProp="children">
              {newList.map(function (item, index) {
                return (
                  <Select.Option key={index} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          );
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "所属产品族不能为空!",
          },
        ],
      },
    },

    // {
    //   title: '默认产量',
    //   dataIndex: 'defalutparts',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInSearch:true,
    //   hideInForm:true,
    //   initialValue: IsUpdate ? UpdateDate.defalutparts : '',
    // },

    {
      title: "目标KE/OEE",
      dataIndex: "targetKE",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetKE : 98,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "目标KE/OEE不能为空!",
          },
        ],
      },
    },

    {
      title: "目标IE/SUR",
      dataIndex: "targetIE",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetIE : 43,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "目标IE/SUR不能为空!",
          },
        ],
      },
    },

    {
      title: "线体属性",
      dataIndex: "linetype",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.linetype : "",
      valueEnum: ["KE", "OEE"],
      formItemProps: {
        rules: [
          {
            required: true,
            message: "线体属性不能为空!",
          },
        ],
      },
    },

    {
      title: "焊接属性",
      dataIndex: "weldtype",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.weldtype : "",
      valueEnum: ["焊接", "非焊接"],
      formItemProps: {
        rules: [
          {
            required: true,
            message: "焊接属性不能为空!",
          },
        ],
      },
    },

    {
      title: "备注",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setIsUpdate(true);
              setUpdateDate({ ...record });
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      lineno: params.lineno,
      linename: params.linename,
      familyid: Number(params.familyid),
      productareaid: Number(params.productareaid),
      productarea: params.productarea == null ? "" : params.productarea,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      setDataList(value.list);
      return {
        data: value.list,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
      };
    });
  };

  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading("正在添加");
    try {
      let data = await addPost({
        lineno: fields.lineno,
        linename: fields.linename,
        familyid:
          Number(fields.familyid) == null ? "" : Number(fields.familyid),
        productareaid:
          Number(fields.productareaid) == null
            ? ""
            : Number(fields.productareaid),
        targetKE: fields.targetKE,
        targetIE: fields.targetIE,
        linetype: fields.linetype,
        weldtype: fields.weldtype,
        remark: fields.remark,
      });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("添加失败请重试！");
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

  const handleUpdate = async (fields) => {
    const hide = message.loading("正在编辑");
    console.log("handleUpdate", fields);
    try {
      let data = await updatePut({
        lineid: UpdateDate.lineid,
        lineno: fields.lineno,
        linename: fields.linename,
        familyid: Number(fields.familyid),
        productareaid: Number(fields.productareaid),
        targetKE: fields.targetKE,
        targetIE: fields.targetIE,
        linetype: fields.linetype,
        weldtype: fields.weldtype,
        // defalutparts:fields.defalutparts,
        remark: fields.remark,
      });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("编辑失败请重试！");
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        lineids: selectedRows.map((row) => row.lineid),
      });

      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
      return false;
    }
  };

  // 导出
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          lineno: dataList[i].lineno,
          linename: dataList[i].linename,
          familyname: dataList[i].familyname,
          targetKE: dataList[i].targetKE,
          targetIE: dataList[i].targetIE,
          linetype: dataList[i].linetype == "0" ? "KE" : "OEE",
          weldtype: dataList[i].weldtype == "0" ? "焊接" : "非焊接",
          remark: dataList[i].remark,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "线体信息";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "lineno",
          "linename",
          "familyname",
          "targetKE",
          "targetIE",
          "linetype",
          "weldtype",
          "remark",
        ],
        sheetHeader: [
          "线体编号",
          "线体名称",
          "所属工厂",
          "目标KE/OEE",
          "目标IE/SUR",
          "线体属性",
          "焊接属性",
          "备注",
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        pagination={false}
        rowKey="lineid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => downloadExcel()}>
            <UploadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{" "}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{" "}
              项&nbsp;&nbsp;
              <span></span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>

          {/* <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button> */}
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title="新建"
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="lineid"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleUpdateModalVisible(false);
          }}
          modalVisible={updateModalVisible}
          title="编辑"
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="lineid"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ line }) => ({ line }))(lineComponent);
