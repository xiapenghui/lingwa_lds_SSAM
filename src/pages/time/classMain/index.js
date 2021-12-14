import { PlusOutlined ,UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import TableComponents from './components/TableComponents';
import globalConfig from '../../../../config/defaultSettings';
import BanciForm from './components/BanciForm';
import BanbieForm from './components/BanbieForm';
import QuyuForm from './components/QuyuForm';
import LineForm from './components/LineForm';
import ExportJsonExcel from 'js-export-excel';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
}

const TableName = 'classMain'

const Component = ({
  classMain,
  dispatch,
  user
}) => {

  const TableModelsData = classMain
  const { FromParams,
    TableData,
    pagination,
    tableLoading,
    banciModalVisible,
    banbieModalVisible,
    quyuModalVisible,
    lineModalVisible,
    departmentList,
    personList,
    areaList,
    lineList,
    shiftTypeList,

  } = TableModelsData

  const [form] = Form.useForm();
  // const [IsUpdate, setIsUpdate] = useState(false);

  /**
   *
   * @param handleSearch 搜索
   */
  const handleSearch = (e) => {
    form
      .validateFields()
      .then((values) => {
        const Params = {
          departmentid: values.departmentid,
          employeeid: values.employeeid,
          areaid: values.areaid,
          lineid: values.lineid,
          defalutshifttypeid: values.defalutshifttypeid,
        }
        SearchTableList(Params, 1, pagination.PageSize)
      })
      .catch((info) => {
        console.log('handleSearch Failed:', info);
      });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      departmentid: form.getFieldValue("departmentid"),
      employeeid: form.getFieldValue("employeeid"),
      areaid: form.getFieldValue("areaid"),
      lineid: form.getFieldValue("lineid"),
      defalutshifttypeid: form.getFieldValue("defalutshifttypeid"),
    }
    SearchTableList(Params, PageIndex, PageSize)
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {

    console.log('SearchTableList', payload, PageIndex, PageSize)
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        pageNum: PageIndex,
        pageSize: PageSize
      },
    })
  }


  const handleAdd = (modalType) => {

  }


  const TableColumns = [

    {
      title: '部门',
      dataIndex: 'departmentshortname',
      align: 'center',
      width: 200,
    },
    {
      title: '员工',
      dataIndex: 'employeename',
      align: 'center',
      width: 200,
    },


   
    // {
    //   title: '员工',
    //   dataIndex: 'employeeid',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 150,
    //   fixed:'left',
    //   valueEnum: personList.length == 0 ? {} : personList,
    //   // initialValue: !IsUpdate ? '' : (UpdateDate.employeeid ? UpdateDate.employeeid.toString() : ''),
    //   initialValue:,
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form' || type === 'table') {
    //       // 返回新的组件
    //       let newList = []
    //       for (let [key, value] of Object.entries(personList)) {
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
    // },


    {

      title: '区域',
      dataIndex: 'areaname',
      align: 'center',
      width: 200,
    },
    {
      title: '线体',
      dataIndex: 'defaultlinename',
      align: 'center',
      width: 400,
    },
    {
      title: '班别',
      dataIndex: 'defalutshifttypename',
      align: 'center',
      width: 200,
    },
    {
      title: '班次',
      dataIndex: 'defaultshiftclassname',
      align: 'center',
      width: 200,
    },
    {
      title: '花费时间',
      dataIndex: 'shifthour',
      align: 'center',
      width: 200,
    },
  ];


  const handleResetFields = (type) => {

    form.resetFields();
  }




  /**
 * modal 开关
 */
  const ModalShowChanger = async (modalVisible, record) => {
    // 业务改变为默认每次新增模态框打开 首先清空上次缓存数据
    if (modalVisible === 'banciModalVisible') {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    } else if (modalVisible === 'banbieModalVisible') {

      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    }

    else if (modalVisible === 'quyuModalVisible') {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    }
    else if (modalVisible === 'lineModalVisible') {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    } else {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    }
  }



  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${TableName}/hideModal`,
      payload: modalVisible
    })
    //从这里要调用父组件来清空Form新增表单域
    // handleResetFields('AddFormLayout')
  }
 

    // 导出
    const downloadExcel = async () => {
      var option = {};
      var dataTable = [];
      if (TableData.length > 0) {
        for (let i in TableData) {
          let obj = {
            'departmentshortname': TableData[i].departmentshortname,
            'employeename': TableData[i].employeename,
            'areaname':TableData[i].areaname,
            'defaultlinename':TableData[i].defaultlinename,
            'defalutshifttypename':TableData[i].defalutshifttypename,
            'defaultshiftclassname':TableData[i].defaultshiftclassname,
            'shifthour':TableData[i].shifthour,

          };
          dataTable.push(obj);
        }
      }
      option.fileName = '班别班次维护'
      option.datas = [
        {
          sheetData: dataTable,
          sheetName: 'sheet',
          sheetFilter: ['departmentshortname', 'employeename', 'areaname','defaultlinename',
        'defalutshifttypename','defaultshiftclassname','shifthour'],
          sheetHeader: ['部门', '员工', '区域','线体','班别','班次','花费时间'],
        }
      ];
      var toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel();
    };


  return (

    <div>
      <PageContainer />
      <Form
        style={{ margin: '20px 0' }}
        className="ant-advanced-search-form"
        onFinish={handleSearch}
        form={form}
        name="form_in_modal"
      // initialValues={
      //   {
      //     sdate1: moment( firstdate,globalConfig.form.onlyDateFormat),
      //     sdate2:moment( lastdate,globalConfig.form.onlyDateFormat),
      //   }
      // }
      >
        <Row gutter={40}>
          <Col span={6} style={{ display: 'block' }}>
            <Form.Item
              name="departmentid"
              label="部门"
              {...formItemLayout}
            >
              <Select
                allowClear
                showSearch
              >
                {departmentList != null ? departmentList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                }) : ""}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} style={{ display: 'block' }}>
            <Form.Item
              name="employeeid"
              label="员工"
              {...formItemLayout}
            >
              <Select
                allowClear
                showSearch
                optionFilterProp='children'
              >
                {personList != null ? personList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                }) : ""}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6} style={{ display: 'block' }}>
            <Form.Item
              name="areaid"
              label="区域"
              {...formItemLayout}
            >
              <Select
                allowClear
                showSearch
              >
                {areaList != null ? areaList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                }) : ""}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6} style={{ display: 'block' }}>
            <Form.Item
              name="defalutshifttypeid"
              label="班别"
              {...formItemLayout}
            >
              <Select
                allowClear
                showSearch
              >
                {shiftTypeList != null ? shiftTypeList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                }) : ""}
              </Select>
            </Form.Item>
          </Col>


          <Col span={6} style={{ display: 'block' }}>
            <Form.Item
              name="lineid"
              label="线体"
              {...formItemLayout}
            >
              <Select
                allowClear
                showSearch
              >
                {lineList != null ? lineList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                }) : ""}
              </Select>
            </Form.Item>
          </Col>

        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit"><SearchOutlined />查询</Button>
            <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields()}><ClearOutlined />清空</Button>
          </Col>
        </Row>
      </Form>

  
      <TableComponents
        downloadExcel={downloadExcel}
        scroll={{y: 500 }}
        tableName={TableName}
        data={TableData}
        tableLoading={tableLoading}
        pagination={pagination}
        columns={TableColumns}
        TableWidth={'100%'}
        handleAdd={handleAdd}
        tableModels={TableModelsData}
        PaginationComponentsChanger={PaginationComponentsChanger}
        handleResetFields={handleResetFields}
        ModalShowChanger={ModalShowChanger}
      />



      <BanciForm
        ModalTitle='编辑班次'
        banciModalVisible={banciModalVisible}
        handleModalClose={handleModalClose}
        handleAdd={handleAdd}
        ModalWidth={500}
        dispatch={dispatch}
        tableName={TableName}
        data={TableModelsData}
      />


      <BanbieForm
        ModalTitle='编辑班别'
        banbieModalVisible={banbieModalVisible}
        handleModalClose={handleModalClose}
        handleAdd={handleAdd}
        ModalWidth={500}
        dispatch={dispatch}
        tableName={TableName}
        data={TableModelsData}
      />


      <QuyuForm
        ModalTitle='编辑区域'
        quyuModalVisible={quyuModalVisible}
        handleModalClose={handleModalClose}
        handleAdd={handleAdd}
        ModalWidth={500}
        dispatch={dispatch}
        tableName={TableName}
        data={TableModelsData}
      />

      <LineForm
        ModalTitle='编辑线体'
        lineModalVisible={lineModalVisible}
        handleModalClose={handleModalClose}
        handleAdd={handleAdd}
        ModalWidth={500}
        dispatch={dispatch}
        tableName={TableName}
        data={TableModelsData}
      />

        


    </div>
  );
};

export default connect(({ classMain }) => ({ classMain }))(Component);





