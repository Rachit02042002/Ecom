import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import "./productList.css"
import { useSelector,useDispatch } from 'react-redux'
import { clearErros,getAdminProduct ,deleteProduct} from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import { clearErrors } from '../../actions/userAction'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {error,products} = useSelector((state)=>state.products)
    const {error:deleteError,isDeleted} = useSelector((state)=>state.product);
    const deleteProductHandler = (id) =>{
      dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErros());
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearErrors());
        }
        if(isDeleted){
          alert.success("Product Deleted Successfully");
          navigate("/admin/dashboard");
          dispatch({type:DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProduct());
    }, [dispatch, alert, error,isDeleted,navigate,deleteError]);
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link
                  to={`/admin/product/${params.api.getCellValue(params.id, "id")}`}
                >
                  <EditIcon />
                </Link>
    
                <Button onClick={()=>deleteProductHandler(params.api.getCellValue(params.id, "id"))}
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      const rows = [];
      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
          });
        });
      return (
        <Fragment>
          <MetaData title={`All Products - Admin`} />
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>
              <div className="scroll-div">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </Fragment>
      );
}

export default ProductList