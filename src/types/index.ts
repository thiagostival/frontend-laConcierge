interface IUser {
  id: string;
  name: string;
  email: string;
  tel: string;
  avatar_url?: string;
  is_admin?: boolean;
  is_establishment?: boolean;
  created_at: string;
}

interface IEstablishment extends IUser {
  cnpj: string;
  busy_capacity?: number;
  max_capacity?: number;
}

interface IClient extends IUser {
  cpf: string;
  birth_date: Date;
}

interface IRegisterUser extends Omit<IUser, "id" | "is_admin" | "created_at"> {
  password: string;
  cnpj?: string;
  cpf?: string;
  birth_date?: string;
}

interface IUpdateMax {
  id: string;
  busyCapacity: number;
  maxCapacity: number;
}

interface IUpdateBusy {
  id: string;
  busyCapacity: number;
  maxCapacity: number;
}

export type { IRegisterUser, IClient, IEstablishment, IUpdateMax, IUpdateBusy };
