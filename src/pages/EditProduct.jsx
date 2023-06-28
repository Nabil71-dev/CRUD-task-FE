import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import CreateProduct from "../forms/CreateProduct";

const EditProduct = () => {
    const { productID } = useParams();
    const { state } = useGet(`/api/product/one/${productID}`);
    const { loading, error, data } = state

    return (
        <>
            {
                loading && <h6>Loading...</h6>
            }
            {
                !loading && data?.data && <CreateProduct editProduct={true} data={data?.data?.data} />
            }
            {
                !loading && error !== '' && <h6>Something went wrong</h6>
            }
        </>
    );
}

export default EditProduct;