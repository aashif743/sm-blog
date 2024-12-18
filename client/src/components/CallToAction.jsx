import { Button } from 'flowbite-react';
import myImage from '../assets/smart-education.jpg';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Explore My YouTube Channel!
            </h2>
            <p className='text-gray-500 my-2'>
                Unlock the world of learning with Smart Education! Explore tutorials, tips, and 
                in-depth guides on general education. Join us to upgrade 
                your skills and turn your ideas into reality.
            </p>
            <Button gradientDuoTone='orangeToYellow' className='rounded-tl-xl rounded-bl-none bg-gradient-to-r from-orange-600 to-orange-500 text-white'>
                <a href="https://www.youtube.com/@smarteducationtamil" target='_blank' rel='noopener noreferrer'>
                    Visit My Channel
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <Link to='https://www.youtube.com/@smarteducationtamil' target='_blank' rel='noopener noreferrer'>
                <img src={myImage} alt="Smart Education" />
            </Link>
        </div>
    </div>
  )
}