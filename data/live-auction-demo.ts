/**
 * Demo auction vehicle listings (jpcenter-style) for Live Auctions page.
 * Lot, make, model, year, auction, date, mileage, engine, start/sold price, image.
 */

export interface AuctionListing {
  id?: string;
  lot: string;
  make: string;
  model: string;
  year: number;
  auction: string;
  date: string;
  mileage: number;
  engine: string;
  startPrice: number;
  soldPrice: number;
  image: string;
  chassis?: string;
  grade?: string;
  status?: string;
  endTime?: string;
}

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=90&w=400`;

export const auctionListingsDemo: AuctionListing[] = [
  { lot: "28471012", make: "Toyota", model: "Land Cruiser Prado", year: 2021, auction: "USS Tokyo", date: "2026-01-28", mileage: 42000, engine: "2.8L Diesel", startPrice: 16500, soldPrice: 18900, image: IMG("1594502184342-2e12f877aa73"), chassis: "JTDJT92300", grade: "4.5" },
  { lot: "28471108", make: "Nissan", model: "Patrol", year: 2020, auction: "USS Osaka", date: "2026-01-27", mileage: 51000, engine: "4.0L V6", startPrice: 15200, soldPrice: 17800, image: IMG("1549317661-bd32c8ce0db2"), chassis: "Y62-123456", grade: "4.0" },
  { lot: "28471234", make: "Toyota", model: "Hiace Van", year: 2022, auction: "CAA Nagoya", date: "2026-01-28", mileage: 32000, engine: "2.8L Diesel", startPrice: 11800, soldPrice: 13200, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.5" },
  { lot: "28471301", make: "Honda", model: "CR-V", year: 2021, auction: "TAA Yokohama", date: "2026-01-26", mileage: 38000, engine: "1.5L Turbo", startPrice: 12800, soldPrice: 15100, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28471402", make: "Mazda", model: "CX-5", year: 2020, auction: "USS Tokyo", date: "2026-01-28", mileage: 45000, engine: "2.0L Skyactiv", startPrice: 10500, soldPrice: 12400, image: IMG("1606664515524-ed2f786a0bd6"), grade: "3.5" },
  { lot: "28471509", make: "Subaru", model: "Forester", year: 2021, auction: "Aucnet", date: "2026-01-27", mileage: 33000, engine: "2.5L Boxer", startPrice: 13800, soldPrice: 16200, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28471611", make: "Toyota", model: "Alphard", year: 2022, auction: "USS Tokyo", date: "2026-01-28", mileage: 22000, engine: "3.5L V6 Hybrid", startPrice: 21500, soldPrice: 24800, image: IMG("1617531653332-bd46c24f2068"), grade: "5.0" },
  { lot: "28471722", make: "Nissan", model: "X-Trail", year: 2020, auction: "CAA Kobe", date: "2026-01-26", mileage: 40000, engine: "2.0L Turbo", startPrice: 11800, soldPrice: 13900, image: IMG("1606664515524-ed2f786a0bd6"), grade: "4.0" },
  { lot: "28471833", make: "Toyota", model: "Corolla", year: 2022, auction: "USS Osaka", date: "2026-01-28", mileage: 28000, engine: "1.8L Hybrid", startPrice: 9800, soldPrice: 11500, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28471944", make: "Honda", model: "Fit", year: 2021, auction: "TAA", date: "2026-01-27", mileage: 35000, engine: "1.5L Hybrid", startPrice: 9200, soldPrice: 10800, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28472055", make: "Toyota", model: "RAV4", year: 2021, auction: "USS Tokyo", date: "2026-01-28", mileage: 30000, engine: "2.5L Hybrid", startPrice: 14200, soldPrice: 16800, image: IMG("1606664515524-ed2f786a0bd6"), grade: "4.5" },
  { lot: "28472166", make: "Mazda", model: "Demio", year: 2022, auction: "CAA", date: "2026-01-26", mileage: 26000, engine: "1.3L Skyactiv", startPrice: 8200, soldPrice: 9800, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.5" },
  { lot: "28472277", make: "Nissan", model: "Serena", year: 2021, auction: "Aucnet", date: "2026-01-28", mileage: 36000, engine: "2.0L", startPrice: 11200, soldPrice: 13100, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28472388", make: "Toyota", model: "Vitz", year: 2022, auction: "USS Nagoya", date: "2026-01-27", mileage: 24000, engine: "1.3L", startPrice: 6800, soldPrice: 8100, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.5" },
  { lot: "28472499", make: "Toyota", model: "Prius", year: 2021, auction: "USS Tokyo", date: "2026-01-28", mileage: 42000, engine: "1.8L Hybrid", startPrice: 10200, soldPrice: 12100, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28472600", make: "Lexus", model: "LX 600", year: 2023, auction: "Aucnet", date: "2026-01-26", mileage: 12000, engine: "3.5L V6 Twin Turbo", startPrice: 42000, soldPrice: 48500, image: IMG("1617531653332-bd46c24f2068"), grade: "5.5" },
  { lot: "28472711", make: "Toyota", model: "Noah", year: 2022, auction: "CAA", date: "2026-01-28", mileage: 29000, engine: "2.0L", startPrice: 13500, soldPrice: 15800, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28472822", make: "Suzuki", model: "Swift", year: 2021, auction: "USS Osaka", date: "2026-01-27", mileage: 38000, engine: "1.2L", startPrice: 7200, soldPrice: 8600, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.0" },
  { lot: "28472933", make: "Honda", model: "N-BOX", year: 2023, auction: "TAA", date: "2026-01-28", mileage: 15000, engine: "0.66L Turbo", startPrice: 8800, soldPrice: 10200, image: IMG("1605559424843-9e4c228bf1c2"), grade: "5.0" },
  { lot: "28473044", make: "Daihatsu", model: "Tanto", year: 2022, auction: "USS Tokyo", date: "2026-01-26", mileage: 22000, engine: "0.66L", startPrice: 6200, soldPrice: 7400, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.5" },
  { lot: "28473155", make: "Toyota", model: "Camry", year: 2020, auction: "Aucnet", date: "2026-01-28", mileage: 48000, engine: "2.5L", startPrice: 11200, soldPrice: 13200, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28473266", make: "Nissan", model: "Note", year: 2021, auction: "CAA Yokohama", date: "2026-01-27", mileage: 34000, engine: "1.2L Hybrid", startPrice: 7800, soldPrice: 9200, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28473377", make: "Mitsubishi", model: "Delica D5", year: 2021, auction: "USS Nagoya", date: "2026-01-28", mileage: 40000, engine: "2.2L Diesel", startPrice: 13200, soldPrice: 15400, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.0" },
  { lot: "28473488", make: "Toyota", model: "Hilux", year: 2020, auction: "USS Tokyo", date: "2026-01-26", mileage: 55000, engine: "2.8L Diesel", startPrice: 14800, soldPrice: 17200, image: IMG("1594502184342-2e12f877aa73"), grade: "4.0" },
  { lot: "28473599", make: "Subaru", model: "Levorg", year: 2021, auction: "TAA", date: "2026-01-28", mileage: 31000, engine: "1.8L Turbo", startPrice: 12200, soldPrice: 14400, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28473700", make: "Toyota", model: "Land Cruiser", year: 2020, auction: "Aucnet", date: "2026-01-27", mileage: 38000, engine: "4.5L V8 Diesel", startPrice: 38500, soldPrice: 44200, image: IMG("1594502184342-2e12f877aa73"), grade: "4.5" },
  { lot: "28473811", make: "Honda", model: "Step Wagon", year: 2022, auction: "CAA", date: "2026-01-28", mileage: 25000, engine: "1.5L Turbo", startPrice: 15200, soldPrice: 17800, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28473922", make: "Nissan", model: "Elgrand", year: 2021, auction: "USS Osaka", date: "2026-01-26", mileage: 32000, engine: "3.5L V6", startPrice: 16800, soldPrice: 19500, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28474033", make: "Toyota", model: "Voxy", year: 2022, auction: "USS Tokyo", date: "2026-01-28", mileage: 27000, engine: "2.0L", startPrice: 14200, soldPrice: 16500, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28474144", make: "Suzuki", model: "Every Wagon", year: 2022, auction: "TAA", date: "2026-01-27", mileage: 20000, engine: "0.66L Turbo", startPrice: 7200, soldPrice: 8500, image: IMG("1605559424843-9e4c228bf1c2"), grade: "4.5" },
  { lot: "28474255", make: "Toyota", model: "Estima", year: 2020, auction: "Aucnet", date: "2026-01-28", mileage: 45000, engine: "2.4L", startPrice: 12800, soldPrice: 15100, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28474366", make: "Mazda", model: "CX-3", year: 2021, auction: "CAA Nagoya", date: "2026-01-26", mileage: 36000, engine: "1.5L", startPrice: 9800, soldPrice: 11600, image: IMG("1606664515524-ed2f786a0bd6"), grade: "4.0" },
  { lot: "28474477", make: "Toyota", model: "Harrier", year: 2022, auction: "USS Tokyo", date: "2026-01-28", mileage: 18000, engine: "2.5L Hybrid", startPrice: 19200, soldPrice: 22400, image: IMG("1617531653332-bd46c24f2068"), grade: "5.0" },
  { lot: "28474588", make: "Nissan", model: "Dayz", year: 2023, auction: "USS Osaka", date: "2026-01-27", mileage: 12000, engine: "0.66L", startPrice: 5800, soldPrice: 6900, image: IMG("1605559424843-9e4c228bf1c2"), grade: "5.0" },
  { lot: "28474699", make: "Honda", model: "Freed", year: 2022, auction: "TAA", date: "2026-01-28", mileage: 28000, engine: "1.5L", startPrice: 13200, soldPrice: 15500, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28474800", make: "Toyota", model: "Sienta", year: 2021, auction: "CAA", date: "2026-01-26", mileage: 39000, engine: "1.5L Hybrid", startPrice: 10200, soldPrice: 12100, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28474911", make: "Subaru", model: "XV", year: 2020, auction: "Aucnet", date: "2026-01-28", mileage: 44000, engine: "2.0L", startPrice: 11800, soldPrice: 13900, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
  { lot: "28475022", make: "Toyota", model: "Aqua", year: 2022, auction: "USS Tokyo", date: "2026-01-27", mileage: 23000, engine: "1.5L Hybrid", startPrice: 7200, soldPrice: 8600, image: IMG("1617531653332-bd46c24f2068"), grade: "4.5" },
  { lot: "28475133", make: "Nissan", model: "GT-R", year: 2020, auction: "Aucnet", date: "2026-01-28", mileage: 22000, engine: "3.8L V6 Twin Turbo", startPrice: 62000, soldPrice: 71800, image: IMG("1549317661-bd32c8ce0db2"), grade: "4.5" },
  { lot: "28475244", make: "Toyota", model: "Crown", year: 2022, auction: "USS Nagoya", date: "2026-01-26", mileage: 19000, engine: "2.5L Hybrid", startPrice: 24500, soldPrice: 28200, image: IMG("1617531653332-bd46c24f2068"), grade: "5.0" },
  { lot: "28475355", make: "Honda", model: "Odyssey", year: 2021, auction: "CAA Yokohama", date: "2026-01-28", mileage: 35000, engine: "2.4L", startPrice: 15800, soldPrice: 18400, image: IMG("1617531653332-bd46c24f2068"), grade: "4.0" },
];
