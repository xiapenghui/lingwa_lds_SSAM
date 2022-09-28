import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Tag, Checkbox } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment'
import globalConfig from '../../../../config/defaultSettings';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from '@/services/search/productKe';

const productKeComponent = ({
  productKe,
  dispatch
}) => {
  const {
    productList,
    areaList,
    lineList,
    shifList,
    lineNoList,
    ProductTypeListTrue,
  } = productKe
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [showKe, setshowKe] = useState(false);
  const [dataList, setDataList] = useState([]);

  const getColumns = () => [


    // {
    //   title: '时间从',
    //   dataIndex: 'tsdateStart',
    //   // valueType: 'dateTime',
    //   valueType: 'date',
    //   align: 'center',
    //   width: 120,
    //   hideInTable: true,
    //   initialValue: new Date(),
    //   initialValue: moment(UpdateDate.tsdateStart),
    // },


    // {
    //   title: '时间至',
    //   dataIndex: 'tsdateEnd',
    //   // valueType: 'dateTime',
    //   valueType: 'date',
    //   align: 'center',
    //   width: 120,
    //   hideInTable: true,
    //   initialValue: new Date(),
    //   initialValue: moment(UpdateDate.tsdateEnd),
    // },

    {
      title: '日期',
      dataIndex: 'TSDate',
      valueType: 'date',
      align: 'center',
      width: 120,
      fixed: 'left',
      initialValue: moment(new Date())
    },


    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      hideInTable: true,
      valueEnum: shifList.length == 0 ? {} : shifList,
      // initialValue: IsUpdate ? UpdateDate.shiftid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(shifList)) {
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
      title: '班次',
      dataIndex: 'shiftname',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      fixed: 'left',
      width: 120,
    },



    // {
    //   title: '区域',
    //   dataIndex: 'productareaid',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 120,
    //   fixed: 'left',
    //   valueEnum: areaList.length == 0 ? {} : areaList,
    //   // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
    //   initialValue: !IsUpdate ? '' : (UpdateDate.productareaid ? UpdateDate.productareaid.toString() : ''),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form' || type === 'table') {
    //       // 返回新的组件
    //       let newList = []
    //       for (let [key, value] of Object.entries(areaList)) {
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
    //   title: '线体名称',
    //   dataIndex: 'lineid',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 250,
    //   fixed: 'left',
    //   valueEnum: lineList.length == 0 ? {} : lineList,
    //   // initialValue: IsUpdate ? UpdateDate.lineid.toString() : '',
    //   initialValue: !IsUpdate ? '' : (UpdateDate.lineid ? UpdateDate.lineid.toString() : ''),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form' || type === 'table') {
    //       // 返回新的组件
    //       let newList = []
    //       for (let [key, value] of Object.entries(lineList)) {
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


    {
      title: '产品族',
      dataIndex: 'producttypeid',
      valueType: 'text',
      align: 'center',
      // hideInSearch:true,
      hideInTable:true,
      valueEnum: ProductTypeListTrue.length == 0 ? {} : ProductTypeListTrue,
      initialValue: !IsUpdate ? '' : (UpdateDate.producttypeid ? UpdateDate.producttypeid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(ProductTypeListTrue)) {
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '产品类型不能为空!',
          },
        ],
      },
    },

    

    {
      title: '产品族',
      dataIndex: 'producttype',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      fixed: 'left',
      width: 120,
    },


    {
      title: '线体编号',
      dataIndex: 'LineID',
      valueType: 'text',
      align: 'center',
      hideInTable:true,
      width: 150,
      valueEnum: lineNoList.length == 0 ? {} : lineNoList,
      initialValue: !IsUpdate ? '' : (UpdateDate.LineID ? UpdateDate.LineID.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(lineNoList)) {
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '线体编号不能为空!',
          },
        ],
      },
    },



    

    {
      title: '线体编号',
      dataIndex: 'Line_no',
      valueType: 'text',
      hideInSearch: true,
      hideInForm:true,
      align: 'center',
      fixed: 'left',
      width: 120,
    },


    {
      title: '目标KE',
      dataIndex: 'TargetKE',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      fixed: 'left',
      width: 120,
      render: (text) => {
        return text + '%';
      }
    },

    {
      title: '目标IE',
      dataIndex: 'TargetIE',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      fixed: 'left',
      render: (text) => {
        return text + '%';
      }
    },

    {
      title: 'UT',
      dataIndex: 'UT',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'DT',
      dataIndex: 'DT',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'OT',
      dataIndex: 'OT',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'TS',
      dataIndex: 'TS',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,

    },

    {
      title: 'IE',
      dataIndex: 'IE',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text, record) => {
        let color = parseInt(record.IE * 100) < record.TargetIE ? 'red' : 'green';
        if (parseInt(record.IE * 100) < record.TargetIE) {
          return (
            <Tag color={color}>
              {record.IE === "NaN" || record.IE === "Infinity"
                ? "0" + "%"
                : parseFloat((record.IE * 100).toFixed(1)) + "%"}
            </Tag>
          )
        } else {
          return <span> {
            record.IE === "NaN" || record.IE === "Infinity"
              ? "0" + "%"
              : parseFloat((record.IE * 100).toFixed(1)) + "%"
          }</span>
        }
      }
    },



    {
      title: 'KE',
      dataIndex: 'KE',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text, record) => {
        let color = parseInt(record.KE * 100) < record.TargetKE ? 'red' : 'green';
        if (parseInt(record.KE * 100) < record.TargetKE) {
          return (
            <Tag color={color}>
              {record.KE === "NaN" || record.KE === "Infinity"
                ? "0" + "%"
                : parseFloat((record.KE * 100).toFixed(1)) + "%"}
            </Tag>
          )
        } else {
          return <span> {record.KE === "NaN" || record.KE === "Infinity"
            ? "0" + "%"
            : parseFloat((record.KE * 100).toFixed(1)) + "%"}</span>
        }
      }
    },

    {
      title: 'KS',
      dataIndex: 'KS',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text) => {
        return (text === "NaN" || text === "Infinity")
          ? "0" + "%" : parseFloat((text * 100).toFixed(1)) + "%";
      }
    },

    {
      title: '产量',
      dataIndex: 'GoodParts',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },


  


    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    // align: 'center',
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


  //达标不达标勾选
  const onChangeBox = (e) => {
    (e.target.checked)
  }

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      familyid: Number(params.familyid),
      productareaid: Number(params.productareaid),
      lineid: Number(params.LineID),
      shiftid: Number(params.shiftid),
      producttypeid:params.producttypeid,
      TSDate: params.TSDate,
      PageIndex: params.current,
      PageSize: params.pageSize,
    })
    return TableList.then(function (value) {
      setDataList(value.list.sum);
      return {
        data: value.list.sum,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total
      }
    });
  };



  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost({ data: fields });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('添加失败请重试！');
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */


  const handleUpdate = async (fields) => {
    const hide = message.loading('正在编辑');
    console.log('handleUpdate', fields)
    try {
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('编辑失败请重试！');
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        data: selectedRows.map((row) => row.customer),
      });

      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }

    } catch (error) {
      hide();
      message.error('删除失败，请重试');
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
          'TSDate': dataList[i].TSDate,
          'shiftname': dataList[i].shiftname,
          'producttype': dataList[i].producttype,
          'Line_no': dataList[i].Line_no,
          'TargetKE': parseInt(dataList[i].TargetKE) + '%',
          'TargetIE': parseInt(dataList[i].TargetIE) + '%',
          'UT': dataList[i].UT,
          'DT': dataList[i].DT,
          'OT': dataList[i].OT,
          'TS': dataList[i].TS,
          'IE': parseInt(dataList[i].IE * 100) + '%',
          'KE': parseInt(dataList[i].KE * 100) + '%',
          'KS': parseInt(dataList[i].KS * 100) + '%',
          'GoodParts': dataList[i].GoodParts,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '产品族KE查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['TSDate', 'shiftname', 'producttype', 'Line_no', 'TargetKE',  'TargetIE', 'UT', 'DT', 'OT', 'TS', 'IE', 'KE', 'KS', 'GoodParts'],
        sheetHeader: ['日期', '班次', '产品族', '线体编号','目标IE','目标IE','UT', 'DT', 'OT', 'TS', 'IE', 'KE', 'KS', '产量'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }




  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ x: 2000, y: 500 }}
        pagination={false}
        rowKey="row"
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
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>

              </span>
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
        title='新建'
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
            setIsUpdate(false)
            handleUpdateModalVisible(false)
          }
          }
          modalVisible={updateModalVisible}
          title='编辑'
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false)
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

export default connect(({ productKe }) => ({ productKe }))(productKeComponent);




