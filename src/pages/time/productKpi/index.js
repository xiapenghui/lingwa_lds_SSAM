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
} from '@/services/time/productKpi';

const productKpiComponent = ({
  productKpi,
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
  } = productKpi
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
      title: '日期',
      dataIndex: 'tsdate',
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      width: 150,
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
      title: '产品族',
      dataIndex: 'areaid',
      valueType: 'text',
      align: 'center',
      width: 150,
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.areaid ? UpdateDate.areaid.toString() : ''),
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
      title: 'ot',
      dataIndex: 'ot',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ot : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ot不能为空!',
          },
        ],
      },
    },


    {
      title: 'ut',
      dataIndex: 'ut',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ut : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ut不能为空!',
          },
        ],
      },
    },

    {
      title: 'dt',
      dataIndex: 'dt',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.dt : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'dt不能为空!',
          },
        ],
      },
    },


    {
      title: '产量',
      dataIndex: 'goodparts',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.goodparts : '',
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
      title: 'ts',
      dataIndex: 'ts',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.ts : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ts不能为空!',
          },
        ],
      },
    },

    {
      title: 't0',
      dataIndex: 't0',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t0 : ''
    },

    {
      title: 't1',
      dataIndex: 't1',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t1 : ''
    },

    {
      title: 't2',
      dataIndex: 't2',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t2 : ''
    },

    {
      title: 't3',
      dataIndex: 't3',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t3 : ''
    },

    {
      title: 't4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t4 : ''
    },


    {
      title: 't5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.t5 : ''
    },


    {
      title: '目标产量',
      dataIndex: 'targetparts',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetparts : ''
    },


    {
      title: '目标ke',
      dataIndex: 'targetke',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetke : ''
    },

    {
      title: '目标ie',
      dataIndex: 'targetie',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetie : ''
    },


    {
      title: '目标prr',
      dataIndex: 'targetprr',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.targetprr : ''
    },


    {
      title: '借出',
      dataIndex: 'lend',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.lend : ''
    },



    {
      title: '借入',
      dataIndex: 'borrow',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.borrow : ''
    },

    {
      title: '休假',
      dataIndex: 'relax',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.relax : ''
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
      areaid: Number(fields.areaid) == null ? '' : Number(fields.areaid),
      shiftid: Number(fields.shiftid) == null ? '' : Number(fields.shiftid),
      tsdate: fields.tsdate,
      ot: fields.ot,
      ut: fields.ut,
      dt: fields.dt,
      goodparts: fields.goodparts,
      targetparts: fields.targetparts,
      targetke: fields.targetke,
      targetie: fields.targetie,
      ts: fields.ts,
      t1: fields.t1,
      t2: fields.t2,
      t3: fields.t3,
      t4: fields.t4,
      t5: fields.t5,
      prr: fields.prr,
      targetprr: fields.targetprr,
      lend: fields.lend,
      borrow: fields.borrow,
      relax: fields.relax
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
        areaid: Number(fields.areaid),
        shiftid: Number(fields.shiftid),
        tsdate: fields.tsdate,
        ot: fields.ot,
        ut: fields.ut,
        dt: fields.dt,
        goodparts: fields.goodparts,
        targetparts: fields.targetparts,
        targetke: fields.targetke,
        targetie: fields.targetie,
        ts: fields.ts,
        t1: fields.t1,
        t2: fields.t2,
        t3: fields.t3,
        t4: fields.t4,
        t5: fields.t5,
        prr: fields.prr,
        targetprr: fields.targetprr,
        lend: fields.lend,
        borrow: fields.borrow,
        relax: fields.relax

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
        'productarea':dataList[i].productarea,
        'ot':dataList[i].ot,
        'ut':dataList[i].ut,
        'dt':dataList[i].dt,
        'goodparts':dataList[i].goodparts,
        'ts':dataList[i].ts,
        't0':dataList[i].t0,
        't1':dataList[i].t1,
        't2':dataList[i].t2,
        't3':dataList[i].t3,
        't4':dataList[i].t4,
        't5':dataList[i].t5,
        'targetparts':dataList[i].targetparts,
        'targetke':dataList[i].targetke,
        'targetie':dataList[i].targetie,
        'targetprr':dataList[i].targetprr,
        'lend':dataList[i].lend,
        'borrow':dataList[i].borrow,
        'relax':dataList[i].relax,
      };
      dataTable.push(obj);
    }
  }
  option.fileName = '产品族kpi管理'
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: 'sheet',
      sheetFilter: ['tsdate', 'shiftname', 'productarea','ot','ut','dt','goodparts','ts','t0','t1','t2','t3',
      't4','t5','targetparts','targetke','targetie','targetprr','lend','borrow','relax'],
      sheetHeader: ['日期', '班次', '产品族', 'ou','ut','dt','产量','ts','t0','t1','t2','t3','t4','t5',
      '目标产量','目标ke','目标ie','目标prr','借出','借入','休假'],
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
        scroll={{ x: 2500, y: 500 }}
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

export default connect(({ productKpi }) => ({ productKpi }))(productKpiComponent);




