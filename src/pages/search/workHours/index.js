import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Select, Input, Table, Tag } from "antd";
import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import moment from "moment";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import globalConfig from "../../../../config/defaultSettings";
import ExportJsonExcel from "js-export-excel";
import {
  getDepartement,
  postListInit,
  getArea,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/search/workHours";
import Item from "antd/lib/list/Item";

const workHoursComponent = ({ workHours, dispatch }) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    shiftTypeList,
    personnelList,
    lineList,
    redList,
    timeaxisList,
  } = workHours;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  // const [areaList, setareaList] = useState([]);

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataList, setDataList] = useState([]);
  const [hours, setHours] = useState(0);
  const [average, setAverage] = useState(0);
  const [numCol, setNumCol] = useState(0);
  const [cvalue, setCvalue] = useState(0);

  const { Option } = Select;
  const getColumns = () => [
    // {
    //   title: '年',
    //   dataIndex: 'yearth',
    //   valueType: 'date',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.date : '',
    //   // initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

    //     if (type == 'table') {

    //       // 返回新的组件
    //       return <DatePicker picker="year" />
    //     }
    //     return defaultRender(_);
    //   },
    // },

    // {
    //   title: '月',
    //   dataIndex: 'month',
    //   valueType: 'date',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.date : '',
    //   // initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

    //     if (type == 'table') {

    //       // 返回新的组件
    //       return <DatePicker picker="month" />
    //     }
    //     return defaultRender(_);
    //   },
    // },

    {
      title: "年",
      dataIndex: "yearth",
      valueType: "data",
      align: "center",
      hideInTable: true,
      initialValue: moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == "table") {
          // 返回新的组件
          return <DatePicker picker="year" allowClear={false} />;
        }
        return defaultRender(_);
      },
    },

    {
      title: "月",
      dataIndex: "month",
      valueType: "data",
      align: "center",
      hideInTable: true,
      initialValue: moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == "table") {
          // 返回新的组件
          return <DatePicker picker="month" allowClear={false} />;
        }
        return defaultRender(_);
      },
    },

    {
      title: "班别",
      // dataIndex: 'defalutshifttypeid',
      dataIndex: "classtype",
      valueType: "text",
      align: "center",
      width: 150,
      // hideInTable: true,
      valueEnum: shiftTypeList.length == 0 ? {} : shiftTypeList,
      render: (_, text) => {
        return text.class;
      },
    },

    {
      title: "员工编号",
      dataIndex: "employeeno",
      valueType: "text",
      align: "center",
      // hideInSearch: true,
      fixed: "left",
      width: 150,
    },

    {
      title: "员工姓名",
      dataIndex: "employeename",
      valueType: "text",
      align: "center",
      // hideInSearch: true,
      fixed: "left",
      width: 150,
    },

    // {
    //   title: '员工姓名',
    //   dataIndex: 'employeeid',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 150,
    //   fixed: 'left',
    //   hideInTable: true,
    //   valueEnum: personList.length == 0 ? {} : personList,
    //   initialValue: !IsUpdate ? '' : (UpdateDate.employeeid ? UpdateDate.employeeid.toString() : ''),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form' || type === 'table') {
    //       // 返回新的组件
    //       let newList = []
    //       for (let [key, value] of Object.entries(personList)) {
    //         newList.push({ key: key, label: value.text })
    //       }
    //       return <Select
    //         allowClear
    //         showSearch
    //         optionFilterProp='children'
    //       >
    //         {newList.map(function (item, index) {
    //           return <Select.Option key={index} value={item.key}>
    //             {item.label}
    //           </Select.Option>
    //         })}
    //       </Select>
    //     }
    //     return defaultRender(_);
    //   },
    // },

    // {
    //   title: '部门',
    //   dataIndex: 'departmentid',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInTable: true,
    //   valueEnum: departmentList.length == 0 ? {} : departmentList,
    // },

    // {
    //   title: '区域',
    //   dataIndex: 'areaid',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInTable: true,
    //   valueEnum: areaList.length == 0 ? {} : areaList,
    // },

    {
      title: "排班",
      dataIndex: "hour",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      fixed: "left",
      width: 100,
    },

    {
      title: "工时",
      dataIndex: "periodtime",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      fixed: "left",
      width: 100,
    },

    {
      title: "休假",
      dataIndex: "relax",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      fixed: "left",
      width: 100,
    },

    {
      title: "加班",
      dataIndex: "overwork",
      valueType: "text",
      align: "center",
      fixed: "left",
      hideInSearch: true,
      width: 120,
      // render: (text) => {
      //   return  text;
      // },
      render: (text, record) => {
        let color = record.overwork >= 50 ? "red" : "";
        if (record.overwork >= 50) {
          return <Tag color={color}>{record.overwork}</Tag>;
        } else {
          return <span> {record.overwork}</span>;
        }
      },
    },

    // {
    //   title: '员工属性',
    //   dataIndex: 'employeepattributes',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.employeepattributes : '',
    //   valueEnum: ['全部','正式工', '小时工', '领班', '劳务工' ],
    // },

    {
      title: "员工属性",
      dataIndex: "employeepattributes",
      valueType: "text",
      align: "center",
      hideInTable: true,
      valueEnum: personnelList.length == 0 ? {} : personnelList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate
        ? ""
        : UpdateDate.employeepattributes
        ? UpdateDate.employeepattributes.toString()
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
      title: "1",
      dataIndex: "d01",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "2",
      dataIndex: "d02",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "3",
      dataIndex: "d03",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "4",
      dataIndex: "d04",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "5",
      dataIndex: "d05",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "6",
      dataIndex: "d06",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "7",
      dataIndex: "d07",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "8",
      dataIndex: "d08",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "9",
      dataIndex: "d09",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "10",
      dataIndex: "d10",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "11",
      dataIndex: "d11",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "12",
      dataIndex: "d12",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "13",
      dataIndex: "d13",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "14",
      dataIndex: "d14",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "15",
      dataIndex: "d15",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "16",
      dataIndex: "d16",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "17",
      dataIndex: "d17",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "18",
      dataIndex: "d18",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "19",
      dataIndex: "d19",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },
    {
      title: "20",
      dataIndex: "d20",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "21",
      dataIndex: "d21",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "22",
      dataIndex: "d22",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "23",
      dataIndex: "d23",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "24",
      dataIndex: "d24",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "25",
      dataIndex: "d25",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "26",
      dataIndex: "d26",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "27",
      dataIndex: "d27",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "28",
      dataIndex: "d28",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "29",
      dataIndex: "d29",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "30",
      dataIndex: "d30",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "31",
      dataIndex: "d31",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      width: 80,
    },

    {
      title: "员工状态",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      fixed: "right",
      width: 120,
    },

    {
      title: "确认状态",
      dataIndex: "confirmstate",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      fixed: "right",
      width: 120,
      render: (_, text) => {
        if (text.confirmstate == 1) {
          return (text = "已确认");
        } else {
          return (text = "未确认");
        }
      },
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      yearth: params.yearth.substring(0, 4),
      month: params.month.substring(5, 7),
      departmentid: Number(params.departmentid),
      employeeno: params.employeeno,
      employeename: params.employeename,
      areaid: Number(params.areaid),
      // defalutshifttypeid: Number(params.defalutshifttypeid),
      classtype: params.classtype,
      employeepattributes: params.employeepattributes,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      setDataList(value.list);
      // var num = 0;
      // value.list.map((item) => {
      //   num = item.overwork + num;
      //   setHours(num);
      //   setAverage(num / value.list.length);
      // });
     
      setHours(value.list.length==0 ? 0 : value.list[0].sumoverwork);
      setAverage(value.list.length==0 ? 0:   (value.list[0].sumoverwork / value.list.length).toFixed(2));
      setCvalue(value.list.length==0 ? 0 : value.list[0].cvalue);

      return {
        data:  value.list,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
      };
    });
  };

  // 导出
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          employeeno: dataList[i].employeeno,
          employeename: dataList[i].employeename,
          hour: dataList[i].hour,
          periodtime: dataList[i].periodtime,
          relax: dataList[i].relax,
          overwork: dataList[i].overwork,
          class: dataList[i].class,
          d01: dataList[i].d01,
          d02: dataList[i].d02,
          d03: dataList[i].d03,
          d04: dataList[i].d04,
          d05: dataList[i].d05,
          d06: dataList[i].d06,
          d07: dataList[i].d07,
          d08: dataList[i].d08,
          d09: dataList[i].d09,
          d10: dataList[i].d10,
          d11: dataList[i].d11,
          d12: dataList[i].d12,
          d13: dataList[i].d13,
          d14: dataList[i].d14,
          d15: dataList[i].d15,
          d16: dataList[i].d16,
          d17: dataList[i].d17,
          d18: dataList[i].d18,
          d19: dataList[i].d19,
          d20: dataList[i].d20,
          d21: dataList[i].d21,
          d22: dataList[i].d22,
          d23: dataList[i].d23,
          d24: dataList[i].d24,
          d25: dataList[i].d25,
          d26: dataList[i].d26,
          d27: dataList[i].d27,
          d28: dataList[i].d28,
          d29: dataList[i].d29,
          d30: dataList[i].d30,
          d31: dataList[i].d31,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "工时查询";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "employeeno",
          "employeename",
          "hour",
          "periodtime",
          "relax",
          "overwork",
          "class",
          "d01",
          "d02",
          "d03",
          "d04",
          "d05",
          "d06",
          "d07",
          "d08",
          "d09",
          "d10",
          "d11",
          "d12",
          "d13",
          "d14",
          "d5",
          "d16",
          "d17",
          "d18",
          "d19",
          "d20",
          "d21",
          "d22",
          "d23",
          "d24",
          "d25",
          "d26",
          "d27",
          "d28",
          "d29",
          "d30",
          "d31",
        ],
        sheetHeader: [
          "员工编号",
          "员工名称",
          "排班",
          "工时",
          "休假",
          "加班",
          "班别",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <PageContainer>
      <ProTable
        // headerTitle="查询表格"
        headerTitle={
          <>
            <span>查询表格</span>
            <span
              style={{ color: "red", fontSize: "16px", marginLeft: "10px" }}
            >
              {/* *列表行数&nbsp;{numCol}&nbsp;行，加班总时长&nbsp;{hours}&nbsp;小时,平均加班工时&nbsp;{average}&nbsp;小时 */}
              *加班总时长&nbsp;{hours}&nbsp;小时,平均加班工时&nbsp;{average}
              &nbsp;小时, 薪资系数&nbsp;{cvalue}
            </span>
          </>
        }
        actionRef={actionRef}
        // manualRequest={true}
        scroll={{ x: 2500, y: 500 }}
        pagination={false}
        rowKey="employeeno"
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
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
        ></FooterToolbar>
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
          rowKey="employeeno"
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
            rowKey="employeeno"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ workHours }) => ({ workHours }))(workHoursComponent);
