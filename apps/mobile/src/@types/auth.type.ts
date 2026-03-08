export type TUser = {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
};

export interface GoogleUser {
  user: {
    photo: string;
    givenName: string;
    familyName: string;
    name: string;
    email: string;
    id: string;
  };
  idToken: string;
  serverAuthCode: string;
  scopes: string[];
}

export interface AppleUser {
  user: string;
  email: string | null;
  fullName: {
    familyName: string | null;
    givenName: string | null;
    middleName: string | null;
    namePrefix: string | null;
    nameSuffix: string | null;
    nickname: string | null;
  };
  identityToken: string;
  authorizationCode: string;
  realUserStatus: number;
  state: string | null;
}

export type SocialUser = GoogleUser | AppleUser;

export interface AuthResponse {
  status: "success" | "error";
  user: TUser | null;
  message?: string;
}
