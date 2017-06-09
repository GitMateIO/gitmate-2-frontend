export class UserModel {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

export class RepoModel {
  id: number;
  provider: string;
  full_name: string;
  active: boolean;
  user: string;
  admins: string[];
}

export class SettingModel {
  name: string;
  value: any;
  type: string;
  description: string;
}

export class PluginModel {
  name: string;
  title: string;
  description: string;
  active: boolean;
  settings: SettingModel[];
}
