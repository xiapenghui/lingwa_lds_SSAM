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
} from '@/services/time/pprInfo';

const yieldInfoComponent = ({
  pprInfo,
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
  } = pprInfo
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
  const [newDisf, setNewDisf] = useState(0);
  const getColumns = () => [



    {
      title: '日期',
      dataIndex: 'tsdate',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      fixed: 'left',
      sorter: (a, b) => {
        let aTime = new Date(a.tsdate).getTime();
        let bTime = new Date(b.tsdate).getTime();
        return aTime - bTime;
      },
      // hideInSearch: true,
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



    // {
    //   title: '产品族名称',
    //   dataIndex: 'producttypename',
    //   valueType: 'text',
    //   align: 'center',
    //   // hideInSearch: true,
    //   initialValue: IsUpdate ? UpdateDate.producttypename : '',
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: 'producttypename不能为空!',
    //       },
    //     ],
    //   },
    // },

    {
      title: 'PPR类型',
      dataIndex: 'productid',
      valueType: 'text',
      align: 'center',
      hideInForm:true,
      hideInTable:true,
      sorter: (a, b) => a.productno.length - b.productno.length,
      valueEnum: ProductNoList.length == 0 ? {} : ProductNoList,
      initialValue: !IsUpdate ? '' : (UpdateDate.productid ? UpdateDate.productid.toString() : ''),
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
      title: 'PPR类型',
      dataIndex: 'productid',
      valueType: 'text',
      align: 'center',
      hideInSearch:true,
      hideInTable:true,
      sorter: (a, b) => a.productno.length - b.productno.length,
      valueEnum: ProductNoList.length == 0 ? {} : ProductNoList,
      initialValue: !IsUpdate ? '' : (UpdateDate.productid ? UpdateDate.productid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          debugger
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(ProductNoList)) {
            newList.push({ key: key, label: value.text })
          }
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
            disabled
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
            message: '产品名称不能为空!',
          },
        ],
      },
    },


    {
      title: 'PPR类型',
      dataIndex: 'producttypename',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      hideInSForm: true,
    },


   
    {
      title: 'output',
      dataIndex: 'output',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.output : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'output不能为空!',
          },
        ],
      },
    },


    {
      title: 'cama',
      dataIndex: 'cama',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.cama : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'cama不能为空!',
          },
        ],
      },
    },

   

    {
      title: 'ppr',
      dataIndex: 'ppr',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ppr : '',
      render: (text) => {
        return text + "%";
      },
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        // console.log("renderFormItem", _, type, defaultRender, formItemProps, fieldProps, rest, form.getFieldsValue(true))
        let disf = 0;
        disf = (Number(form.getFieldsValue(true).output) / Number(form.getFieldsValue(true).cama)).toFixed(2);
        debugger
        setNewDisf(disf)
        if (IsUpdate) {
          // 返回新的组件
          return <Input disabled value={disf}></Input>
        } else {
          return <Input disabled value={disf}></Input>
        }
        return defaultRender(_);
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
      productid: params.productid,
      tsdate: params.tsdate,
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
      tsdate: fields.tsdate,
      LineID: fields.LineID,
      productid: fields.productid,
      OT: fields.OT,
      ppr: fields.ppr,
      DT: fields.DT,
      cama: fields.cama,
      SPT: fields.SPT,
      output: fields.output
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
        productid:fields.productid,
        tsdate: fields.tsdate,
        output:fields.output,
        cama: fields.cama,
        ppr: newDisf,
       
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
          'cama': dataList[i].cama,
          'output': dataList[i].output,
          'ppr': dataList[i].ppr,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = '产量信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['tsdate', 'producttypename', 'cama', 'output', 'ppr'],
        sheetHeader: ['日期', 'PPR类型','cama', 'output', 'ppr'],
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

export default connect(({ pprInfo }) => ({ pprInfo }))(yieldInfoComponent);




