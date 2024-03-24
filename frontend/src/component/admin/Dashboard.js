import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js"
import { useSelector,useDispatch } from 'react-redux'
import "./Dashboard.css"
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'
import {TreeView,TreeItem} from "@material-ui/lab"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import PostAddIcon from "@material-ui/icons/PostAdd.js"
import AddIcon from "@material-ui/icons/Add.js"
import ImportExportIcon from "@material-ui/icons/ImportExport.js"
import ListAlt from '@material-ui/icons/ListAlt.js'
import DashboardIcon from '@material-ui/icons/Dashboard.js'
import PeopleIcon from "@material-ui/icons/People.js"
import RateReviewIcon from "@material-ui/icons/RateReview.js"
import { Typography } from '@material-ui/core'
import {Doughnut,Line} from "react-chartjs-2"
import Chart from "chart.js/auto"
import { getAdminProduct } from '../../actions/productAction.js'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products,error } = useSelector((state) => state.products);
  
   
    let outOfStock = 0;
    products &&
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });
      useEffect(() => {
        dispatch(getAdminProduct());
      }, [dispatch,alert,error]);
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };
  return (
  <div className='dashboard'>
    <Sidebar/>
    <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>
        <div className='dashboardSummary'>
            <div>
                <p>Total Amount <br/> $2000</p>                
            </div>
            <div className='dashboardSummaryBox2'>
                <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products.length}</p>
                </Link>
                <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>4</p>
                </Link>
                <Link to="/admin/users">
                    <p>Users</p>
                    <p>2</p>
                </Link>
            </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
        
    </div>
  </div>
  )
}

export default Dashboard