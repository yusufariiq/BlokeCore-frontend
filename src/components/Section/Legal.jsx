import React from 'react'
import Breadcrumbs from '../Common/Breadcrumbs'
import Title from '../Common/Title';

const policyData = [
    {
        title: "Information We Collect",
        description: "We collect various types of information from you, including:",
        list: [
          "Personal Information: Name, email address, shipping address, billing address, phone number, and payment information when you make a purchase.",
          "Technical Information: IP address, browser type, device type, and browsing history.",
          "Usage Data: Information on how you interact with our website, such as pages visited, links clicked, and time spent on the site.",
          "Marketing and Communication Preferences: Your preferences for receiving marketing materials from us."
        ]
      },
      {
        title: "How We Use Your Information",
        description: "We may use the information we collect for the following purposes:",
        list: [
          "To process and fulfill your orders, including shipping and payment processing.",
          "To communicate with you regarding your purchase, such as sending order confirmations, updates, and support.",
          "To improve our website and services by analyzing customer behavior and preferences.",
          "To send you marketing and promotional materials, only if you have opted to receive them.",
          "To comply with legal obligations and prevent fraud."
        ],
      },
      {
        title: "Data Security",
        description: "We take appropriate measures to protect your information from unauthorized access, use, or disclosure. We use encryption and secure servers to protect sensitive data, such as payment information.",
        list: [],
      },
      {
        title: "Cookies and Tracking Technologies",
        description: "Our website uses cookies and similar technologies to improve user experience, analyze site performance, and deliver targeted advertisements. You can manage your cookie preferences through your browser settings.",
        list: [],
      },
      {
        title: "Your Rights",
        description: "Depending on your location, you may have the following rights regarding your personal information::",
        list: [
          "Access to your information.",
          "Correction of inaccurate or incomplete information.",
          "Deletion of your information.",
          "Objection to the processing of your information.",
          "Withdrawal of consent, where we rely on consent to process your data."
        ],
      },
      {
        title: "Third-Party Links",
        description: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.",
        list: [],
      },
      {
        title: "Changes to This Privacy Policy",
        description: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this Privacy Policy periodically for any updates.",
        list: [],
      },
    ]

const termsData = [
    {
        title: "General Terms",
        description: "These are the general terms for using our website.",
        list: [
            "Eligibility: By using our site, you represent that you are at least the age of majority in your state or province of residence, or you have given us your consent to allow any of your minor dependents to use this site.",
            "Account Responsibility: You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.",
            "Changes to Terms: BlokeCore reserves the right to update or modify these Terms & Conditions at any time without prior notice. Your continued use of the website after any such changes constitutes your acceptance of the new Terms & Conditions."
        ]
      },
      {
          title: "Products and Services",
          description: "Information about our products and services.",
          list: [
              "Product Descriptions: We strive to describe and display our products as accurately as possible. However, we cannot guarantee that the colors, sizes, and other product attributes will be accurately represented on your screen.",
              "Pricing: All prices listed on BlokeCore are subject to change without notice. We reserve the right to modify or discontinue a product or service at any time.",
              "Availability: Certain products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
              "Errors and Inaccuracies: We may occasionally have typographical errors or inaccuracies in product descriptions, pricing, promotions, or offers. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice."
          ]
      },
      {
          title: "Orders and Payments",
          description: "Details on placing orders and making payments.",
          list: [
              "Order Acceptance: BlokeCore reserves the right to refuse or cancel any order at any time for reasons including but not limited to product availability, errors in product or pricing information, or any suspicion of fraudulent activity.",
              "Payment: By providing your payment information, you agree to the payment terms on our website. We accept major credit cards, debit cards, and other payment methods listed on our website. Payment must be received before the order is processed.",
              "Taxes: You are responsible for all applicable taxes associated with your purchase, which may be collected at the time of checkout.",
              "Shipping and Delivery: Shipping times and delivery dates are estimates and may vary. BlokeCore is not liable for delays caused by the shipping carrier or for any damage that occurs during shipping."
          ]
      },
      {
          title: "Returns and Refunds",
          description: "Information about our return and refund policies.",
          list: [
              "Return Policy: Please refer to our Return Policy page for detailed information about returns and refunds.",
              "Non-Returnable Items: Certain items, such as final sale items, customized products, and personal care items, are non-returnable. These items are marked as non-returnable on our website.",
              "Refund Process: Once your return is received and inspected, we will notify you about the approval or rejection of your refund. Approved refunds will be processed within a certain amount of days, based on your original payment method."
          ]
      },
      {
          title: "Intellectual Property",
          description: "Our policies regarding intellectual property.",
          list: [
              "Ownership: All content on BlokeCore, including text, graphics, logos, images, and software, is the property of BlokeCore or its content suppliers and is protected by international copyright, trademark, patent, and other intellectual property laws.",
              "Restrictions: You may not reproduce, modify, distribute, sell, or exploit any content on the site without prior written permission from BlokeCore."
          ]
      },
      {
          title: "Limitation of Liability",
          description: "Disclaimer of liability and limitations.",
          list: [
              "Disclaimer: BlokeCore provides the website and services 'as is' and 'as available' without any warranties of any kind, either express or implied.",
              "Limitation: To the maximum extent permitted by applicable law, BlokeCore will not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use the site or services.",
              "Jurisdictional Limitation: Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for certain types of damages. In such jurisdictions, our liability shall be limited to the extent permitted by law."
          ]
      },
      {
          title: "Governing Law",
          description: "These Terms & Conditions shall be governed by and construed in accordance with the laws of [Your Country/State].",
          list: []
      },
      {
          title: "Termination",
          description: "Conditions for account termination.",
          list: [
              "BlokeCore reserves the right to terminate or suspend access to our services immediately, without prior notice, for conduct that we determine, at our sole discretion, to be unacceptable, or for a breach of these Terms & Conditions."
          ]
      },
      {
          title: "Contact Information",
          description: "For any questions about these Terms & Conditions, please contact us at:",
          list: [
              "Email: [Your Email Address]",
              "Address: [Your Address]"
          ]
      }
    ];

