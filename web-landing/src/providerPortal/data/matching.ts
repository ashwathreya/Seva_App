export type ProviderCandidate = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number; // 0..5
  totalJobs: number;
  avgResponseMinutes: number;
  isAvailable: boolean;
};

export type MatchInput = {
  customerLat: number;
  customerLng: number;
  providers: ProviderCandidate[];
  weights?: {
    distance: number;
    rating: number;
    availability: number;
    experience: number;
    response: number;
  };
};

export type RankedProvider = ProviderCandidate & {
  score: number;
  factors: {
    distanceScore: number;
    ratingScore: number;
    availabilityScore: number;
    experienceScore: number;
    responseScore: number;
  };
};

const DEFAULT_WEIGHTS = {
  distance: 0.3,
  rating: 0.2,
  availability: 0.2,
  experience: 0.2,
  response: 0.1,
};

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

/** Haversine great-circle distance in KM */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

/**
 * Score model:
 * (0.3*distance) + (0.2*rating) + (0.2*availability) + (0.2*experience) + (0.1*response)
 */
export function rankProviders(input: MatchInput): RankedProvider[] {
  const w = input.weights ?? DEFAULT_WEIGHTS;

  const rows = input.providers.map((p) => {
    const distKm = haversineKm(input.customerLat, input.customerLng, p.lat, p.lng);
    const distanceScore = clamp(1 - distKm / 20); // 20km radius normalization
    const ratingScore = clamp(p.rating / 5);
    const availabilityScore = p.isAvailable ? 1 : 0;
    const experienceScore = clamp(Math.log10(p.totalJobs + 1) / 2); // saturates near 100 jobs
    const responseScore = clamp(1 - p.avgResponseMinutes / 120); // 0 min =>1, 120+ =>0

    const score =
      w.distance * distanceScore +
      w.rating * ratingScore +
      w.availability * availabilityScore +
      w.experience * experienceScore +
      w.response * responseScore;

    return {
      ...p,
      score,
      factors: {
        distanceScore,
        ratingScore,
        availabilityScore,
        experienceScore,
        responseScore,
      },
    } satisfies RankedProvider;
  });

  return rows.sort((a, b) => b.score - a.score);
}

export function topProviders(input: MatchInput, count = 3): RankedProvider[] {
  return rankProviders(input).slice(0, count);
}
