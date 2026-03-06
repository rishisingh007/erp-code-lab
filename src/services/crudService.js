import api from "../api/apiClient";

export function createCrudService(endpoint) {

  return {

    list: (params) =>
      api.get(endpoint, { params }).then(r => r.data),

    create: (data) =>
      api.post(endpoint, data),

    update: (id, data) =>
      api.put(`${endpoint}/${id}`, data),

    delete: (id) =>
      api.delete(`${endpoint}/${id}`),

  };
}