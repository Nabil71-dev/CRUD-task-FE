import Table from "../components/Table";
import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateCategory from "../modal-form/CreateCategory";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory, getCategories,reset } from "../services/category.slice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Category = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading, error, data } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())

        return () => dispatch(reset());
    }, [dispatch])

    const columns = [
        { field: 'category', headerName: 'Category', width: 400 },
        {
            field: 'Action',
            renderCell: (cellValues) => {
                return (
                    <Button variant="outlined" onClick={(e)=>{dispatch(deleteCategory(cellValues?.row?.categoryId))}}>Delete</Button>
                )
            },
            width: 100
        },
    ];

    return (
        <div style={{ margin: 'auto', width: '60%' }}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h3>All categories</h3>
                {/* Modal */}
                <Button onClick={handleOpen}>Add Category</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new Category
                        </Typography>
                        <CreateCategory />
                    </Box>
                </Modal>

            </div>
            {
                loading && <h6>Loading...</h6>
            }
            {
                !loading && data && <Table rows={data?.data} columns={columns} />
            }
            {
                !loading && data?.data.length === 0 && <h5>No brands available</h5>
            }
            {
                !loading && error !== '' && <h6>Something went wrong</h6>
            }
        </div>
    );
}

export default Category;