import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/user/get');
}
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}
export async function queryTest(params) {
  return request('/api/posts/test');
}
