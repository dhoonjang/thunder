/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  explanation: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  name?: string | null;
  gender?: string | null;
  age?: string | null;
  email?: string | null;
  password?: string | null;
  introduction?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestCouple
// ====================================================

export interface requestCouple_RequestCouple_user {
  __typename: "User";
  id: number;
  coupleId: number | null;
}

export interface requestCouple_RequestCouple_couple_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface requestCouple_RequestCouple_couple {
  __typename: "Couple";
  id: number;
  status: string;
  users: (requestCouple_RequestCouple_couple_users | null)[] | null;
}

export interface requestCouple_RequestCouple {
  __typename: "RequestCoupleResponse";
  ok: boolean;
  error: string | null;
  user: requestCouple_RequestCouple_user | null;
  couple: requestCouple_RequestCouple_couple | null;
}

export interface requestCouple {
  RequestCouple: requestCouple_RequestCouple;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: findCouple
// ====================================================

export interface findCouple_FindCouple_user {
  __typename: "User";
  id: number;
  coupleId: number | null;
}

export interface findCouple_FindCouple_couple_users {
  __typename: "User";
  id: number;
  name: string;
  gender: string;
}

export interface findCouple_FindCouple_couple {
  __typename: "Couple";
  id: number;
  status: string;
  users: (findCouple_FindCouple_couple_users | null)[] | null;
}

export interface findCouple_FindCouple {
  __typename: "FindCoupleResponse";
  ok: boolean;
  error: string | null;
  user: findCouple_FindCouple_user | null;
  couple: findCouple_FindCouple_couple | null;
}

export interface findCouple {
  FindCouple: findCouple_FindCouple;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancelCouple
// ====================================================

export interface cancelCouple_ChangeCouple_user {
  __typename: "User";
  id: number;
}

export interface cancelCouple_ChangeCouple {
  __typename: "ChangeCoupleResponse";
  ok: boolean;
  error: string | null;
  user: cancelCouple_ChangeCouple_user | null;
  coupleId: number;
}

export interface cancelCouple {
  ChangeCouple: cancelCouple_ChangeCouple;
}

export interface cancelCoupleVariables {
  coupleId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyCouple
// ====================================================

export interface getMyCouple_GetMyCouple_couple_users {
  __typename: "User";
  id: number;
  name: string;
  gender: string;
}

export interface getMyCouple_GetMyCouple_couple {
  __typename: "Couple";
  id: number;
  status: string;
  users: (getMyCouple_GetMyCouple_couple_users | null)[] | null;
}

export interface getMyCouple_GetMyCouple {
  __typename: "GetMyCoupleResponse";
  ok: boolean;
  error: string | null;
  couple: getMyCouple_GetMyCouple_couple | null;
}

export interface getMyCouple {
  GetMyCouple: getMyCouple_GetMyCouple;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: logIn
// ====================================================

export interface logIn_LogIn {
  __typename: "LogInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface logIn {
  LogIn: logIn_LogIn;
}

export interface logInVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_SignUp {
  __typename: "SignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface signUp {
  SignUp: signUp_SignUp;
}

export interface signUpVariables {
  email: string;
  name: string;
  password: string;
  gender: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  gender: string;
  isVerified: boolean;
  isMatched: boolean;
  introduction: string | null;
  coupleId: number | null;
  age: number | null;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  explanation: string;
  star: number;
  address: string;
  lat: number;
  lng: number;
}

export interface getPlaces_GetPlaces {
  __typename: "GetPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (getPlaces_GetPlaces_places | null)[] | null;
}

export interface getPlaces {
  GetPlaces: getPlaces_GetPlaces;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
