import React from 'react';
import {Dispatch} from 'redux';
import {DateTimeData} from '../model/DataTime';
import {DoctorData} from '../model/DoctorData';
import {Service} from '../model/service';

export const SET_TCM_SERVICE = 'SET_TCM_SERVICE';
export const SET_DATE_TIME = 'SET_DATE_TIME';
export const SET_DOCTOR_DETAIL = 'SET_DOCTOR_DETAIL';
export const SET_MAIN_CONERN = 'SET_MAIN_CONCERN';

export const setService = (service: Service) => (dispatch: Dispatch) => {
  dispatch({type: SET_TCM_SERVICE, payload: service});
};

export const setDateTime = (dateTime: DateTimeData) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_DATE_TIME,
    payload: dateTime,
  });
};

export const setDoctor = (doctor: DoctorData) => (dispatch: Dispatch) => {
  return dispatch({
    type: SET_DOCTOR_DETAIL,
    payload: doctor,
  });
};
export const setMainConcern = (concern: string) => (dispatch: Dispatch) => {
  return dispatch({
    type: SET_MAIN_CONERN,
    payload: concern,
  });
};
