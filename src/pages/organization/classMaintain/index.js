import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import '../../../../src/assets/commonStyle.css';
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
  GetShiftNO
} from '@/services/organization/classMaintain';

const classMaintainComponent = ({
  classMaintain,
  dispatch
}) => {
  const {
    TableList,
    typeList,
    riskList,
    isNoList, } = classMaintain
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [shiftNO, setShiftNO] = useState();
  const [dataList, setDataList] = useState([]);
  const getColumns = () => [

    {
      title: '班别编号',
      dataIndex: 'shiftNO',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftNO : shiftNO,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          return <Input disabled />
        }
        return defaultRender(_);
      },
    },

    {
      title: '班别名称',
      dataIndex: 'shiftname',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.shiftname : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '班别名称不能为空!',
          },
        ],
      },
    },

    {
      title: '工作时间',
      dataIndex: 'proidtime',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.proidtime : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '工作时间不能为空!',
          },
        ],
      },
    },


    {
      title: '班别描述',
      dataIndex: 'shiftdec',
      valueType: 'textarea',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : '',
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
      shiftname: params.shiftname == null ? '' : params.shiftname,
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
  }

 


  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost(fields);
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
      let data = await updatePut({ shiftID: UpdateDate.shiftID, ...fields });
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
        shiftIDs: selectedRows.map((row) => row.shiftID),
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


  //新增班别编号
  const handleModalVisible1 = async() => {
  try {
    let data = await GetShiftNO();
    if (data.status == '200') {
       setShiftNO(data.list);
       handleModalVisible(true);
    }
  } catch (error) {
    message.error('编辑失败请重试！');
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
        'shiftID': dataList[i].shiftID,
        'shiftname': dataList[i].shiftname,
        'proidtime': dataList[i].proidtime,
        'shiftdec': dataList[i].shiftdec
      }
      dataTable.push(obj);
    }
  }
  option.fileName = '班别信息'
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: 'sheet',
      sheetFilter: ['shiftID', 'shiftname', 'proidtime', 'shiftdec'],
      sheetHeader: ['班别编号', '班别名称', '工作时间', '班别描述'],
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
      rowKey="shiftID"
      search={{
        labelWidth: 120,

      }}
      toolBarRender={() => [
        <Button type="primary" onClick={() => handleModalVisible1(true)}>
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
        rowKey="shiftID"
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
          rowKey="shiftID"
          type="form"
          columns={getColumns()}

        />
      </UpdateForm>
    ) : null}

  </PageContainer>
);
};

export default connect(({ classMaintain }) => ({ classMaintain }))(classMaintainComponent);