const returnsData = [
  {
    title: "Return Policy",
    description: [],
    list: [
            "Refunds can only be made if the product that has been purchased by the User is damaged/defective.",
            "Refunds are given according to the value of the goods that have been purchased.",
            "Products that are damaged/defective must be sent to us first before we make a refund, and the product must not have been used by the user before. Products that have been used by the user cannot be used for a refund.",
            "We will process refunds within a maximum of 14 (fourteen) working days.",
            "Refund requests are submitted a maximum of 2 days after the product is received by the user and the product has never been used by the user.",
            "Before the user requests a refund, the user must contact the BlokeCore.com team via email, telephone, SMS, WA or various services that we provide on the Contact page, no later than 2 days after the product is received by the user.",
    ]
  },
];

const shippingData = [
  {
    title: "Domestic Shipping (Indonesia) - JNE",
    description: "For orders within Indonesia, we offer shipping through JNE with two package options:",
    list: [
        "JNE REG: This is our recommended shipping option, offering affordable rates and reliable delivery times.",
        "JNE YES (Yakin Esok Sampai): For faster delivery, customers can choose JNE YES, which ensures next-day arrival for select major cities within JNE’s delivery network.",
        "Same-day Shipping: Orders placed and paid for before 15:00 WIB will be shipped the same day.",
        "Next-day Shipping: Orders placed after 15:00 WIB will be processed and shipped the following day.",
        "Shipping Days: We ship every day, Monday through Sunday, at 16:00 WIB.",
    ]
  },
  {
      title: "International Shipping - DHL",
      description: "For international orders, we partner with DHL to provide fast and reliable worldwide shipping. DHL ensures your package is handled with care and reaches you in the shortest time possible, regardless of your location.",
      list: []
  }
];

const pageConfig = {
    policy: {
      title: "Privacy Policy",
      introduction: "At BlokeCore, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website, use our services, or make a purchase from BlokeCore online store.",
      data: policyData
    },

    terms: {
      title: "Terms & Conditions",
      introduction: "Welcome to BlokeCore. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.",
      data: termsData
    },

    returns: {
      title: "Returns",
      introduction: "Users can request a refund for products that have been purchased, with the following provisions:",
      data: returnsData
    },

    shipping: {
      title: "Shipping Information",
      introduction: "At BlokeCore, we are dedicated to ensuring that your shopping experience is seamless and reliable.",
      data: shippingData
    },
};

function Legal({ type }) {
    const config = pageConfig[type];

    if (!config) {
      return <div>Invalid page type</div>;
    }
  
    return (
      <div className='py-12 sm:py-20 mx-auto w-[50%]'>
        <Breadcrumbs />
        <div className="my-6">
          <Title text={config.title} />
          <p className='my-4'>{config.introduction}</p>
  
          {config.data.map((section, index) => (
            <div key={index} className='py-3'>
              <h2 className='font-semibold'>{index + 1}. {section.title}</h2>
              <p>{section.description}</p>
              {section.list && section.list.length > 0 && (
                <ul className='list-disc mx-5'>
                  {section.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )
}

export default Legal