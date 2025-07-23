import {FaMapMarkerAlt} from 'react-icons/fa';
import {FaPhoneAlt} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaClock} from 'react-icons/fa';

const Contact  = ()=>{

    return (
          <div className="w-full min-h-screen bg-gray-800 text-white py-16 px-8">
            <h1 className="text-white text-4xl font-bold mb-4 text-center">Contact Us</h1>
             <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
                 
             <div className="md:w-1/2">
               <h2 className="text-white text-2xl font-bold mb-4">Get In Touch</h2>
               <p className="text-gray-300 text-left">
                Have questions about our services or ready to start your fitness journey? Reach out to us and our team will get back to you as soon as possible.
                <div className="flex items-start gap-4 mt-4">
                   <div className="bg-orange-600 p-3 rounded-full">
                     <FaMapMarkerAlt size={20} />
                   </div>
                   <div >
                  <h4 className="font-bold">Location</h4>
          <p>Hawassa city 05, main road<br />Hawassa, Ethiopia</p>
                   </div>

                </div>
                <div className="flex items-start gap-4 mt-4">
                    <div className="bg-orange-600 p-3 rounded-full">
                     <FaPhoneAlt size={20} /> 
                     </div>
                     <div>
                     <h4 className="font-bold">phone</h4>
                     <p>0722072324</p>
                     </div>
                </div>
             <div className="flex items-start gap-4 mt-4">
                 <div className='bg-orange-600 p-3 rounded-full'>
                     <FaEnvelope size={20} />
                 </div>
                   <div>
                        <h4 className="font-bold">Email</h4>
                         <p>oKtLb@example.com</p>
                    </div>        
             </div>
                <div className='flex items-start gap-4 mt-4'>

                   <div className='bg-orange-600 p-3 rounded-full'>
                           <FaClock size={20} />
                   </div>

                   <div>
                        <h4 className="font-bold">Hours</h4>
          <p>Gym: 6:00 AM - 10:00 PM Daily<br />Spa: 10:00 AM - 8:00 PM Daily</p>
                   </div>
                      
                </div>
             </p>
           </div> 
           
            <form className="bg-gray-800 p-8 rounded-lg md:w-1/2" >
            <div className="ml-0 text-white text-3xl font-bold mb-10/">Send Us a Message</div>
             <div className="flex flex-col text-3xl rounded-md  ">
              <label className="mb-4  mt-6">Name</label>
              <input
              type="text"
              name="name"
              className="p-2 rounded bg-gray-900 text-white outline-none"
              
              required/>
              
              
             </div>

             <div className="flex flex-col text-3xl">
              <label className="mb-4 ">Email</label>
              <input
              type="email"
              required
              className="p-2 rounded bg-gray-900 text-white outline-none border-none"
              />
             </div>

             <div className="flex flex-col text-3xl ">
              <label className="mb-4">Phone</label>
              <input
              type="number"
              name="phone"
              className="p-2 rounded bg-gray-900 text-white outline-none"
              required
              />
             </div>

             <div className="flex flex-col text-3xl py-4 mb-4">
              <label className="mb-4">Message</label>
              <textarea
              type="text"
              name="Message"
              className="p-2 rounded bg-gray-900 text-white outline-none"
              bor
              required
              />
             </div>
              <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-2xl min-w-full'>send Message</button>
           </form>

         
             </div>
          </div>
    )
}


export default Contact;