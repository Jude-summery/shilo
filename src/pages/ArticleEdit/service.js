import request from '@/utils/request';

export async function postsCreate(params) {
  return request('/api/posts/create', {
    method: 'POST',
    data: params,
  });
}
