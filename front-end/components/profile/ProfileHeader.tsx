import React, { useContext } from 'react'
import { QueryAddressContext } from '../../providers/QueryAddressProvider'
import Image from 'next/image';

export default function ProfileHeader() {
  const { queryAddress } = useContext(QueryAddressContext);

  return (
    <div className="border-b border-gray-500 pb-4 w-full">
      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: 'url(/collage2.png)' }}></div>
      <div className="flex flex-col -mt-24 mx-4 sm:mx-8">
        <div className='flex'>
          <Image
            src={'/male2.jpg'}
            width={200}
            height={200}
            alt='profile pic'
            className='aspect-square object-cover rounded-full border-4'
          />
          <div className="text-white mt-auto ml-4 sm:ml-8">
            <h2 className="text-2xl font-bold">{queryAddress?.slice(0, 4)}...{queryAddress?.slice(38)}</h2>
            <p className="text-lg text-gray-400">@username</p>
            <p className="text-lg">Subscribers: 100</p>
          </div>
        </div>
        <div className='mt-4 sm:mt-8'>
          bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here bio here
        </div>
      </div>
    </div>

  )
}
