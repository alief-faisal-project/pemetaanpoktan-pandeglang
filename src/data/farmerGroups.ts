export interface FarmerGroup {
  id: string;
  name: string;
  chairperson: string;
  memberCount: number;
  commodity: string;
  district: string;
  districtSlug: string;
  village: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  photo?: string;
}

export interface District {
  name: string;
  slug: string;
  groupCount: number;
  totalMembers: number;
}

// Dataset as provided - with approximate coordinates for Pandeglang area
export const farmerGroups: FarmerGroup[] = [
  {
    id: "1",
    name: "POKTAN MEKAR JAYA",
    chairperson: "Ujang Suryana",
    memberCount: 28,
    commodity: "Padi",
    district: "Cikeusik",
    districtSlug: "cikeusik",
    village: "Cikiruh",
    phone: "08123456789",
    latitude: -6.6234,
    longitude: 105.7891,
  },
  {
    id: "2",
    name: "POKTAN TANI JAYA",
    chairperson: "Nana Supriatna",
    memberCount: 22,
    commodity: "Padi",
    district: "Cikeusik",
    districtSlug: "cikeusik",
    village: "Curugciung",
    phone: "08129876543",
    latitude: -6.6312,
    longitude: 105.7945,
  },
  {
    id: "3",
    name: "POKTAN HARAPAN BARU",
    chairperson: "Rudi Hartono",
    memberCount: 30,
    commodity: "Padi",
    district: "Sobang",
    districtSlug: "sobang",
    village: "Sobang",
    phone: "08134567890",
    latitude: -6.5456,
    longitude: 105.8234,
  },
  {
    id: "4",
    name: "POKTAN SUMBER TANI",
    chairperson: "Usman Hermawan",
    memberCount: 18,
    commodity: "Padi",
    district: "Sobang",
    districtSlug: "sobang",
    village: "Kadumaneuh",
    phone: "08145678901",
    latitude: -6.5523,
    longitude: 105.8312,
  },
  {
    id: "5",
    name: "POKTAN KARYA TANI",
    chairperson: "Sarmi",
    memberCount: 25,
    commodity: "Padi",
    district: "Munjul",
    districtSlug: "munjul",
    village: "Munjul Barat",
    phone: "08156789012",
    latitude: -6.4789,
    longitude: 105.9123,
  },
  {
    id: "6",
    name: "POKTAN SUBUR MAKMUR",
    chairperson: "Encep Saefudin",
    memberCount: 27,
    commodity: "Padi",
    district: "Munjul",
    districtSlug: "munjul",
    village: "Cimanggu Girang",
    phone: "08167890123",
    latitude: -6.4856,
    longitude: 105.9187,
  },
  {
    id: "7",
    name: "POKTAN LESTARI MAKMUR",
    chairperson: "Ahmad Fadillah",
    memberCount: 29,
    commodity: "Padi",
    district: "Angsana",
    districtSlug: "angsana",
    village: "Kadugadung",
    phone: "08178901234",
    latitude: -6.5123,
    longitude: 105.8567,
  },
  {
    id: "8",
    name: "POKTAN CAHAYA TANI",
    chairperson: "Aden Suryana",
    memberCount: 21,
    commodity: "Padi",
    district: "Angsana",
    districtSlug: "angsana",
    village: "Angsana",
    phone: "08189012345",
    latitude: -6.5189,
    longitude: 105.8623,
  },
  {
    id: "9",
    name: "POKTAN BAROKAH",
    chairperson: "Dede Saripudin",
    memberCount: 22,
    commodity: "Padi",
    district: "Picung",
    districtSlug: "picung",
    village: "Picung Timur",
    phone: "08190123456",
    latitude: -6.4234,
    longitude: 105.9456,
  },
  {
    id: "10",
    name: "POKTAN SUKA TANI",
    chairperson: "Ujang Ma'ruf",
    memberCount: 20,
    commodity: "Padi",
    district: "Picung",
    districtSlug: "picung",
    village: "Pasirkarega",
    phone: "08201234567",
    latitude: -6.4298,
    longitude: 105.9512,
  },
  {
    id: "11",
    name: "POKTAN MAJU JAYA",
    chairperson: "Jajang Rohmat",
    memberCount: 20,
    commodity: "Padi",
    district: "Pagelaran",
    districtSlug: "pagelaran",
    village: "Margasana",
    phone: "08212345678",
    latitude: -6.3567,
    longitude: 106.0123,
  },
  {
    id: "12",
    name: "POKTAN MAKMUR ABADI",
    chairperson: "Oman",
    memberCount: 18,
    commodity: "Padi",
    district: "Menes",
    districtSlug: "menes",
    village: "Purwaraja",
    phone: "08234567890",
    latitude: -6.4567,
    longitude: 105.9789,
  },
  {
    id: "13",
    name: "POKTAN RAHAYU",
    chairperson: "Aang Kusnadi",
    memberCount: 15,
    commodity: "Padi",
    district: "Cisata",
    districtSlug: "cisata",
    village: "Sukamanah",
    phone: "08245678901",
    latitude: -6.389,
    longitude: 106.0234,
  },
  {
    id: "14",
    name: "POKTAN SRI MAKMUR",
    chairperson: "Endang Suhada",
    memberCount: 21,
    commodity: "Padi",
    district: "Saketi",
    districtSlug: "saketi",
    village: "Kadupayung",
    phone: "08256789012",
    latitude: -6.4012,
    longitude: 106.0567,
  },
  {
    id: "15",
    name: "POKTAN SINAR MULYA",
    chairperson: "Ujang Komarudin",
    memberCount: 16,
    commodity: "Padi",
    district: "Saketi",
    districtSlug: "saketi",
    village: "Sindanghayu",
    phone: "08267890123",
    latitude: -6.4078,
    longitude: 106.0623,
  },
  {
    id: "16",
    name: "POKTAN CITRA MANDIRI",
    chairperson: "Budi Hartono",
    memberCount: 21,
    commodity: "Padi",
    district: "Majasari",
    districtSlug: "majasari",
    village: "Karaton",
    phone: "08278901234",
    latitude: -6.3234,
    longitude: 106.0012,
  },
  {
    id: "17",
    name: "POKTAN TANI LESTARI",
    chairperson: "Dedi Ruhiat",
    memberCount: 20,
    commodity: "Padi",
    district: "Kaduhejo",
    districtSlug: "kaduhejo",
    village: "Cigereleng",
    phone: "08289012345",
    latitude: -6.3456,
    longitude: 106.0456,
  },
  {
    id: "18",
    name: "POKTAN USAHA TANI",
    chairperson: "Deden Komar",
    memberCount: 15,
    commodity: "Padi",
    district: "Cimanuk",
    districtSlug: "cimanuk",
    village: "Kadubale",
    phone: "08290123456",
    latitude: -6.3678,
    longitude: 106.0789,
  },
  {
    id: "19",
    name: "POKTAN SUMBER MAKMUR",
    chairperson: "Lilis Maemunah",
    memberCount: 12,
    commodity: "Padi",
    district: "Cimanuk",
    districtSlug: "cimanuk",
    village: "Cimanuk Timur",
    phone: "08301234567",
    latitude: -6.3745,
    longitude: 106.0845,
  },
];

