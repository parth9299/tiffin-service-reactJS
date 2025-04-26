import React from 'react'
import './AppDownload.css'
import { assets } from '../../../Assets/Images/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
    <p>Coming Soon !!!</p>
      <p>For Better Experience Download <br/> App </p>
      <div className='app-download-platforms'>
        <a href='https://www.apple.com/in/app-store/'><img src={assets.app_store} alt=''/></a>
        <a href='https://play.google.com/store/games?device=windows'><img src={assets.play_store} alt=''/></a>
      </div>
    </div>
  )
}

export default AppDownload
