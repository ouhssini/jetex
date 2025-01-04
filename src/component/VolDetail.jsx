import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchVols, volSelected } from '../redux/slicers'

const VolDetail = () => {
    const id = useParams().id
    const { vols, status } = useSelector((state) => state.vols);
    const [vol , setVol] = useState(null);
    const dispatch = useDispatch();
   useEffect(() => {
      if (status === "idle") {
        dispatch(fetchVols());
      }
      setVol(vols.find((vol) => vol.id == id));
    }, [status, dispatch, vols, id]);
   
    
  return (
    <div className='flex-1 print:hidden'>
    {vol ? (
        <div
                    className="rounded-md overflow-hidden shadow-md basis-96"
                    key={vol.id}
                  >
                    <img src="image.jpg" alt={vol.depart} className="w-full" />
                    <h2 className="text-lg font-semibold text-black bg-slate-200 w-fit px-5 py-3 rounded-md mx-auto my-4">
                      {vol.villedepart} {"->"} {vol.villearrivee}
                    </h2>
                    <p className="text-gray-500 my-3 pl-4">
                      <span className="font-semibold capitalize">Prix:</span> {vol.prix}{" "}
                      DH
                    </p>
                    <p className="text-gray-500 my-3 pl-4">
                      <span className="font-semibold capitalize">Date:</span> {vol.date}
                    </p>
                    <button
                      className="bg-yellow-500 text-white px-4 py-3 rounded-md mx-auto block my-4"
                      onClick={() => dispatch(volSelected(vol))}
                    >
                      Réserver
                    </button>
                  </div>
    ) : (
        <p className="text-red-500">Vol not found</p>
    )}
    </div>
  )
}

export default VolDetail