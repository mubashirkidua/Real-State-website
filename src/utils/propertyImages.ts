import { Property, PropertyCategory, PropertyImageDetail } from '../types';

export const HOUSE_IMAGE_DETAILS: PropertyImageDetail[] = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Front Architectural Elevation',
    tag: 'Exterior Facade',
    description: 'Striking floor-to-ceiling thermal Low-E architectural glass framed by cantilevered limestone slabs and entry reflecting pond.',
    highlight: 'South-West Natural Sun Exposure',
    materials: 'Indiana Limestone, Low-E Glass, Anodized Bronze',
    dimensions: '68 ft Frontage'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Double-Height Great Salon & Hearth',
    tag: 'Living Area',
    description: 'Expansive 22-foot ceiling with acoustic white oak beam work, custom architectural illumination, and a monolithic natural stone fireplace.',
    highlight: '22ft Vaulted Ceilings & Stone Fireplace',
    materials: 'French White Oak, Honed Basalt, Custom Millwork',
    dimensions: "28' x 24'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    title: "Gourmet Chef's Culinary Kitchen",
    tag: 'Culinary Suite',
    description: 'Massive bookmatched Calacatta marble waterfall island, matte charcoal cabinetry, Sub-Zero refrigeration, and hidden butler pantry.',
    highlight: 'Calacatta Marble Island & Miele Appliances',
    materials: 'Calacatta Marble, Brushed Brass, Matte Lacquer',
    dimensions: "22' x 16'"
  },
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    title: 'Primary Master Sanctuary & Balcony',
    tag: 'Master Retreat',
    description: 'Secluded master suite with panoramic valley glazing, private sunset balcony, built-in acoustic slat bedhead, and linear flame ribbon.',
    highlight: 'Private Sunset Balcony & Ribbon Fireplace',
    materials: 'Acoustic White Oak Slats, Wool Carpet, Architectural Glass',
    dimensions: "24' x 18'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    title: 'Heated Zero-Edge Infinity Pool',
    tag: 'Outdoor Oasis',
    description: 'Saline infinity swimming pool overlooking protected valley vistas, featuring submerged Baja shelf and integrated spa jacuzzi.',
    highlight: 'Saline Zero-Edge & Submerged Baja Shelf',
    materials: 'Travertine Pavers, Glass Mosaic Tile, Cedar Pergola',
    dimensions: "44' x 20' Pool"
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    title: 'Ensuite Primary Spa & Soaking Tub',
    tag: 'Wellness & Bath',
    description: 'Freestanding stone resin soaking tub nestled beside picture garden window, accompanied by dual frameless rain shower and heated radiant floors.',
    highlight: 'Freestanding Stone Tub & Dual Rain Showers',
    materials: 'Dornbracht Fixtures, Honed Limestone, Heated Floors',
    dimensions: "18' x 14'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    title: 'Executive Library & Quiet Office',
    tag: 'Private Office',
    description: 'Custom acoustic slat paneling, floor-to-ceiling recessed LED bookshelves, dual monitor workstation conduit, and private garden patio door.',
    highlight: 'Sound-Insulated Studio with Garden Patio Access',
    materials: 'Rift-Cut Oak, Soundproof Glazing, Fiber-Optic Ports',
    dimensions: "16' x 14'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Formal Dining & Glass Wine Cellar',
    tag: 'Entertaining Suite',
    description: 'Sophisticated 12-person grand dining salon flanked by temperature-controlled 350-bottle architectural glass wine wall.',
    highlight: '350-Bottle Climate-Controlled Glass Cellar',
    materials: 'Smoked Glass, Bronze Wine Pegs, Walnut Wainscoting',
    dimensions: "20' x 15'"
  },
  {
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    title: 'Alfresco Dining Pavilion & Kitchen',
    tag: 'Outdoor Living',
    description: 'Covered all-weather entertaining loggia equipped with built-in stainless gas grill, stone pizza oven, and flush infrared heaters.',
    highlight: 'Built-in Lynx Grill & Flush Infrared Heaters',
    materials: 'Stacked Stone, Marine-Grade Stainless, Cedar Soffit',
    dimensions: "26' x 16'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    title: 'Triple-Bay Showroom Garage & Motor Court',
    tag: 'Garage & Motor Court',
    description: 'High-gloss epoxy showroom flooring, triple automated frosted glass doors, dual Level-2 EV charging ports, and custom workshop cabinetry.',
    highlight: 'Dual Level-2 EV Fast Chargers & Epoxy Floors',
    materials: 'Epoxy Polymer, Frosted Glass, Black Powder Steel',
    dimensions: '3-Car Triple Bay'
  }
];

