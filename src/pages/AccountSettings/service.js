import request from '@/utils/request';

export async function userUpdate(params) {
  return request('/api/user/update', {
    method: 'POST',
    data: params,
  });
}
