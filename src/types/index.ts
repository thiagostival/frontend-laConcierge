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

interface IRegisterUser extends Omit<IUser, "id" | "is_admin"> {
  password: string;
  cnpj?: string;
  cpf?: string;
  birth_date?: string;
}

export type { IRegisterUser, IClient, IEstablishment };
