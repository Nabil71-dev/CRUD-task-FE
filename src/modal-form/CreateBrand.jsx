import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { createBrands } from '../services/brand.slice';


const CreateBrand = () => {
    const dispatch = useDispatch()
    const submit = async (values) => {
        dispatch(createBrands(values))
    }

    const formik = useFormik({
        initialValues: {
            brandName: '',
        },
        validationSchema: Yup.object({
            brandName: Yup.string().required('Brand Name is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm({ value: '' })
            submit(values)
        }
    })

    return (
        <>
            <form style={{ margin: '10px 0 5px 0' }} onSubmit={formik.handleSubmit}>
                <div>
                    <TextField required fullWidth id="outlined-basic" label="Brand name" variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.brandName}
                        name="brandName"
                    />
                    {formik.touched.brandName && formik.errors.brandName ? (
                        <Box sx={{ color: 'error.main' }}>{formik.errors.brandName}</Box>
                    ) : null}
                </div>
                <div style={{ margin: '10px 0 0 0', textAlign: 'center' }}>
                    <Button type="submit" variant="outlined">Add Brand</Button>
                </div>
            </form>
        </>
    );
}

export default CreateBrand;