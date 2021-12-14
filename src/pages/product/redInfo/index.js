import { PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { Button, message, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';
import {
  getRedInfo,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/product/redInfo';

const redInfoComponent = ({
  redInfo,
  dispatch
}) => {
  const {
    redList } = redInfo
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [isShows, setIsShows] = useState();
  const [dataList, setDataList] = useState([]);

  const getColumns = () => [


    {
      title: '红色类型',
      dataIndex: 'type',
      valueType: 'text',
      align: 'center',
      valueEnum: redList.length == 0 ? {} : redList,
      initialValue: IsUpdate ? UpdateDate.type : '',
      // initialValue: !IsUpdate ? '' : (UpdateDate.departmentid ? UpdateDate.departmentid.toString() : ''),
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
      dataIndex: 'downtime',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.downtime : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '红色项不能为空!',
          },
        ],
      },
    },



    {
      title: '红色项名称',
      dataIndex: 'downtimedec',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? UpdateDate.downtimedec : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '红色项更改不能为空!',
          },
        ],
      },
    },



    {
      title: '支持部门',
      dataIndex: 'isshow',
      valueType: 'text',
      align: 'center',
      initialValue: IsUpdate ? (UpdateDate.isshow == true ? '是' : '否') : '',
      valueEnum: ['否', '是'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '支持部门不能为空!',
          },
        ],
      },
      render: (text, action) => {
        if (action.isshow == true) {
          return text = '是'
        } else {
          return text = '否'
        }
      }
    },


    // {
    //   title: '支持部门',
    //   dataIndex: 'isshow',
    //   valueType: 'text',
    //   align: 'center',
    //   // valueEnum: departmentList.length == 0 ? {} : departmentList,
    //   // initialValue: !IsUpdate ? '' : (UpdateDate.isshow ? UpdateDate.isshow.toString() : ''),
    //   initialValue: IsUpdate ? UpdateDate.isshow : '',
    //   // valueEnum: ['是', '否'],
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (IsUpdate == true) {
    //       debugger
    //       // 返回新的组件
    //       return <Select onChange={handleChange}>
    //         <Option value={true}>是</Option>
    //         <Option value={false}>否</Option>
    //       </Select>
    //     } else {
    //       debugger
    //       return <Select>
    //         <Option value="是">是</Option>
    //         <Option value="否">否</Option>
    //       </Select>
    //     }
    //     return defaultRender(_);
    //   },
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '支持部门不能为空!',
    //       },
    //     ],
    //   },
    //   render: (text) => {
    //     return text ? '是' : '否'
    //   }
    // },





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


  // //下拉选择支持部门显示
  // function handleChange(value) {
  //   setIsShows(value)
  // }


  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      type: params.type == "" || params.type == undefined  ? "" : 'T' + params.type,
      downtime: params.downtime == null ? '' : params.downtime,
      downtimedec: params.downtimedec == null ? '' : params.downtimedec,
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
    debugger
    try {
      let data = await addPost(
        {
          type: 'T' + fields.type,
          downtime: fields.downtime,
          downtimedec: fields.downtimedec,
          isshow: fields.isshow == "1" ? true : false,
          remark: fields.remark
        }

      );
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
    debugger
    try {
      let data = await updatePut({
        downtimeid: UpdateDate.downtimeid,
        downtime: fields.downtime,
        downtimedec: fields.downtimedec,
        isshow: fields.isshow == "1" ? true : false,
        remark: fields.remark,
        type: (fields.type).indexOf("T") != -1 ? fields.type : 'T' + fields.type,
      }

      );
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
        downtimeids: selectedRows.map((row) => row.downtimeid),
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
          'downtimedec': dataList[i].downtimedec,
          'isshow': dataList[i].isshow ===true ?'是':'否',
          'remark': dataList[i].remark,

        }
        dataTable.push(obj);
      }
    }
    option.fileName = '红色项信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['type', 'downtime', 'downtimedec', 'isshow','remark'],
        sheetHeader: ['红色类型', '红色项', '红色项名称', '支持部门', '备注'],
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
        rowKey="downtimeid"
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
          rowKey="downtimeid"
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
            rowKey="downtimeid"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ redInfo }) => ({ redInfo }))(redInfoComponent);