export const APARTMENT_IMAGE_DETAILS: PropertyImageDetail[] = [
  {
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    title: 'Panoramic Skyline Living Salon',
    tag: 'Main Living Area',
    description: 'Triple-glazed perimeter glass wall presenting dramatic 360-degree city skyline and mountain horizons with 11-foot finished ceilings.',
    highlight: '11ft Finished Ceilings & 360° City Horizons',
    materials: 'Engineered Herringbone Oak, Soundproof Glazing',
    dimensions: "30' x 22'"
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    title: 'Gourmet Quartz Kitchen Island',
    tag: 'Culinary Suite',
    description: 'Honed Statuario quartz breakfast island, seamless induction cooktop, fluted custom cabinetry, and integrated Sub-Zero wine chiller.',
    highlight: 'Honed Statuario Island & Wine Chiller',
    materials: 'Statuario Quartz, Fluted White Oak, Matte Hardware',
    dimensions: "18' x 14'"
  },
  {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    title: 'Wraparound Sunset Sky Terrace',
    tag: 'Private Terrace',
    description: 'Spacious 450 sq ft private outdoor sky terrace with integrated linear fire table and clear wind-deflecting laminated glass balustrade.',
    highlight: '450 Sq Ft Private Outdoor Terrace with Fire Table',
    materials: 'Porcelain Deck Pavers, Glass Balustrade, Gas Firepit',
    dimensions: "36' x 12'"
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    title: 'Master Penthouse Suite & Lounge',
    tag: 'Primary Bedroom',
    description: 'Sunlit bedroom retreat with custom upholstered feature wall, motorized blackout roller shades, and direct access to eastern balcony.',
    highlight: 'Motorized Dual Shades & Custom Headboard',
    materials: 'Cashmere-Blend Wall Upholstery, Hardwood Flooring',
    dimensions: "20' x 16'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    title: 'Primary Carrara Marble Bathroom',
    tag: 'Ensuite Bath',
    description: 'Bookmatched Carrara marble vanity with backlit floating mirrors, dual undermount sinks, thermostatic walk-in rain shower, and heated towel rack.',
    highlight: 'Bookmatched Carrara Marble & Dual Rain Shower',
    materials: 'Carrara Marble, Brushed Nickel, Heated Towel Warmer',
    dimensions: "14' x 11'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    title: 'Private Cocktail Bar & Lounge',
    tag: 'Hospitality Area',
    description: 'Bespoke walnut wet bar complete with dual beverage refrigeration drawers, antiqued mirror backdrop, and undercounter ice artisan machine.',
    highlight: 'Dual Beverage Drawers & Antiqued Mirror Bar',
    materials: 'American Walnut, Antique Mirror, Soapstone Counter',
    dimensions: "12' x 8'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80',
    title: 'Sun-Drenched Executive Study Nook',
    tag: 'Home Office',
    description: 'Ergonomic architectural workstation facing downtown city parks, equipped with concealable cable raceways and custom bookshelves.',
    highlight: 'Quiet Workspace with Park Views & High-Speed Cabling',
    materials: 'Oak Veneer, Frosted Privacy Sliding Glass',
    dimensions: "12' x 10'"
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    title: 'Secondary Guest Suite & Wardrobe',
    tag: 'Guest Suite',
    description: 'Generously sized secondary bedroom featuring floor-to-ceiling city views, built-in California wardrobe organizers, and ensuite access.',
    highlight: 'Floor-to-Ceiling Windows & Built-In Wardrobes',
    materials: 'Wool Carpet, Custom Closet Systems, Matte Black Trim',
    dimensions: "16' x 13'"
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Direct Keyed Elevator Vestibule',
    tag: 'Private Entrance',
    description: 'Secured elevator opening directly into a private residence foyer adorned with accent wall sconces, limestone flooring, and art niches.',
    highlight: 'Direct Keycard-Controlled Private Elevator Foyer',
    materials: 'Honed French Limestone, Venetian Plaster, Accent Sconces',
    dimensions: "10' x 8' Foyer"
  },
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    title: 'Sky Lounge & Rooftop Infinity Spa',
    tag: 'Building Amenity',
    description: 'Access to the 40th-floor rooftop private resident club, heated hydrotherapy vitality pool, private dining room, and 24/7 concierge.',
    highlight: '40th-Floor Heated Hydrotherapy Spa & Concierge',
    materials: 'Ipe Hardwood Decking, Stainless Spa Shell, Fire Tables',
    dimensions: 'Full Floor Resident Club'
  }
];

