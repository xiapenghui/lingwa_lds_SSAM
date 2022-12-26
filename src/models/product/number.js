import { stringify } from "querystring";
import { history } from "umi";
import {
  getDropDownInit,
  postListInit,
  getProductTypeTrue,
  deleted,
  getAddDropDownInit,
  addPost,
  GetproductnoText,
} from "@/services/product/number";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
import { resolve } from "path";

const TableName = "number";
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    isNoList: {},
    ProductTypeListTrue: {},
    ProductNoList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/product/${TableName}`) {
          dispatch({
            type: "getDropDownInit",
            payload: {},
          });

          dispatch({
            type: "getProductTypeTrue",
            payload: {},
          });

          dispatch({
            type: "GetproductnoText",
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    /**
     *
     * @param {getDropDownInit} 查询初始化
     * @param {query} 查询
     */
    *getDropDownInit({ payload }, { call, put, select }) {
      const data = yield call(getDropDownInit);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getDropDownInit",
            data: data.data,
          },
        });
        return message.success(data.message);
      }
    },

    //获取PPR类型
    *GetproductnoText({ payload }, { call, put, select }) {
      const data = yield call(GetproductnoText);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "GetproductnoText",
            data: data.list,
          },
        });
        return message.success(data.message);
      }
    },

    //获取产品类型信息
    *getProductTypeTrue({ payload }, { call, put, select }) {
      const data = yield call(getProductTypeTrue);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getProductTypeTrue",
            data: data.list,
          },
        });
        return message.success(data.message);
      }
    },

    *query({ payload }, { call, put, select }) {
      const data = yield call(postListInit, payload);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "postListInit",
            data: data.data,
          },
        });
        return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === "getDropDownInit") {
        return {
          ...state,
          ...payload,
        };
      } else if (payload.type === "getProductTypeTrue") {
        return {
          ...state,
          ...payload,
          ProductTypeListTrue: payload.data,
        };
      } else if (payload.type === "GetproductnoText") {
        return {
          ...state,
          ...payload,
          ProductNoList: payload.data,
        };
      } else if (payload.type === "postListInit") {
        return {
          ...state,
          TableList: new Promise((resolve) => {
            resolve({
              data: payload.data.list,
              current: payload.data.pageNum,
              pageSize: payload.data.pageSize,
              success: true,
              total: payload.data.total,
            });
          }),
        };
      }
    },
  },
};
export default Model;
