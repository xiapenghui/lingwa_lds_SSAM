import { PlusOutlined,UploadOutlined } from "@ant-design/icons";
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
} from '@/services/search/personnelNum';

const personnelNumComponent = ({
  personnelNum,
  dispatch
}) => {
  const {
    productList,
    areaList,
    lineList,
    shifList,
    shiftTypeList2,
  } = personnelNum
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [word, setWord] = useState();

  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
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
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
    },

    {
      title: '班别',
      dataIndex: 'shifttypekeyword',
      valueType: 'text',
      align: 'center',
      width: 120,
      // hideInTable: true,
      valueEnum: shiftTypeList2.length == 0 ? {} : shiftTypeList2,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        console.log(type)
        if (type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(shiftTypeList2)) {
            newList.push({ key: key, label: value })
          }
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
            onChange={onChangeVal}
          >
            {newList.map(function (item, index) {
              return <Select.Option key={index} value={item.key} >
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },


    

     

    {
      title: '计划人数',
      dataIndex: 'plannum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '排班人数',
      dataIndex: 'schedulingnum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '刷卡人数',
      dataIndex: 'cardnum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '请假人数',
      dataIndex: 'leavenum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },


    {
      title: '年假人数',
      dataIndex: 'annualleavenum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '病假人数',
      dataIndex: 'sickleavenum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '公假人数',
      dataIndex: 'publicleavenum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '事假人数',
      dataIndex: 'casualleavenum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '小时工人数',
      dataIndex: 'hourlynum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 120,
    },

    {
      title: '正式工人数',
      dataIndex: 'fulltimenum',
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


  //班别数据重构
  const onChangeVal = (e, value) => {
    if (value == undefined) {
      setWord('')
    } else {
      setWord(value.children)
    }
  }



  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      shifttypekeyword: word == undefined ? '' : word  ,
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
    console.log("dataList", dataList);
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          'tsdate': dataList[i].tsdate,
          'shifttypekeyword': dataList[i].shifttypekeyword,
          'plannum': dataList[i].plannum,
          'schedulingnum': dataList[i].schedulingnum,
          'cardnum': dataList[i].cardnum,
          'leavenum': dataList[i].leavenum,
          'annualleavenum': dataList[i].annualleavenum,
          'sickleavenum': dataList[i].sickleavenum,
          'publicleavenum': dataList[i].publicleavenum,
          'casualleavenum': dataList[i].casualleavenum,
          'hourlynum': dataList[i].hourlynum,
          'fulltimenum': dataList[i].fulltimenum,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = '人员统计查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['tsdate', 'shifttypekeyword', 'plannum', 'schedulingnum', 'cardnum', 'leavenum', 
        'annualleavenum', 'sickleavenum', 'publicleavenum', 'casualleavenum', 'hourlynum', 'fulltimenum'],
        sheetHeader: ['日期', '班别', '计划人员', '排班人员', '刷卡人员', '请假人数',
          '年假人数', '病假人数', '公假人数', '事假人数', '小时工人数', '正式工人数'],
      }
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

 

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

export default connect(({ personnelNum }) => ({ personnelNum }))(personnelNumComponent);




