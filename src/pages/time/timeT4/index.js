import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
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
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/time/timeT4';

const timeT4Component = ({
  timeT4,
  dispatch
}) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    lineList,
    redList,
    timeaxisList
  } = timeT4
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
      title: '红色类型',
      dataIndex: 'type',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.type : 'T4',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 返回新的组件
          return <Input disabled></Input>
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '红色类型不能为空!',
          },
        ],
      },
    },

    {
      title: '红色项',
      dataIndex: 'supporttimeid',
      valueType: 'text',
      align: 'center',
      width: 200,
      // hideInSearch: true,
      valueEnum: redList.length == 0 ? {} : redList,
      // initialValue: IsUpdate ? UpdateDate.supporttimeid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.supporttimeid ? UpdateDate.supporttimeid.toString() : ''),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '红色项不能为空!',
          },
        ],
      },
    },




    // {
    //   title: '时间从',
    //   dataIndex: 'timefrom',
    //   valueType: 'dateTime',
    //   // valueType: 'date',
    //   align: 'center',
    //   hideInSearch:true,
    //   initialValue: IsUpdate ? moment(UpdateDate.timefrom, globalConfig.form.dateFormat) : null,
    //   // renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //   //   if (type === 'form') {
    //   //     
    //   //     // 返回新的组件
    //   //     return <DatePicker format={globalConfig.form.dateFormat} />
    //   //   }
    //   //   return defaultRender(_);
    //   // },
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '时间从不能为空!',
    //       },
    //     ],
    //   },
    // },


    // {
    //   title: '时间至',
    //   dataIndex: 'timeto',
    //   valueType: 'dateTime',
    //   // valueType: 'date',
    //   align: 'center',
    //   hideInSearch:true,
    //   initialValue: IsUpdate ? moment(UpdateDate.timeto, globalConfig.form.dateFormat) : null,
    //   // renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //   //   if (type === 'form') {
    //   //     // 返回新的组件
    //   //     return <DatePicker  format={globalConfig.form.dateFormat} />
    //   //   }
    //   //   return defaultRender(_);
    //   // },
    //   // formItemProps: {
    //   //   rules: [
    //   //     {
    //   //       required: true,
    //   //       message: '时间至不能为空!',
    //   //     },
    //   //   ],
    //   // },
    // },



    {
      title: '日期',
      dataIndex: 'date',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      width: 150,
      // initialValue: IsUpdate ? UpdateDate.date : '',
      initialValue: IsUpdate ? moment(UpdateDate.date, globalConfig.form.onlyDateFormat) : moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 返回新的组件
          return <DatePicker style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '日期不能为空!',
          },
        ],
      },
    },




    {
      title: '时间段',
      dataIndex: 'timeaxisid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      valueEnum: timeaxisList.length == 0 ? {} : timeaxisList,
      initialValue: !IsUpdate ? '' : (UpdateDate.timeaxisid ? UpdateDate.timeaxisid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(timeaxisList)) {
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
            message: '时间段不能为空!',
          },
        ],
      },
    },


    {
      title: '部门',
      dataIndex: 'departmentid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门不能为空!',
          },
        ],
      },
    },


    {
      title: '员工',
      dataIndex: 'employeeid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      valueEnum: personList.length == 0 ? {} : personList,
      initialValue: !IsUpdate ? '' : (UpdateDate.employeeid ? UpdateDate.employeeid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(personList)) {
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
            message: '员工不能为空!',
          },
        ],
      },
    },

    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      width: 150,
      valueEnum: shifList.length == 0 ? {} : shifList,
      initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
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
            message: '班次不能为空!',
          },
        ],
      },
    },




    {
      title: '工厂名称',
      dataIndex: 'familyid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      hideInForm: true,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '工厂名称不能为空!',
          },
        ],
      },
    },

    {
      title: '产品族',
      dataIndex: 'productareaid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      hideInForm: true,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '产品族不能为空!',
          },
        ],
      },
    },


    {
      title: '线体',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
      width: 200,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: '线体不能为空!',
          },
        ],
      },
    },




    {
      title: '用时',
      dataIndex: 'usetime',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.usetime : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用时不能为空!',
          },
        ],
      },
    },

    
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <>

          <a onClick={() => {
            setIsUpdate(true)
            setUpdateDate({ ...record });
            handleUpdateModalVisible(true);
          }}
          >编辑</a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      departmentid: Number(params.departmentid),
      shiftid: Number(params.shiftid),
      supporttimeid: Number(params.supporttimeid),
      lineid: Number(params.lineid),
      date: params.date,
      dateStart: params.timefrom,
      dateEnd: params.timeto,
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
      departmentid: Number(fields.departmentid) == null ? '' : Number(fields.departmentid),
      employeeid: Number(fields.employeeid) == null ? '' : Number(fields.employeeid),
      shiftid: Number(fields.shiftid) == null ? '' : Number(fields.shiftid),
      lineid: Number(fields.lineid) == null ? '' : Number(fields.lineid),
      supporttimeid: Number(fields.supporttimeid) == null ? '' : Number(fields.supporttimeid),
      timeaxisid: Number(fields.timeaxisid) == null ? '' : Number(fields.timeaxisid),
      usetime: fields.usetime,
      date: fields.date,
      timefrom: fields.timefrom,
      timeto: fields.timeto,
      remark:fields.remark,
      type: 'T4'
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
        timeaxisid: Number(fields.timeaxisid),
        date: fields.date,
        timefrom: fields.timefrom,
        timeto: fields.timeto,
        timeaxis: fields.timeaxis,
        usetime: fields.usetime,
        remark:fields.remark,
        type: 'T4',
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
          'type': dataList[i].type,
          'downtime': dataList[i].downtime,
          'date':dataList[i].date,
          'timeaxis':dataList[i].timeaxis,
          'departmentshortname':dataList[i].departmentshortname,
          'employeename':dataList[i].employeename,
          'shift':dataList[i].shift,
          'familyname':dataList[i].familyname,
          'productarea':dataList[i].productarea,
          'linename':dataList[i].linename,
          'usetime':dataList[i].usetime,
          'remark':dataList[i].remark,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = 'T4信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['type', 'downtime', 'date','timeaxis','departmentshortname','employeename','shift','familyname',
      'productarea','linename','usetime','remark'],
        sheetHeader: ['红色类型', '红色项', '日期', '时间段','部门','员工','班次','工厂名称','产品族','线体','用时','备注'],
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
        rowKey="id"
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
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>

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

export default connect(({ timeT4 }) => ({ timeT4 }))(timeT4Component);




