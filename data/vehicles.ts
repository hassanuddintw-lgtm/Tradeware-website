import { Vehicle } from "@/types";
import { extendedVehicles } from "./vehicles-extended";

export const vehicles: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2020,
    price: {
      fob: 18500,
      cif: 21200,
      currency: "USD",
    },
    engine: {
      displacement: "2.8L",
      type: "Diesel",
      fuel: "Diesel",
    },
    transmission: "Automatic",
    mileage: 45000,
    color: "White",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1566473062277-5b4fc463dff2?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Yokohama Port",
    stockId: "STK-2024-001",
    features: ["4WD", "Leather Seats", "Navigation", "Sunroof", "Reverse Camera"],
    description: "Exceptional 2020 Toyota Land Cruiser Prado in pristine condition, representing one of Japan's most sought-after luxury SUVs. This vehicle has been meticulously maintained with complete service history documentation. Single owner vehicle with no accident history, verified through comprehensive auction inspection. The auction grade of 4.5 indicates excellent overall condition with only minor wear consistent with normal use. Features premium leather interior, advanced navigation system, panoramic sunroof, and comprehensive safety features including reverse camera and parking sensors. The 2.8L turbo diesel engine provides exceptional fuel efficiency and torque, making it ideal for both urban and off-road applications. All original factory equipment is present and functional. This vehicle represents outstanding value for export markets, particularly in regions where Toyota's reputation for reliability and durability commands premium pricing. Complete documentation package includes original auction sheet, detailed inspection report, and export certification ready for international shipping.",
    auctionSheet: "/images/auction-sheet-sample.jpg",
  },
  {
    id: "2",
    make: "Nissan",
    model: "Patrol",
    year: 2019,
    price: {
      fob: 16800,
      cif: 19500,
      currency: "USD",
    },
    engine: {
      displacement: "4.0L",
      type: "V6",
      fuel: "Petrol",
    },
    transmission: "Automatic",
    mileage: 52000,
    color: "Black",
    auctionGrade: "4.0",
    condition: "Very Good",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Kobe Port",
    stockId: "STK-2024-002",
    features: ["4WD", "7 Seats", "Navigation", "Bluetooth", "Cruise Control"],
    description: "Powerful Nissan Patrol with low mileage. Excellent for off-road and family use. Regular maintenance, all original parts.",
  },
  {
    id: "3",
    make: "Toyota",
    model: "Hiace Van",
    year: 2021,
    price: {
      fob: 12500,
      cif: 14500,
      currency: "USD",
    },
    engine: {
      displacement: "2.8L",
      type: "Diesel",
      fuel: "Diesel",
    },
    transmission: "Manual",
    mileage: 38000,
    color: "Silver",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1449967414343-e4f4e17e4d7e?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Osaka Port",
    stockId: "STK-2024-003",
    features: ["15 Seats", "AC", "Power Steering", "Radio"],
    description: "Premium 2021 Toyota Hiace commercial van in exceptional condition, representing the latest generation of Japan's most popular commercial vehicle. With only 38,000 kilometers, this vehicle offers outstanding value for business operators seeking reliable, fuel-efficient transport solutions. The 2.8L turbo diesel engine provides excellent fuel economy while maintaining strong performance under load. Configured for 15 passengers, this vehicle is ideal for shuttle services, tour operations, or corporate transport. The auction grade of 4.5 reflects excellent overall condition with well-maintained interior and exterior. All essential features including air conditioning, power steering, and modern audio system are present and functional. This vehicle has been maintained to commercial fleet standards with complete service documentation. The Toyota Hiace's global reputation for reliability and low operating costs makes it an excellent investment for commercial operators. Complete export documentation package available for immediate international shipping.",
  },
  {
    id: "4",
    make: "Honda",
    model: "CR-V",
    year: 2020,
    price: {
      fob: 14200,
      cif: 16500,
      currency: "USD",
    },
    engine: {
      displacement: "1.5L",
      type: "Turbo",
      fuel: "Petrol",
    },
    transmission: "CVT",
    mileage: 41000,
    color: "Blue",
    auctionGrade: "4.0",
    condition: "Very Good",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1544636331-e17e16d71c4f?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Nagoya Port",
    stockId: "STK-2024-004",
    features: ["AWD", "Honda Sensing", "Apple CarPlay", "Sunroof", "Leather"],
    description: "Exceptional 2020 Honda CR-V featuring the advanced Honda Sensing safety suite and excellent fuel efficiency. This well-maintained SUV represents outstanding value in the compact SUV segment, combining Honda's reputation for reliability with modern technology and safety features. The 1.5L turbo petrol engine provides responsive performance while maintaining excellent fuel economy, making it ideal for both urban and highway driving. The auction grade of 4.0 indicates very good overall condition with well-maintained mechanical systems and bodywork. Features include all-wheel drive capability, Apple CarPlay integration, panoramic sunroof, and premium leather interior. This vehicle has been serviced regularly according to manufacturer specifications, with complete service history available. The Honda CR-V's global reputation for reliability, safety, and resale value makes it an excellent investment for export markets. Complete documentation package available for immediate international shipping.",
  },
  {
    id: "5",
    make: "Mazda",
    model: "CX-5",
    year: 2019,
    price: {
      fob: 11800,
      cif: 13800,
      currency: "USD",
    },
    engine: {
      displacement: "2.0L",
      type: "Skyactiv",
      fuel: "Petrol",
    },
    transmission: "Automatic",
    mileage: 48000,
    color: "Red",
    auctionGrade: "3.5",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Yokohama Port",
    stockId: "STK-2024-005",
    features: ["AWD", "Navigation", "Bose Audio", "Heated Seats"],
    description: "Premium 2019 Mazda CX-5 featuring Mazda's innovative SkyActiv technology, combining sporty driving dynamics with excellent fuel efficiency. This well-maintained SUV offers a perfect balance of performance, comfort, and style. The auction grade of 3.5 indicates good condition with some minor wear consistent with normal use. The 2.0L SkyActiv petrol engine provides responsive performance while maintaining competitive fuel economy. Features include all-wheel drive system, advanced navigation, premium Bose audio system, and heated seats for enhanced comfort. This vehicle has been maintained with regular service according to manufacturer recommendations, with service records available. The Mazda CX-5's reputation for driving enjoyment, premium interior quality, and strong resale value makes it popular in export markets. While the grade indicates some cosmetic wear, the vehicle is mechanically sound and represents excellent value for buyers seeking a premium driving experience at a competitive price point.",
  },
  {
    id: "6",
    make: "Subaru",
    model: "Forester",
    year: 2020,
    price: {
      fob: 15200,
      cif: 17500,
      currency: "USD",
    },
    engine: {
      displacement: "2.5L",
      type: "Boxer",
      fuel: "Petrol",
    },
    transmission: "CVT",
    mileage: 35000,
    color: "Green",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=90&w=1200",
    ],
    location: "Kobe Port",
    stockId: "STK-2024-006",
    features: ["AWD", "EyeSight", "Sunroof", "Navigation", "Leather"],
    description: "Outstanding Subaru Forester with low mileage. Full-time AWD system, excellent for all weather conditions.",
  },
  {
    id: "7",
    make: "Toyota",
    model: "Alphard",
    year: 2021,
    price: {
      fob: 22500,
      cif: 25800,
      currency: "USD",
    },
    engine: {
      displacement: "3.5L",
      type: "V6",
      fuel: "Hybrid",
    },
    transmission: "CVT",
    mileage: 28000,
    color: "Black",
    auctionGrade: "5.0",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Yokohama Port",
    stockId: "STK-2024-007",
    features: ["7 Seats", "Leather", "Panoramic Roof", "Rear Entertainment", "Premium Audio"],
    description: "Premium 2021 Toyota Alphard in exceptional condition, representing the pinnacle of Japanese luxury minivan engineering. With only 28,000 kilometers, this vehicle offers outstanding value in the executive transport segment. The auction grade of 5.0 indicates pristine condition, virtually like new with no visible wear or damage. The 3.5L V6 hybrid powertrain provides powerful, smooth performance while maintaining excellent fuel efficiency for a vehicle of this size. Configured for seven passengers with premium leather seating, this Alphard is perfect for executive transport, luxury family use, or commercial passenger services. Features include panoramic glass roof, rear entertainment system with dual screens, premium JBL audio system, advanced climate control, and comprehensive safety features. The interior is in pristine condition with all original equipment present and functional. This vehicle has been maintained to the highest standards with complete service documentation. The Toyota Alphard's reputation for luxury, comfort, and reliability makes it highly sought after in premium markets worldwide. Complete export documentation package available for immediate international shipping.",
  },
  {
    id: "8",
    make: "Nissan",
    model: "X-Trail",
    year: 2020,
    price: {
      fob: 13200,
      cif: 15200,
      currency: "USD",
    },
    engine: {
      displacement: "2.0L",
      type: "Turbo",
      fuel: "Petrol",
    },
    transmission: "CVT",
    mileage: 42000,
    color: "Silver",
    auctionGrade: "4.0",
    condition: "Very Good",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=90&w=1200",
    ],
    location: "Osaka Port",
    stockId: "STK-2024-008",
    features: ["AWD", "Navigation", "Reverse Camera", "Bluetooth"],
    description: "Reliable Nissan X-Trail with good fuel economy. Well-maintained family SUV.",
  },
  {
    id: "9",
    make: "Mazda",
    model: "Demio",
    year: 2021,
    price: {
      fob: 9800,
      cif: 11500,
      currency: "USD",
    },
    engine: {
      displacement: "1.3L",
      type: "Skyactiv",
      fuel: "Petrol",
    },
    transmission: "Automatic",
    mileage: 35000,
    color: "White",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1544636331-e17e16d71c4f?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Nagoya Port",
    stockId: "STK-2024-009",
    features: ["Fuel Efficient", "Compact", "Navigation", "Reverse Camera"],
    description: "Economical 2021 Mazda Demio featuring Mazda's innovative SkyActiv technology, providing exceptional fuel efficiency perfect for urban and suburban driving. With only 35,000 kilometers, this compact vehicle offers outstanding value in the economy segment. The auction grade of 4.5 indicates excellent overall condition with well-maintained mechanical systems and minimal wear. The 1.3L SkyActiv petrol engine provides responsive performance while maintaining exceptional fuel economy, making it ideal for cost-conscious buyers. Features include advanced navigation system, reverse camera, modern infotainment system, and comprehensive safety features. This vehicle has been maintained with regular service according to manufacturer specifications, with complete service history available. The Mazda Demio's reputation for fuel efficiency, reliability, and compact practicality makes it popular in markets where operating costs and parking are important considerations. Complete export documentation package available for immediate international shipping.",
  },
  {
    id: "10",
    make: "Honda",
    model: "Fit",
    year: 2020,
    price: {
      fob: 10800,
      cif: 12500,
      currency: "USD",
    },
    engine: {
      displacement: "1.5L",
      type: "Hybrid",
      fuel: "Hybrid",
    },
    transmission: "CVT",
    mileage: 40000,
    color: "Blue",
    auctionGrade: "4.0",
    condition: "Very Good",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Kobe Port",
    stockId: "STK-2024-010",
    features: ["Hybrid", "Fuel Efficient", "Magic Seats", "Honda Sensing"],
    description: "Efficient Honda Fit hybrid with excellent fuel economy. Perfect for eco-conscious drivers.",
  },
  {
    id: "11",
    make: "Suzuki",
    model: "Every Wagon",
    year: 2022,
    price: {
      fob: 8500,
      cif: 10000,
      currency: "USD",
    },
    engine: {
      displacement: "0.66L",
      type: "Turbo",
      fuel: "Petrol",
    },
    transmission: "Automatic",
    mileage: 25000,
    color: "Silver",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1449967414343-e4f4e17e4d7e?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Yokohama Port",
    stockId: "STK-2024-011",
    features: ["Kei Car", "Fuel Efficient", "Compact", "AC"],
    description: "Popular Suzuki Every Wagon kei car. Perfect for narrow streets and excellent fuel economy.",
  },
  {
    id: "12",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: {
      fob: 11200,
      cif: 13000,
      currency: "USD",
    },
    engine: {
      displacement: "1.8L",
      type: "Hybrid",
      fuel: "Hybrid",
    },
    transmission: "CVT",
    mileage: 38000,
    color: "White",
    auctionGrade: "4.5",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=92&w=1200",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=92&w=1200",
    ],
    location: "Osaka Port",
    stockId: "STK-2024-012",
    features: ["Hybrid", "Toyota Safety Sense", "Navigation", "Reverse Camera"],
    description: "Reliable 2021 Toyota Corolla hybrid, representing the world's best-selling car with proven reliability and exceptional fuel efficiency. The auction grade of 4.5 indicates excellent overall condition with well-maintained mechanical systems and minimal wear. The 1.8L hybrid powertrain provides excellent fuel economy while maintaining responsive performance, making it ideal for eco-conscious drivers and cost-effective transportation. Features include Toyota Safety Sense comprehensive safety suite, advanced navigation system, reverse camera with parking sensors, and modern connectivity features. This vehicle has been serviced regularly according to manufacturer specifications, with complete service history available. The Toyota Corolla's global reputation for reliability, fuel efficiency, and low ownership costs makes it one of the most sought-after vehicles in export markets worldwide. Complete export documentation package available for immediate international shipping.",
  },
];

