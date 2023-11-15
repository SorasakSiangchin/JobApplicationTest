import { contentSlice } from './contentSlice';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";
import { accountSlice } from "./accountSlice";
import { trackingSlice } from './trackingSlice';
import { commentSlice } from './commentSlice';

export const store = configureStore({
    reducer:{
        account : accountSlice.reducer ,
        content : contentSlice.reducer ,
        tracking : trackingSlice.reducer ,
        comment : commentSlice.reducer ,
    }
});

//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>	// ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;