// Derive districts from farmer groups
export const getDistricts = (): District[] => {
  const districtMap = new Map<string, District>();

  farmerGroups.forEach((group) => {
    const existing = districtMap.get(group.districtSlug);
    if (existing) {
      existing.groupCount += 1;
      existing.totalMembers += group.memberCount;
    } else {
      districtMap.set(group.districtSlug, {
        name: group.district,
        slug: group.districtSlug,
        groupCount: 1,
        totalMembers: group.memberCount,
      });
    }
  });

  return Array.from(districtMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

export const getGroupsByDistrict = (slug: string): FarmerGroup[] => {
  return farmerGroups.filter((group) => group.districtSlug === slug);
};

export const getGroupById = (id: string): FarmerGroup | undefined => {
  return farmerGroups.find((group) => group.id === id);
};

export const getDistrictBySlug = (slug: string): District | undefined => {
  return getDistricts().find((d) => d.slug === slug);
};

export const getTotalStats = () => {
  const districts = getDistricts();
  return {
    totalGroups: farmerGroups.length,
    totalDistricts: districts.length,
    totalMembers: farmerGroups.reduce((sum, g) => sum + g.memberCount, 0),
  };
};

export const searchGroups = (query: string): FarmerGroup[] => {
  const lowerQuery = query.toLowerCase();
  return farmerGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(lowerQuery) ||
      group.village.toLowerCase().includes(lowerQuery) ||
      group.chairperson.toLowerCase().includes(lowerQuery) ||
      group.district.toLowerCase().includes(lowerQuery),
  );
};
