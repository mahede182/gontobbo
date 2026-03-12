import {
  PrismaClient,
  Role,
  MemberClass,
  BookingType,
  BookingStatus,
  BookingFor,
  WishlistType,
  BaggageType,
  BaggageStatus,
  PaymentType,
  SearchType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Clean existing data ───────────────────────────────────────────────
  console.log("🧹 Cleaning existing data...");
  await prisma.recentSearch.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.bookingTraveller.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.tripPackageDetail.deleteMany();
  await prisma.baggage.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.flightPreferences.deleteMany();
  await prisma.passportDetails.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotelAmenity.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ─────────────────────────────────────────────────────────────
  console.log("👤 Creating users...");
  const hashedPassword = await bcrypt.hash("Admin@123456", 12);
  const userPassword = await bcrypt.hash("Password@123", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@gontobbo.co",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      role: Role.ADMIN,
      memberClass: MemberClass.PLATINUM,
      memberNumber: "GTB-ADM-0001",
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=admin",
      isActive: true,
    },
  });

  const john = await prisma.user.create({
    data: {
      email: "john@example.com",
      password: userPassword,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      phone: "+1234567890",
      nationality: "American",
      role: Role.USER,
      memberClass: MemberClass.GOLD,
      memberNumber: "GTB-USR-0001",
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=john",
      isActive: true,
    },
  });

  const jane = await prisma.user.create({
    data: {
      email: "jane@example.com",
      password: userPassword,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      phone: "+1987654321",
      nationality: "British",
      role: Role.USER,
      memberClass: MemberClass.SILVER,
      memberNumber: "GTB-USR-0002",
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=jane",
      isActive: true,
    },
  });

  const ali = await prisma.user.create({
    data: {
      email: "ali@example.com",
      password: userPassword,
      firstName: "Ali",
      lastName: "Hassan",
      username: "alihassan",
      phone: "+8801712345678",
      nationality: "Bangladeshi",
      role: Role.USER,
      memberClass: MemberClass.BRONZE,
      memberNumber: "GTB-USR-0003",
      avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=ali",
      isActive: true,
    },
  });

  console.log(`  ✅ Created ${4} users (1 admin, 3 regular)`);

  // ─── Passport Details ──────────────────────────────────────────────────
  await prisma.passportDetails.create({
    data: {
      userId: john.id,
      passportNumber: "US1234567",
      nationality: "American",
      dateOfBirth: new Date("1990-05-15"),
      dateOfIssue: new Date("2020-01-10"),
      dateOfExpiry: new Date("2030-01-10"),
    },
  });

  // ─── Locations ─────────────────────────────────────────────────────────
  console.log("📍 Creating locations...");
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: "Las Vegas",
        country: "United States",
        isPopular: true,
        latitude: 36.1699,
        longitude: -115.1398,
        image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "New York",
        country: "United States",
        isPopular: true,
        latitude: 40.7128,
        longitude: -74.006,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "London",
        country: "United Kingdom",
        isPopular: true,
        latitude: 51.5074,
        longitude: -0.1278,
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Bali",
        country: "Indonesia",
        isPopular: true,
        latitude: -8.3405,
        longitude: 115.092,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Dubai",
        country: "UAE",
        isPopular: true,
        latitude: 25.2048,
        longitude: 55.2708,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Tokyo",
        country: "Japan",
        isPopular: true,
        latitude: 35.6762,
        longitude: 139.6503,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Paris",
        country: "France",
        isPopular: true,
        latitude: 48.8566,
        longitude: 2.3522,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Maldives",
        country: "Maldives",
        isPopular: true,
        latitude: 3.2028,
        longitude: 73.2207,
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Sydney",
        country: "Australia",
        isPopular: false,
        latitude: -33.8688,
        longitude: 151.2093,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
      },
    }),
    prisma.location.create({
      data: {
        name: "Bangkok",
        country: "Thailand",
        isPopular: false,
        latitude: 13.7563,
        longitude: 100.5018,
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      },
    }),
  ]);
  console.log(`  ✅ Created ${locations.length} locations`);

  // ─── Hotels ────────────────────────────────────────────────────────────
  console.log("🏨 Creating hotels...");

  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Caesars Palace",
      description:
        "Experience the grandeur of ancient Rome in the heart of Las Vegas. Caesars Palace offers world-class dining, entertainment, and luxury accommodations on the famous Las Vegas Strip.",
      location: "Las Vegas, United States",
      latitude: 36.1162,
      longitude: -115.1745,
      rating: 4.5,
      starRating: 5,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      ],
      isFeatured: true,
      checkInTime: "15:00",
      checkOutTime: "11:00",
      amenities: {
        create: [
          { name: "Swimming Pool", icon: "pool" },
          { name: "Spa & Wellness", icon: "spa" },
          { name: "Free WiFi", icon: "wifi" },
          { name: "Restaurant", icon: "restaurant" },
          { name: "Fitness Center", icon: "fitness" },
          { name: "Casino", icon: "casino" },
          { name: "Parking", icon: "parking" },
          { name: "Room Service", icon: "room_service" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Deluxe Room",
            description:
              "Spacious room with stunning Strip views, king-size bed, and marble bathroom.",
            sqft: 450,
            bedType: "King",
            view: "Strip View",
            price: 199,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"],
            tags: ["Popular", "Best Value"],
          },
          {
            name: "Premium Suite",
            description:
              "Luxurious suite featuring a separate living area, premium amenities, and panoramic views.",
            sqft: 850,
            bedType: "King",
            view: "Panoramic",
            price: 450,
            taxInfo: "per night, excluding taxes",
            maxGuests: 3,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1590490360182-c33d955bc37a?w=800"],
            tags: ["Luxury", "Recommended"],
          },
          {
            name: "Standard Twin Room",
            description: "Comfortable room with two double beds, perfect for friends or families.",
            sqft: 380,
            bedType: "Twin",
            view: "City View",
            price: 130,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: false,
            images: ["https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"],
            tags: ["Budget Friendly"],
          },
        ],
      },
    },
  });

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "YOTEL New York",
      description:
        "A futuristic hotel in the heart of Midtown Manhattan. YOTEL offers innovative, tech-forward accommodations with a stylish rooftop terrace and excellent connectivity.",
      location: "Midtown, New York, United States",
      latitude: 40.7614,
      longitude: -73.9922,
      rating: 4.0,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      ],
      isFeatured: true,
      checkInTime: "14:00",
      checkOutTime: "11:00",
      amenities: {
        create: [
          { name: "Free WiFi", icon: "wifi" },
          { name: "Rooftop Bar", icon: "bar" },
          { name: "Gym", icon: "fitness" },
          { name: "Self Check-in", icon: "check_in" },
          { name: "Luggage Storage", icon: "luggage" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Smart Premium Queen",
            description:
              "Tech-savvy room with motorized bed, adjustable mood lighting, and smart TV.",
            sqft: 215,
            bedType: "Queen",
            view: "City View",
            price: 170,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"],
            tags: ["Smart Room"],
          },
          {
            name: "First Class King",
            description:
              "Premium room with king bed, workstation, rain shower, and Times Square views.",
            sqft: 300,
            bedType: "King",
            view: "Times Square",
            price: 280,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"],
            tags: ["Premium"],
          },
        ],
      },
    },
  });

  const hotel3 = await prisma.hotel.create({
    data: {
      name: "Seaside Suites",
      description:
        "A boutique beachfront hotel in Miami Beach offering stunning ocean views, private beach access, and a vibrant atmosphere.",
      location: "Miami Beach, Florida",
      latitude: 25.7907,
      longitude: -80.13,
      rating: 4.3,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      ],
      isFeatured: true,
      checkInTime: "15:00",
      checkOutTime: "12:00",
      amenities: {
        create: [
          { name: "Beach Access", icon: "beach" },
          { name: "Swimming Pool", icon: "pool" },
          { name: "Free WiFi", icon: "wifi" },
          { name: "Spa", icon: "spa" },
          { name: "Bar & Lounge", icon: "bar" },
          { name: "Parking", icon: "parking" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Ocean View Suite",
            description: "Wake up to breathtaking ocean views in this spacious suite with balcony.",
            sqft: 550,
            bedType: "King",
            view: "Ocean View",
            price: 450,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800"],
            tags: ["Ocean View", "Luxury"],
          },
          {
            name: "Beach Bungalow",
            description: "Private bungalow steps from the sand with outdoor shower and hammock.",
            sqft: 400,
            bedType: "Queen",
            view: "Beach View",
            price: 380,
            taxInfo: "per night, excluding taxes",
            maxGuests: 2,
            isRefundable: true,
            images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"],
            tags: ["Beachfront"],
          },
        ],
      },
    },
  });

  const hotel4 = await prisma.hotel.create({
    data: {
      name: "Omah Manis",
      description:
        "A charming traditional Javanese homestay surrounded by rice terraces in Bantul. Experience authentic Yogyakarta culture with modern comfort.",
      location: "Bantul, Yogyakarta",
      latitude: -7.8856,
      longitude: 110.3411,
      rating: 4.2,
      starRating: 3,
      images: ["https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800"],
      isFeatured: false,
      amenities: {
        create: [
          { name: "Free WiFi", icon: "wifi" },
          { name: "Breakfast", icon: "restaurant" },
          { name: "Garden", icon: "garden" },
          { name: "Parking", icon: "parking" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Traditional Room",
            description: "Authentic Javanese room with traditional decor and garden views.",
            sqft: 320,
            bedType: "Double",
            view: "Garden",
            price: 45,
            maxGuests: 2,
            isRefundable: true,
            images: [],
            tags: ["Cultural"],
          },
        ],
      },
    },
  });

  const hotel5 = await prisma.hotel.create({
    data: {
      name: "Rinjani Villa",
      description:
        "Luxury villa with views of Mount Rinjani. Located in Sembalun, this property offers world-class trekking access and serene mountain escapes.",
      location: "Sembalun, Lombok",
      latitude: -8.3913,
      longitude: 116.4244,
      rating: 4.6,
      starRating: 4,
      images: ["https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"],
      isFeatured: true,
      amenities: {
        create: [
          { name: "Mountain View", icon: "mountain" },
          { name: "Swimming Pool", icon: "pool" },
          { name: "Free WiFi", icon: "wifi" },
          { name: "Spa", icon: "spa" },
          { name: "Restaurant", icon: "restaurant" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Mountain View Villa",
            description: "Private villa with infinity pool and panoramic mountain views.",
            sqft: 1200,
            bedType: "King",
            view: "Mountain View",
            price: 320,
            maxGuests: 4,
            isRefundable: true,
            images: [],
            tags: ["Luxury", "Private Pool"],
          },
          {
            name: "Deluxe Garden Villa",
            description: "Spacious villa set in lush tropical gardens.",
            sqft: 800,
            bedType: "King",
            view: "Garden",
            price: 200,
            maxGuests: 2,
            isRefundable: true,
            images: [],
            tags: ["Garden View"],
          },
        ],
      },
    },
  });

  const hotel6 = await prisma.hotel.create({
    data: {
      name: "Double Tree Villa",
      description:
        "Hilton Double Tree offers a blend of contemporary style and rustic charm in the highland city of Batu, Malang.",
      location: "Batu, Malang",
      latitude: -7.876,
      longitude: 112.528,
      rating: 4.1,
      starRating: 4,
      images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"],
      isFeatured: false,
      amenities: {
        create: [
          { name: "Free WiFi", icon: "wifi" },
          { name: "Restaurant", icon: "restaurant" },
          { name: "Pool", icon: "pool" },
          { name: "Gym", icon: "fitness" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Superior Room",
            description: "Well-appointed room with mountain views and premium bedding.",
            sqft: 350,
            bedType: "Queen",
            view: "Mountain View",
            price: 95,
            maxGuests: 2,
            isRefundable: true,
            images: [],
            tags: ["Best Value"],
          },
        ],
      },
    },
  });

  const hotel7 = await prisma.hotel.create({
    data: {
      name: "Blue Sky Hotel",
      description:
        "Modern hotel in the heart of Lombok with easy access to beaches and cultural sites. Perfect for exploring the island.",
      location: "Lombok, Tengah",
      latitude: -8.565,
      longitude: 116.351,
      rating: 3.9,
      starRating: 3,
      images: ["https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"],
      isFeatured: false,
      amenities: {
        create: [
          { name: "Free WiFi", icon: "wifi" },
          { name: "Restaurant", icon: "restaurant" },
          { name: "Airport Shuttle", icon: "shuttle" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Standard Room",
            description: "Clean and comfortable room with all essentials included.",
            sqft: 260,
            bedType: "Double",
            view: "City View",
            price: 60,
            maxGuests: 2,
            isRefundable: false,
            images: [],
            tags: ["Budget Friendly"],
          },
        ],
      },
    },
  });

  const hotel8 = await prisma.hotel.create({
    data: {
      name: "The Ritz-Carlton Dubai",
      description:
        "Ultra-luxury beachfront resort on JBR Walk offering impeccable service, private beach, and stunning Arabian Gulf views.",
      location: "Dubai, UAE",
      latitude: 25.0767,
      longitude: 55.133,
      rating: 4.8,
      starRating: 5,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      ],
      isFeatured: true,
      amenities: {
        create: [
          { name: "Private Beach", icon: "beach" },
          { name: "Infinity Pool", icon: "pool" },
          { name: "Spa & Hammam", icon: "spa" },
          { name: "Fine Dining", icon: "restaurant" },
          { name: "Butler Service", icon: "butler" },
          { name: "Kids Club", icon: "kids" },
        ],
      },
      rooms: {
        create: [
          {
            name: "Deluxe Sea View",
            description: "Elegant room with floor-to-ceiling windows overlooking the Arabian Gulf.",
            sqft: 500,
            bedType: "King",
            view: "Sea View",
            price: 580,
            maxGuests: 2,
            isRefundable: true,
            images: [],
            tags: ["Sea View", "Luxury"],
          },
          {
            name: "Royal Suite",
            description:
              "The pinnacle of luxury — private terrace, personal butler, and bespoke experiences.",
            sqft: 2200,
            bedType: "King",
            view: "Panoramic Gulf",
            price: 2500,
            maxGuests: 4,
            isRefundable: true,
            images: [],
            tags: ["Ultra Luxury", "Suite"],
          },
        ],
      },
    },
  });

  const allHotels = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8];
  console.log(`  ✅ Created ${allHotels.length} hotels with rooms & amenities`);

  // ─── Reviews ───────────────────────────────────────────────────────────
  console.log("⭐ Creating reviews...");
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        hotelId: hotel1.id,
        userId: john.id,
        rating: 5,
        text: "Absolutely amazing! The rooms are luxurious and the casino is world-class. Staff went above and beyond. Highly recommend for anyone visiting Las Vegas.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel1.id,
        userId: jane.id,
        rating: 4,
        text: "Great location and beautiful property. The pool area is fantastic. Only downside was the resort fee. Still a wonderful experience overall.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel2.id,
        userId: john.id,
        rating: 4,
        text: "Love the futuristic vibe! The robotic luggage storage is a fun touch. Rooms are compact but cleverly designed. Perfect for a short NYC stay.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel2.id,
        userId: ali.id,
        rating: 3.5,
        text: "Great location and modern amenities. Rooms are smaller than expected but the rooftop bar makes up for it.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel3.id,
        userId: jane.id,
        rating: 4.5,
        text: "The ocean views are breathtaking. Waking up to the sound of waves was magical. The beach access is a huge plus!",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel5.id,
        userId: ali.id,
        rating: 5,
        text: "Best villa experience ever! The mountain views are stunning and the infinity pool is a dream. Staff arranged a beautiful trekking tour for us.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel8.id,
        userId: jane.id,
        rating: 5,
        text: "Pure luxury. The private beach, the service, the food — everything was perfection. The butler service is a nice touch. Worth every penny.",
      },
    }),
    prisma.review.create({
      data: {
        hotelId: hotel8.id,
        userId: john.id,
        rating: 4.5,
        text: "Incredible property with stunning views. The spa and hammam were relaxing. One of the best hotel experiences I've ever had.",
      },
    }),
  ]);
  console.log(`  ✅ Created ${reviews.length} reviews`);

  // ─── Trips ─────────────────────────────────────────────────────────────
  console.log("✈️  Creating trips...");

  const trip1 = await prisma.trip.create({
    data: {
      title: "Buckingham Palace, London",
      destination: "London, United Kingdom",
      duration: "5 Days Package",
      description:
        "Explore the heart of London with visits to Buckingham Palace, Tower of London, Big Ben, and the British Museum. Includes guided tours, luxury accommodations, and round-trip flights.",
      feature: "Return Flight",
      image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800",
      peopleJoined: 7,
      price: 1299,
      isPopular: true,
      packageDetails: {
        create: [
          { detail: "Round-trip flights from major US cities" },
          { detail: "4 nights at a 4-star London hotel" },
          { detail: "Daily breakfast included" },
          { detail: "Guided tour of Buckingham Palace" },
          { detail: "Thames River Cruise" },
          { detail: "London Eye tickets" },
        ],
      },
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      title: "Yosemite National Park",
      destination: "California, United States",
      duration: "5 Days Package",
      description:
        "Adventure awaits at Yosemite! Hike through towering sequoias, marvel at stunning waterfalls, and experience the raw beauty of one of America's most iconic national parks.",
      feature: "Free Breakfast",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
      peopleJoined: 14,
      price: 899,
      isPopular: true,
      packageDetails: {
        create: [
          { detail: "4 nights lodge accommodation" },
          { detail: "All meals included" },
          { detail: "Professional hiking guide" },
          { detail: "Park entrance fees" },
          { detail: "Equipment rental included" },
        ],
      },
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      title: "Maldives Beach Escape",
      destination: "Maldives",
      duration: "7 Days Package",
      description:
        "Unwind in paradise with crystal-clear waters, white-sand beaches, and overwater bungalows. Snorkeling, diving, and sunset cruises included.",
      feature: "All Inclusive",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      peopleJoined: 23,
      price: 2499,
      isPopular: true,
      packageDetails: {
        create: [
          { detail: "6 nights in overwater bungalow" },
          { detail: "All meals and drinks included" },
          { detail: "Snorkeling and diving sessions" },
          { detail: "Sunset dolphin cruise" },
          { detail: "Spa treatment package" },
          { detail: "Seaplane transfers" },
        ],
      },
    },
  });

  const trip4 = await prisma.trip.create({
    data: {
      title: "Tokyo Cultural Journey",
      destination: "Tokyo, Japan",
      duration: "6 Days Package",
      description:
        "Immerse yourself in Japanese culture — from ancient temples to futuristic tech districts. Includes authentic tea ceremonies, sushi-making classes, and Mount Fuji day trip.",
      feature: "Guided Tours",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      peopleJoined: 11,
      price: 1899,
      isPopular: true,
      packageDetails: {
        create: [
          { detail: "5 nights at boutique hotel in Shibuya" },
          { detail: "Daily breakfast & 3 special dinners" },
          { detail: "Mount Fuji day trip" },
          { detail: "Tea ceremony experience" },
          { detail: "Sushi-making class" },
          { detail: "JR Rail Pass included" },
        ],
      },
    },
  });

  const trip5 = await prisma.trip.create({
    data: {
      title: "Dubai Luxury Experience",
      destination: "Dubai, UAE",
      duration: "4 Days Package",
      description:
        "Experience the glamour of Dubai — from the Burj Khalifa to desert safaris. Includes luxury transfers, premium dining, and VIP access.",
      feature: "VIP Access",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      peopleJoined: 19,
      price: 1699,
      isPopular: false,
      packageDetails: {
        create: [
          { detail: "3 nights at 5-star resort" },
          { detail: "Burj Khalifa VIP observation deck" },
          { detail: "Desert safari with BBQ dinner" },
          { detail: "Dubai Mall shopping tour" },
          { detail: "Premium airport transfers" },
        ],
      },
    },
  });

  const allTrips = [trip1, trip2, trip3, trip4, trip5];
  console.log(`  ✅ Created ${allTrips.length} trips with package details`);

  // ─── Flights ───────────────────────────────────────────────────────────
  console.log("🛫 Creating flights...");
  const flights = await Promise.all([
    prisma.flight.create({
      data: {
        airline: "Emirates",
        flightNumber: "EK203",
        departureAirport: "JFK",
        arrivalAirport: "DXB",
        departureTime: new Date("2025-03-15T22:30:00Z"),
        arrivalTime: new Date("2025-03-16T19:25:00Z"),
        duration: "12h 55m",
        stops: 0,
        price: 899,
        services: ["In-flight meals", "Entertainment", "WiFi", "Lounge access"],
        route: "New York → Dubai",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "British Airways",
        flightNumber: "BA117",
        departureAirport: "JFK",
        arrivalAirport: "LHR",
        departureTime: new Date("2025-03-15T19:00:00Z"),
        arrivalTime: new Date("2025-03-16T07:05:00Z"),
        duration: "7h 05m",
        stops: 0,
        price: 650,
        services: ["In-flight meals", "Entertainment", "WiFi"],
        route: "New York → London",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Japan Airlines",
        flightNumber: "JL5",
        departureAirport: "JFK",
        arrivalAirport: "NRT",
        departureTime: new Date("2025-03-15T11:30:00Z"),
        arrivalTime: new Date("2025-03-16T15:25:00Z"),
        duration: "14h 55m",
        stops: 0,
        price: 1200,
        services: ["Premium meals", "Entertainment", "WiFi", "Amenity kit"],
        route: "New York → Tokyo",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Delta Air Lines",
        flightNumber: "DL408",
        departureAirport: "LAX",
        arrivalAirport: "LHR",
        departureTime: new Date("2025-03-15T16:45:00Z"),
        arrivalTime: new Date("2025-03-16T11:10:00Z"),
        duration: "10h 25m",
        stops: 0,
        price: 720,
        services: ["In-flight meals", "Entertainment", "WiFi"],
        route: "Los Angeles → London",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Qatar Airways",
        flightNumber: "QR702",
        departureAirport: "JFK",
        arrivalAirport: "MLE",
        departureTime: new Date("2025-03-15T20:00:00Z"),
        arrivalTime: new Date("2025-03-17T01:30:00Z"),
        duration: "18h 30m",
        stops: 1,
        stopLocation: "Doha (DOH)",
        price: 1050,
        services: ["In-flight meals", "Entertainment", "WiFi", "Lounge access"],
        route: "New York → Doha → Malé",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Singapore Airlines",
        flightNumber: "SQ25",
        departureAirport: "JFK",
        arrivalAirport: "SIN",
        departureTime: new Date("2025-03-15T09:45:00Z"),
        arrivalTime: new Date("2025-03-16T14:30:00Z"),
        duration: "18h 45m",
        stops: 0,
        price: 1350,
        services: ["Premium meals", "Entertainment", "WiFi", "Private suite"],
        route: "New York → Singapore",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Turkish Airlines",
        flightNumber: "TK2",
        departureAirport: "JFK",
        arrivalAirport: "IST",
        departureTime: new Date("2025-03-15T23:00:00Z"),
        arrivalTime: new Date("2025-03-16T17:15:00Z"),
        duration: "10h 15m",
        stops: 0,
        price: 580,
        services: ["In-flight meals", "Entertainment", "WiFi"],
        route: "New York → Istanbul",
      },
    }),
    prisma.flight.create({
      data: {
        airline: "Garuda Indonesia",
        flightNumber: "GA881",
        departureAirport: "SIN",
        arrivalAirport: "DPS",
        departureTime: new Date("2025-03-16T08:00:00Z"),
        arrivalTime: new Date("2025-03-16T10:50:00Z"),
        duration: "2h 50m",
        stops: 0,
        price: 180,
        services: ["In-flight meals", "Entertainment"],
        route: "Singapore → Bali",
      },
    }),
  ]);
  console.log(`  ✅ Created ${flights.length} flights`);

  // ─── Wishlists ─────────────────────────────────────────────────────────
  console.log("❤️  Creating wishlists...");
  const wishlists = await Promise.all([
    prisma.wishlistItem.create({
      data: {
        userId: john.id,
        hotelId: hotel1.id,
        type: WishlistType.HOTEL,
        name: "Caesars Palace",
        rating: 4.5,
      },
    }),
    prisma.wishlistItem.create({
      data: {
        userId: john.id,
        hotelId: hotel5.id,
        type: WishlistType.HOTEL,
        name: "Rinjani Villa",
        rating: 4.6,
      },
    }),
    prisma.wishlistItem.create({
      data: {
        userId: jane.id,
        hotelId: hotel3.id,
        type: WishlistType.HOTEL,
        name: "Seaside Suites",
        rating: 4.3,
      },
    }),
    prisma.wishlistItem.create({
      data: {
        userId: jane.id,
        hotelId: hotel8.id,
        type: WishlistType.HOTEL,
        name: "The Ritz-Carlton Dubai",
        rating: 4.8,
      },
    }),
    prisma.wishlistItem.create({
      data: {
        userId: ali.id,
        hotelId: hotel4.id,
        type: WishlistType.HOTEL,
        name: "Omah Manis",
        rating: 4.2,
      },
    }),
  ]);
  console.log(`  ✅ Created ${wishlists.length} wishlist items`);

  // ─── Bookings ──────────────────────────────────────────────────────────
  console.log("📋 Creating bookings...");

  // Fetch rooms for reference
  const caesarsRoom = await prisma.room.findFirst({
    where: { hotelId: hotel1.id, name: "Deluxe Room" },
  });
  const seasideRoom = await prisma.room.findFirst({
    where: { hotelId: hotel3.id, name: "Ocean View Suite" },
  });

  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: john.id,
        hotelId: hotel1.id,
        roomId: caesarsRoom!.id,
        type: BookingType.HOTEL,
        status: BookingStatus.CONFIRMED,
        checkIn: new Date("2025-04-10"),
        checkOut: new Date("2025-04-13"),
        adults: 2,
        children: 0,
        rooms: 1,
        totalPrice: 668.64,
        taxAmount: 71.64,
        bookingFor: BookingFor.MYSELF,
        travellers: {
          create: [
            {
              fullName: "John Doe",
              gender: "Male",
              nationality: "American",
              passportNumber: "US1234567",
            },
          ],
        },
      },
    }),
    prisma.booking.create({
      data: {
        userId: jane.id,
        hotelId: hotel3.id,
        roomId: seasideRoom!.id,
        type: BookingType.HOTEL,
        status: BookingStatus.PENDING,
        checkIn: new Date("2025-05-20"),
        checkOut: new Date("2025-05-25"),
        adults: 2,
        children: 1,
        rooms: 1,
        totalPrice: 2520,
        taxAmount: 270,
        bookingFor: BookingFor.MYSELF,
      },
    }),
    prisma.booking.create({
      data: {
        userId: ali.id,
        tripId: trip1.id,
        type: BookingType.TRIP,
        status: BookingStatus.CONFIRMED,
        checkIn: new Date("2025-06-01"),
        checkOut: new Date("2025-06-06"),
        adults: 2,
        totalPrice: 2857.8,
        taxAmount: 259.8,
        bookingFor: BookingFor.MYSELF,
        travellers: {
          create: [
            { fullName: "Ali Hassan", gender: "Male", nationality: "Bangladeshi" },
            { fullName: "Sara Hassan", gender: "Female", nationality: "Bangladeshi" },
          ],
        },
      },
    }),
    prisma.booking.create({
      data: {
        userId: john.id,
        tripId: trip3.id,
        type: BookingType.TRIP,
        status: BookingStatus.COMPLETED,
        checkIn: new Date("2025-01-10"),
        checkOut: new Date("2025-01-17"),
        adults: 2,
        totalPrice: 5497.8,
        taxAmount: 499.8,
        bookingFor: BookingFor.MYSELF,
      },
    }),
  ]);
  console.log(`  ✅ Created ${bookings.length} bookings`);

  // ─── Payment Methods ───────────────────────────────────────────────────
  console.log("💳 Creating payment methods...");
  const payments = await Promise.all([
    prisma.paymentMethod.create({
      data: {
        userId: john.id,
        type: PaymentType.CREDIT_CARD,
        name: "Visa ending in 4242",
        last4: "4242",
        isDefault: true,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        userId: john.id,
        type: PaymentType.PAYPAL,
        name: "PayPal - john@example.com",
        isDefault: false,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        userId: jane.id,
        type: PaymentType.MASTER_CARD,
        name: "MasterCard ending in 8888",
        last4: "8888",
        isDefault: true,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        userId: ali.id,
        type: PaymentType.BKASH,
        name: "bKash - 01712345678",
        isDefault: true,
      },
    }),
  ]);
  console.log(`  ✅ Created ${payments.length} payment methods`);

  // ─── Baggage ───────────────────────────────────────────────────────────
  console.log("🧳 Creating baggage items...");
  const baggageItems = await Promise.all([
    prisma.baggage.create({
      data: {
        userId: john.id,
        type: BaggageType.CABIN,
        name: "Carry-on Bag",
        description: "Standard carry-on luggage",
        weight: "7 kg",
        dimensions: "55 x 40 x 20 cm",
        status: BaggageStatus.INCLUDED,
      },
    }),
    prisma.baggage.create({
      data: {
        userId: john.id,
        type: BaggageType.CHECKED,
        name: "Checked Suitcase",
        description: "Large checked luggage",
        weight: "23 kg",
        dimensions: "75 x 50 x 30 cm",
        status: BaggageStatus.INCLUDED,
      },
    }),
    prisma.baggage.create({
      data: {
        userId: john.id,
        type: BaggageType.SPECIAL,
        name: "Golf Bag",
        description: "Oversized sports equipment",
        weight: "15 kg",
        dimensions: "130 x 40 x 40 cm",
        status: BaggageStatus.EXTRA_FEE,
      },
    }),
  ]);
  console.log(`  ✅ Created ${baggageItems.length} baggage items`);

  // ─── Notifications ─────────────────────────────────────────────────────
  console.log("🔔 Creating notifications...");
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: john.id,
        title: "Booking Confirmed! 🎉",
        body: "Your booking at Caesars Palace has been confirmed. Check-in: April 10, 2025. Have a wonderful stay!",
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: john.id,
        title: "Trip Completed ✅",
        body: "How was your Maldives Beach Escape? Leave a review to help other travelers.",
        isRead: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: jane.id,
        title: "Booking Pending ⏳",
        body: "Your booking at Seaside Suites is pending confirmation. We'll notify you once it's confirmed.",
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: ali.id,
        title: "Welcome to Gontobbo! 👋",
        body: "Thank you for joining Gontobbo. Explore hotels, trips, and flights to plan your next adventure.",
        isRead: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: ali.id,
        title: "London Trip Confirmed 🇬🇧",
        body: "Your Buckingham Palace London trip has been confirmed for June 1-6, 2025. Get ready for an amazing experience!",
        isRead: false,
      },
    }),
  ]);
  console.log(`  ✅ Created ${notifications.length} notifications`);

  // ─── Recent Searches ───────────────────────────────────────────────────
  console.log("🔍 Creating recent searches...");
  const searches = await Promise.all([
    prisma.recentSearch.create({
      data: { userId: john.id, type: SearchType.HOTEL, query: "Las Vegas hotels" },
    }),
    prisma.recentSearch.create({
      data: { userId: john.id, type: SearchType.HOTEL, query: "Miami Beach resorts" },
    }),
    prisma.recentSearch.create({
      data: { userId: john.id, type: SearchType.FLIGHT, query: "JFK to DXB" },
    }),
    prisma.recentSearch.create({
      data: { userId: jane.id, type: SearchType.HOTEL, query: "Dubai luxury hotels" },
    }),
    prisma.recentSearch.create({
      data: { userId: jane.id, type: SearchType.FLIGHT, query: "LAX to LHR" },
    }),
    prisma.recentSearch.create({
      data: { userId: ali.id, type: SearchType.HOTEL, query: "Bali villas" },
    }),
  ]);
  console.log(`  ✅ Created ${searches.length} recent searches`);

  // ─── Summary ───────────────────────────────────────────────────────────
  console.log("\n╔═══════════════════════════════════════╗");
  console.log("║     🌱 Seeding Complete!              ║");
  console.log("╠═══════════════════════════════════════╣");
  console.log(`║  Users:          ${4}                    ║`);
  console.log(`║  Locations:      ${locations.length}                   ║`);
  console.log(`║  Hotels:         ${allHotels.length}                    ║`);
  console.log(`║  Reviews:        ${reviews.length}                    ║`);
  console.log(`║  Trips:          ${allTrips.length}                    ║`);
  console.log(`║  Flights:        ${flights.length}                    ║`);
  console.log(`║  Wishlists:      ${wishlists.length}                    ║`);
  console.log(`║  Bookings:       ${bookings.length}                    ║`);
  console.log(`║  Payments:       ${payments.length}                    ║`);
  console.log(`║  Notifications:  ${notifications.length}                    ║`);
  console.log(`║  Searches:       ${searches.length}                    ║`);
  console.log("╚═══════════════════════════════════════╝");
  console.log("\n📧 Test Accounts:");
  console.log("  Admin:  admin@gontobbo.co / Admin@123456");
  console.log("  User 1: john@example.com / Password@123");
  console.log("  User 2: jane@example.com / Password@123");
  console.log("  User 3: ali@example.com / Password@123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
