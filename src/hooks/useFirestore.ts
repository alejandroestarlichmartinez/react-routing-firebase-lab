import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc, query, where, getDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { nanoid } from "nanoid";


export const useFirestoreState = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({ getData: false, getDataParams: false });
  const uid = auth.currentUser?.uid; // Add a null check

  useEffect(() => {
    if (uid) {
      getData();
    }
  }, [uid]); // Run the effect when uid changes

  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const q = query(collection(db, "urls"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const data: any[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    } catch (error: any) {
      console.error(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };
  
  const addData = async (url: string) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = { nanoid: nanoid(6), origin: url, uid };
      const docRef = doc(db, "urls", newData.nanoid);
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error: any) {
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };
  
  const deleteData = async (nanoid: string) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((doc) => doc.nanoid !== nanoid));
    } catch (error: any) {
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const updateData = async (nanoid: string, newUrl: string) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newUrl });
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newUrl } : item
        )
      );
    } catch (error: any) {
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };

  const getDataParams = async (nanoid: string) => {
    try {
      setLoading((prev) => ({ ...prev, getDataParams: true }));
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().origin;
      } else {
        throw new Error("No se encontró el documento");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getDataParams: false }));
    }
  };

  const searchData = async (nanoid: string) => {
    try {
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return { data, error, loading, getData, addData, deleteData, updateData, getDataParams, searchData };
};
