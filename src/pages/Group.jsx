import Table from "../components/Table";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateGroup from "../modal-form/CreateGroup";
import { useSelector, useDispatch } from "react-redux";
import { deleteGroup, getGroups,reset } from "../services/group.slice";

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

const Group = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { loading, error, data } = useSelector((state) => state.group);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups())

        return () => dispatch(reset());
    }, [dispatch])

    const columns = [
        { field: 'group', headerName: 'Group', width: 400 },
        {
            field: 'Action',
            renderCell: (cellValues) => {
                return (
                    <Button variant="outlined" onClick={(e)=>{dispatch(deleteGroup(cellValues?.row?.groupId))}}>Delete</Button>
                )
            },
            width: 100
        },
    ];

    return (
        <div style={{ margin: 'auto', width: '60%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>All groups</h3>
                {/* Modal */}
                <Button onClick={handleOpen}>Add Group</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new Group
                        </Typography>
                        <CreateGroup />
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

export default Group;