// Fiyat dilimleri — istediğin gibi düzenleyebilirsin
const PRICE_TIERS = [
  { minKm: 0,   maxKm: 10,  price: 30  },
  { minKm: 10,  maxKm: 20,  price: 50  },
  { minKm: 20,  maxKm: 35,  price: 70  },
  { minKm: 35,  maxKm: 50,  price: 90  },
  { minKm: 50,  maxKm: 75,  price: 120 },
  { minKm: 75,  maxKm: 100, price: 160 },
  { minKm: 100, maxKm: 150, price: 220 },
  { minKm: 150, maxKm: 999, price: 300 },
];

export function calculatePrice(distanceInMeters) {
  const km = distanceInMeters / 1000;

  const tier = PRICE_TIERS.find(
    (t) => km >= t.minKm && km < t.maxKm
  );

  return {
    km: Math.round(km),
    price: tier ? tier.price : 300,
  };
}