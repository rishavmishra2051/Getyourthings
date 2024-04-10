import React, { useState } from 'react'
import { offers } from '../constants/AllOffers'
import OfferItem from '../components/OfferItem'
const Offers = () => {

    return (
        <div>
            <div className="max-w-container mx-auto px-4">
                <h1 className=" heading-background"><u>Offers</u></h1>
                <div className="mt-5">
                    {offers.map((offer) => (
                        <div key={offer.id}>
                            <OfferItem offer={offer} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Offers
