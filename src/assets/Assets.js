import googleLogo from './icons/Google.svg'
import heroImage from './image/bg-hero2.webp' 
import mu1998 from './image/eng-mu-1998-1999-home.jpg' 
import logonike from './image/logo-nike.webp' 
import logoadidas from './image/logo-adidas.webp' 
import logopuma from './image/logo-puma.webp' 
import logokappa from './image/logo-kappa.webp' 
import logoumbro from './image/logo-umbro.webp' 
import logobca from './image/logo-bca.webp' 
import logostripe from './image/logo-stripe.webp'
import logocastore from './image/logo-castore.webp' 
import logohummel from './image/logo-hummel.webp' 

export const Assets = {
    googleLogo,
    heroImage,
    logoadidas,
    logokappa,
    logonike,
    logopuma,
    logoumbro,
    logobca,
    logostripe,
    logocastore,
    logohummel,
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



export const products = [
  {
      id: "1",
      name: 'Finland 2000 - 2001 Match Issue U-18 Home Shirt #14',
      description: 'lorem ipsum',
      price: 10.99,
      images: [mu1998],
      imageAlt: "Finland 2000 - 2001 Match Issue",
      category: "Nation",
      subCategory: {
          nations: "Europe"
      },
      details: {
          year: 2001,
          condition: "Good",
          size: "L",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: false,
          isLatest: false
      },
      metadata: {
          team: "Finland",
          league: "International",
          season: "2000-2001",
          playerNumber: "14",
          ageGroup: "U-18"
      }
  },
  {
      id: "2",
      name: 'Finland 2000 - 2001 Match Issue U-18 Home Shirt #14',
      description: 'lorem ipsum',
      price: 1400000,
      images: [mu1998],
      imageAlt: "Finland 2000 - 2001 Match Issue",
      category: "Nation",
      subCategory: {
          nations: "Europe"
      },
      details: {
          year: 2001,
          condition: "Mint",
          size: "M",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: true,
          isLatest: false
      },
      metadata: {
          team: "Finland",
          league: "International",
          season: "2000-2001",
          playerNumber: "14",
          ageGroup: "U-18"
      }
  },
  {
      id: "3",
      name: 'Chelsea 1997 - 1998 Player Issue Home Shirt',
      description: 'lorem ipsum',
      price: 3000000,
      images: [mu1998],
      imageAlt: "Chelsea 1997 - 1998 Player Issue",
      category: "Clubs",
      subCategory: {
          clubs: "English"
      },
      details: {
          year: 1997,
          condition: "Very Good",
          size: "XL",
          type: "Player Issue",
          isAuthentic: true,
          isVintage: true,
          isLatest: false
      },
      metadata: {
          team: "Chelsea FC",
          league: "Premier League",
          season: "1997-1998"
      }
  },
  {
      id: "4",
      name: 'Napoli 2020 - 2021 Match Issue Home Shirt',
      description: 'lorem ipsum',
      price: 2800000,
      images: [mu1998],
      imageAlt: "Napoli 2020 - 2021 Match Issue",
      category: "Clubs",
      subCategory: {
          clubs: "Italian"
      },
      details: {
          year: 2020,
          condition: "Brand New",
          size: ["S", "M", "L"],
          type: "Match Issue",
          isAuthentic: true,
          isVintage: true,
          isLatest: false
      },
      metadata: {
          team: "SSC Napoli",
          league: "Serie A",
          season: "2020-2021"
      }
  },
  {
      id: "5",
      name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77',
      description: 'lorem ipsum',
      price: 2800000,
      images: [mu1998],
      imageAlt: "Napoli 2024 - 2025 Match Issue",
      category: "Clubs",
      subCategory: {
          clubs: "Italian"
      },
      details: {
          year: 2024,
          condition: "Brand New",
          size: "L",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: false,
          isLatest: true
      },
      metadata: {
          team: "SSC Napoli",
          league: "Serie A",
          season: "2024-2025",
          playerNumber: "77"
      }
  },
  {
      id: "6",
      name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77',
      description: 'lorem ipsum',
      price: 2800000,
      images: [mu1998],
      imageAlt: "Napoli 2024 - 2025 Match Issue",
      category: "Clubs",
      subCategory: {
          clubs: "Italian"
      },
      details: {
          year: 2024,
          condition: "Brand New",
          size: "L",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: false,
          isLatest: true
      },
      metadata: {
          team: "SSC Napoli",
          league: "Serie A",
          season: "2024-2025",
          playerNumber: "77"
      }
  },
  {
      id: "7",
      name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77',
      description: 'lorem ipsum',
      price: 2800000,
      images: [mu1998],
      imageAlt: "Napoli 2024 - 2025 Match Issue",
      category: "Clubs",
      subCategory: {
          clubs: "Italian"
      },
      details: {
          year: 2024,
          condition: "Brand New",
          size: "L",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: false,
          isLatest: true
      },
      metadata: {
          team: "SSC Napoli",
          league: "Serie A",
          season: "2024-2025",
          playerNumber: "77"
      }
  },
  {
      id: "8",
      name: 'Napoli 2024 - 2025 Match Issue Home Shirt #77',
      description: 'lorem ipsum',
      price: 2800000,
      images: [mu1998],
      imageAlt: "Napoli 2024 - 2025 Match Issue",
      category: "Clubs",
      subCategory: {
          clubs: "Italian"
      },
      details: {
          year: 2024,
          condition: "Brand New",
          size: "L",
          type: "Match Issue",
          isAuthentic: true,
          isVintage: false,
          isLatest: true
      },
      metadata: {
          team: "SSC Napoli",
          league: "Serie A",
          season: "2024-2025",
          playerNumber: "77"
      }
  }
];

export const DomesticShippingOptions = [
  {
    id: 'reguler',
    label: 'JNE Reguler',
    price: 'Rp 10.000',
    estimatedDelivery: {
      from: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'yes',
    label: 'JNE YES (Yakin Esok Sampai)',
    price: 'Rp 20.000',
    estimatedDelivery: {
      from: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    }
  }
];

export const InternationalShippingOptions = [
  {
    id: 'international',
    label: 'DHL Express',
    price: 'Rp 400.000',
    estimatedDelivery: {
      from: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'international2',
    label: 'DHL Reguler',
    price: 'Rp 100.000',
    estimatedDelivery: {
      from: new Date(Date.now() + 10  * 24 * 60 * 60 * 1000),
      to: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)
    }
  }
];
