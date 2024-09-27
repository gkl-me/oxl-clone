import React, { useContext, useEffect, useState } from 'react'
import Heart from '../../assets/Heart';
import { getDb } from '../../Firebase/firebase';
import './Posts.css'
import { PostContext } from '../../Context/postContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../Context/loadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface newProductType {
  name:string,
  category:string,
  price:number,
  url:string,
  createdAt:string,
  uid:string,
}


const Posts:React.FC = () => {

  const [products,setProducts] = useState<newProductType[]>([])
  const postContext = useContext(PostContext)

  const navigate = useNavigate();
  const loading = useLoading();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        loading?.setLoading(true)
        const res = await getDb()
        if(res){
          setProducts(res)
          loading?.setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts();
  },[])

  return (
    loading?.loading ? <LoadingSpinner /> :
    <div>
      <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return <div
            onClick={() => {
              postContext?.setPostDetails(product)
              navigate('/viewpost')
            }} 
            className="card border-2 border-black">
            <div className="favorite">
            </div>
            <div className="relative image border-2 border-gray-300">
              <img src={product.url} alt="" className='relative' />
              <div className='absolute z-[1] right-0 top-0'>
                  <Heart></Heart>
              </div>
            </div>
            <div className='flex items-center justify-between'>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name} </p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
            </div>
          </div>
          })}
          
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map(product => {
          return <div 
          onClick={() => {
            postContext?.setPostDetails(product)
            navigate('/viewpost')
          }} 
          className="card border-2 border-black">
            <div className="favorite">
            </div>
            <div className="relative image border-2 border-gray-300 p-2">
              <img src={product.url} alt="" className='' />
              <div className='absolute z-[1] right-0 top-0'>
                  <Heart></Heart>
              </div>
            </div>
            <div className='flex items-center justify-between'>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
            </div>
          </div>
})}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Posts