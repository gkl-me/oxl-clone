import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/userContext';
import { saveToDb } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

const  Create: React.FC = () => {

  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState<File|null>()
  const authContext = useContext(AuthContext) 

  const handleSubmit = async() => {
    try {
      if(image && authContext?.user?.uid){
        const res = await saveToDb(image,name,category,Number(price),authContext?.user?.uid)
        if(res){
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
      navigate('/create')
    }
    

  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen pt-20 bg-gray-100">
        <div className="border border-black p-12 rounded-lg bg-white">
            <label htmlFor="name" className="block text-lg font-bold text-gray-700">Name</label>
            <input
              className="w-full border-b border-gray-400 focus:border-transparent focus:ring-0 focus:outline-none py-2 mb-6"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <label htmlFor="category" className="block text-lg font-bold text-gray-700">Category</label>
            <input
              className="w-full border-b border-gray-400 focus:border-transparent focus:ring-0 focus:outline-none py-2 mb-6"
              type="text"
              id="category"
              name="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="price" className="block text-lg font-bold text-gray-700">Price</label>
            <input
              className="w-full border-b border-gray-400 focus:border-transparent focus:ring-0 focus:outline-none py-2 mb-6"
              type="text"
              id="price"
              name="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
            {image && <img src={image ? URL.createObjectURL(image):""} alt="Posts" width="200px" height="200px" className="my-6 mx-auto" /> }
            <input onChange={(e) => {
            if(e.target.files){
              setImage(e.target.files[0])
            }
            }} type="file" className="w-full mb-6" />
            <button 
            onClick={() => handleSubmit()}
            className="w-full bg-[#002f34] text-white font-bold py-2 hover:bg-white hover:text-[#002f34] border-2 border-transparent hover:border-[#002f34] transition-colors duration-300">
              Upload and Submit
            </button>
        </div>
      </div>
    </>
  );
}

export default Create;
