import React from 'react'
import TopSection from './(sections)/TopSection'
import HeroSection from './(sections)/HeroSection'
import Paintings from './(sections)/Paintings'
import ShowcaseImage from './(sections)/ShowcaseImage'
import Reservations from './(sections)/Reservations'

export default function ArtGalleryPage() {
    return (
        <>
            <TopSection  />
            <HeroSection />
            <Paintings />
            <ShowcaseImage />
            <Reservations />
        </>
    )
}
