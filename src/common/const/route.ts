import { ClassType } from '@/common/type/enrollment/enrollmentEnum';

const API_BASE = '/admin/api';
const PUBLIC_BASE = '/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${PUBLIC_BASE}/login`,
    LOGOUT: `${PUBLIC_BASE}/logout`,
    REFRESH_TOKEN: `${PUBLIC_BASE}/refresh-token`,
    PROFILE: `${PUBLIC_BASE}/profile`,
    FORGOT_PASSWORD: `${PUBLIC_BASE}/forgot-password`,
    RESET_PASSWORD: `${PUBLIC_BASE}/reset-password`,
  },

  ADMIN: {
    BASE: `${API_BASE}/admin`,
    CREATE: `${API_BASE}/admin/create`,
    UPDATE: `${API_BASE}/admin/update`,
    DELETE: (id: number) => `${API_BASE}/admin/delete/${id}`,
    GET_ALL: `${API_BASE}/admin/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/admin/get/${id}`,
  },

  LEVEL: {
    BASE: `${API_BASE}/level`,
    CREATE: `${API_BASE}/level/create`,
    UPDATE: `${API_BASE}/level/update`,
    DELETE: (id: number) => `${API_BASE}/level/delete/${id}`,
    GET_ALL: `${API_BASE}/level/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/level/get/${id}`,
    GET_ASSIGNED: `${API_BASE}/level/getAssignedLevels`,
  },

  BATCH: {
    BASE: `${API_BASE}/batch`,
    CREATE: `${API_BASE}/batch/create`,
    UPDATE: `${API_BASE}/batch/update`,
    DELETE: (id: number) => `${API_BASE}/batch/delete/${id}`,
    GET_ALL: `${API_BASE}/batch/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/batch/get/${id}`,
  },

  DAY: {
    BASE: `${API_BASE}/day`,
    CREATE: `${API_BASE}/day/create`,
    UPDATE: `${API_BASE}/day/update`,
    DELETE: (id: number) => `${API_BASE}/day/delete/${id}`,
    GET_ALL: `${API_BASE}/day/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/day/get/${id}`,
    TOGGLE_ACTIVE: (id: number) => `${API_BASE}/day/toggle-active/${id}`,
  },

  TRANSACTION_STATUS: {
    BASE: `${API_BASE}/transaction-status`,
    CREATE: `${API_BASE}/transaction-status/create`,
    UPDATE: `${API_BASE}/transaction-status/update`,
    DELETE: (id: number) => `${API_BASE}/transaction-status/delete/${id}`,
    GET_ALL: `${API_BASE}/transaction-status/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/transaction-status/get/${id}`,
  },

  ANNOUNCEMENT: {
    BASE: `${API_BASE}/announcement`,
    CREATE: `${API_BASE}/announcement/create`,
    UPDATE: `${API_BASE}/announcement/update`,
    DELETE: (id: number) => `${API_BASE}/announcement/delete/${id}`,
    GET_ALL: `${API_BASE}/announcement/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/announcement/get/${id}`,
  },

  BANK_ACCOUNT: {
    BASE: `${API_BASE}/bank-account`,
    CREATE: `${API_BASE}/bank-account/create`,
    UPDATE: `${API_BASE}/bank-account/update`,
    DELETE: (id: number) => `${API_BASE}/bank-account/delete/${id}`,
    GET_ALL: `${API_BASE}/bank-account/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/bank-account/get/${id}`,
  },

  CLASS: {
    BASE: `${API_BASE}/class`,
    CREATE: `${API_BASE}/class/create`,
    UPDATE: `${API_BASE}/class/update`,
    DELETE: (id: number) => `${API_BASE}/class/delete/${id}`,
    GET_ALL: `${API_BASE}/class/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/class/get/${id}`,
  },

  CLASS_PRICE: {
    BASE: `${API_BASE}/class-price`,
    CREATE: `${API_BASE}/class-price/create`,
    UPDATE: `${API_BASE}/class-price/update`,
    DELETE: (id: number) => `${API_BASE}/class-price/delete/${id}`,
    GET_ALL: `${API_BASE}/class-price/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/class-price/get/${id}`,
  },

  ENROLLMENT: {
    BASE: `${API_BASE}/enrollment`,
    CREATE: `${API_BASE}/enrollment/create`,
    UPDATE: `${API_BASE}/enrollment/update`,
    DELETE: (id: number) => `${API_BASE}/enrollment/delete/${id}`,
    GET_ALL: `${API_BASE}/enrollment/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/enrollment/get/${id}`,
  },

  EVENT: {
    BASE: `${API_BASE}/event`,
    CREATE: `${API_BASE}/event/create`,
    UPDATE: `${API_BASE}/event/update`,
    DELETE: (id: number) => `${API_BASE}/event/delete/${id}`,
    GET_ALL: `${API_BASE}/event/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/event/get/${id}`,
  },

  MODULE: {
    BASE: `${API_BASE}/module`,
    CREATE: `${API_BASE}/module/create`,
    UPDATE: `${API_BASE}/module/update`,
    DELETE: (id: number) => `${API_BASE}/module/delete/${id}`,
    GET_ALL: `${API_BASE}/module/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/module/get/${id}`,
  },

  SCHEDULE: {
    BASE: `${API_BASE}/schedule`,
    CREATE: `${API_BASE}/schedule/create`,
    UPDATE: `${API_BASE}/schedule/update`,
    DELETE: (id: number) => `${API_BASE}/schedule/delete/${id}`,
    GET_ALL: `${API_BASE}/schedule/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/schedule/get/${id}`,
    GET_ASSIGNED_IN_PREFERRED: `${API_BASE}/schedule/getAssignedInPreferredSchedule`,
    GET_BY_CLASS_TYPE: (classType: ClassType) => `${API_BASE}/schedule/getByClassType/${classType}`,
  },

  SCORE: {
    BASE: `${API_BASE}/score`,
    CREATE: `${API_BASE}/score/create`,
    UPDATE: `${API_BASE}/score/update`,
    DELETE: (id: number) => `${API_BASE}/score/delete/${id}`,
    GET_ALL: `${API_BASE}/score/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/score/get/${id}`,
  },

  STUDENT: {
    BASE: `${API_BASE}/student`,
    CREATE: `${API_BASE}/student/create`,
    UPDATE: `${API_BASE}/student/update`,
    DELETE: (id: number) => `${API_BASE}/student/delete/${id}`,
    GET_ALL: `${API_BASE}/student/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/student/get/${id}`,
    GET_BY_LEVEL_AND_PREFERRED_SCHEDULE: `${API_BASE}/student/getByLevelAndPreferredSchedule`,
  },

  STUDENT_STATUS: {
    BASE: `${API_BASE}/student-status`,
    CREATE: `${API_BASE}/student-status/create`,
    UPDATE: `${API_BASE}/student-status/update`,
    DELETE: (id: number) => `${API_BASE}/student-status/delete/${id}`,
    GET_ALL: `${API_BASE}/student-status/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/student-status/get/${id}`,
  },

  TEACHER: {
    BASE: `${API_BASE}/teacher`,
    CREATE: `${API_BASE}/teacher/create`,
    UPDATE: `${API_BASE}/teacher/update`,
    DELETE: (id: number) => `${API_BASE}/teacher/delete/${id}`,
    GET_ALL: `${API_BASE}/teacher/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/teacher/get/${id}`,
  },

  TIME: {
    BASE: `${API_BASE}/time`,
    CREATE: `${API_BASE}/time/create`,
    UPDATE: `${API_BASE}/time/update`,
    DELETE: (id: number) => `${API_BASE}/time/delete/${id}`,
    GET_ALL: `${API_BASE}/time/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/time/get/${id}`,
  },

  TRANSACTION: {
    BASE: `${API_BASE}/transaction`,
    CREATE: `${API_BASE}/transaction/create`,
    UPDATE: `${API_BASE}/transaction/update`,
    DELETE: (id: number) => `${API_BASE}/transaction/delete/${id}`,
    GET_ALL: `${API_BASE}/transaction/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/transaction/get/${id}`,
    VERIFY: (id: number) => `${API_BASE}/transaction/verify/${id}`,
  },

  TRANSACTION_TYPE: {
    BASE: `${API_BASE}/transaction-type`,
    CREATE: `${API_BASE}/transaction-type/create`,
    UPDATE: `${API_BASE}/transaction-type/update`,
    DELETE: (id: number) => `${API_BASE}/transaction-type/delete/${id}`,
    GET_ALL: `${API_BASE}/transaction-type/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/transaction-type/get/${id}`,
  },

  USER: {
    BASE: `${API_BASE}/user`,
    CREATE: `${API_BASE}/user/create`,
    UPDATE: `${API_BASE}/user/update`,
    DELETE: (id: number) => `${API_BASE}/user/delete/${id}`,
    GET_ALL: `${API_BASE}/user/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/user/get/${id}`,
    CHANGE_PASSWORD: `${API_BASE}/user/change-password`,
  },

  USER_ROLE: {
    BASE: `${API_BASE}/user-role`,
    CREATE: `${API_BASE}/user-role/create`,
    UPDATE: `${API_BASE}/user-role/update`,
    DELETE: (id: number) => `${API_BASE}/user-role/delete/${id}`,
    GET_ALL: `${API_BASE}/user-role/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/user-role/get/${id}`,
  },

  TASK: {
    BASE: `${API_BASE}/task`,
    CREATE: `${API_BASE}/task/create`,
    UPDATE: `${API_BASE}/task/update`,
    DELETE: (id: number) => `${API_BASE}/task/delete/${id}`,
    GET_ALL: `${API_BASE}/task/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/task/get/${id}`,
  },

  BILL: {
    BASE: `${API_BASE}/bill`,
    CREATE: `${API_BASE}/bill/create`,
    UPDATE: `${API_BASE}/bill/update`,
    DELETE: (id: number) => `${API_BASE}/bill/delete/${id}`,
    GET_ALL: `${API_BASE}/bill/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/bill/get/${id}`,
    GET_BY_STUDENT_ID: (id: number) => `${API_BASE}/bill/get-by-student-id/${id}`,
  },

  ATTENDANCE: {
    BASE: `${API_BASE}/attendance`,
    CREATE: `${API_BASE}/attendance/create`,
    UPDATE: `${API_BASE}/attendance/update`,
    DELETE: (id: number) => `${API_BASE}/attendance/delete/${id}`,
    GET_ALL: `${API_BASE}/attendance/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/attendance/get/${id}`,
  },

  COMPONENT: {
    BASE: `${API_BASE}/component`,
    CREATE: `${API_BASE}/component/create`,
    UPDATE: `${API_BASE}/component/update`,
    DELETE: (id: number) => `${API_BASE}/component/delete/${id}`,
    GET_ALL: `${API_BASE}/component/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/component/get/${id}`,
  },

  ACADEMIC_PERIOD: {
    BASE: `${API_BASE}/academicPeriod`,
    CREATE: `${API_BASE}/academicPeriod/create`,
    UPDATE: `${API_BASE}/academicPeriod/update`,
    DELETE: (id: number) => `${API_BASE}/academicPeriod/delete/${id}`,
    GET_ALL: `${API_BASE}/academicPeriod/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/academicPeriod/get/${id}`,
  },

  ACADEMIC_CALENDAR: {
    BASE: `${API_BASE}/academicCalendar`,
    CREATE: `${API_BASE}/academicCalendar/create`,
    UPDATE: `${API_BASE}/academicCalendar/update`,
    DELETE: (id: number) => `${API_BASE}/academicCalendar/delete/${id}`,
    GET_ALL: `${API_BASE}/academicCalendar/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/academicCalendar/get/${id}`,
  },

  PAYMENT_FEE: {
    BASE: `${API_BASE}/paymentFee`,
    CREATE: `${API_BASE}/paymentFee/create`,
    UPDATE: `${API_BASE}/paymentFee/update`,
    DELETE: (id: number) => `${API_BASE}/paymentFee/delete/${id}`,
    GET_ALL: `${API_BASE}/paymentFee/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/paymentFee/get/${id}`,
  },

  REPORTS: {
    BASE: `${API_BASE}/reports`,
    TRANSACTIONS: `${API_BASE}/reports/transactions`,
    EVENTS: `${API_BASE}/reports/events`,
    USERS: `${API_BASE}/reports/users`,
    ATTENDANCE: `${API_BASE}/reports/attendance`,
  },

  SETTINGS: {
    BASE: `${API_BASE}/settings`,
    UPDATE: `${API_BASE}/settings/update`,
    GET: `${API_BASE}/settings/get`,
  },

  CLASS_SCHEDULE: {
    BASE: `${API_BASE}/class-schedule`,
    CREATE: `${API_BASE}/class-schedule/create`,
    UPDATE: `${API_BASE}/class-schedule/update`,
    DELETE: (id: number) => `${API_BASE}/class-schedule/delete/${id}`,
    GET_ALL: `${API_BASE}/class-schedule/getAll`,
    GET_BY_ID: (id: number) => `${API_BASE}/class-schedule/get/${id}`,
  },
};
