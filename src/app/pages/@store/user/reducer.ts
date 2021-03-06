import { UsersActions } from './actions';
import { UserModel } from './model';
import { createReducer, on } from '@ngrx/store';
import { AuthorityModel, AuthorityPermissionsModel } from '../authority';

export enum UserModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum UserModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
  createUser,
  createUserFailure,
  createUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  getUserAuthorities,
  getUserAuthoritiesSuccess,
  getUserAuthoritiesFailure,
  getProfile,
  getProfileSuccess,
  getProfileFailure,
  getProfilePermissions,
  getProfilePermissionsSuccess,
  getProfilePermissionsFailure,
  updateProfilePassword,
  updateProfilePasswordSuccess,
  updateProfilePasswordFailure,
  openUserView,
} = UsersActions;
export interface UserState {
  list: Array<UserModel>;
  item: UserModel;
  pagination: {
    page: number;
    size: number;
    totalRecords: number;
  };
  params: {
    page?: number;
    size?: number;
    sort?: string;
    search?: string;
    name?: string;
    fullName?: string;
  };
  loading: boolean;
  modal: {
    type: UserModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: UserModalStatus;
  };
  authorities: Array<AuthorityModel>;
  authoritiesLoading: boolean;
  profile: UserModel;
  profileLoading: boolean;
  profilePasswordLoading: boolean;
  profilePermissions: Array<AuthorityPermissionsModel>;
  profilePermissionsLoading: boolean;
}

export const initialState: UserState = {
  list: [],
  item: null,

  pagination: {
    page: 0,
    size: 10,
    totalRecords: 0,
  },
  params: {
    page: 0,
    size: 10,
    sort: null,
    search: null,
    fullName: null,
    name: null,
  },
  loading: false,
  modal: {
    type: UserModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: UserModalStatus.Init,
  },
  authorities: [],
  authoritiesLoading: false,
  profile: null,
  profileLoading: false,
  profilePasswordLoading: false,
  profilePermissions: [],
  profilePermissionsLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getUsers, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getUsersSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getUsersFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateUser, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: UserModalStatus.Called,
      type: UserModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateUserSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: UserModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateUserFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: UserModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createUser, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: UserModalStatus.Init,
      type: UserModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createUserSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: UserModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createUserFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: UserModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteUser, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteUserSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteUserFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openUserView, (state) => {
    const modal = {
      ...state.modal,
      status: UserModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getUserAuthorities, (state, { payload }) => {
    return { ...state, authoritiesLoading: true };
  }),
  on(getUserAuthoritiesSuccess, (state, { payload }) => {
    return {
      ...state,
      authorities: [...payload.data],
      authoritiesLoading: false,
    };
  }),
  on(getUserAuthoritiesFailure, (state) => {
    return {
      ...state,
      authoritiesLoading: false,
    };
  }),
  on(getProfile, (state) => {
    return { ...state, profileLoading: true };
  }),
  on(getProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      profile: { ...payload.data },
      profileLoading: false,
    };
  }),
  on(getProfileFailure, (state) => {
    return {
      ...state,
      profileLoading: false,
    };
  }),
  on(updateProfilePassword, (state) => {
    return { ...state, profilePasswordLoading: true };
  }),
  on(updateProfilePasswordSuccess, (state) => {
    return { ...state, profilePasswordLoading: false };
  }),
  on(updateProfilePasswordFailure, (state) => {
    return { ...state, profilePasswordLoading: false };
  }),
  on(getProfilePermissions, (state) => {
    return { ...state, profilePermissionsLoading: true };
  }),
  on(getProfilePermissionsSuccess, (state, { payload }) => {
    const { data } = payload;
    if (data && Array.isArray(data)) {
      return {
        ...state,
        profilePermissions: [...data],
        profilePermissionsLoading: false,
      };
    }
    return {
      ...state,
      profilePermissions: [],
      profilePermissionsLoading: false,
    };
  }),
  on(getProfilePermissionsFailure, (state) => {
    return { ...state, profilePermissionsLoading: false };
  })
);
