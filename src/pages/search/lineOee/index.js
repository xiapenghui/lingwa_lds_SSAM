import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  DatePicker,
  Select,
  Tag,
  Table,
  Row,
  Col,
  Card,
} from "antd";
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
import "./components/common.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDepartement,
  postListInit,
  getArea,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from "@/services/search/lineOee";
import { BackgroundColor } from "chalk";

const productOeeComponent = ({ lineOee, dispatch }) => {
  const { productList, areaList, shifList ,lineList} = lineOee;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [titleInfo, settitleInfo] = useState("122");

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataSum, setDataSum] = useState([]);
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      title: "班次",
      dataIndex: "shiftname",
      align: "center",
      width: 100,
      fixed: "left",
      render: (text, action) => {
        if (action.shiftid == null) {
          return (text = "-");
        }
      },
    },
    

    {
      title: "线体",
      dataIndex: "linename",
      align: "center",
      width: 100,
      fixed: "left",
      
    },

    {
      title: "OT",
      dataIndex: "ot",
      align: "center",
      width: 100,
    },

    {
      title: "ut",
      dataIndex: "ut",
      align: "center",
      width: 100,
    },

    {
      title: "dt",
      dataIndex: "dt",
      align: "center",
      width: 100,
    },

    {
      title: "OEE",
      dataIndex: "OEE",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.OEE * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.OEE * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.OEE * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.OEE * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

    {
      title: "NEE",
      dataIndex: "NEE",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.NEE * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.NEE * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.NEE * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.NEE * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

    {
      title: "SUR",
      dataIndex: "SUR",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.SUR * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.SUR * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.SUR * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.SUR * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

 
    {
      title: "目标OEE",
      dataIndex: "targetoee",
      align: "center",
      width: 100,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "目标SUR",
      dataIndex: "targetsur",
      align: "center",
      width: 100,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "ts",
      dataIndex: "ts",
      align: "center",
      width: 100,
      render: (text) => {
        return parseInt(text * 100) + "%";
      },
    },
 

    {
      title: "产量",
      dataIndex: "goodparts",
      align: "center",
      width: 100,
    },

    {
      title: "目标产量",
      dataIndex: "targetparts",
      align: "center",
      width: 120,
    },

    

    {
      title: "t0",
      dataIndex: "t0",
      align: "center",
      width: 100,
      render: (text) => {
        let color = text < 0 || text != 0 ? "red" : "green";
        if (text < 0 || text != 0) {
          return <Tag color={color}>{text}</Tag>;
        } else {
          return <span> {text}</span>;
        }
      },
    },

    {
      title: "t1",
      dataIndex: "t1",
      align: "center",
      width: 100,
    },

    {
      title: "t2",
      dataIndex: "t2",
      align: "center",
      width: 100,
    },

    {
      title: "t3",
      dataIndex: "t3",
      align: "center",
      width: 100,
    },

    {
      title: "t4",
      dataIndex: "t4",
      align: "center",
      width: 100,
    },

    {
      title: "t5",
      dataIndex: "t5",
      align: "center",
      width: 100,
    },

    {
      title: "ke",
      dataIndex: "ke",
      align: "center",
      width: 100,
    },
    
  ];

  const getColumns = () => [
    {
      title: "时间从",
      dataIndex: "tsdateStart",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "时间至",
      dataIndex: "tsdateEnd",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "班次",
      dataIndex: "shiftid",
      valueType: "text",
      align: "center",
      width: 120,
      fixed: "left",
      hideInTable: true,
      valueEnum: shifList.length == 0 ? {} : shifList,
      initialValue: ["早班"],
      // initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          // 返回新的组件
          let newList = [];
          for (let [key, value] of Object.entries(shifList)) {
            newList.push({ key: key, label: value.text });
          }
          return (
            <Select   showSearch optionFilterProp="children">
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
      title: "班次",
      dataIndex: "shiftname",
      align: "center",
      width: 100,
      fixed: "left",
      hideInSearch: true,
    },

    {
      title: '线体',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInTable:true,
      valueEnum: lineList.length == 0 ? {} : lineList,
      // initialValue: IsUpdate ? UpdateDate.lineid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.lineid ? UpdateDate.lineid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(lineList)) {
            newList.push({ key: key, label: value.text })
          }
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {newList.map(function (item, index) {
              return <Select.Option key={index} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },

    {
      title: "线体",
      dataIndex: "linename",
      align: "center",
      width: 100,
      fixed: "left",
      hideInSearch: true,
    },


    {
      title: "OT",
      dataIndex: "ot",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "ut",
      dataIndex: "ut",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "dt",
      dataIndex: "dt",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

  

    {
      title: "日期",
      dataIndex: "tsdate",
      valueType: 'dateTime',
      align: "center",
      width: 100,
      hideInSearch: true,
    },
 
    {
      title: "OEE",
      dataIndex: "OEE",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.OEE * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.OEE * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.OEE * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.OEE * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

    {
      title: "NEE",
      dataIndex: "NEE",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.NEE * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.NEE * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.NEE * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.NEE * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

    {
      title: "SUR",
      dataIndex: "SUR",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record) => {
        let color =
          parseInt(record.SUR * 100) < record.targetke ? "red" : "green";
        if (parseInt(record.SUR * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.SUR * 100).toFixed(1)) + "%"}
            </Tag>
          );
        } else {
          return (
            <span> {parseFloat((record.SUR * 100).toFixed(1)) + "%"}</span>
          );
        }
      },
    },

    {
      title: "目标OEE",
      dataIndex: "targetoee",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "目标SUR",
      dataIndex: "targetsur",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: "ts",
      dataIndex: "ts",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return parseInt(text * 100) + "%";
      },
    },

    {
      title: "产量",
      dataIndex: "goodparts",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "目标产量",
      dataIndex: "targetparts",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "t0",
      dataIndex: "t0",
      align: "center",
      width: 100,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 || text != 0 ? "red" : "green";
        if (text < 0 || text != 0) {
          return <Tag color={color}>{text}</Tag>;
        } else {
          return <span> {text}</span>;
        }
      },
    },

    {
      title: "t1",
      dataIndex: "t1",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t2",
      dataIndex: "t2",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t3",
      dataIndex: "t3",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t4",
      dataIndex: "t4",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "t5",
      dataIndex: "t5",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    {
      title: "ke",
      dataIndex: "ke",
      align: "center",
      width: 100,
      hideInSearch: true,
    },

    // {
    //   title: '目标PRR',
    //   dataIndex: 'targetparts',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInSearch: true,
    //   // render: (text) => {
    //   //   return parseInt(text * 100) + '%';
    //   // }
    // },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed: 'right',
    //   render: (_, record) => (
    //     <>

    //       <a onClick={() => {
    //         setIsUpdate(true)
    //         setUpdateDate({ ...record });
    //         handleUpdateModalVisible(true);
    //       }}
    //       >编辑</a>
    //     </>
    //   ),
    // },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      lineid: Number(params.lineid),
      shiftid: params.shiftid[0] == "早班" ? 1 : params.shiftid,
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      setDataSum(value.list.sum);
      setDataList(value.list.detail);
      return {
        data: value.list.detail,
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
      let data = await addPost({ data: fields });
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
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
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
        data: selectedRows.map((row) => row.customer),
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
          shiftname: dataList[i].shiftname,
          linename: dataList[i].linename,
          ut: dataList[i].ut,
          dt: dataList[i].dt,
          ot: dataList[i].ot,
          OEE: parseInt(dataList[i].OEE * 100) + "%",
          NEE: parseInt(dataList[i].NEE * 100) + "%",
          SUR: parseInt(dataList[i].SUR * 100) + "%",
          targetoee: parseInt(dataList[i].targetoee) + "%",
          targetsur: parseInt(dataList[i].targetsur) + "%",
          ts: dataList[i].ts,
          goodparts: dataList[i].goodparts,
          targetparts: dataList[i].targetparts,
          t0: dataList[i].t0,
          t1: dataList[i].t1,
          t2: dataList[i].t2,
          t3: dataList[i].t3,
          t4: dataList[i].t4,
          t5: dataList[i].t5,
          ke: parseInt(dataList[i].ke * 100) + "%",
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "线体OEE查询";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "shiftname","linename","ut","dt","ot", "OEE","NEE","SUR","targetoee","targetsur","ts",
          "goodparts", "targetparts","t0","t1","t2","t3","t4","t5","ke"
        ],
        sheetHeader: ["班次", "线体", "ut", "dt", "OT", "OEE","NEE","SUR", "目标OEE", "目标SUR", "ts",
        "产量","目标产量", "t0", "t1", "t2", "t3", "t4", "t5", "ke",
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  return (
    <PageContainer>
      <ProTable
        tableExtraRender={(_, data) => (
          <>
            <Card>
              <Table
                title={() => (
                  <span style={{ fontSize: "17px" }}>
                    列表求和
                    <span
                      style={{
                        color: "red",
                        fontSize: "15px",
                        marginLeft: "10px",
                      }}
                    ></span>
                  </span>
                )}
                scroll={{ x: 2500, y: 400 }}
                rowSelection={{}}
                columns={columns}
                dataSource={dataSum}
                pagination={false}
              />
            </Card>
          </>
        )}
        headerTitle={
          <>
            <span>查询表格</span>
            <span
              style={{ color: "red", fontSize: "16px", marginLeft: "10px" }}
            ></span>
          </>
        }
        actionRef={actionRef}
        scroll={{ x: 2500, y: 400 }}
        pagination={false}
        rowKey="row"
        pagination={false}
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
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
          {/* <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button> */}

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
          rowKey="row"
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
            rowKey="row"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ lineOee }) => ({ lineOee }))(productOeeComponent);
