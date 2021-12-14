import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import { Button, message ,Select  } from 'antd';
import React, { useState, useRef, useEffect  } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/product/productAndLine';

const numberComponent = ({
  productAndLine,
  dispatch
}) => {
  const {
    TableList,
    typeList,
    riskList,
    isNoList,
    lineList,
    ProductTypeList
  } = productAndLine
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
      title: '产品名称',
      dataIndex: 'productid',
      valueType: 'text',
      align: 'center',
      hideInTable:true,
      width:150,
      valueEnum: ProductTypeList.length == 0 ? {} : ProductTypeList,
      initialValue: !IsUpdate ? '' : (UpdateDate.productid ? UpdateDate.productid.toString() : ''),
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        
        if (type === 'form' || type === 'table') {
          // 返回新的组件
          let newList = []
          for (let [key, value] of Object.entries(ProductTypeList)) {
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
      title: '产品名称',
      dataIndex: 'productname',
      valueType: 'text',
      align: 'center',
      width:150,
      hideInSearch:true,
      hideInForm:true,
    },


    {
      title: '线体名称',
      dataIndex: 'lineid',
      valueType: 'text',
      align: 'center',
      width: 150,
      hideInTable:true,
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
      title: '线体名称',
      dataIndex: 'linename',
      valueType: 'text',
      align: 'center',
      width:150,
      hideInSearch:true,
      hideInForm:true,
    },



    {
      title: 'ut',
      dataIndex: 'ut',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
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
      width:100,
      hideInSearch:true,
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
      title: '目标KE',
      dataIndex: 'TargetKE',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetKE : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标KE不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '目标IE',
      dataIndex: 'TargetIE',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetIE : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标IE不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '目标SUR',
      dataIndex: 'TargetSUR',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetSUR : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标SUR不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '目标OEE',
      dataIndex: 'TargetOEE',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetOEE : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标OEE不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '最高效率',
      dataIndex: 'Preference',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.Preference : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '最高效率不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '目标FPY',
      dataIndex: 'TargetFPY',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetFPY : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标FPY不能为空!',
          },
        ],
      },
      render: (text) => {
        return text + "%";
      },
    },

    {
      title: '目标MDR',
      dataIndex: 'TargetMDR',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetMDR : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标MDR不能为空!',
          },
        ],
      },
    },

    
    {
      title: '目标效率',
      dataIndex: 'TargetAvailability',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetAvailability : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标效率不能为空!',
          },
        ],
      },
     
    },

    {
      title: '目标质量',
      dataIndex: 'TargetQuality',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetQuality : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标质量不能为空!',
          },
        ],
      },
    },

    {
      title: '目标最高效率',
      dataIndex: 'TargetPerformance',
      valueType: 'text',
      align: 'center',
      width:100,
      hideInSearch:true,
      initialValue: IsUpdate ? UpdateDate.TargetPerformance : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '目标最高效率不能为空!',
          },
        ],
      },
    },


    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width:100,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width:100,
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
      productid:params.productid,
      lineid:params.lineid,
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
    })
  };
 
  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost(fields);
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
      let data = await updatePut({ id: UpdateDate.id, ...fields });
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
        shipids: selectedRows.map((row) => row.id),
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
          'productname': dataList[i].productname,
          'linename': dataList[i].linename,
          'ut': dataList[i].ut,
          'dt': dataList[i].dt,
          'TargetKE': dataList[i].TargetKE + '%',
          'TargetIE': dataList[i].TargetIE  + '%',
          'TargetSUR': dataList[i].TargetSUR  + '%',
          'TargetOEE': dataList[i].TargetOEE + '%',
          'Preference': dataList[i].Preference  + '%',
          'TargetFPY': dataList[i].TargetFPY  + '%',
          'TargetMDR': dataList[i].TargetMDR,
          'TargetAvailability': dataList[i].TargetAvailability,
          'TargetQuality': dataList[i].TargetQuality,
          'TargetPerformance': dataList[i].TargetPerformance,
          'remark':dataList[i].remark,
        }
        dataTable.push(obj);
      }
    }
    option.fileName = '产品与线体的关系'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['productname','linename','ut', 'dt','TargetKE','TargetIE','TargetSUR','TargetOEE','Preference','TargetFPY',
        'TargetMDR','TargetAvailability','TargetQuality','TargetPerformance','remark'],
        sheetHeader: ['产品名称','线体名称','ut', 'dt',  '目标KE',  '目标IE',  '目标SUR',  
        '目标OEE',  '最高效率',  '目标FPY',  '目标MDR',  '目标效率',  '目标质量','目标最高效率','备注'],
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

export default connect(({ productAndLine }) => ({ productAndLine }))(numberComponent);




