import React, { useState, useMemo } from 'react';

// --- CLEAN INLINE ICONS (Zero external dependencies needed) ---
const IconSearch = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const IconMapPin = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const IconHeart = ({ filled }: { filled?: boolean }) => (
  <svg
    className={`w-4 h-4 ${
      filled ? 'fill-red-500 text-red-500' : 'text-slate-400'
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const IconPhone = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const IconMessage = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);
const IconShield = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);
const IconClose = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const IconSend = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);
const IconBack = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);
const IconCheck = () => (
  <svg
    className="w-3.5 h-3.5 text-emerald-600"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const INITIAL_CATEGORIES = [
  { id: 'cars', name: 'Cars & Bikes', icon: '🚗' },
  { id: 'mobile_phones', name: 'Mobiles', icon: '📱' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'property', name: 'Property', icon: '🏠' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️' },
  { id: 'jobs', name: 'Local Jobs', icon: '💼' },
];

const INITIAL_LISTINGS = [
  {
    id: 'bp-101',
    title: '2022 Hyundai Creta SX (O) 1.5 Petrol Manual',
    category: 'cars',
    price: 1350000,
    isNegotiable: true,
    condition: 'used_good',
    city: 'Noida',
    state: 'Uttar Pradesh',
    locality: 'Sector 62',
    datePosted: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'First owner, meticulously maintained with complete dealer service record. Single hand driven.',
    attributes: {
      brand: 'Hyundai',
      year: '2022',
      fuel: 'Petrol',
      transmission: 'Manual',
      km: '24,000 km',
    },
    seller: {
      name: 'Vikram Malhotra',
      type: 'Individual',
      memberSince: 'March 2023',
      verified: true,
      phone: '+91 98112 45678',
      contactPreference: 'both',
      allowWhatsApp: true,
    },
    status: 'active',
  },
  {
    id: 'bp-102',
    title: 'Apple iPhone 15 Pro Max - 256GB Natural Titanium',
    category: 'mobile_phones',
    price: 94000,
    isNegotiable: false,
    condition: 'like_new',
    city: 'New Delhi',
    state: 'Delhi',
    locality: 'Connaught Place',
    datePosted: '5 hours ago',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      '100% battery health, Indian unit with original bill, box and cable. Under Apple warranty.',
    attributes: {
      brand: 'Apple',
      storage: '256 GB',
      ram: '8 GB',
      warranty: 'Under Warranty',
    },
    seller: {
      name: 'Aditi Sharma',
      type: 'Individual',
      memberSince: 'January 2024',
      verified: true,
      phone: '+91 99990 12345',
      contactPreference: 'chat_only', // Seller chose CHAT ONLY
      allowWhatsApp: false,
    },
    status: 'active',
  },
  {
    id: 'bp-103',
    title: 'Solid Teak Wood 6-Seater Dining Table Set',
    category: 'furniture',
    price: 26500,
    isNegotiable: true,
    condition: 'used_good',
    city: 'Gurugram',
    state: 'Haryana',
    locality: 'DLF Phase 4',
    datePosted: 'Just now',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Pure CP Teakwood table with 6 cushioned chairs. Urgent moving abroad sale.',
    attributes: {},
    seller: {
      name: 'Rajesh Verma',
      type: 'Individual',
      memberSince: 'June 2021',
      verified: false,
      phone: '+91 97180 98765',
      contactPreference: 'both',
      allowWhatsApp: true,
    },
    status: 'active',
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'details' | 'post_ad' | 'messages' | 'admin'
  >('home');
  const [listings, setListings] = useState<any[]>(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All India');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceMax, setPriceMax] = useState('');

  const [revealedContacts, setRevealedContacts] = useState<Record<string, any>>(
    {}
  );
  const [isRevealing, setIsRevealing] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'them',
      text: 'Hi! Is this still available for inspection?',
      time: '10:30 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = new Set(favorites);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setFavorites(updated);
  };

  const handleRevealContact = (listingId: string) => {
    setIsRevealing(true);
    setTimeout(() => {
      const item = listings.find((l) => l.id === listingId);
      if (item) {
        setRevealedContacts((prev) => ({
          ...prev,
          [listingId]: {
            phone: item.seller.phone,
            allowWhatsApp: item.seller.allowWhatsApp,
          },
        }));
      }
      setIsRevealing(false);
      setShowContactModal(true);
    }, 300);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (item.status !== 'active') return false;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesCity =
        selectedCity === 'All India' ||
        item.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesPrice = !priceMax || item.price <= Number(priceMax);
      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    });
  }, [listings, searchQuery, selectedCategory, selectedCity, priceMax]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center border-b border-slate-800">
        <span className="font-semibold text-orange-400">Buyer Safety:</span>{' '}
        Meet sellers in public, verify items in person. Zero intermediary fees.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div
            onClick={() => {
              setCurrentView('home');
              setSelectedListing(null);
            }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-white font-black text-xl shadow-md">
              B<span className="text-orange-500">P</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-indigo-950">
                Bazaar<span className="text-orange-500">Pulse</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                Direct Local Classifieds
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center border border-slate-300 rounded-lg px-3 py-1.5 bg-slate-50 text-sm">
            <span className="text-slate-400 mr-1.5">
              <IconMapPin />
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="All India">All India</option>
              <option value="Noida">Noida, UP</option>
              <option value="New Delhi">New Delhi, DL</option>
              <option value="Gurugram">Gurugram, HR</option>
              <option value="Bengaluru">Bengaluru, KA</option>
              <option value="Mumbai">Mumbai, MH</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className="hidden lg:block text-xs font-semibold text-slate-600 hover:text-indigo-900 border border-slate-200 px-3 py-1.5 rounded-lg"
            >
              Admin Panel
            </button>
            <button
              onClick={() => {
                setActiveChat({ title: 'Aditi Sharma (iPhone 15 Pro Max)' });
                setCurrentView('messages');
              }}
              className="p-2 text-slate-600 hover:text-indigo-950 rounded-full relative"
              title="Messages"
            >
              <IconMessage />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setCurrentView('post_ad')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-sm transition"
            >
              + Post Free Ad
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Search Banner */}
            <div className="bg-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  Buy & sell locally.{' '}
                  <span className="text-orange-400">100% Free contact.</span>
                </h1>
                <p className="text-slate-300 text-sm mb-6">
                  No subscriptions, no hidden coins. Reveal seller phone numbers
                  for free.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl border border-white/20">
                  <div className="flex-1 flex items-center bg-white rounded-xl px-3 py-2 text-slate-800">
                    <span className="text-slate-400 mr-2">
                      <IconSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="What are you looking for? (e.g. Creta, iPhone 15, Sofa)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                  <div className="sm:w-40 flex items-center bg-white rounded-xl px-3 py-2 text-slate-800">
                    <span className="text-xs font-semibold text-slate-400 mr-1.5">
                      Max ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Any Price"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Explore by Category
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs font-semibold text-orange-600"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {INITIAL_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSelectedCategory(isSelected ? 'all' : cat.id)
                      }
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{cat.icon}</span>
                      <span className="text-xs font-medium truncate w-full">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Listings Grid */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Fresh Listings ({filteredListings.length} items)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedListing(item);
                      setCurrentView('details');
                    }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm"
                      >
                        <IconHeart filled={favorites.has(item.id)} />
                      </button>
                      <div className="absolute bottom-2.5 left-2.5 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                        <IconMapPin />
                        <span>
                          {item.locality}, {item.city}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-xl font-extrabold text-indigo-950">
                            ₹ {item.price.toLocaleString('en-IN')}
                          </span>
                          {item.isNegotiable && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              Negotiable
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-1">
                          {item.seller.verified && <IconCheck />}
                          <span className="font-medium text-slate-700">
                            {item.seller.name}
                          </span>
                        </div>
                        <span>{item.datePosted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listing Details */}
        {currentView === 'details' && selectedListing && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-950"
            >
              <IconBack />
              <span>Back to all listings</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                  <div className="aspect-[16/10] bg-slate-950 flex items-center justify-center">
                    <img
                      src={selectedListing.images[0]}
                      alt={selectedListing.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                      Item Description
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {selectedListing.description}
                    </p>
                  </div>

                  {Object.keys(selectedListing.attributes).length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(selectedListing.attributes).map(
                          ([key, val]) => (
                            <div
                              key={key}
                              className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl"
                            >
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {key}
                              </span>
                              <p className="text-xs font-bold text-slate-800 capitalize mt-0.5">
                                {String(val)}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Action Card */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24">
                  <div className="mb-4">
                    <span className="text-3xl font-black text-indigo-950">
                      ₹ {selectedListing.price.toLocaleString('en-IN')}
                    </span>
                    {selectedListing.isNegotiable && (
                      <span className="ml-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Negotiable
                      </span>
                    )}
                  </div>

                  <h1 className="text-base font-bold text-slate-900 mb-4">
                    {selectedListing.title}
                  </h1>
                  <p className="text-xs text-slate-500 mb-6 pb-6 border-b border-slate-100 flex items-center gap-1.5">
                    <IconMapPin /> {selectedListing.locality},{' '}
                    {selectedListing.city}
                  </p>

                  <div className="space-y-3">
                    {selectedListing.seller.contactPreference !==
                    'chat_only' ? (
                      <div>
                        {revealedContacts[selectedListing.id] ? (
                          <button
                            onClick={() =>
                              handleRevealContact(selectedListing.id)
                            }
                            className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2"
                          >
                            <IconPhone />
                            <span>
                              {revealedContacts[selectedListing.id].phone}{' '}
                              (Revealed)
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleRevealContact(selectedListing.id)
                            }
                            disabled={isRevealing}
                            className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
                          >
                            <IconPhone />
                            <span>
                              {isRevealing
                                ? 'Verifying Safe Session...'
                                : 'Show Seller Phone Number'}
                            </span>
                          </button>
                        )}
                        <p className="text-[10px] text-center text-slate-400 mt-1.5">
                          100% Free — No coins or subscriptions required.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                        <p className="text-xs font-bold text-slate-700">
                          Private Seller
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Seller chose to receive inquiries via website chat
                          only.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setActiveChat({
                          title: `${selectedListing.seller.name} (${selectedListing.title})`,
                        });
                        setCurrentView('messages');
                      }}
                      className="w-full border-2 border-orange-500 hover:bg-orange-50 text-orange-600 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2"
                    >
                      <IconMessage />
                      <span>Chat with Seller</span>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 block">
                      Seller Details
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-900 text-sm">
                        {selectedListing.seller.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">
                          {selectedListing.seller.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Member since {selectedListing.seller.memberSince}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Ad View */}
        {currentView === 'post_ad' && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Post a Free Listing
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Ad Title
                </label>
                <input
                  id="post-title"
                  type="text"
                  placeholder="e.g. MacBook Air M2 8GB"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Price (₹)
                </label>
                <input
                  id="post-price"
                  type="number"
                  placeholder="e.g. 75000"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Locality & City
                </label>
                <input
                  id="post-city"
                  type="text"
                  placeholder="e.g. Sector 18, Noida"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-4 py-2 text-sm font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const title = (
                      document.getElementById('post-title') as HTMLInputElement
                    )?.value;
                    const price = (
                      document.getElementById('post-price') as HTMLInputElement
                    )?.value;
                    const city = (
                      document.getElementById('post-city') as HTMLInputElement
                    )?.value;
                    if (!title || !price)
                      return alert('Please enter title and price');
                    setListings([
                      {
                        id: `bp-${Date.now()}`,
                        title,
                        category: 'electronics',
                        price: Number(price),
                        isNegotiable: true,
                        condition: 'like_new',
                        city: city || 'Noida',
                        state: 'Uttar Pradesh',
                        locality: 'Central',
                        datePosted: 'Just now',
                        images: [
                          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
                        ],
                        description: 'Direct seller post.',
                        attributes: {},
                        seller: {
                          name: 'You',
                          type: 'Individual',
                          memberSince: 'Today',
                          verified: false,
                          phone: '+91 99999 88888',
                          contactPreference: 'both',
                          allowWhatsApp: true,
                        },
                        status: 'active',
                      },
                      ...listings,
                    ]);
                    setCurrentView('home');
                  }}
                  className="bg-orange-500 text-white font-bold px-6 py-2 rounded-xl text-sm"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* In-App Messages */}
        {currentView === 'messages' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-[550px] flex flex-col">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-slate-400 hover:text-white"
                >
                  <IconBack />
                </button>
                <h3 className="font-bold text-sm">
                  {activeChat?.title || 'Marketplace Inquiries'}
                </h3>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.sender === 'me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs ${
                      m.sender === 'me'
                        ? 'bg-indigo-950 text-white'
                        : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[9px] mt-1 block opacity-70">
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Write a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    setChatMessages([
                      ...chatMessages,
                      { sender: 'me', text: chatInput, time: 'Now' },
                    ]);
                    setChatInput('');
                  }
                }}
                className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm outline-none"
              />
              <button
                onClick={() => {
                  if (!chatInput.trim()) return;
                  setChatMessages([
                    ...chatMessages,
                    { sender: 'me', text: chatInput, time: 'Now' },
                  ]);
                  setChatInput('');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition"
              >
                <IconSend />
              </button>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {currentView === 'admin' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Platform Moderation
              </h2>
              <button
                onClick={() => setCurrentView('home')}
                className="text-xs font-semibold text-slate-600"
              >
                Back
              </button>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Seller</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listings.map((l) => (
                  <tr key={l.id}>
                    <td className="py-2.5 font-medium">{l.title}</td>
                    <td className="py-2.5">{l.seller.name}</td>
                    <td className="py-2.5 font-bold uppercase text-[10px] text-emerald-700">
                      {l.status}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() =>
                          setListings(listings.filter((x) => x.id !== l.id))
                        }
                        className="text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Free Contact Reveal Modal */}
      {showContactModal &&
        selectedListing &&
        revealedContacts[selectedListing.id] && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-slate-400 p-1"
              >
                <IconClose />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <IconShield />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Direct Seller Contact
                  </h3>
                  <p className="text-xs text-slate-500">
                    100% Free - Authorized by Seller
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-900">
                <strong>Safety Warning:</strong> Never send advance payments via
                UPI or transfer. Inspect the item in person in a safe public
                spot.
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center mb-4">
                <p className="text-xs text-slate-500 mb-1">
                  Direct Phone Number
                </p>
                <p className="text-2xl font-mono font-bold text-indigo-950">
                  {revealedContacts[selectedListing.id].phone}
                </p>
              </div>
              <a
                href={`tel:${revealedContacts[selectedListing.id].phone}`}
                className="w-full flex items-center justify-center gap-2 bg-indigo-950 text-white font-medium py-2.5 rounded-xl text-sm"
              >
                <IconPhone />
                <span>Call Seller</span>
              </a>
            </div>
          </div>
        )}
    </div>
  );
}
