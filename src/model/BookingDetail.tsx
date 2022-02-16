import React from 'react';
import {DateTimeData} from './DataTime';
import {DoctorData} from './DoctorData';
import {Service} from './Service';
import {UserData} from './UserData';

export interface BookingDetailData {
  userData: UserData;
  mainConcern: string;
  service: Service;
  doctor: DoctorData;
  dateTime: DateTimeData;
}
