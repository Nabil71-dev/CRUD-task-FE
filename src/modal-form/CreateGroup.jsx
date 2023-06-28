import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { createGroup } from '../services/group.slice';

const CreateGroup = () => {
    const dispatch = useDispatch()

    const submit = async (values) => {
        dispatch(createGroup(values))
    }

    const formik = useFormik({
        initialValues: {
            group: '',
        },
        validationSchema: Yup.object({
            group: Yup.string().required('Group is required'),
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
                    <TextField required fullWidth id="outlined-basic" label="Group" variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.group}
                        name="group"
                    />
                    {formik.touched.group && formik.errors.group ? (
                        <Box sx={{ color: 'error.main' }}>{formik.errors.group}</Box>
                    ) : null}
                </div>
                <div style={{ margin: '10px 0 0 0', textAlign: 'center' }}>
                    <Button type="submit" variant="outlined">Add Group</Button>
                </div>
            </form>
        </>
    );
}

export default CreateGroup;