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
import { getGroups } from '../services/group.slice';
import { getCategories, reset } from '../services/category.slice';
import { getBrands } from '../services/brand.slice';
import { createProduct, updateProduct } from '../services/product.slice';
import convertToB64 from '../helpers/ConvertToB64';
import { useNavigate } from 'react-router-dom';


const CreateProduct = ({ editProduct, data }) => {
    const navigate = useNavigate()
    const [group, setGroup] = useState('');
    const [category, setCategory] = useState('');
    const [brandName, setbrandName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleGroup = (event) => {
        setGroup(event.target.value);
    };
    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const handleBrand = (event) => {
        setbrandName(event.target.value);
    };

    const groupData = useSelector((state) => state.group);
    const categoryData = useSelector((state) => state.category);
    const brandData = useSelector((state) => state.brand);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups())

        return () => dispatch(reset());
    }, [dispatch])

    useEffect(() => {
        dispatch(getCategories())

        return () => dispatch(reset());
    }, [dispatch])

    useEffect(() => {
        dispatch(getBrands())

        return () => dispatch(reset());
    }, [dispatch])

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productCode: editProduct ? data?.productCode : '',
            size: editProduct ? data?.size : '',
        },
        validationSchema: Yup.object({
            productCode: Yup.string(),
            size: Yup.string().required('Size is required')
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm({ value: '' })
            submit(values)
        }
    })

    const navigateTo=()=>{
        navigate("/product/list", {
            replace: true
        })
    }

    const submit = async (values) => {
        if (editProduct) {
            values.image = selectedImage ? await convertToB64(selectedImage) : data?.image;
            values.group = group ? group : data?.group
            values.brandName = brandName ? brandName : data?.brandName
            values.category = category ? category : data?.category
            values.productCode = values.productCode ? values.productCode : data?.productCode
            dispatch(updateProduct({
                id: data.productID,
                value: values,
                navigateTo,
            }));
        }
        else {
            if (group && brandName && category && selectedImage) {
                values.image = await convertToB64(selectedImage);
                values.group = group
                values.brandName = brandName
                values.category = category

                setImageUrl(null)
                dispatch(createProduct(values));
            }
            else {
                toast.warn("Must fill up all the fields (Optional Product code)", {
                    autoClose: 2000
                })
            }
        }

    }

    return (
        <>
            <div style={{ margin: 'auto', width: '65%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3>{editProduct ? "Edit product" : "Create product"}</h3>
                </div>
                <form style={{ margin: '10px 0 5px 0' }} onSubmit={formik.handleSubmit}>
                    <div style={{ margin: '10px 0 10px 0' }}>
                        <TextField fullWidth id="outlined-basic" label="Product code" variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.productCode}
                            name="productCode"
                        />
                        {formik.touched.productCode && formik.errors.productCode ? (
                            <Box sx={{ color: 'error.main' }}>{formik.errors.productCode}</Box>
                        ) : null}
                    </div>

                    <div style={{ margin: '10px 0 10px 0' }}>
                        <TextField fullWidth id="outlined-basic" label="Product size" variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.size}
                            name="size"
                        />
                        {formik.touched.size && formik.errors.size ? (
                            <Box sx={{ color: 'error.main' }}>{formik.errors.size}</Box>
                        ) : null}
                    </div>

                    <div style={{ margin: '10px 0 10px 0' }}>
                        <FormControl fullWidth>
                            {
                                groupData?.loading && <h6>Loading...</h6>
                            }
                            {
                                !groupData?.loading && groupData?.data && <>
                                    <InputLabel id="demo-simple-select-label">Group *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={(editProduct && !group) ? data?.group : group}
                                        label="Group"
                                        onChange={handleGroup}
                                    >
                                        {
                                            groupData?.data?.data.length > 0 ? groupData?.data?.data?.map((item, index) => <MenuItem key={index} value={item.group}>{item.group}</MenuItem>) : <>No group available</>
                                        }
                                    </Select>

                                </>
                            }
                            {
                                !groupData?.loading && groupData?.error && <h6>Something went wrong</h6>
                            }
                        </FormControl>
                    </div>

                    <div style={{ margin: '10px 0 10px 0' }}>
                        <FormControl fullWidth>
                            {
                                categoryData?.loading && <h6>Loading...</h6>
                            }
                            {
                                !categoryData?.loading && categoryData?.data && <>
                                    <InputLabel id="demo-simple-select-label">Category *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={(editProduct && !category) ? data?.category : category}
                                        label="Category"
                                        onChange={handleCategory}
                                    >
                                        {
                                            categoryData?.data?.data.length > 0 ? categoryData?.data?.data?.map((item, index) => <MenuItem key={index} value={item.category}>{item.category}</MenuItem>) : <>No group available</>
                                        }
                                    </Select>

                                </>
                            }
                            {
                                !categoryData?.loading && categoryData?.error && <h6>Something went wrong</h6>
                            }
                        </FormControl>
                    </div>

                    <div style={{ margin: '10px 0 10px 0' }}>
                        <FormControl fullWidth>
                            {
                                brandData?.loading && <h6>Loading...</h6>
                            }
                            {
                                !brandData?.loading && brandData?.data && <>
                                    <InputLabel id="demo-simple-select-label">Brand *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={(editProduct && !brandName) ? data?.brandName : brandName}
                                        label="brandName"
                                        onChange={handleBrand}
                                    >
                                        {
                                            brandData?.data?.data.length > 0 ? brandData?.data?.data?.map((item, index) => <MenuItem key={index} value={item.brandName}>{item.brandName}</MenuItem>) : <>No group available</>
                                        }
                                    </Select>

                                </>
                            }
                            {
                                !brandData?.loading && brandData?.error && <h6>Something went wrong</h6>
                            }
                        </FormControl>
                    </div>

                    <div>
                        {((imageUrl && selectedImage) || (editProduct)) && (
                            <Box mt={2}>
                                <h5>Preview:</h5>
                                <img src={(editProduct && !imageUrl) ? data?.image : imageUrl} alt={(editProduct && !imageUrl) ? "Image" : selectedImage.name} height="100px" />
                            </Box>
                        )}
                        <input required accept="image/png, image/jpg, image/jpeg"
                            onChange={e => setSelectedImage(e.target.files[0])}
                            type="file" id="select-image" />
                    </div>
                    <div style={{ margin: '20px 0 0 0', textAlign: 'center' }}>
                        <Button type="submit" variant="outlined">Add product</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateProduct;