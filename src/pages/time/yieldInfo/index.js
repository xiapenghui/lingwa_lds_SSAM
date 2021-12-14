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
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/time/yieldInfo';

const yieldInfoComponent = ({
  yieldInfo,
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
  } = yieldInfo
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
      title: '时间从',
      dataIndex: 'tsdateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      hideInForm: true,
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
      hideInForm: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },




    {
      title: '日期',
      dataIndex: 'tsdate',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      // sorter: (a, b) => {
      //   return new Date(a.tsdate) > new Date(b.tsdate) ? 1 : -1;
      // },
      hideInSearch: true,
      // initialValue: IsUpdate ? UpdateDate.date : '',
      initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
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
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
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
      title: '线体',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
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
      title: '产量',
      dataIndex: 'shiftparts',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftparts : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '产量不能为空!',
          },
        ],
      },
    },



    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
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
      shiftid: Number(params.shiftid),
      lineid: Number(params.lineid),
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
    let params = {
      shiftid: Number(fields.shiftid) == null ? '' : Number(fields.shiftid),
      lineid: Number(fields.lineid) == null ? '' : Number(fields.lineid),
      tsdate: fields.tsdate,
      shiftparts: fields.shiftparts,
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
        shiftid: Number(fields.shiftid),
        lineid: Number(fields.lineid),
        tsdate: fields.tsdate,
        shiftparts: fields.shiftparts,
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
          'tsdate': dataList[i].tsdate,
          'shiftname': dataList[i].shiftname,
          'linename':dataList[i].linename,
          'shiftparts':dataList[i].shiftparts
        };
        dataTable.push(obj);
      }
    }
    option.fileName = '目标产量信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['tsdate', 'shiftname', 'linename','shiftparts'],
        sheetHeader: ['日期', '班次', '线体', '产量'],
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

export default connect(({ yieldInfo }) => ({ yieldInfo }))(yieldInfoComponent);