export const PLOT_IMAGE_DETAILS: PropertyImageDetail[] = [
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    title: 'Highland Ridge Crest Panorama',
    tag: 'Panoramic Vista',
    description: 'Perched on the highest crest with completely unobstructed southern exposure, offering a 40-mile panoramic view of the Rocky Mountains.',
    highlight: 'Unobstructed 40-Mile Panoramic Mountain Vistas',
    materials: 'Graded Native Soil, Natural Sandstone Outcroppings',
    dimensions: 'Southern Exposure Vista'
  },
  {
    url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
    title: 'Cleared Building Envelope Plateau',
    tag: 'Building Envelope',
    description: 'Engineered flat building pad surveyed and primed for an architectural footprint of up to 12,000 sq ft with optimal solar orientation.',
    highlight: 'Engineered Pad Ready for Up to 12,000 Sq Ft Footprint',
    materials: 'Compacted Structural Subbase, Certified Geotech Grade',
    dimensions: 'Pad Area: ~15,000 sq ft'
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    title: 'Mature Pine & Aspen Perimeter Buffer',
    tag: 'Natural Canopy',
    description: 'Surrounded by mature lodgepole pines and trembling aspens, ensuring permanent natural windbreak, privacy, and vibrant autumn foliage.',
    highlight: 'Permanent Natural Forest Privacy & Windbreak',
    materials: 'Protected Mature Pine & Aspen Forest Canopy',
    dimensions: 'Boundary Buffer: 40-60 ft'
  },
  {
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    title: 'Gentle Walkout Basement Topography',
    tag: 'Topography',
    description: 'Gradual slope naturally tailored for a walkout lower level, poolside courtyard, and terraced gardens without extensive earth moving.',
    highlight: 'Natural Grade Tailored for Walkout Lower Level',
    materials: 'Naturally Sloped Loam & Bedrock Base',
    dimensions: '8% Gentle Slope'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    title: 'Paved Access Road & Municipal Services',
    tag: 'Infrastructure',
    description: 'Direct paved road access with pre-installed underground connections for high-volume city water, natural gas, 400A electrical, and gigabit fiber.',
    highlight: 'Full Underground Utilities & Paved Road at Lot Line',
    materials: 'Heavy-Duty Asphalt Road, Underground Conduits',
    dimensions: 'Direct Road Frontage'
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    title: 'Spring Creek & Environmental Corridor',
    tag: 'Water Feature',
    description: 'Bordering a seasonal alpine runoff creek with natural river rock bed, attracting deer and songbirds to your back boundary.',
    highlight: 'Natural Running Water Feature & Wildlife Corridor',
    materials: 'Native Riverstone, Riparian Grasses',
    dimensions: '120 ft Stream Boundary'
  },
  {
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    title: 'Infinity Terrace Lookout Site',
    tag: 'Scenic Lookout',
    description: 'Prime elevated point on the property specifically designated in architectural blueprints for a cantilevered viewing lounge and infinity pool.',
    highlight: 'Ideal Siting for Cantilevered Terrace & Infinity Pool',
    materials: 'Solid Bedrock Anchor Point',
    dimensions: 'Prime Western Outlook'
  },
  {
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    title: 'Protected Valley Sunlit Meadow',
    tag: 'Meadowland',
    description: 'Wide sun-drenched open meadow shielded from highway noise by rolling ridges, offering exceptional peace and tranquil acoustics.',
    highlight: 'Protected Acoustic Basin Shielded from City Traffic',
    materials: 'Native Fescue Grasses & Wildflower Meadow',
    dimensions: 'Sunlit Southern Basin'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    title: 'Private Gated Entry Driveway Path',
    tag: 'Gated Entry Path',
    description: 'Surveyed driveway approach gently weaving through tree stands, terminating in a spacious motor court turnaround area.',
    highlight: 'Surveyed Tree-Lined Private Driveway Approach',
    materials: 'Engineered Crushed Gravel Subbase',
    dimensions: '180 ft Driveway Alignment'
  },
  {
    url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    title: 'Stargazer Twilight Sky Sanctuary',
    tag: 'Night Sky Reserve',
    description: 'Designated dark-sky conservation territory providing breathtaking nighttime celestial views with zero suburban light pollution.',
    highlight: 'Dark-Sky Conservation Area with Zero Light Pollution',
    materials: 'Unpolluted Mountain Atmosphere',
    dimensions: '360° Open Sky'
  }
];

