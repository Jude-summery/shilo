import request from '@/utils/request';

export async function signup(params) {
  return request('/api/signup', {
    method: 'POST',
    data: params,
  });
}
