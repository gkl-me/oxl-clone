import React, { useContext } from 'react'
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css'
import { AuthContext } from '../../Context/userContext';
import {logout} from '../../Firebase/firebase'
import { Link, useNavigate } from 'react-router-dom';



const Header:React.FC = () => {

  const navigate = useNavigate();

  const authContext = useContext(AuthContext)

  return (
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <Link to='/' 

           className="brandName">
            <OlxLogo />
          </Link>
          <div className="placeSearch">
            <Search color=''></Search>
            <input type="text" />
            <Arrow></Arrow>
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car,mobile phone and more..."
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff"></Search>
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          <div className="loginPage flex gap-3">
            <span>{authContext?.user?.name}</span>
            {!authContext?.user?.name && <Link className='hover:underline' to={'/login'}>Login</Link>}
            
            <hr />
            {authContext?.user?.name && <span 
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className='hover:underline cursor-pointer'>Logout</span>}
          </div>
  
          <div className="sellMenu">
            <SellButton></SellButton>
            <Link to='/create' className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default React.memo(Header)