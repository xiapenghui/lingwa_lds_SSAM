import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`

/**
 * 查询条件初始化
 */
// export async function getDropDownInit(params) {
//   return request(`${ip}/WebAPI/api/Common/GetProductAreaTextValuePair`, {
//     method: 'POST',
//     data: { ...params },
//   });
// }

//工厂名称接口
export async function getProduct() {
  return request(`${ip}/WebAPI/api/Common/GetProductFamilyIdText`, {
    method: 'POST',
  });
}

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/KpiProduct/List`, {
    method: 'POST',
    data: { ...params },
  });
}



 
 




