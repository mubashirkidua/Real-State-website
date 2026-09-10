import { Property } from '../types';

export const INITIAL_PROPERTIES: Omit<Property, 'id'>[] = [
  {
    title: 'The Crestview Modern Pavilion',
    description: 'An architectural triumph overlooking panoramic canyon views. Featuring custom floor-to-ceiling thermal glass, seamless limestone indoor-outdoor living, an expansive cantilevered terrace, and heated zero-edge pool. Master suite includes private garden courtyard and spa bath.',
    price: 2850000,
    location: '428 Aspen Ridge Drive, Calgary, AB',
    category: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5400,
    features: ['Zero-Edge Pool', 'Smart Home Integration', 'Chef Kitchen with Butler Pantry', 'Wine Tasting Cellar', 'Radiant Heated Floors'],
    sellerId: 'the-ocean-official',
    sellerName: 'Muhammad Mubashir Ali (CEO)',
    sellerEmail: 'alimuhammd98573@gmail.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 5,
    isFeatured: true
  },
  {
    title: 'Villa Lumina Estate',
    description: 'Breathtaking contemporary estate inspired by Mediterranean minimalism. Double-height ceilings, honed Calacatta marble surfaces, open-concept chef kitchen with Miele appliances, and an automated glass pocket wall transitioning to the poolside dining pergola.',
    price: 3450000,
    location: '110 Foothill Crest Court, Calgary, AB',
    category: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752229-250ed79470f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 6800,
    features: ['Infinity Swimming Pool', 'Private Home Cinema', 'Outdoor Kitchen & Firepit', 'Triple Bay Heated Garage', 'Solar Energy Array'],
    sellerId: 'the-ocean-official',
    sellerName: 'Muhammad Mubashir Ali (CEO)',
    sellerEmail: 'alimuhammd98573@gmail.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 12,
    isFeatured: true
  },
  {
    title: 'The Obsidian Sky Penthouse',
    description: 'Spectacular full-floor sky residence boasting 360-degree skyline and mountain vistas. Features private direct-key elevator access, bespoke black walnut millwork, Sub-Zero refrigeration, and a 1,200 sqft wraparound entertaining terrace with gas fireplace.',
    price: 1850000,
    location: '700 2nd Street SW, Penthouse A, Calgary, AB',
    category: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2950,
    features: ['Direct Elevator Access', 'Wraparound Private Terrace', '24/7 Concierge & Valet', 'Automated Privacy Shades', 'EV Charging Stalls'],
    sellerId: 'the-ocean-official',
    sellerName: 'Elena Vance - Senior Broker',
    sellerEmail: 'elena.vance@theoceanrealestate.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 3,
    isFeatured: true
  },
  {
    title: 'Verdant Terrace Parkside Residence',
    description: 'Designer corner condominium overlooking serene public gardens. Open layout flooded with natural morning sunlight, 10-foot exposed concrete ceilings paired with warm white oak floors, and a dedicated executive office nook.',
    price: 895000,
    location: '1420 Memorial Drive NW, Suite 802, Calgary, AB',
    category: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1480,
    features: ['Balcony Overlooking Park', 'Modern Quartz Island', 'Fitness Facility & Sauna', 'Underground Heated Storage', 'Pet Friendly'],
    sellerId: 'the-ocean-official',
    sellerName: 'Marcus Sterling',
    sellerEmail: 'marcus@theoceanrealestate.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 8
  },
  {
    title: 'Highland Ridge Estate Vista - Plot 14',
    description: 'Rare premium development parcel perched upon the highest crest of Sunset Foothills. Cleared, fully graded, and equipped with municipal utility hookups ready for a bespoke architectural masterpiece. Unobstructed southern exposure and protected valley views.',
    price: 750000,
    location: 'Lot 14, Highland Crest Way, Calgary, AB',
    category: 'Plot',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 26500, // 0.6 acres
    features: ['Architectural Build-Ready', 'Pre-Approved Grading', 'Municipal Water & Gas Hookups', 'South-Facing Horizon', 'Private Cul-De-Sac'],
    sellerId: 'the-ocean-official',
    sellerName: 'Muhammad Mubashir Ali (CEO)',
    sellerEmail: 'alimuhammd98573@gmail.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 15,
    isFeatured: true
  },
  {
    title: 'Emerald Shoreline Lakefront Parcel',
    description: 'Exclusive 0.95-acre waterfront building site with 160 feet of natural shoreline. Nestled within an elite gated enclave, complete with approved permits for private dock construction and custom estate architectural drawings included.',
    price: 1150000,
    location: '88 Lakeview Sanctuary Point, Ghost Lake, AB',
    category: 'Plot',
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 41380, // ~0.95 acres
    features: ['Direct Lake Frontage', 'Private Dock Permitted', 'Gated Community Access', 'Mature Pine & Birch Canopy', 'Geotechnical Survey Complete'],
    sellerId: 'the-ocean-official',
    sellerName: 'Muhammad Mubashir Ali (CEO)',
    sellerEmail: 'alimuhammd98573@gmail.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 20
  },
  {
    title: 'The Solarium Courtyard Villa',
    description: 'Organic modernism at its finest. Designed around a tranquil central glass atrium with a 60-year-old Japanese maple. Features rammed earth feature walls, custom cedar acoustic slat ceilings, and minimalist Japanese soaking tub in the master retreat.',
    price: 2280000,
    location: '315 Riverview Crescent, Calgary, AB',
    category: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 4600,
    features: ['Central Glass Atrium', 'Japanese Soaking Tub', 'Double Gas Fireplaces', 'Bespoke Cedar Millwork', 'Tesla Powerwall Ready'],
    sellerId: 'the-ocean-official',
    sellerName: 'Muhammad Mubashir Ali (CEO)',
    sellerEmail: 'alimuhammd98573@gmail.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 2
  },
  {
    title: 'The Industrial Artisan Loft',
    description: 'Soaring 14-foot architectural timber ceilings, original brick perimeter walls, polished terrazzo flooring, and custom blackened steel staircase. Ideal for creative living in the heart of the cultural district.',
    price: 685000,
    location: '512 10th Ave SW, Unit 401, Calgary, AB',
    category: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'
    ],
    bedrooms: 1,
    bathrooms: 2,
    areaSqft: 1250,
    features: ['14ft Timber Ceilings', 'Historic Restored Brick', 'Custom Steel Fixtures', 'Rooftop Lounge Access', 'Secured Parking'],
    sellerId: 'the-ocean-official',
    sellerName: 'David Chen - Advisor',
    sellerEmail: 'david.chen@theoceanrealestate.com',
    sellerPhone: '0323-2930657',
    createdAt: Date.now() - 86400000 * 7
  }
];

export const PRESET_IMAGE_SUGGESTIONS = [
  {
    title: 'Luxury Architectural Villa',
    category: 'House',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Contemporary Glass Pavilion',
    category: 'House',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Modern Organic Residence',
    category: 'House',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Skyline Luxury Penthouse',
    category: 'Apartment',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'High-End Modern Condo',
    category: 'Apartment',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Architectural Urban Loft',
    category: 'Apartment',
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Foothills Building Parcel',
    category: 'Plot',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Waterfront Estate Land',
    category: 'Plot',
    url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80'
  }
];
