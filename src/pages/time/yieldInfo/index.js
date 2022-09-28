import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
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
    timeaxisList,
    lineNoList,
    ProductNoList,
    ProductTypeListTrue
  } = yieldInfo
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
      title: '日期',
      dataIndex: 'TSDate',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      fixed: 'left',
      sorter: (a, b) => {
        let aTime = new Date(a.TSDate).getTime();
        let bTime = new Date(b.TSDate).getTime();
        return aTime - bTime;
      },
      // hideInSearch: true,
      // initialValue: IsUpdate ? UpdateDate.date : '',
      initialValue: IsUpdate ? moment(UpdateDate.TSDate, globalConfig.form.onlyDateFormat) : moment(new Date()),
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
      fixed: 'left',
      sorter: (a, b) => {
        let abanci = a.shiftid;
        let bbanci = b.shiftid;
        return abanci - bbanci;
      },
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

    // {
    //   title: '线体',
    //   dataIndex: 'lineid',
    //   valueType: 'text',
    //   align: 'center',
    //   fixed: 'left',
    //   valueEnum: lineList.length == 0 ? {} : lineList,
    //   // initialValue: IsUpdate ? UpdateDate.lineid.toString() : '',
    //   initialValue: !IsUpdate ? '' : (UpdateDate.lineid ? UpdateDate.lineid.toString() : ''),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form' || type === 'table') {
    //       // 返回新的组件
    //       let newList = []
    //       for (let [key, value] of Object.entries(lineList)) {
    //         newList.push({ key: key, label: value.text })
    //       }
    //       return <Select
    //         allowClear
    //         showSearch
    //         optionFilterProp='children'
    //       >
    //         {newList.map(function (item, index) {
    //           return <Select.Option key={index} value={item.key}>
    //             {item.label}
    //           </Select.Option>
    //         })}
    //       </Select>
    //     }
    //     return defaultRender(_);
    //   },
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '线体不能为空!',
    //       },
    //     ],
    //   },
    // },

    {
      title: '产品族',
      dataIndex: 'producttypeid',
      valueType: 'text',
      align: 'center',
      // hideInSearch:true,
      hideInTable: true,
      hideInForm: true,
      valueEnum: ProductTypeListTrue.length == 0 ? {} : ProductTypeListTrue,
      initialValue: !IsUpdate ? '' : (UpdateDate.producttypeid ? UpdateDate.producttypeid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(ProductTypeListTrue)) {
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
            message: '产品类型不能为空!',
          },
        ],
      },
    },

    {
      title: '产品族',
      dataIndex: 'producttype',
      valueType: 'text',
      align: 'center',
      sorter: (a, b) => a.producttype.length - b.producttype.length,
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: '线体编号',
      dataIndex: 'LineID',
      valueType: 'text',
      align: 'center',
      sorter: (a, b) => a.Line_no.length - b.Line_no.length,
      width: 150,
      valueEnum: lineNoList.length == 0 ? {} : lineNoList,
      initialValue: !IsUpdate ? '' : (UpdateDate.LineID ? UpdateDate.LineID.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(lineNoList)) {
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
            message: '线体编号不能为空!',
          },
        ],
      },
    },


    {
      title: '产品编号',
      dataIndex: 'ProductID',
      valueType: 'text',
      align: 'center',
      sorter: (a, b) => a.productno.length - b.productno.length,
      valueEnum: ProductNoList.length == 0 ? {} : ProductNoList,
      initialValue: !IsUpdate ? '' : (UpdateDate.ProductID ? UpdateDate.ProductID.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(ProductNoList)) {
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
            message: '产品类型不能为空!',
          },
        ],
      },
    },





    {
      title: 'OT',
      dataIndex: 'OT',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.OT : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'OT不能为空!',
          },
        ],
      },
    },

   

    {
      title: 'POT',
      dataIndex: 'POT',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.POT : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'POT不能为空!',
          },
        ],
      },
    },

    {
      title: '产量',
      dataIndex: 'GoodParts',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.GoodParts : '',
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
      title: 'UT',
      dataIndex: 'UT',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.UT : '',
    },

    {
      title: 'DT',
      dataIndex: 'DT',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.DT : '',
    },
    {
      title: 'SPT',
      dataIndex: 'SPT',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.SPT : '',
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
      lineid: Number(params.LineID),
      productid: params.ProductID,
      producttypeid: params.producttypeid,
      TSDate: params.TSDate,
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
      TSDate: fields.TSDate,
      LineID: fields.LineID,
      ProductID: fields.ProductID,
      OT: fields.OT,
      UT: fields.UT,
      DT: fields.DT,
      POT: fields.POT,
      SPT: fields.SPT,
      GoodParts: fields.GoodParts
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
        ID: UpdateDate.ID,
        shiftid: Number(fields.shiftid),
        TSDate: fields.TSDate,
        LineID: fields.LineID,
        ProductID: fields.ProductID,
        OT: fields.OT,
        UT: fields.UT,
        DT: fields.DT,
        POT: fields.POT,
        SPT: fields.SPT,
        GoodParts: fields.GoodParts
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
        ids: selectedRows.map((row) => row.ID),
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
          'TSDate': dataList[i].TSDate,
          'shiftname': dataList[i].shiftname,
          'producttype': dataList[i].producttype,
          'Line_no': dataList[i].Line_no,
          'productno': dataList[i].productno,
          'OT': dataList[i].OT,
          'UT': dataList[i].UT,
          'DT': dataList[i].DT,
          'POT': dataList[i].POT,
          'SPT': dataList[i].SPT,
          'GoodParts': dataList[i].GoodParts
        };
        dataTable.push(obj);
      }
    }
    option.fileName = '产量信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['TSDate', 'shiftname', 'producttype', 'Line_no', 'productno', 'OT', 'UT', 'DT', 'POT', 'SPT', 'GoodParts'],
        sheetHeader: ['日期', '班次', '线体编号', '产品族', '产品编号', 'OT', 'UT', 'DT', 'POT', 'SPT', '产量'],
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
        rowKey="ID"
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
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
          rowKey="ID"
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
            rowKey="ID"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ yieldInfo }) => ({ yieldInfo }))(yieldInfoComponent);




