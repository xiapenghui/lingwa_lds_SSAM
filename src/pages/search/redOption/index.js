import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Table, Row, Col, Card, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import moment from 'moment'
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import globalConfig from '../../../../config/defaultSettings';
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  // deleted,
  getAddDropDownInit,
  // addPost,
  // updatePut,
} from '@/services/search/redOption';

const redOptionComponent = ({
  redOption,
  dispatch
}) => {
  const {
    productList,
    shifList,
    areaList,
    lineList,
    redList
  } = redOption
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
      title: '红色类型',
      dataIndex: 'type',
      valueType: 'text',
      align: 'center',
    },

    {
      title: '红色项',
      dataIndex: 'downtime',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '红色项描述',
      dataIndex: 'downtimedec',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '用时',
      dataIndex: 'usetime',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '占比',
      dataIndex: 'pct',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

  ];




  const getColumns = () => [

    {
      title: '时间从',
      dataIndex: 'dateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.dateStart),
    },


    {
      title: '时间至',
      dataIndex: 'dateEnd',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.dateEnd),
    },


    {
      title: '班次',
      dataIndex: 'shiftid',
      valueType: 'text',
      align: 'center',
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
      title: '工厂名称',
      dataIndex: 'familyid',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
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
      title: '区域',
      dataIndex: 'productareaid',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
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
      title: '红色项',
      dataIndex: 'downtime',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    {
      title: '红色项描述',
      dataIndex: 'downtimedec',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '数据来源',
      dataIndex: 'source',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      render: (text) => {
        if (text == 'lds抓取') {
         return  text = 'lds抓取'
         } else {
          return text = '手填'
        }
      }
    },


    {
      title: '用时',
      dataIndex: 'usetime',
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
      shiftid: Number(params.shiftid),
      familyid: Number(params.familyid),
      productareaid: Number(params.productareaid),
      type: params.type == "" || params.type == undefined ? "" : 'T' + params.type,
      dateStart: params.dateStart,
      dateEnd: params.dateEnd,
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
          'type': dataList[i].type,
          'downtime': dataList[i].downtime,
          'downtimedec': dataList[i].downtimedec,
          'usetime': dataList[i].usetime
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '红色项查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['type', 'downtime', 'downtimedec', 'usetime'],
        sheetHeader: ['红色类型', '红色项', '红色项描述', '用时'],
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
            <Card>
              <Table
                title={() => <span style={{ fontSize: '17px' }}>列表求和</span>}
                rowSelection={{
                }} columns={columns} dataSource={dataSum} pagination={false} />
            </Card>
          </>
        )}

        headerTitle="查询表格"
        actionRef={actionRef}
        pagination={false}
        scroll={{ y: 500 }}
        rowKey="row"
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

export default connect(({ redOption }) => ({ redOption }))(redOptionComponent);




