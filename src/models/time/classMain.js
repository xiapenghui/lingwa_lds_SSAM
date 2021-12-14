import { stringify } from 'querystring';
import { history } from 'umi';

import {
  postListInit,
  getDepartement,
  getPerson,
  getArea,
  getLine,
  getShif,
  getShiftType,
  Modifyshiftclass,
  ModifyShiftType,
  ModifyArea,
  ModifyLine

} from '@/services/time/classMain';
import globalConfig from '../../../config/defaultSettings';
import { message } from 'antd';
import { resolve } from 'path';
import moment from 'moment'
const TableName = 'classMain'
const Model = {
  namespace: TableName,
  state: {
    FromParams: {},
    TableData: [],
    tableLoading: false,
    pagination: {
      PageIndex: Number(globalConfig.table.paginationConfig.PageIndex) || 1, //当前页数
      PageSize: Number(globalConfig.table.paginationConfig.PageSize) || 10,// 表格每页显示多少条数据
      Total: Number(globalConfig.table.paginationConfig.Total) || 10,  //总条数
    },
    banciModalVisible: false,
    banbieModalVisible: false,

    departmentList: [],
    personList: [],
    areaList: [],
    lineList: [],
    shifList: [],
    shiftTypeList: [],
    mergeList: [],

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/time/${TableName}`) {

          //下拉部门
          dispatch({
            type: 'getDepartement',
            payload: {}
          })

          //下拉员工
          dispatch({
            type: 'getPerson',
            payload: {}
          })
          //下拉区域
          dispatch({
            type: 'getArea',
            payload: {}
          })
          //下拉线体
          dispatch({
            type: 'getLine',
            payload: {}
          })

          //下拉班次
          dispatch({
            type: 'getShif',
            payload: {}
          })
          //下拉班别
          dispatch({
            type: 'getShiftType',
            payload: {}
          })

          dispatch({
            type: 'query',
            payload: {
              pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
              pageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            }
          })
        }
      })
    },
  },


  effects: {


    //查询初始化部门
    * getDepartement({
      payload,
    }, { call, put, select }) {
      const data = yield call(getDepartement)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          newList.push({ key: key, label: value.text })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getDepartement',
            data: newList,
          }
        })
        return
      }
    },

    //查询初始化员工
    * getPerson({
      payload,
    }, { call, put, select }) {
      const data = yield call(getPerson)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          newList.push({ key: key, label: value.text })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getPerson',
            data: newList,
          }
        })
        return
      }
    },


    //查询初始化区域
    * getArea({
      payload,
    }, { call, put, select }) {
      const data = yield call(getArea)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          newList.push({ key: key, label: value.text })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getArea',
            data: newList,
          }
        })
        return
      }
    },

    //查询初始化线体
    * getLine({
      payload,
    }, { call, put, select }) {
      const data = yield call(getLine)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          newList.push({ key: key, label: value.text })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getLine',
            data: newList,
          }
        })
        return
      }
    },




    //查询初始化班次
    * getShif({
      payload,
    }, { call, put, select }) {
      const data = yield call(getShif)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          if (value.text != '全部') {
            newList.push({ key: key, label: value.text })
          }
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getShif',
            data: newList,
          }
        })
        return
      }
    },



    //查询初始化班别
    * getShiftType({
      payload,
    }, { call, put, select }) {
      const data = yield call(getShiftType)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        // 返回新的组件
        let newList = []
        for (let [key, value] of Object.entries(data.list)) {
          newList.push({ key: key, label: value.text })
        }
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getShiftType',
            data: newList,
          }
        })
        return
      }
    },



    //批量编辑班次
    * Modifyshiftclass({
      payload,
    }, { call, put, select }) {
      debugger
      const data = yield call(Modifyshiftclass, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        // const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: FromParams,
        })
        yield put({
          type: 'hideModal',
          payload: payload.type,
        })
        return message.success(data.message);
      } else {
        throw data
      }
    },




    //批量编辑班别
    * ModifyShiftType({
      payload,
    }, { call, put, select }) {
      const data = yield call(ModifyShiftType, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        // const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: FromParams,
        })
        yield put({
          type: 'hideModal',
          payload: payload.type,
        })
        return message.success(data.message);
      } else {
        throw data
      }
    },


    //批量编辑区域
    * ModifyArea({
      payload,
    }, { call, put, select }) {
      const data = yield call(ModifyArea, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        // const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: FromParams,
        })
        yield put({
          type: 'hideModal',
          payload: payload.type,
        })
        return message.success(data.message);
      } else {
        throw data
      }
    },

    

    //批量编辑线体
    * ModifyLine({
      payload,
    }, { call, put, select }) {
      const data = yield call(ModifyLine, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        // const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: FromParams,
        })
        yield put({
          type: 'hideModal',
          payload: payload.type,
        })
        return message.success(data.message);
      } else {
        throw data
      }
    },






    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'FromParamsChanger', payload: payload })
      const fromParams = yield select(state => state[TableName].FromParams)
      const data = yield call(postListInit, fromParams)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'query',
            data: data.list,
          },
        })
        // yield put({
        //   type: 'tablePaginationChanger',
        //   payload: {
        //     PageIndex: data.list.pageNum,
        //     PageSize: data.list.pageSize,
        //     total: data.list.total
        //   },
        // })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
        return
      } else {
        throw data
      }
    },





    * showModalAndAjax({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'banciModalVisible') {
        yield put({ type: 'showModal', payload: payload })
      } else if (payload.modalType === 'banbieModalVisible') {
        yield put({ type: 'showModal', payload: payload })
      } else if (payload.modalType === 'quyuModalVisible') {
        yield put({ type: 'showModal', payload: payload })
      } else if (payload.modalType === 'lineModalVisible') {
        yield put({ type: 'showModal', payload: payload })
      }
    },
  },
  reducers: {
    //打开关闭Modals
    showModal(state, { payload }) {
      return {
        ...state, ...payload,
        [payload.modalType]: true,
        mergeList: payload.record,
      }
    },
    hideModal(state, { payload }) {
      return { ...state, ...payload, [payload]: false }
    },



    //下拉框赋值
    querySuccess(state, { payload }) {
      if (payload.type === 'query') {
        return {
          ...state, ...payload,
          TableData: payload.data,
        }
      } else if (payload.type === 'getDepartement') {
        return {
          ...state, ...payload,
          departmentList: payload.data,
        }
      }
      else if (payload.type === 'getPerson') {
        return {
          ...state, ...payload,
          personList: payload.data,
        }
      }

      else if (payload.type === 'getArea') {
        return {
          ...state, ...payload,
          areaList: payload.data,
        }
      }

      else if (payload.type === 'getLine') {
        return {
          ...state, ...payload,
          lineList: payload.data,
        }
      }

      else if (payload.type === 'getShif') {
        return {
          ...state, ...payload,
          shifList: payload.data,
        }
      }

      else if (payload.type === 'getShiftType') {
        return {
          ...state, ...payload,
          shiftTypeList: payload.data,
        }
      }
    },
    //teble loading处理
    loadingChanger(state, { payload }) {
      if (payload === 'showLoading') {
        return { ...state, ...payload, tableLoading: true }
      } else if (payload === 'closeLoading') {
        return { ...state, ...payload, tableLoading: false }
      }
    },
    //改变table pageIndex pageSize
    tablePaginationChanger(state, { payload }) {
      return {
        ...state, ...payload,
        pagination: {
          PageIndex: payload.PageIndex,
          PageSize: payload.PageSize,
          total: payload.total
        }
      }
    },
    // 改变table 查询条件
    FromParamsChanger(state, { payload }) {
      return { ...state, ...payload, FromParams: payload }
    }
  },
};
export default Model;

