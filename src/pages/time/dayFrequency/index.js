import { PlusOutlined, UploadOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Input, Table, Modal } from 'antd';
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
  PrevDailyShift
} from '@/services/time/dayFrequency';

const dayFrequencyComponent = ({
  dayFrequency,
  dispatch
}) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    relaxtypeList,
    lineList,
    redList,
    timeaxisList
  } = dayFrequency
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  // const [areaList, setareaList] = useState([]);
  const [valList, setvalList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newData, setnewData] = useState();
  const [dataList, setDataList] = useState([]);


  /**
    * 编辑初始化
    */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const { Option } = Select;
  const [loadings, setLoadings] = useState(false);


  useEffect(() => {
    // debugger
    // setnewData(tsdate)
  }, []);





  const getColumns = () => [
    {
      title: '部门',
      dataIndex: 'departmentid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
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
      // valueType: 'dateTime',
      valueType: 'date',
      align: 'center',
      width: 100,
      fixed: 'left',
      // initialValue: IsUpdate ? UpdateDate.date : '',
      initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type) {
          // 返回新的组件
          return <DatePicker style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} onBlur={dataPick} />
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
      fixed: 'left',
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
      title: '员工',
      dataIndex: 'employeeid',
      valueType: 'text',
      align: 'center',
      width: 150,
      fixed: 'left',
      valueEnum: personList.length == 0 ? {} : personList,
      initialValue: !IsUpdate ? '' : (UpdateDate.employeeid ? UpdateDate.employeeid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(personList)) {
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
            message: '员工不能为空!',
          },
        ],
      },
    },




    {
      title: '排班',
      dataIndex: 'hour',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      hideInSearch: true,
      sorter: (a, b) => a.hour - b.hour,
      initialValue: IsUpdate ? UpdateDate.hour : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用时不能为空!',
          },
        ],
      },
    },


    {
      title: '工时',
      dataIndex: 'period',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => a.period - b.period,
      initialValue: IsUpdate ? UpdateDate.period : '',
    },

    {
      title: 'GAP',
      dataIndex: 'gap',
      valueType: 'text',
      align: 'center',
      width: 120,
      fixed: 'left',
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => a.gap - b.gap,
      initialValue: IsUpdate ? UpdateDate.gap : '',
    },


    {
      title: '休假时间',
      dataIndex: 'relax',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      sorter: (a, b) => a.relax - b.relax,
      initialValue: IsUpdate ? UpdateDate.relax : '',
    },



    {
      title: '借出',
      dataIndex: 'lend',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      sorter: (a, b) => a.lend - b.lend,
      initialValue: IsUpdate ? UpdateDate.lend : '',
    },

    {
      title: '借入',
      dataIndex: 'borrow',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      sorter: (a, b) => a.borrow - b.borrow,
      initialValue: IsUpdate ? UpdateDate.borrow : '',
    },

    {
      title: 'T4',
      dataIndex: 't4',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => a.t4 - b.t4,
      initialValue: IsUpdate ? UpdateDate.t4 : '',
    },

    {
      title: 'T5',
      dataIndex: 't5',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      hideInForm: true,
      sorter: (a, b) => a.t5 - b.t5,
      initialValue: IsUpdate ? UpdateDate.t5 : '',
    },




    {
      title: '线体',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInForm: true,
      valueEnum: lineList.length == 0 ? {} : lineList,
      initialValue: !IsUpdate ? '' : (UpdateDate.lineid ? UpdateDate.lineid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(lineList)) {
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

      render: (text, action) => {
        if (action.lineid == 0) {
          return text = '-'
        } else {
          return text = action.linename
        }
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
      title: '休假选项',
      dataIndex: 'relaxtypeid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInSearch: true,
      valueEnum: relaxtypeList.length == 0 ? {} : relaxtypeList,
      initialValue: !IsUpdate ? '' : (UpdateDate.relaxtypeid ? UpdateDate.relaxtypeid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(relaxtypeList)) {
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
      render: (text, action) => {
        if (action.relaxtypeid == 0) {
          return text = '-'
        } else {
          return text = action.relaxtype
        }
      }
    },


    {
      title: '借出区域',
      dataIndex: 'lendareaid',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      // initialValue: IsUpdate ? UpdateDate.lend : '',
      valueEnum: areaList.length == 0 ? {} : areaList,
      // initialValue: IsUpdate ? UpdateDate.productareaid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.lendareaid ? UpdateDate.lendareaid.toString() : ''),
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

    setnewData(params.tsdate)
    // console.log('params.tsdate',params.tsdate)
    const TableList = postListInit({
      departmentid: Number(params.departmentid),
      employeeid: Number(params.employeeid),
      shiftid: Number(params.shiftid),
      areaid: Number(params.areaid),
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

 

  //获取日期聚焦的值
  const dataPick = (value) => {
    setnewData(value.currentTarget.value)
  }

  //休假类型选择
  const handleChange = (value) => {
    // let vacation = value
    console.log(`selected ${value}`);
  }


  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    let params = {
      departmentid: Number(fields.departmentid) == null ? '' : Number(fields.departmentid),
      employeeid: Number(fields.employeeid) == null ? '' : Number(fields.employeeid),
      tsdate: fields.tsdate,
      shiftid: Number(fields.shiftid) == null ? '' : Number(fields.shiftid),
      areaid: Number(fields.areaid) == null ? '' : Number(fields.areaid),
      relaxtypeid: Number(fields.relaxtypeid) == null ? '' : Number(fields.relaxtypeid),
      lendareaid: Number(fields.lendareaid) == null ? '' : Number(fields.lendareaid),
      hour: fields.hour,
      borrow: fields.borrow,
      lend: fields.lend,
      relax: fields.relax,

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
        employeeid: Number(fields.employeeid),
        relaxtypeid: Number(fields.relaxtypeid),
        tsdate: fields.tsdate,
        shiftid: Number(fields.shiftid),
        areaid: Number(fields.areaid),
        lendareaid: Number(fields.lendareaid),
        hour: fields.hour,
        borrow: fields.borrow,
        lend: fields.lend,
        relax: fields.relax
        // ...fields
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



  //提前排班
  const handleUp = () => {
    setVisible(true);
  }

  //提前排班选择ok
  const handleOk = async () => {

    try {
      let data = await PrevDailyShift({
        tsdate: newData,
      });
      if (data.status == '200') {
        setVisible(false);
        message.success(data.message);
        // setIsModalVisible(true);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      setVisible(false);
      message.error('提前排班失败，请重试');
      return false;
    }
  };


  //提前排班选择NO
  const handleCancel = () => {
    setVisible(false);
  };


  // //2次弹窗ok
  // const handleOk2 = () => {
  //   setIsModalVisible(false);
  //   actionRef.current.reload();
  // };

  // //2次弹窗NO
  // const handleCancel2 = () => {
  //   setIsModalVisible(false);
  // };


  // 导出
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
        'tsdate': dataList[i].tsdate,
        'shiftname': dataList[i].shiftname,
        'employeename': dataList[i].employeename,
        'hour': dataList[i].hour,
        'period': dataList[i].period,
        'gap': dataList[i].gap,
        'productarea': dataList[i].productarea,
        'relax': dataList[i].relax,
        'lend': dataList[i].lend,
        'borrow': dataList[i].borrow,
        't4': dataList[i].t4,
        't5': dataList[i].t5,
        'linename': dataList[i].linename,
        'relaxtype': dataList[i].relaxtype,
        'lendarea': dataList[i].lendarea,
      }
      dataTable.push(obj);
     }
    }

    option.fileName = '每日排班管理'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['tsdate', 'shiftname', 'employeename', 'hour', 'period', 'gap', 'productarea', 'relax',
          'lend', 'borrow', 't4', 't5', 'linename', 'relaxtype', 'lendarea'],
        sheetHeader: ['日期', '班次', '员工', '排班', '工时', 'GAP', '产品族', '休假时间', '借出', '借入',
          'T4', 'T5', '线体', '休假选项', '借出区域'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }



  return (
    <PageContainer>


      <Modal
        title="提前排班"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>是否按照选择日期进行排班</p>
      </Modal>



      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ x: 2000, y: 500 }}
        pagination={false}
        rowKey="id"
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

          <Button type="primary" onClick={handleUp}>
            <ThunderboltOutlined /> 提前排班
          </Button>
        ]
        }

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

export default connect(({ dayFrequency }) => ({ dayFrequency }))(dayFrequencyComponent);




