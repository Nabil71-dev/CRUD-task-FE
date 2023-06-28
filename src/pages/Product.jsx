import Table from "../components/Table";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProduct, reset } from "../services/product.slice";

const Product = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct())

        return () => dispatch(reset());
    }, [dispatch])

    const editProduct = (cellValues) => {
        navigate(`/product/edit/${cellValues}`, {
            replace: true
        })
    }

    const columns = [
        { field: 'brandName', headerName: 'Brand Name', width: 200 },
        { field: 'size', headerName: 'Size', width: 150 },
        { field: 'group', headerName: 'Group', width: 150 },
        { field: 'category', headerName: 'Category', width: 200 },
        {
            field: 'Action',
            renderCell: (cellValues) => {
                return (
                    <>
                        <Button sx={{ margin: '0 5px 0 0' }} variant="outlined" onClick={(e) => { dispatch(deleteProduct(cellValues?.row?.productID)) }}>Delete</Button>
                        <Button variant="outlined" onClick={(e) => { editProduct(cellValues?.row?.productID) }}>Edit</Button>
                    </>
                )
            },
            width: 180
        },
    ];

    return (
        <div style={{ margin: 'auto', width: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>All products</h3>
            </div>
            {
                loading && <h6>Loading...</h6>
            }
            {
                !loading && data?.data && <Table rows={data?.data} columns={columns} />
            }
            {
                !loading && error !== '' && <h6>Something went wrong</h6>
            }
        </div>
    );
}

export default Product;