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
} from "@/services/organization/personnel";

const personnelComponent = ({ personnel, dispatch }) => {
  const {
    departmentList,
    areaList,
    lineList,
    shiftTypeList,
    personnelList,
    stateList,
  } = personnel;
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
      title: "员工编号",
      dataIndex: "employeeno",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.employeeno : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "员工编号不能为空!",
          },
        ],
      },
    },
    {
      title: "员工名称",
      dataIndex: "employeename",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.employeename : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "员工名称不能为空!",
          },
        ],
      },
    },

    {
      title: "部门名称",
      dataIndex: "departmentid",
      valueType: "text",
      align: "center",
      valueEnum: departmentList.length == 0 ? {} : departmentList,
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.departmentid
        ? UpdateDate.departmentid.toString()
        : "",

      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(departmentList)) {
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
            message: "部门不能为空!",
          },
        ],
      },
    },

    {
      title: "区域",
      dataIndex: "areaid",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.areaid
        ? UpdateDate.areaid.toString()
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
    },

    {
      title: "线体",
      dataIndex: "defaultlineid",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      valueEnum: lineList.length == 0 ? {} : lineList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.defaultlineid
        ? UpdateDate.defaultlineid.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(lineList)) {
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
    },

    {
      title: "班别",
      dataIndex: "defaultshiftclass",
      valueType: "text",
      align: "center",
      valueEnum: shiftTypeList.length == 0 ? {} : shiftTypeList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.defaultshiftclass
        ? UpdateDate.defaultshiftclass.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(shiftTypeList)) {
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
            message: "班别不能为空!",
          },
        ],
      },
    },

    {
      title: "员工属性",
      dataIndex: "pattributes",
      valueType: "text",
      align: "center",
      valueEnum: personnelList.length == 0 ? {} : personnelList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.pattributes
        ? UpdateDate.pattributes.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(personnelList)) {
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
            message: "员工属性选项不能为空!",
          },
        ],
      },
    },

    {
      title: "员工状态",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      valueEnum: stateList.length == 0 ? {} : stateList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.state
        ? UpdateDate.state.toString()
        : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(stateList)) {
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
            message: "员工状态选项不能为空!",
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
      fixed: "right",
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
      employeeno: params.employeeno == null ? "" : params.employeeno,
      employeename: params.employeename == null ? "" : params.employeename,
      departmentid: Number(params.departmentid),
      defaultshiftclass: Number(params.defaultshiftclass),
      state: Number(params.state),
      pattributes: Number(params.pattributes),
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
      let params = {
        employeeno: fields.employeeno,
        employeename: fields.employeename,
        departmentid: fields.departmentid,
        areaid: Number(fields.areaid) == null ? "" : Number(fields.areaid),
        defaultlineid:
          Number(fields.defaultlineid) == null
            ? ""
            : Number(fields.defaultlineid),
        defaultshiftclass:
          Number(fields.defaultshiftclass) == null
            ? ""
            : Number(fields.defaultshiftclass),
        state: Number(fields.state) == null ? "" : Number(fields.state),
        pattributes:
          Number(fields.pattributes) == null ? "" : Number(fields.pattributes),
        remark: fields.remark,
      };
      let data = await addPost(params);
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
    try {
      let data = await updatePut({
        employeeid: UpdateDate.employeeid,
        employeeno: fields.employeeno,
        employeename: fields.employeename,
        departmentid: Number(fields.departmentid),
        areaid: Number(fields.areaid),
        defaultlineid: Number(fields.defaultlineid),
        defaultshiftclass: Number(fields.defaultshiftclass),
        state: Number(fields.state),
        pattributes: Number(fields.pattributes),
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
        employeeids: selectedRows.map((row) => row.employeeid),
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
    console.log("dataList", dataList);
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          employeeno: dataList[i].employeeno,
          employeename: dataList[i].employeename,
          departmentshortname: dataList[i].departmentshortname,
          areaname: dataList[i].areaname,
          defaultlinename: dataList[i].defaultlinename,
          defaultshiftclassname: dataList[i].defaultshiftclassname,
          pattributes: dataList[i].pattributes,
          state: dataList[i].state,
          remark: dataList[i].remark,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "员工信息";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "employeeno",
          "employeename",
          "departmentshortname",
          "areaname",
          "defaultlinename",
          "defaultshiftclassname",
          "pattributes",
          "state",
          "remark",
        ],
        sheetHeader: [
          "员工编号",
          "员工名称",
          "部门名称",
          "线体",
          "班别",
          "员工属性",
          "员工状态",
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
        rowKey="employeeid"
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
          rowKey="employeeid"
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
            rowKey="employeeid"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ personnel }) => ({ personnel }))(personnelComponent);
