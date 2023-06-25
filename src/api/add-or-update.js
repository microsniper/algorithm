import $httpRequest from "../utils/request";

export function add(data){
  return $httpRequest({
    url: '/algorithm/add',
    method: 'post',
    data: data
  })
}

export function update(data){
  return $httpRequest({
    url: '/algorithm/update',
    method: 'post',
    data: data
  })
}

export function getOne(algorithmId){
  return $httpRequest({
    url: `/algorithm/getOneById/${algorithmId}`,
    method: 'get'
  })
}
