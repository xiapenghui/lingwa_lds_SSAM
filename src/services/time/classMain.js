import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`

/**
 * 查询条件初始化
//  */

//查询部门接口
export async function getDepartement() {
  return request(`${ip}/WebAPI/api/Common/GetDepartmentIdText`, {
    method: 'POST',
  });
}

//查询员工接口
export async function getPerson(params) {
  return request(`${ip}/WebAPI/api/Common/GetEmployeeIdText`, {
    method: 'POST',
    data: { ...params }
  });
}



//班次接口
export async function getShif() {
  return request(`${ip}/WebAPI/api/Common/GetShiftinfoIdTextAll`, {
    method: 'POST',
  });
}

//班别接口
export async function getShiftType() {
  return request(`${ip}/WebAPI/api/Common/GetShiftTypeIdText`, {
    method: 'POST',
  });
}



//工厂名称接口
export async function getProduct() {
  return request(`${ip}/WebAPI/api/Common/GetProductFamilyIdText`, {
    method: 'POST',
  });
}



// 区域接口
export async function getArea(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductAreaIdText`, {
    method: 'POST',
    data: { ...params }
  });
}


// 线体接口
export async function getLine(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductLineTextIdText`, {
    method: 'POST',
    data: { ...params }
  });
}

// 红色项接口
export async function getRed(params) {
  return request(`${ip}/WebAPI/api/Common/GetRedItemIdText`, {
    method: 'POST',
    data: { ...params }
  });
}


// 时间段接口
export async function getTimeaxis(params) {
  return request(`${ip}/WebAPI/api/Common/GetTimeaxisInfoIdText`, {
    method: 'POST',
    data: { ...params }
  });
}





/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/TimeShiftInfoType/List`, {
    method: 'POST',
    data: { ...params },
  });
}



// /**
//  * 新建保存
//  */
// export async function addPost(params) {
//   return request(`${ip}/WebAPI/api/TimeDailyShift/Add`, {
//     method: 'POST',
//     data: { ...params },
//   });
// }


// /**
//  * 编辑保存
//  */
// export async function updatePut(params) {
//   return request(`${ip}/WebAPI/api/TimeShiftInfoType/Modify`, {
//     method: 'POST',
//     data: { ...params },
//   });
// }



/**
 * 编辑班次
 */
export async function Modifyshiftclass(params) {
  return request(`${ip}/WebAPI/api/TimeShiftInfoType/Modifyshiftclass`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 编辑班别
 */
 export async function ModifyShiftType(params) {
  return request(`${ip}/WebAPI/api/TimeShiftInfoType/ModifyShiftType`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 编辑区域
 */
 export async function ModifyArea(params) {
  return request(`${ip}/WebAPI/api/TimeShiftInfoType/ModifyArea`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑线体
 */
 export async function ModifyLine(params) {
  return request(`${ip}/WebAPI/api/TimeShiftInfoType/ModifyLine`, {
    method: 'POST',
    data: { ...params },
  });
}



/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/WebAPI/api/TimeDailyShift/Delete`, {
    method: 'POST',
    data: { ...params },
  });
}





