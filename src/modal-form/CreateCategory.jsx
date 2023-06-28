import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {toast} from 'react-toastify'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from "react-redux";
import { getGroups, reset } from '../services/group.slice';
import { createCategory } from '../services/category.slice';


const CreateCategory = () => {
    const [group, setGroup] = useState('');

    const handleChange = (event) => {
        setGroup(event.target.value);
    };

    const { loading, error, data } = useSelector((state) => state.group);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups())

        return () => dispatch(reset());
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            category: '',
        },
        validationSchema: Yup.object({
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm({ value: '' })
            submit(values)
        }
    })

    const submit = async (values) => {
        if (group) {
            values.group = group
            dispatch(createCategory(values));
        }
        else {
            toast.warn("Must fill up all the fields", {
                autoClose: 2000
            })
        }

    }

    return (
        <>
            <form style={{ margin: '10px 0 5px 0' }} onSubmit={formik.handleSubmit}>
                <div>
                    <TextField required fullWidth id="outlined-basic" label="Category" variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        name="category"
                    />
                    {formik.touched.category && formik.errors.category ? (
                        <Box sx={{ color: 'error.main' }}>{formik.errors.category}</Box>
                    ) : null}
                </div>

                <div style={{ margin: '10px 0 10px 0' }}>
                    <FormControl fullWidth>
                        {
                            loading && <h6>Loading...</h6>
                        }
                        {
                            !loading && data && <>
                                <InputLabel id="demo-simple-select-label">Group*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={group}
                                    label="Group"
                                    onChange={handleChange}
                                >
                                    {
                                        data?.data.length > 0 ? data?.data?.map((item, index) => <MenuItem key={index} value={item.group}>{item.group}</MenuItem>) : <>No group available</>
                                    }
                                </Select>

                            </>
                        }
                        {
                            !loading && error && <h6>Something went wrong</h6>
                        }
                    </FormControl>
                </div>

                <div style={{ margin: '10px 0 0 0', textAlign: 'center' }}>
                    <Button type="submit" variant="outlined">Add Category</Button>
                </div>
            </form>
        </>
    );
}

export default CreateCategory;