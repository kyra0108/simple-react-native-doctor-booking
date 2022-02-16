import React from 'react';
import {DateTimeData} from '../model/DataTime';
import {DoctorData} from '../model/DoctorData';
import {Service} from '../model/service';
import {
  SET_MAIN_CONERN,
  SET_DATE_TIME,
  SET_DOCTOR_DETAIL,
  SET_TCM_SERVICE,
} from './actions';

export interface IProps {
  mainConcern: string;
  service?: Service;
  doctor?: DoctorData;
  dateTime?: DateTimeData;
}

const initialState: IProps = {
  mainConcern: '',
  service: null,
  doctor: null,
  dateTime: null,
};

export type Action = {
  type: string;
  payload?: any;
};

function bookingReducer(state: IProps = initialState, action: Action) {
  switch (action.type) {
    case SET_TCM_SERVICE:
      return {...state, service: action.payload};
    case SET_DOCTOR_DETAIL:
      return {...state, doctor: action.payload};
    case SET_DATE_TIME:
      return {...state, dateTime: action.payload};
    case SET_MAIN_CONERN:
      return {...state, mainConcern: action.payload};
    default:
      return state;
  }
}
export default bookingReducer;
