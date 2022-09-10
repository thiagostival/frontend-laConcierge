import { api, CancelToken } from "./api";

// TYPES
import { IRegisterUser } from "../types";

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
      }
    );
  }

  return { source, apiCall };
}

export function getUser() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get("/users", {
      cancelToken: source.token,
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
      }
    );
  }

  return { source, apiCall };
}

//! ESTABLISHMENT
export function getEstablishment() {
  const source = CancelToken.source();

  function apiCall(id: string) {
    return api.get(`/establishment/${id}`, {
      cancelToken: source.token,
    });
  }

  return { source, apiCall };
}

export function getAllEstablishment() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get(`/establishment/all`, {
      cancelToken: source.token,
    });
  }

  return { source, apiCall };
}