export const FALLBACK_HOUSE_IMAGES = HOUSE_IMAGE_DETAILS.map((d) => d.url);
export const FALLBACK_APARTMENT_IMAGES = APARTMENT_IMAGE_DETAILS.map((d) => d.url);
export const FALLBACK_PLOT_IMAGES = PLOT_IMAGE_DETAILS.map((d) => d.url);

/**
 * Returns 8 to 10 verified image URLs
 */
export function getPropertyImages(property: Property): string[] {
  const list: string[] = [];

  if (property.imageUrl) {
    list.push(property.imageUrl);
  }

  if (Array.isArray(property.gallery)) {
    for (const url of property.gallery) {
      if (url && !list.includes(url)) {
        list.push(url);
      }
    }
  }

  let fallbackPool = FALLBACK_HOUSE_IMAGES;
  if (property.category === 'Apartment') {
    fallbackPool = FALLBACK_APARTMENT_IMAGES;
  } else if (property.category === 'Plot') {
    fallbackPool = FALLBACK_PLOT_IMAGES;
  }

  for (const img of fallbackPool) {
    if (list.length >= 10) break;
    if (!list.includes(img)) {
      list.push(img);
    }
  }

  return list.slice(0, 10);
}

/**
 * Returns an array of 8 to 10 fully detailed image objects for any property.
 * Each image has its own unique Title, Tag, Description, Highlight, Materials, and Dimensions!
 */
export function getPropertyImageDetails(property: Property): PropertyImageDetail[] {
  let pool = HOUSE_IMAGE_DETAILS;
  if (property.category === 'Apartment') {
    pool = APARTMENT_IMAGE_DETAILS;
  } else if (property.category === 'Plot') {
    pool = PLOT_IMAGE_DETAILS;
  }

  const images = getPropertyImages(property);

  return images.map((url, idx) => {
    // Check if the URL matches one in our standard template pool
    const matched = pool.find((item) => item.url === url);
    if (matched) {
      return matched;
    }

    // Otherwise, associate with the indexed item from the pool, but keep the custom URL
    const fallbackTemplate = pool[idx % pool.length];
    return {
      url,
      title: `${fallbackTemplate.title}`,
      tag: fallbackTemplate.tag,
      description: fallbackTemplate.description,
      highlight: fallbackTemplate.highlight,
      materials: fallbackTemplate.materials,
      dimensions: fallbackTemplate.dimensions
    };
  });
}
