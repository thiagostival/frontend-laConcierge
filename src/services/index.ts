import { api, CancelToken } from "./api";

// TYPES
import { IRegisterUser, IUpdateBusy, IUpdateMax } from "../types";

//! LOGIN
export function createSession() {
  const source = CancelToken.source();

  function apiCall({ email, password }: { email: string; password: string }) {
    return api.post(
      "/sessions",
      {
        email,
        password,
      },
      {
        cancelToken: source.token,
        baseURL: import.meta.env.VITE_APP_API_AUTH,
      }
    );
  }

  return { source, apiCall };
}

//! USERs
export function getUser() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get("/users", {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_AUTH,
    });
  }

  return { source, apiCall };
}

export function registerUser() {
  const source = CancelToken.source();

  function apiCall({
    name,
    email,
    password,
    tel,
    is_establishment = false,
    cnpj,
    cpf,
    birth_date,
  }: IRegisterUser) {
    let obj: IRegisterUser = {
      name,
      email,
      password,
      tel,
      is_establishment,
    };

    if (!is_establishment) {
      obj.cpf = cpf;
      obj.birth_date = birth_date;
    } else {
      obj.cnpj = cnpj;
    }

    return api.post(
      "/users",
      {
        ...obj,
      },
      {
        cancelToken: source.token,
        baseURL: import.meta.env.VITE_APP_API_AUTH,
      }
    );
  }

  return { source, apiCall };
}

export function deleteUser() {
  const source = CancelToken.source();

  function apiCall() {
    return api.delete("/users/delete", {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_AUTH,
    });
  }

  return { source, apiCall };
}

export function updateAvatar() {
  const source = CancelToken.source();

  function apiCall(file: File) {
    var formData = new FormData();
    formData.append("avatar", file);

    return api.patch("/users/avatar", formData, {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_AUTH,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return { source, apiCall };
}

//! ESTABLISHMENT
export function getEstablishment() {
  const source = CancelToken.source();

  function apiCall(id: string) {
    return api.get(`/establishment/${id}`, {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_AUTH,
    });
  }

  return { source, apiCall };
}

export function getAllEstablishment() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get(`/establishment/all`, {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_AUTH,
    });
  }

  return { source, apiCall };
}

export function getListEstablishment() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get(`/establishment/list`, {
      cancelToken: source.token,
      baseURL: import.meta.env.VITE_APP_API_OCCUPANCY,
    });
  }

  return { source, apiCall };
}

export function updateMaxEstablishment() {
  const source = CancelToken.source();

  function apiCall({ id, busyCapacity, maxCapacity }: IUpdateMax) {
    return api.put(
      `/establishment/updateMaxCapacity`,
      {
        id,
        busyCapacity,
        maxCapacity,
      },
      {
        cancelToken: source.token,
        baseURL: import.meta.env.VITE_APP_API_OCCUPANCY,
      }
    );
  }

  return { source, apiCall };
}

export function updateBusyEstablishment() {
  const source = CancelToken.source();

  function apiCall({ id, busyCapacity, maxCapacity }: IUpdateBusy) {
    return api.put(
      `/establishment/updateBusyCapacity`,
      {
        id,
        busyCapacity,
        maxCapacity,
      },
      {
        cancelToken: source.token,
        baseURL: import.meta.env.VITE_APP_API_OCCUPANCY,
      }
    );
  }

  return { source, apiCall };
}
