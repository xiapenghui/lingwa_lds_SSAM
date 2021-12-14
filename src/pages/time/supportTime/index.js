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
import './components/common.css';
import ExportJsonExcel from 'js-export-excel';
import {
  getDepartement,
  postListInit,
  getArea,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/time/supportTime';
import index from '@/pages/authorityManagement/roleInfo/components/MenuForm';


// useEffect(() => {
//   // selectRow
// }, {});

const supportTimeComponent = ({
  supportTime,
  dispatch
}) => {
  const {
    departmentList
  } = supportTime
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [colList, setColList] = useState({});
  // const [sum, setSum] = useState(0);
  const [newSum, setNewSum] = useState(0);
  const [newDisf, setNewDisf] = useState(0);
  const [newEff, setNewEff] = useState(0);
  const [dataList, setDataList] = useState([]);




  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  let [selectRow, setselectRow] = useState({});


  const getColumns = () => [

    {
      title: '时间从',
      dataIndex: 'tsdateStart',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      hideInTable: true,
      hideInForm: true,
      // initialValue: new Date(),
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
      // initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },


    {
      title: '部门名称',
      dataIndex: 'departmentid',
      valueType: 'text',
      align: 'center',
      width: 120,
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
      title: '日期',
      dataIndex: 'tsdate',
      width: 120,
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
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
      title: 'T1',
      dataIndex: 't1',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.t1 : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 't1不能为空!',
          },
        ],
      },
    },


    {
      title: 'T4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.t4 : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 't1不能为空!',
          },
        ],
      },
    },



    {
      title: 'T5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.t5 : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 't1不能为空!',
          },
        ],
      },
    },


    {
      title: 'paidhour',
      dataIndex: 'paidhour',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.paidhour : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'paidhour不能为空!',
          },
        ],
      },
    },


    {
      title: 'prodt4',
      dataIndex: 'prodt4',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.prodt4 : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'prodt4不能为空!',
          },
        ],
      },
    },


    {
      title: '产品族id',
      dataIndex: 'areaid',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.areaid : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '产品族id不能为空!',
          },
        ],
      },
    },


    {
      title: '效率',
      dataIndex: 'ke',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      width: 100,
      initialValue: IsUpdate ? UpdateDate.ke : '',
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        let eff = 0;
        eff = Number(form.getFieldsValue(true).t4) / (Number(form.getFieldsValue(true).t4) + Number(form.getFieldsValue(true).t1))
        console.log('Number(form.getFieldsValue(true).t4)', Number(form.getFieldsValue(true).t4))
        setNewEff(eff)
        if (IsUpdate) {
          // 返回新的组件
          return <Input disabled value={eff} ></Input>
        } else {
          return <Input disabled value={eff}></Input>
        }
        return defaultRender(_);
      },
      render: (text) => {
        return parseInt(text * 100) + '%';
      }
    },



    {
      title: 'TS',
      dataIndex: 'ts',
      valueType: 'text',
      width: 100,
      align: 'center',
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ts : '',
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        let sum = 0;
        sum = Number(form.getFieldsValue(true).t1) + Number(form.getFieldsValue(true).t4) + Number(form.getFieldsValue(true).t5)
        setNewSum(sum)
        if (IsUpdate) {
          // 返回新的组件
          return <Input disabled value={sum}></Input>
        } else {
          return <Input disabled value={sum}></Input>
        }
        return defaultRender(_);
      },
    },




    {
      title: 'Gap',
      dataIndex: 'gap',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      width: 100,
      initialValue: IsUpdate ? UpdateDate.gap : '',
      renderFormItem: (_, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => {
        // console.log("renderFormItem", _, type, defaultRender, formItemProps, fieldProps, rest, form.getFieldsValue(true))
        let disf = 0;
        disf = Number(form.getFieldsValue(true).paidhour) - Number(form.getFieldsValue(true).t1) - Number(form.getFieldsValue(true).t4) - Number(form.getFieldsValue(true).t5);
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
      width: 100,
      render: (_, record) => (
        <>
          <a onClick={() => {
            setIsUpdate(true)
            setUpdateDate({ ...record });
            setselectRow({ ...record })
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
      departmentid: Number(fields.departmentid) == null ? '' : Number(fields.departmentid),
      tsdate: fields.tsdate,
      t1: fields.t1,
      t4: fields.t4,
      t5: fields.t5,
      ts: newSum,
      gap: newDisf,
      ke: newEff,
      paidhour: fields.paidhour,
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
        tsdate: fields.tsdate,
        t1: fields.t1,
        t4: fields.t4,
        t5: fields.t5,
        ts: newSum,
        gap: newDisf,
        ke: newEff,
        paidhour: fields.paidhour
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
        'departmentshortname': dataList[i].departmentshortname,
        'tsdate': dataList[i].tsdate,
        't1':dataList[i].t1,
        't4':dataList[i].t4,
        't5':dataList[i].t5,
        'paidhour':dataList[i].paidhour,
        'prodt4':dataList[i].prodt4,
        'areaid':dataList[i].areaid,
        'ke':(dataList[i].ke * 100) + '%',
        'ts':dataList[i].ts,
        'gap':dataList[i].gap
      };
      dataTable.push(obj);
    }
  }
  option.fileName = '支持时间录入'
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: 'sheet',
      sheetFilter: ['departmentshortname', 'tsdate','t1','t4','t5','paidhour', 'prodt4','areaid',
      'ke', 'ts','gap'],
      sheetHeader: ['部门名称', '日期', 'T1','T4','T5','paidhour', 'prodt4','产品族id','效率','TS','Gap'],
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

export default connect(({ supportTime }) => ({ supportTime }))(supportTimeComponent);




