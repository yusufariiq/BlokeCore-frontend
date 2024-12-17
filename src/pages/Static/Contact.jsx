import { API_URL } from '../../config/apiConfig';
import { useState } from 'react';
import Title from '../../components/Common/Title'
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/api/contact/add`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
  
      const responseBody = await response.json();
  
      if (response.ok){
        toast.success("Your message has been sent successfully!");
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      } else {
        console.error('Submission Error:', responseBody.message || "Unknown error occurred");
        toast.error(responseBody.message || "There was an issue submitting your form. Please try again");
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  }

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Title text={"Contact us"} />
        <p className="text-lg/8 text-gray-600">Give us your questions and and we will get back to you as quickly as possible.</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form mx-auto max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className='sm:col-span-2'>
            <label htmlFor="name" className="text-sm/6 font-semibold text-black">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="given-name"
                placeholder='John Doe'
                className="w-full input border-gray-400"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm/6 font-semibold text-black">
              Email
            </label>
            <div className="mt-2.5">
                <input
                id='email'
                name='email'
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='example@email.com'
                required
                className="input border-gray-400 w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" className="text-sm/6 font-semibold text-black">
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                autoComplete="tel"
                placeholder='08xxxxxxxxxx'
                className="input border-gray-400 w-full"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm/6 font-semibold text-black">
              What's on your mind?
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="textarea border-gray-400 w-full"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}
