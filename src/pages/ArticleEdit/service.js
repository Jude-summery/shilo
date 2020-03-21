import request from '@/utils/request';

export async function postsCreate(params) {
  return request('/api/posts/create', {
    method: 'POST',
    data: params,
  });
}

export async function getPostById(params) {
  return request('/api/posts/getOne', {
    params: params
  });
}

export async function postUpdate(params) {
  return request('/api/posts/edit', {
    method: 'POST',
    data: params
  })
}
