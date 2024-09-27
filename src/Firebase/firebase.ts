
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth/cordova";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByTLERI8aMkeL--He6KBwJ3z82oUYhezk",
  authDomain: "olx-clone-f3069.firebaseapp.com",
  projectId: "olx-clone-f3069",
  storageBucket: "olx-clone-f3069.appspot.com",
  messagingSenderId: "440090594740",
  appId: "1:440090594740:web:e0ca496c8d4b5c8bbdb6e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);

const signup = async (name:string,email:string,password:string,phone:number) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        if(name && user){ 
            await updateProfile(user,{displayName:name})
        }

        const result = await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            email,
            phone,
        })
        return result
    } catch (error) {
        alert(error);
    }
}

const login = async (email:string,password:string) => {
    try {
        
        const res = await signInWithEmailAndPassword(auth,email,password)
        return res
    } catch (error) {
        alert(error)
    }
}

const logout = async () => {
    signOut(auth)
}


const saveToDb = async (
    image:File,name:string,category:string,
    price:number,uid:string,

) => {
    try {

        const imageRef = ref(storage,`/image/${image.name}`)

    const snapShot = await uploadBytes(imageRef,image)

    const url = await getDownloadURL(snapShot.ref)
    const date = new Date
    const res = await addDoc(collection(db,'products'),{
        name,
        category,
        price,
        url,
        uid,
        createdAt:date.toDateString()
    })
    return res
        
    } catch (error) {
        console.log(error)
    }
    
}

interface productType {
    name:string,
    category:string,
    price:number,
    url:string,
    createdAt:string,
    uid:string,
  }

const getDb = async ():Promise<productType[]|undefined> => {
    try {
        const docRef = collection(db,'products')
        const snapshot = await getDocs(docRef)
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as productType
          }));
          return products

    } catch (error) {
        console.log(error)
    }
}

export {auth,db,signup,login,logout,saveToDb,getDb}

