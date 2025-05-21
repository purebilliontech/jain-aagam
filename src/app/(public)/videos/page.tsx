export const revalidate = 60;

import React from 'react'
import { getVideosPageContent } from './actions';
import VideosPage from './VideosPage';
const Page = async () => {

  const playlists = await getVideosPageContent();

  if (!playlists.success) {
    return <div>Failed to fetch playlists</div>;
  }

  return (
    <VideosPage data={playlists.data} />
  )
}

export default Page