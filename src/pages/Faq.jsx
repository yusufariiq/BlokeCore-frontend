import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import Title from '../components/Common/Title';
import Breadcrumbs from '../components/Common/Breadcrumbs';


const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    
    const faqs = [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), as well as payments through PayPal, and bank transfers. All payments are securely processed to protect your personal information.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes! We ship worldwide. For international orders, we use DHL to ensure fast and reliable delivery. Shipping costs and delivery times will vary based on your location.',
        },
        {
          question: 'How long does shipping take?',
          answer: 'For orders within Indonesia, we use JNE (JNE REG & JNE YES). The delivery time for JNE REG typically ranges from 2-5 days, while JNE YES offers next-day delivery for select locations. For international orders, delivery times via DHL vary based on the destination, but generally take 5-14 business days.',
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order is shipped, we will send you a tracking number via email. You can use this number to track your package on the JNE or DHL website, depending on the shipping method used.',
        },
        {
          question: 'Can I change or cancel my order?',
          answer: 'If you need to make any changes to your order, please contact us as soon as possible. Orders can only be changed or canceled before they have been shipped. Once the order is processed for shipping, changes or cancellations are no longer possible.',
        },
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in original packaging. To initiate a return, please contact our support team with your order details. Please note that return shipping costs are the responsibility of the customer unless the item is defective.',
        },
        {
          question: 'How do I return an item?',
          answer: 'To return an item, contact our customer service team with your order number and the reason for the return. We will provide you with instructions on how to proceed. Once we receive the returned item, we will process a refund or exchange, as per your request.',
        },
        {
          question: 'Are your jerseys authentic?',
          answer: 'Yes, all jerseys sold on BlokeCore are 100% authentic and sourced from trusted suppliers. We are committed to offering only high-quality products to our customers.',
        },
        {
          question: 'Do you offer discounts or promotions?',
          answer: 'Yes, we occasionally offer discounts and promotions. Be sure to sign up for our newsletter or follow us on social media to stay updated on the latest offers and new product launches.',
        },
        {
          question: 'What should I do if I receive a damaged or incorrect item?',
          answer: 'If you receive a damaged or incorrect item, please contact us immediately with your order details and a photo of the item. We will work to resolve the issue by offering a replacement or refund, as per your preference.',
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team via email at support@blokecore.com or through the contact form on our website. Our team is available Monday through Friday from 9:00 AM to 6:00 PM (GMT+7) and will respond to inquiries as soon as possible.',
        },
        {
          question: 'How do I stay updated with new releases and restocks?',
          answer: 'Sign up for our newsletter to stay informed about new arrivals, restocks, and special promotions. We regularly update our followers about the latest BlokeCore gear.',
        },
    ];


    return (
        <div className="py-12 sm:py-20">
            <div className="max-w-3xl mx-auto">
                <Breadcrumbs/>
                <Title text={"Frequently Asked Questions"} />
                <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                    key={index}
                    className={`bg-gray-50 rounded-lg border border-primary border-b-2 ${
                        activeIndex === index ? 'bg-white' : ''
                    }`}
                    >
                      <button
                          className={`w-full flex justify-between items-center px-6 py-4 text-left ${
                          activeIndex === index
                              ? 'bg-primary text-white'
                              : 'text-black hover:bg-primary hover:text-white '
                          } transition ease-linear duration-100 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75`}
                          onClick={() => toggleAccordion(index)}
                      >
                          <h3 className="text-lg font-medium">{faq.question}</h3>
                          <FontAwesomeIcon icon={
                              activeIndex === index ? faChevronUp : faChevronDown
                          }/>
                      </button>
                      <div
                          className={`px-6 pt-4 pb-8 ${
                          activeIndex === index ? 'block' : 'hidden'
                          }`}
                      >
                          <p className="text-gray-500">{faq.answer}</p>
                      </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Faq