import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm, Divider, message } from 'antd'
import { EditOutlined, DeleteOutlined ,UploadOutlined  } from '@ant-design/icons';
import { Link, connect } from 'umi';
// import { ModalComponents } from './ModalComponents'
import './index.less'
// import wrapAuth from '@/components/wrapAuth';
import ButtonComponent from '@/components/ButtonComponent';
// const AuthButton = wrapAuth(Button);
// const AuthA = wrapAuth(ButtonComponent);

let column = []
let DeleteIdArray = []

const TableComponents = ({
  expandedRowRenderKEY,
  expandedRowRenderNAME,
  tableName,
  tableModels,
  dispatch,
  columns,
  TableWidth,
  ModalWidth,
  data,
  pagination,
  addModalValue,
  editModalValue,
  detailsModalValue,
  handleAdd,
  tableLoading,
  // EditData,
  PaginationComponentsChanger,
  ModalShowChanger,
  handleResetFields,
  downloadExcel,
  staffType,
  currentUser
}) => {
  console.log('TableComponents-=',
    tableName,
    tableModels,
    columns,
    TableWidth,
    ModalWidth,
    downloadExcel,
    data,
    pagination)
  // let { banciModalVisible, banbieModalVisible ,editModalVisible, detailsModalVisible, deleteModalVisible, EditData } = tableModels

  const ActionColumn = [{
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 120,
    render: (text, record) => (
      <span>
        {/* <a onClick={() => handleModalShow('editModalVisible', record)}>编辑</a>
        <a onClick={() => handleModalShow('detailsModalVisible', record)}>详情</a> */}
        展示
      </span>
    ),
  }]
  const columnFunc = (column, columns) => {
    //父组件传来的表头
    column = []
    let TotalColumn = column.concat(columns)
    return TotalColumn
  }
  const handleModalShow = (modalVisible, record) => {
    if (DeleteIdArray.length == 0) {
      return message.error("请选中你要修改的数据！")
    }
    
    ModalShowChanger(modalVisible, DeleteIdArray)
  }
  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${tableName}/hideModal`,
      payload: modalVisible
    })
    //从这里要调用父组件来清空Form新增表单域
    handleResetFields('AddFormLayout')
  }

  const onShowSizeChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }

  //删除
  const deleteHandler = () => {
    if (DeleteIdArray.length == 0) {
      return message.error("请选中你要删除的数据！")
    }
    dispatch({
      type: `${tableName}/delete`,
      payload: {
        data: {
          list: DeleteIdArray
        }
      }
    })
    DeleteIdArray = []
  }






  const onPaginationChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }

  // rowSelection object indicates the need for row selection
  // rowSelection object indicates the need for row selection
  const [DeleteIdArray2, setDeleteIdArray2] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      DeleteIdArray = selectedRowKeys.map(index => {
        return index
      })
      setDeleteIdArray2(DeleteIdArray);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows, DeleteIdArray);
    },
    selectedRowKeys: DeleteIdArray2,
    getCheckboxProps: (record) => ({
      // disabled: record.state != 0, 
    }),
  }


  /**
   * 更新已选中的值
   */
  useEffect(() => {
    DeleteIdArray = [];
    setDeleteIdArray2([]);
    return () => {
    }
  }, [data]);

  return (

    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'left', marginBottom: '10px' }}>
         <Button type="primary" onClick={() => downloadExcel()}>
           <UploadOutlined /> 全部导出
         </Button>
          <Button type="primary" onClick={() => handleModalShow('banciModalVisible')} style={{ marginLeft: '10px' }}>  <EditOutlined /> 编辑班次</Button>
          <Button type="primary" onClick={() => handleModalShow('banbieModalVisible')} style={{ marginLeft: '10px' }}>  <EditOutlined /> 编辑班别</Button>
          <Button type="primary" onClick={() => handleModalShow('quyuModalVisible')} style={{ marginLeft: '10px' }}> <EditOutlined /> 编辑区域</Button>
          <Button type="primary" onClick={() => handleModalShow('lineModalVisible')} style={{ marginLeft: '10px' }}>  <EditOutlined /> 编辑线体</Button>
          {/* <Button type="primary" style={{ marginLeft: '10px' }}>
            <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler()}>
              <DeleteOutlined /> 删除
          </Popconfirm>
          </Button> */}
        </Col>
      </Row>
      <Row>
        <Table
        
          bordered
          rowKey={record => record.employeeid}
          rowSelection={rowSelection}
          columns={columnFunc(column, columns)}
          // expandedRowRender={expandedRowRenderKEY && expandedRowRenderNAME !== null ? record => <p style={{ margin: 0 }}>{expandedRowRenderNAME}:{record[expandedRowRenderKEY]}</p> : record => <p style={{ margin: 0 }}>描述:{record.Name}</p>}
          dataSource={data}
          // scroll={{ x: TableWidth != null ? TableWidth : 'max-content' }}
          scroll={{ y:500 }}
          pagination={false}
          loading={tableLoading}
        />
      </Row>
      {/* <Row >
        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Pagination
            showQuickJumper//是否可以快速跳转至某页
            showTotal
            current={pagination.PageIndex}
            onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
            showSizeChanger={true}//是否可以改变 pageSize
            onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
            defaultCurrent={1}//默认的当前页数
            defaultPageSize={10}//默认的每页条数
            pageSizeOptions={['10', '20', '30', '40']}
            total={pagination.total}//数据总数
            showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
          />
        </Col>
      </Row> */}

    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)


