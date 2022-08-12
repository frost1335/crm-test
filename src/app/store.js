import { configureStore } from "@reduxjs/toolkit";
import { courseApi } from "../services/courseApi";
import { groupApi } from "../services/groupApi";
import { teacherApi } from "../services/teacherApi";
import { studentApi } from "../services/studentApi";
import { leadApi } from "../services/leadApi";
import { attandanceApi } from "../services/attandaneApi";
import { adminApi } from "../services/adminApi";

export default configureStore({
  reducer: {
    [teacherApi.reducerPath]: teacherApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [attandanceApi.reducerPath]: attandanceApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      leadApi.middleware,
      teacherApi.middleware,
      attandanceApi.middleware,
      groupApi.middleware,
      studentApi.middleware,
      courseApi.middleware,
      adminApi.middleware
    ),
});
