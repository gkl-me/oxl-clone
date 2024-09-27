import React from 'react'
import Arrow from '../../assets/Arrow';
import './Banner.css'

const Banner:React.FC = () => {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar ml-16">
          <div className="categoryMenu flex">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions text-sm">
            <span>Cars</span>
            <span>Motorcycle</span>
            <span>Mobile Phone</span>
            <span>For Sale:Houses & Apartments</span>
            <span>Scooters</span>
            <span>Commercial & Other Vehices</span>
            <span>For Rent: House & Apartments</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="/banner.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner