import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, TimePicker, InputNumber ,Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment'
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/organization/timeInfo';

const timeInfoComponent = ({
  timeInfo,
  dispatch
}) => {
  const {
    timeList } = timeInfo
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
      title: '时间从',
      dataIndex: 'timefrom',
      valueType: 'text',
      // valueType: 'time',
      align: 'center',
      // initialValue: IsUpdate ? UpdateDate.timefrom : '',
      hideInSearch: true,
      initialValue: IsUpdate ? moment(UpdateDate.timefrom, 'HH:mm') : null,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          return <TimePicker format={'HH:mm'} />
        }
        return defaultRender(_);
      },

      formItemProps: {
        rules: [
          {
            required: true,
            message: '时间从不能为空!',
          },
        ],
      },
    },


    {
      title: '时间至',
      dataIndex: 'timeto',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      // initialValue: IsUpdate ? UpdateDate.timeto : '',
      initialValue: IsUpdate ? moment(UpdateDate.timeto, 'HH:mm') : null,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          return <TimePicker format={'HH:mm'} />
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '时间至不能为空!',
          },
        ],
      },
    },

    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
      // initialValue: IsUpdate ? UpdateDate.shiftid : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.shiftid ? UpdateDate.shiftid.toString() : ''),
      valueEnum: timeList.length == 0 ? {} : timeList,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(timeList)) {
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
            message: '班次不能为空!',
          },
        ],
      },
    },

    {
      title: '时间段',
      dataIndex: 'timeaxis',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.timeaxis : '',
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
      title: '顺序',
      dataIndex: 'timeorder',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.timeorder : '',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          return <InputNumber min={1} max={8} />
        }
        return defaultRender(_);
      },

      formItemProps: {
        rules: [
          {
            required: true,
            message: '顺序不能为空且数字为1-8之间!',
          },
        ],
      },
    },

    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
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
      shiftid: params.shiftid,
      timeaxis: params.timeaxis == null ? '' : params.timeaxis,
      timefrom: params.timefrom,
      timeto: params.timeto,
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
      let data = await addPost({
        shiftid: fields.shiftid,
        timeaxis: fields.timeaxis,
        timeorder: fields.timeorder,
        timefrom: fields.timefrom.substring(11, 20).substring(0, 5),
        timeto: fields.timeto.substring(11, 20).substring(0, 5),
        remark: fields.remark
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
      let data = await updatePut({
        timeaxisid: UpdateDate.timeaxisid,
        shiftid: fields.shiftid,
        timeaxis: fields.timeaxis,
        timeorder: fields.timeorder,
        timefrom: fields.timefrom.substring(11, 20).substring(0, 5),
        timeto: fields.timeto.substring(11, 20).substring(0, 5),
        remark: fields.remark
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
        timeaxisids: selectedRows.map((row) => row.timeaxisid),
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
          'timefrom': dataList[i].timefrom,
          'timeto': dataList[i].timeto,
          'shiftname': dataList[i].shiftname,
          'timeaxis': dataList[i].timeaxis,
          'timeorder': dataList[i].timeorder,
          'remark': dataList[i].remark,

        }
        dataTable.push(obj);
      }
    }
    option.fileName = '时间信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['timefrom', 'timeto', 'shiftname', 'timeaxis', 'timeorder', 'remark'],
        sheetHeader: ['时间从', '时间至', '班次', '时间段', '顺序', '备注'],
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
        scroll={{ y: 500 }}
        pagination={false}
        rowKey="timeaxisid"
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
          rowKey="timeaxisid"
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
            rowKey="timeaxisid"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ timeInfo }) => ({ timeInfo }))(timeInfoComponent);
