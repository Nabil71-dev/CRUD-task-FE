import { combineReducers } from "@reduxjs/toolkit";
import brandSlice from "../services/brand.slice";
import categorySlice from "../services/category.slice";
import groupSlice from "../services/group.slice";
import productSlice from "../services/product.slice";

export const rootReducer = combineReducers({
    brand: brandSlice,
    category:categorySlice,
    group:groupSlice,
    product:productSlice
})