import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select, Input, Table } from 'antd';
import ProForm, {
  ProFormDatePicker
} from '@ant-design/pro-form';
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
} from '@/services/search/workHours';

const workHoursComponent = ({
  workHours,
  dispatch
}) => {
  const {
    departmentList,
    productList,
    personList,
    shifList,
    areaList,
    shiftTypeList,
    personnelList,
    lineList,
    redList,
    timeaxisList
  } = workHours
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
  const { Option } = Select;
  const getColumns = () => [

    // {
    //   title: '年',
    //   dataIndex: 'yearth',
    //   valueType: 'date',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.date : '',
    //   // initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

    //     if (type == 'table') {

    //       // 返回新的组件
    //       return <DatePicker picker="year" />
    //     }
    //     return defaultRender(_);
    //   },
    // },

    // {
    //   title: '月',
    //   dataIndex: 'month',
    //   valueType: 'date',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.date : '',
    //   // initialValue: IsUpdate ? moment(UpdateDate.tsdate, globalConfig.form.onlyDateFormat) : moment(new Date()),
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

    //     if (type == 'table') {

    //       // 返回新的组件
    //       return <DatePicker picker="month" />
    //     }
    //     return defaultRender(_);
    //   },
    // },

    {
      title: '年',
      dataIndex: 'yearth',
      valueType: 'data',
      align: 'center',
      hideInTable: true,
      initialValue: moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'table') {
          // 返回新的组件
          return <DatePicker picker="year" disabled />
        }
        return defaultRender(_);
      },
    },


    {
      title: '月',
      dataIndex: 'month',
      valueType: 'data',
      align: 'center',
      hideInTable: true,
      initialValue: moment(new Date()),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'table') {
          // 返回新的组件
          return <DatePicker picker="month" allowClear={false} />
        }
        return defaultRender(_);
      },

    },



    {
      title: '班别',
      dataIndex: 'defalutshifttypeid',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      valueEnum: shiftTypeList.length == 0 ? {} : shiftTypeList,
    },

    {
      title: '员工编号',
      dataIndex: 'emploeeno',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      width: 150
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
    },



    {
      title: '部门',
      dataIndex: 'departmentid',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      valueEnum: departmentList.length == 0 ? {} : departmentList,
    },



    {
      title: '区域',
      dataIndex: 'areaid',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      valueEnum: areaList.length == 0 ? {} : areaList,
    },


    {
      title: '排班',
      dataIndex: 'hour',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      width: 100
    },

    {
      title: '工时',
      dataIndex: 'periodtime',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      width: 100
    },

    {
      title: '休假',
      dataIndex: 'relax',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      width: 100
    },

    // {
    //   title: '员工属性',
    //   dataIndex: 'employeepattributes',
    //   valueType: 'text',
    //   align: 'center',
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.employeepattributes : '',
    //   valueEnum: ['全部','正式工', '小时工', '领班', '劳务工' ],
    // },


    {
      title: '员工属性',
      dataIndex: 'employeepattributes',
      valueType: 'text',
      align: 'center',
      hideInTable: true,
      valueEnum: personnelList.length == 0 ? {} : personnelList,
      // initialValue: IsUpdate ? UpdateDate.defaultlineid.toString() : '',
      initialValue: !IsUpdate ? '' : (UpdateDate.employeepattributes ? UpdateDate.employeepattributes.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(personnelList)) {
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
            message: '员工属性选项不能为空!',
          },
        ],
      },
    },

 

    {
      title: '1',
      dataIndex: 'd01',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '2',
      dataIndex: 'd02',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '3',
      dataIndex: 'd03',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    {
      title: '4',
      dataIndex: 'd04',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '5',
      dataIndex: 'd05',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '6',
      dataIndex: 'd06',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '7',
      dataIndex: 'd07',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '8',
      dataIndex: 'd08',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '9',
      dataIndex: 'd09',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '10',
      dataIndex: 'd10',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '11',
      dataIndex: 'd11',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },



    {
      title: '12',
      dataIndex: 'd12',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '13',
      dataIndex: 'd13',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '14',
      dataIndex: 'd14',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '15',
      dataIndex: 'd15',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '16',
      dataIndex: 'd16',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '17',
      dataIndex: 'd17',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '18',
      dataIndex: 'd18',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '19',
      dataIndex: 'd19',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '20',
      dataIndex: 'd20',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '21',
      dataIndex: 'd21',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '22',
      dataIndex: 'd22',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '23',
      dataIndex: 'd23',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '24',
      dataIndex: 'd24',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '25',
      dataIndex: 'd25',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '26',
      dataIndex: 'd26',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '27',
      dataIndex: 'd27',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '28',
      dataIndex: 'd28',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '29',
      dataIndex: 'd29',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '30',
      dataIndex: 'd30',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },


    {
      title: '31',
      dataIndex: 'd31',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },

    {
      title: '确认状态',
      dataIndex: 'state',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
      fixed: 'right',
      width: 120
    },


  ];

  const query = async (params, sorter, filter) => {
     
    const TableList = postListInit({
      yearth: params.yearth.substring(0, 4),
      month: params.month.substring(5, 7),
      departmentid: Number(params.departmentid),
      employeeid: Number(params.employeeid),
      areaid: Number(params.areaid),
      defalutshifttypeid: Number(params.defalutshifttypeid),
      employeepattributes: params.employeepattributes,
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

  

  // 导出
  const downloadExcel = async () => {
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          'emploeeno': dataList[i].emploeeno,
          'employeename': dataList[i].employeename,
          'hour': dataList[i].hour,
          'periodtime': dataList[i].periodtime,
          'relax': dataList[i].relax,
          'd01': dataList[i].d01,
          'd02': dataList[i].d02,
          'd03': dataList[i].d03,
          'd04': dataList[i].d04,
          'd05': dataList[i].d05,
          'd06': dataList[i].d06,
          'd07': dataList[i].d07,
          'd08': dataList[i].d08,
          'd09': dataList[i].d09,
          'd10': dataList[i].d10,
          'd11': dataList[i].d11,
          'd12': dataList[i].d12,
          'd13': dataList[i].d13,
          'd14': dataList[i].d14,
          'd15': dataList[i].d15,
          'd16': dataList[i].d16,
          'd17': dataList[i].d17,
          'd18': dataList[i].d18,
          'd19': dataList[i].d19,
          'd20': dataList[i].d20,
          'd21': dataList[i].d21,
          'd22': dataList[i].d22,
          'd23': dataList[i].d23,
          'd24': dataList[i].d24,
          'd25': dataList[i].d25,
          'd26': dataList[i].d26,
          'd27': dataList[i].d27,
          'd28': dataList[i].d28,
          'd29': dataList[i].d29,
          'd30': dataList[i].d30,
          'd31': dataList[i].d31

        }
        dataTable.push(obj);
      }
    }
    option.fileName = '工时查询'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['emploeeno', 'employeename', 'hour', 'periodtime', 'relax', 'd01', 'd02', 'd03', 'd04', 'd05', 'd06',
          'd07', 'd08', 'd09', 'd10', 'd11', 'd12', 'd13', 'd14', 'd5', 'd16', 'd17', 'd18', 'd19', 'd20',
          'd21', 'd22', 'd23', 'd24', 'd25', 'd26', 'd27', 'd28', 'd29', 'd30', 'd31'],
        sheetHeader: ['员工编号', '员工', '排班', '工时', '休假', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
          '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
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
        scroll={{ x: 2500, y: 500 }}
        pagination={false}
        rowKey="emploeeno"
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}

        toolBarRender={() => [
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
          rowKey="emploeeno"
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
            rowKey="emploeeno"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ workHours }) => ({ workHours }))(workHoursComponent);




