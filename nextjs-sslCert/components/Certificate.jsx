import Image from 'next/image';
import React from 'react';

const Certificate = ({ data }) => {
  console.log(data,"from cert component");
  return (
    <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10'>
      {/* Top */}
      {/* <div className='relative flex justify-between pt-12'>
        <div className='flex flex-col items-center'>
          <Image
            src={`http://openweathermap.org/img/wn/50d@2x.png`}
            alt='/'
            width='100'
            height='100'
          />
          <p className='text-2xl'>{'mist'}</p>
        </div>
        <p className='text-9xl'>{70}&#176;</p>
      </div> */}
      {/* Bottom */}

<div className='bg-black/50 relative p-8 rounded-md'>
    <p className='text-2xl text-center pb-6'> {data.subject.CN}</p>
    <div className='flex flex-col justify-between text-center'>
        <div>
            <p className='text-xl'>Valid from</p>
            <p className='font-bold text-2xl'>{data.valid_from}</p>
        </div>
        <div>
            <p className='text-xl'>Valid to</p>
            <p className='font-bold text-2xl'>{data.valid_to}</p>
        </div>
        <div>
            <p className='text-xl'>Issuer Details</p>
            <p className='font-bold text-2xl'>{data.issuer.O} country: {data.issuer.C}</p>
        </div>
        <div>
            <p className='text-xl'>CA Validity</p>
            <p className='font-bold text-2xl'>{data.verified.toString() }</p>
        </div>
        <div>
            <p className='text-xl'>Self signed Certificate</p>
            <p className='font-bold text-2xl'>{data.isSelfSigned.toString() }</p>
        </div>
        <div>
            <p className='text-xl'>OCSP</p>
            <p className='font-bold text-2xl'>{data.status}</p>
        </div>
    </div>
</div>

    </div>
  );
};

export default Certificate;
