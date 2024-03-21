import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import Backdrop from '@material-ui/core/Backdrop'
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from "react-alert"
import { logout } from '../../../actions/userAction'
import Profileimage from "../../../images/Profile.png"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"


const UserOptions = ({ user }) => {

  const navigate = useNavigate();
  const {cartItems} = useSelector((state)=>state.cart)
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
  ]

  if(user.role==="admin"){
    options.unshift( { icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
  }

  function dashboard(){
    navigate("/dashboard")
  }

  function orders(){
    navigate("/orders");
  }

  function account(){
    navigate("/account")
  }
  function cart(){
    navigate("/cart")
  }
  function logoutUser(){
    dispatch(logout())
    alert.success("Logout successfully")
  }
  console.log(user.avatar.url)
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:'10'}}/>
      <SpeedDial
      className='speedDial'
        ariaLabel='SpeedDial tooltip exmaple'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{zIndex:"11"}}
        open={open}
        direction='down'
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url :"/Profile.png"} alt="Profile" />}
      >
       {options.map((item)=>(
         <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} tooltipOpen={window.innerWidth<=60?true:false} onClick={item.func} />
       ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions