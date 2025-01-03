import heroImage from './image/bg-hero2.webp' 
import logonike from './image/logo-nike.webp' 
import logoadidas from './image/logo-adidas.webp' 
import logopuma from './image/logo-puma.webp' 
import logokappa from './image/logo-kappa.webp' 
import logoumbro from './image/logo-umbro.webp' 
import logocastore from './image/logo-castore.webp' 
import logohummel from './image/logo-hummel.webp'
import logoblokecore from './image/logo-blokecore.png'
import logomidtrans from './image/logo-midtrans.png'

export const Assets = {
    heroImage,
    logoadidas,
    logokappa,
    logonike,
    logopuma,
    logoumbro,
    logocastore,
    logohummel,
    logoblokecore,
    logomidtrans,
}

export const Countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


export const DomesticShippingOptions = [
  {
    id: 'jne-reguler',
    label: 'JNE Reguler',
    price: 10000, // Changed from 'Rp 10.000' to 10000
    estimatedDelivery: {
      from: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'jne-yes',
    label: 'JNE YES (Yakin Esok Sampai)',
    price: 20000, // Changed from 'Rp 20.000' to 20000
    estimatedDelivery: {
      from: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  }
];

export const InternationalShippingOptions = [
  {
    id: 'dhl-express',
    label: 'DHL Express',
    price: 400000, // Changed from 'Rp 400.000' to 400000
    estimatedDelivery: {
      from: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'dhl-reguler',
    label: 'DHL Reguler',
    price: 100000, // Changed from 'Rp 100.000' to 100000
    estimatedDelivery: {
      from: new Date(Date.now() + 10  * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
    }
  }
];
