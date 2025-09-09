import {FaMapMarkerAlt} from 'react-icons/fa';
import {FaPhoneAlt} from 'react-icons/fa';
import {FaEnvelope} from 'react-icons/fa';
import {FaClock} from 'react-icons/fa';

const Contact  = ()=>{

     return (
            <div className="w-full bg-white text-gray-800 py-12 px-4 dark:bg-gray-900 dark:text-white">
                  <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
               <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 px-4">
                 
             <div className="md:w-1/2">
               <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
               <p className="text-gray-600 dark:text-gray-300 text-left mb-6">
                Have questions about our services or ready to start your fitness journey? Reach out to us and our team will get back to you as soon as possible.
               </p>
               
                <div className="flex items-start gap-4 mt-4">
                   <div className="bg-orange-600 p-3 rounded-full">
                     <FaMapMarkerAlt size={20} />
                   </div>
                   <div>
        <h4 className="font-bold">Location</h4>
     <p className="text-gray-600 dark:text-gray-300">Hawassa city 05, main road<br />Hawassa, Ethiopia</p>
                   </div>
                </div>
                
                <div className="flex items-start gap-4 mt-4">
                    <div className="bg-orange-600 p-3 rounded-full">
                     <FaPhoneAlt size={20} /> 
                     </div>
                     <div>
                     <h4 className="font-bold">Phone</h4>
                     <p className="text-gray-600 dark:text-gray-300">0722072324</p>
                     </div>
                </div>
                
             <div className="flex items-start gap-4 mt-4">
                 <div className='bg-orange-600 p-3 rounded-full'>
                     <FaEnvelope size={20} />
                 </div>
                   <div>
                        <h4 className="font-bold">Email</h4>
                         <p className="text-gray-600 dark:text-gray-300">oKtLb@example.com</p>
                    </div>        
             </div>
             
                <div className='flex items-start gap-4 mt-4'>
                   <div className='bg-orange-600 p-3 rounded-full'>
                           <FaClock size={20} />
                   </div>
                   <div>
                        <h4 className="font-bold">Hours</h4>
          <p className="text-gray-600 dark:text-gray-300">Gym: 6:00 AM - 10:00 PM Daily<br />Spa: 10:00 AM - 8:00 PM Daily</p>
                   </div>
                </div>
           </div> 
           
            <form className="bg-white p-6 rounded-lg w-full md:w-1/2 dark:bg-gray-800 dark:text-white" >
            <div className="ml-0 text-2xl md:text-3xl font-bold mb-6">Send Us a Message</div>
             <div className="flex flex-col text-base md:text-lg rounded-md  ">
              <label className="mb-2 mt-4 text-gray-700 dark:text-gray-300">Name</label>
              <input
              type="text"
              name="name"
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
              
              required/>
              
              
             </div>

             <div className="flex flex-col text-3xl">
              <label className="mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input
              type="email"
              required
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none border-none"
              />
             </div>

             <div className="flex flex-col text-3xl ">
              <label className="mb-2 text-gray-700 dark:text-gray-300">Phone</label>
              <input
              type="number"
              name="phone"
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
              required
              />
             </div>

             <div className="flex flex-col text-3xl py-4 mb-4">
              <label className="mb-2 text-gray-700 dark:text-gray-300">Message</label>
              <textarea
              name="Message"
              className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none"
              rows="4"
              required
              />
             </div>
              <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full text-base md:text-lg'>Send Message</button>
           </form>

         
             </div>
          </div>
    )
}


export default Contact;