const allVehiclesList = [...vehicles, ...extendedVehicles];

export function getVehicleById(id: string): Vehicle | undefined {
  return allVehiclesList.find((v) => v.id === id);
}

export function getVehiclesByMake(make: string): Vehicle[] {
  return allVehiclesList.filter((v) => v.make.toLowerCase() === make.toLowerCase());
}

// Get all unique makes
export function getAllMakes(): string[] {
  return Array.from(new Set(allVehiclesList.map((v) => v.make))).sort();
}

// Get models by make
export function getModelsByMake(make: string): string[] {
  return Array.from(
    new Set(
      allVehiclesList
        .filter((v) => v.make.toLowerCase() === make.toLowerCase())
        .map((v) => v.model)
    )
  ).sort();
}

// Get all body types
export function getBodyTypes(): string[] {
  const types = new Set<string>();
  allVehiclesList.forEach((v) => {
    if (v.model.toLowerCase().includes("van") || v.model.toLowerCase().includes("hiace")) {
      types.add("Van");
    } else if (v.model.toLowerCase().includes("wagon") || v.model.toLowerCase().includes("estate")) {
      types.add("Wagon");
    } else if (["Land Cruiser", "Patrol", "CR-V", "CX-5", "Forester", "X-Trail", "RAV4", "Delica"].some(m => v.model.includes(m))) {
      types.add("SUV");
    } else {
      types.add("Sedan");
    }
  });
  return Array.from(types).sort();
}
