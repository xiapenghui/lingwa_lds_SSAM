import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`
/**
 * 查询条件初始化
 */
 
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

//班别接口二
export async function getShiftType2() { 
  return request(`${ip}/WebAPI/api/OrgShiftType/ListShiftTypeKeyWord`, {
    method: 'POST',
  });
}
 

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/KpiEmployeeSummary/List`, {
    method: 'POST',
    data: { ...params },
  });
}



 
 




