import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Input, Table } from 'antd';
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
import ExportJsonExcel from 'js-export-excel';
import {
  getDepartement,
  postListInit,
  getArea,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from '@/services/time/unscheduled';

const unscheduledComponent = ({
  unscheduled,
  dispatch
}) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    lineList,
    redList
  } = unscheduled
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

  const getColumns = () => [
    {
      title: '日期',
      dataIndex: 'tsdate',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable:true,
      initialValue: new Date()
    },


    {
      title: '员工编号',
      dataIndex: 'employeeno',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    {
      title: '员工名称',
      dataIndex: 'employeename',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      hideInTable:true,
      initialValue: ['早班'],
      valueEnum: shifList.length == 0 ? {} : shifList,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type) {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(shifList)) {
            if (value.text != '全部') {
              newList.push({ key: key, label: value.text })
            }
          }
          return <Select
            allowClear
            showSearch
            allowClear={false}
            optionFilterProp='children'
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
      title: '产品族',
      dataIndex: 'productareaid',
      valueType: 'text',
      align: 'center',
      valueEnum: areaList.length == 0 ? {} : areaList,
      initialValue: ['NW'],
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type) {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(areaList)) {
              newList.push({ key: key, label: value.text })
          }
          return <Select
            allowClear
            showSearch
            allowClear={false}
            optionFilterProp='children'
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
      title: '线体',
      dataIndex: 'linename',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      valueEnum: lineList.length == 0 ? {} : lineList,
    },


    {
      title: '登录时间',
      dataIndex: 'TimeLogin',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '登出时间',
      dataIndex: 'TimeLogout',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '工时',
      dataIndex: 'period',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
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
      tsdate: params.tsdate,
      shiftid: params.shiftid[0] == "早班" ? 1 : Number(params.shiftid),
      areaid: params.productareaid[0] == "NW" ? 30 : Number(params.productareaid),
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

   

  // changeProduct = async (value) => {
  //   try {
  //     let data = await getArea({ familyid: value });
  //     
  //     if (data.status == '200') {
  //       setareaList(data.list)
  //       message.success(data.message);
  //       return true;
  //     } else {
  //       message.error(data.message);
  //       return false;
  //     }
  //   } catch (error) {
  //     message.error('添加失败请重试！');
  //     return false;
  //   }
  // }



  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    let params = {
      date: fields.date,
     shiftid: Number(fields.shiftid) == null ? '' : Number(fields.shiftid),
    }
    try {
      let data = await addPost(params);
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
    try {
      let data = await updatePut({
        id: UpdateDate.id,
        departmentid: Number(fields.departmentid),
        employeeid: Number(fields.employeeid),
        shiftid: Number(fields.shiftid),
        lineid: Number(fields.lineid),
        supporttimeid: Number(fields.supporttimeid),
        date: fields.date,
        timefrom: fields.timefrom,
        timeto: fields.timeto,
        type: 'T5',
        // ...fields
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
      message.error('编辑失败请重试！');
      hide();
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
        ids: selectedRows.map((row) => row.id),
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
          'employeeno': dataList[i].employeeno,
          'employeename': dataList[i].employeename,
          'productarea':dataList[i].productarea,
          'linename':dataList[i].linename,
          'TimeLogin':dataList[i].TimeLogin,
          'TimeLogout':dataList[i].TimeLogout,
          'period':dataList[i].period 
        };
        dataTable.push(obj);
      }
    }
    option.fileName = '已登出未排班人员'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['employeeno', 'employeename', 'productarea','linename','TimeLogin', 'TimeLogout','period'],
        sheetHeader: ['员工编号', '员工名称', '产品族', '线体','登陆时间','登出时间','工时'],
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
        scroll={{ y: 500 }}
        pagination={false}
        rowKey="id"
        search={{
          labelWidth: 120,

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

export default connect(({ unscheduled }) => ({ unscheduled }))(unscheduledComponent);




