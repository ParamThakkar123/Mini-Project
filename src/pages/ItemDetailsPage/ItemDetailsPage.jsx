import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemDetailsPage = () => {
    const {id} = useParams();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try{
                const response = await fetch()
            }catch(err){
                
            }
        }
    }, [])
  return (
    <div>ItemDetailsPage</div>
  )
}

export default ItemDetailsPage