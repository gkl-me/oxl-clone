import React, { useContext, useEffect, useState } from 'react'
import './ViewProducts.css'
import { PostContext } from '../../Context/postContext';
import {db} from '../../Firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useLoading } from '../../Context/loadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface userDetailsType {
  name: string;
  uid: string;
  phone:number
}

const ViewProduct:React.FC = () => {


  const [userDetails,setUserDetails] = useState<userDetailsType|null>(null);
  const postContext = useContext(PostContext)

  const loading = useLoading();

  useEffect(() => {

    const fetchData = async() => {
      loading?.setLoading(true)
      try {
        if (postContext?.postDetails?.uid) {
          const ref = collection(db, 'user');
          const q = query(ref, where('uid', '==', postContext.postDetails.uid));
          
          const userDocs = await getDocs(q);
          userDocs.forEach((doc) => {
            setUserDetails({name:doc.data().name,uid:doc.data().uid,phone:doc.data().phone})
          });
          loading?.setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchData()
  },[])

  return (
    loading?.loading ? <LoadingSpinner /> :
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postContext?.postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContext?.postDetails?.price} </p>
          <span>{postContext?.postDetails?.name}</span>
          <p>{postContext?.postDetails?.category}</p>
          <span>{postContext?.postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct