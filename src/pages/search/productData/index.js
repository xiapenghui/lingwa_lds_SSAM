import { PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment'
import globalConfig from '../../../../config/defaultSettings';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

import {
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/search/productData';

const productDataComponent = ({
  productData,
  dispatch
}) => {
  const {
    productList } = productData
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});


  const getColumns = () => [

    {
      title: '时间从',
      dataIndex: 'tsdateStart',
      valueType: 'dateTime',
      // valueType: 'date',
      align: 'center',
      hideInTable:true,
      initialValue: IsUpdate ? moment(UpdateDate.tsdateStart, globalConfig.form.dateFormat) : null,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 返回新的组件
          return <DatePicker style={{ width: '100%' }} format={globalConfig.form.dateFormat} />
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
      dataIndex: 'tsdateEnd',
      valueType: 'dateTime',
      // valueType: 'date',
      // align: 'center',
      hideInTable:true,
      initialValue: IsUpdate ? moment(UpdateDate.tsdateEnd, globalConfig.form.dateFormat) : null,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 返回新的组件
          return <DatePicker style={{ width: '100%' }} format={globalConfig.form.dateFormat} />
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '红色时间不能为空!',
          },
        ],
      },
    },


    {
      title: '工厂名称',
      dataIndex: 'familyid',
      valueType: 'text',
      align: 'center',
      hideInTable:true,
      valueEnum: productList.length == 0 ? {} : productList,
      initialValue: !IsUpdate ? '' : (UpdateDate.familyid ? UpdateDate.familyid.toString() : ''),
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
      title: '日期',
      dataIndex: 'tsdate',
      valueType: 'da',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'UT',
      dataIndex: 'ut',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'DT',
      dataIndex: 'dt',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: 'OT',
      dataIndex: 'ot',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: 'IE',
      dataIndex: 'ie',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: 'KE',
      dataIndex: 'ke',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: 'KS',
      dataIndex: 'ks',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //    valueType: 'option',
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
      familyid: Number(params.familyid),
      tsdateStart: params.tsdateStart,
      tsdateEnd: params.tsdateEnd,
      PageIndex: params.current,
      PageSize: params.pageSize

    })
    return TableList.then(function (value) {
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
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
scroll={{ y: 500 }}
pagination={false}
        rowKey="row"
        search={{
          labelWidth: 120,

        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
      // rowSelection={{
      //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
      // }}
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

export default connect(({ productData }) => ({ productData }))(productDataComponent);




