import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Tag ,Checkbox } from 'antd';
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
} from '@/services/search/lineData';

const lineDataComponent = ({
  lineData,
  dispatch
}) => {
  const {
    productList,
    areaList,
    lineList,
    shifList
  } = lineData
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


    {
      title: '时间从',
      dataIndex: 'tsdateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      width: 120,
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },


    {
      title: '时间至',
      dataIndex: 'tsdateEnd',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      width: 120,
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateEnd),
    },


    {
      title: '工厂名称',
      dataIndex: 'familyid',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInTable: true,
      valueEnum: productList.length == 0 ? {} : productList,
      // initialValue: IsUpdate ? UpdateDate.familyid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.familyid ? UpdateDate.familyid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(productList)) {
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
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      width: 120,
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
      title: '产品族',
      dataIndex: 'productareaid',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInTable: true,
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.productareaid ? UpdateDate.productareaid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(areaList)) {
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
      title: '线体编号',
      dataIndex: 'lineno',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      fixed: 'left',
      width: 250,
    },


    {
      title: '线体名称',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
      width: 250,
      fixed: 'left',
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
      title: 'KE不达标',
      dataIndex: 'showBelowtargetke',
      valueType: 'text',
      hideInTable: true,
      align: 'center',
      width: 120,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type) {
          return  <Checkbox onChange={onChangeBox}></Checkbox>
        }
        return defaultRender(_);
      },
    },




    {
      title: '目标KE',
      dataIndex: 'targetke',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text) => {
        return text + '%';
      }
    },

    {
      title: '目标IE',
      dataIndex: 'targetie',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text) => {
        return text + '%';
      }
    },




    {
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: 'UT',
      dataIndex: 'ut',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'DT',
      dataIndex: 'dt',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'OT',
      dataIndex: 'ot',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,

    },

    {
      title: 'IE',
      dataIndex: 'ie',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text, record) => {
        let color = parseInt(record.ie * 100) < record.targetie ? 'red' : 'green';
        if (parseInt(record.ie * 100) < record.targetie) {
          return (
            <Tag color={color}>
              {parseFloat((record.ie * 100).toFixed(1)) + "%"}
            </Tag>
          )
        } else {
          return <span> {parseFloat((record.ie * 100).toFixed(1)) + "%"}</span>
        }
      }
    },

    {
      title: 'KE',
      dataIndex: 'ke',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text, record) => {
        let color = parseInt(record.ke * 100) < record.targetke ? 'red' : 'green';
        if (parseInt(record.ke * 100) < record.targetke) {
          return (
            <Tag color={color}>
              {parseFloat((record.ke * 100).toFixed(1)) + "%"}
            </Tag>
          )
        } else {
          return <span>  {parseFloat((record.ke * 100).toFixed(1)) + "%"}</span>
        }
      }
    },

    {
      title: 'KS',
      dataIndex: 'ks',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
      render: (text) => {
        return parseFloat((text* 100).toFixed(1)) + "%";
      }
    },

    {
      title: 'T0',
      dataIndex: 't0',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'T1',
      dataIndex: 't1',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'T2',
      dataIndex: 't2',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'T3',
      dataIndex: 't3',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'T4',
      dataIndex: 't4',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: 'T5',
      dataIndex: 't5',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },



    {
      title: '产量',
      dataIndex: 'goodparts',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },


    {
      title: '目标产量',
      dataIndex: 'targetparts',
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
 const onChangeBox =(e)=>{
  setshowKe(e.target.checked)
 }

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      showBelowtargetke:showKe,
      familyid: Number(params.familyid),
      productareaid: Number(params.productareaid),
      lineid: Number(params.lineid),
      shiftid: Number(params.shiftid),
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      PageIndex: params.current,
      PageSize: params.pageSize,
    })
    return TableList.then(function (value) {
      setDataList(value.list);
      return {
        data: value.list,
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
          'lineno': dataList[i].lineno,
          'linename': dataList[i].linename,
          'targetke': parseInt(dataList[i].targetke) + '%',
          'targetie': parseInt(dataList[i].targetie) + '%',
          'tsdate': dataList[i].tsdate,
          'ut': dataList[i].ut,
          'dt': dataList[i].dt,
          'ot': dataList[i].ot,
          'ts': dataList[i].ts,
          'ie': parseInt(dataList[i].ie * 100) + '%',
          'ke': parseInt(dataList[i].ke * 100) + '%',
          'ks': parseInt(dataList[i].ks * 100) + '%',
          't0': dataList[i].t0,
          't1': dataList[i].t1,
          't2': dataList[i].t2,
          't3': dataList[i].t3,
          't4': dataList[i].t4,
          't5': dataList[i].t5,
          'goodparts': dataList[i].goodparts,
          'targetparts': dataList[i].targetparts,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '线体查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['lineno','linename',  'targetke', 'targetie', 'tsdate', 'ut', 'dt', 'ot', 'ts', 'ie', 'ke', 'ks', 't0', 't1', 't2', 't3', 't4', 't5', 'goodparts', 'targetparts'],
        sheetHeader: ['线体编号', '线体名称', '目标KE', '目标IE',  '日期', 'UT', 'DT', 'OT', 'TS', 'IE', 'KE', 'KS', 'T0', 'T1', 'T2', 'T3', 'T4', 'T5', '产量', '目标产量'],
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

export default connect(({ lineData }) => ({ lineData }))(lineDataComponent);




