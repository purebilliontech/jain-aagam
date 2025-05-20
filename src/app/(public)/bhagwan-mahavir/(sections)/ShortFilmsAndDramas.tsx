import SectionTitle from '@/components/common/SectionTitle'
import YTVideoPlayer from '@/components/common/YTVideoPlayer';
import { FrontendPlaylistDTO } from '@/schema/frontendPlaylist'
import React from 'react'

const ShortFilmsAndDramas = ({ playlist }: { playlist: FrontendPlaylistDTO | null }) => {
    if (!playlist) return null;

    return (
        <>
            <section className='max-w-7xl mx-auto p-5'>
                <SectionTitle title='Short Films & Dramas' subtitle='INSPIRATION' />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    {playlist.videos.map((item, index) => (
                        <YTVideoPlayer key={index} videoUrl={item} className="h-52 rounded-lg overflow-hidden" />
                    ))}
                </div>
            </section>
        </>
    )
}

export default ShortFilmsAndDramas