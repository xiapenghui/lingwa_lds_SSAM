import { PlusOutlined , UploadOutlined} from '@ant-design/icons';
import { Button, message, DatePicker, Select, Tag, Table, Row, Col } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment'
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import '../../../../src/assets/commonStyle.css';
import globalConfig from '../../../../config/defaultSettings';
import './components/common.css';
import ExportJsonExcel from 'js-export-excel';
import {
  getDepartement,
  postListInit,
  getArea,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from '@/services/search/tsSearch';
import { BackgroundColor } from 'chalk';

const tsSearchComponent = ({
  tsSearch,
  dispatch
}) => {
  const {
    departmentList
  } = tsSearch
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [dataSum, setDataSum] = useState([])
  const [dataList, setDataList] = useState([]);

  
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'departmentshortname',
      valueType: 'text',
      align: 'center',
      width: 100,
    },


    {
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'date',
      align: 'center',
      hideInSearch: true,
      width: 100
    },


    {
      title: 'T1',
      dataIndex: 't1',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'T4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'T5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

 
    {
      title: 'paidhour',
      dataIndex: 'paidhour',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '效率',
      dataIndex: 'ke',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return parseInt(text * 100) + '%';
      }
    },

  
    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },
    

    {
      title: 'gap',
      dataIndex: 'gap',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 ? 'red' : 'green';
        if (text < 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }
    },


    {
      title: '生产TS',
      dataIndex: 'prodt4',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'TS合计',
      dataIndex: 'tstotal',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

  ];


  const getColumns = () => [

    {
      title: '时间从',
      dataIndex: 'tsdateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
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
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    
    {
      title: '部门名称',
      dataIndex: 'departmentid',
      valueType: 'text',
      align: 'center',
      width: 100,
      fixed: 'left',
      valueEnum: departmentList.length == 0 ? {} : departmentList,
      initialValue: !IsUpdate ? '' : (UpdateDate.departmentid ? UpdateDate.departmentid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(departmentList)) {
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
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'date',
      align: 'center',
      hideInSearch: true,
      width: 100,
      fixed: 'left',
    },



    {
      title: 'T1',
      dataIndex: 't1',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'T4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'T5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

 
    {
      title: 'paidhour',
      dataIndex: 'paidhour',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },
    {
      title: '效率',
      dataIndex: 'ke',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => {
        return parseInt(text * 100) + '%';
      }
    },

  
    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },
    

    {
      title: 'gap',
      dataIndex: 'gap',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
      render: (text) => {
        let color = text < 0 ? 'red' : 'green';
        if (text < 0) {
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
        } else {
          return <span> {text}</span>
        }
      }
    },


    {
      title: '生产TS',
      dataIndex: 'prodt4',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },

    {
      title: 'TS合计',
      dataIndex: 'tstotal',
      valueType: 'text',
      align: 'center',
      width: 100,
      hideInSearch: true,
    },




 

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
      departmentid:params.departmentid,
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      PageIndex: params.current,
      PageSize: params.pageSize,
    })
    return TableList.then(function (value) {
      setDataSum(value.list.sum);
      setDataList(value.list.detail);
      return {
        data: value.list.detail,
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
          'departmentshortname': dataList[i].departmentshortname,
          'tsdate': dataList[i].tsdate,
          't1': dataList[i].t1,
          't4': dataList[i].t4,
          't5': dataList[i].t5,
          'paidhour': dataList[i].paidhour,
          'ke': dataList[i].ke,
          'ts': dataList[i].ts,
          'gap': dataList[i].gap,
          'prodt4': dataList[i].prodt4,
          'tstotal': dataList[i].tstotal,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = 'Ts查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['departmentshortname', 'tsdate', 't1', 't4', 't5', 'paidhour',  'ke', 'ts', 'gap', 'prodt4', 'tstotal'],
        sheetHeader: [ '部门名称','日期', 'T1', 'T4', 'T5', 'paidhour', '效率', 'TS', 'gap', '生产TS', 'TS合计'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }


  return (
    <PageContainer>  
      <ProTable
      tableExtraRender={(_, data) => (
        <>
            <Table
              title={() => <span style={{fontSize:'17px'}}>列表求和</span>}
              scroll={{ x: 1500, y: 400 }}
              rowSelection={{
              }} columns={columns} dataSource={dataSum} pagination={false} />
        </>
      )}

        headerTitle={
          <>
            <span>查询表格</span>
            <span style={{ color: 'red', fontSize: '16px', marginLeft: '10px' }}>*TS合计=TS+生产TS</span>
          </>
        }
        actionRef={actionRef}
        scroll={{ x:1500, y: 300 }}
        rowKey="id"
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

{/* 
          <Button
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
          rowKey="id"
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
            rowKey="id"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ tsSearch }) => ({ tsSearch }))(tsSearchComponent);




