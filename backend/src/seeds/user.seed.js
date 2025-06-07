import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/userModel.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    bio: "Passionate about French culture and cuisine. Looking to improve my conversational skills while helping others with English!",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    nativeLanguage: "english",
    learningLanguage: "french",
    location: "New York, USA",
    isOnboarded: true,
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    bio: "Anime and manga enthusiast studying Japanese. I love discussing Japanese pop culture and daily life!",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    nativeLanguage: "english",
    learningLanguage: "japanese",
    location: "Los Angeles, USA",
    isOnboarded: true,
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
    bio: "Travel blogger learning Spanish to explore Latin America. Can help with English writing and conversation!",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    nativeLanguage: "english",
    learningLanguage: "spanish",
    location: "Chicago, USA",
    isOnboarded: true,
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "123456",
    bio: "Art student fascinated by Italian Renaissance. Hoping to study in Florence next year!",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    nativeLanguage: "english",
    learningLanguage: "italian",
    location: "Boston, USA",
    isOnboarded: true,
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "123456",
    bio: "Business student learning Mandarin for career opportunities in Asia. Love discussing culture and food!",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    nativeLanguage: "english",
    learningLanguage: "mandarin",
    location: "San Francisco, USA",
    isOnboarded: true,
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "123456",
    bio: "German literature enthusiast and coffee lover. Always excited to practice German and share English tips!",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    nativeLanguage: "english",
    learningLanguage: "german",
    location: "Seattle, USA",
    isOnboarded: true,
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "123456",
    bio: "K-pop fan learning Korean! I can help with English and love chatting about music and dramas.",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    nativeLanguage: "english",
    learningLanguage: "korean",
    location: "Miami, USA",
    isOnboarded: true,
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "123456",
    bio: "Psychology student learning Portuguese to work with Brazilian communities. Love discussing mental health and wellness.",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    nativeLanguage: "english",
    learningLanguage: "portuguese",
    location: "Houston, USA",
    isOnboarded: true,
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    bio: "Software engineer fascinated by Japanese technology and culture. Looking for conversation partners to improve my Japanese!",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    nativeLanguage: "english",
    learningLanguage: "japanese",
    location: "San Jose, USA",
    isOnboarded: true,
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    bio: "History teacher learning Spanish to better connect with my students. I love discussing world history and cultures!",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    nativeLanguage: "english",
    learningLanguage: "spanish",
    location: "Phoenix, USA",
    isOnboarded: true,
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
    bio: "Chef learning French to perfect my culinary skills. Passionate about French cuisine and cooking techniques!",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    nativeLanguage: "english",
    learningLanguage: "french",
    location: "Portland, USA",
    isOnboarded: true,
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
    bio: "Medical student learning Mandarin to serve Chinese-speaking patients. Can help with medical English vocabulary!",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    nativeLanguage: "english",
    learningLanguage: "mandarin",
    location: "Denver, USA",
    isOnboarded: true,
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    bio: "Football fan learning German to follow Bundesliga more closely. Love sports, beer, and German culture!",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    nativeLanguage: "english",
    learningLanguage: "german",
    location: "Dallas, USA",
    isOnboarded: true,
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
    bio: "Music producer exploring Brazilian music. Learning Portuguese to collaborate with Brazilian artists!",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    nativeLanguage: "english",
    learningLanguage: "portuguese",
    location: "Nashville, USA",
    isOnboarded: true,
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
    bio: "Native Spanish speaker learning English for business. I love helping others with Spanish while improving my English!",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    nativeLanguage: "spanish",
    learningLanguage: "english",
    location: "Madrid, Spain",
    isOnboarded: true,
  },

  // Additional diverse users
  {
    email: "yuki.tanaka@example.com",
    fullName: "Yuki Tanaka",
    password: "123456",
    bio: "Native Japanese speaker working in international business. Happy to help with Japanese in exchange for English practice!",
    profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
    nativeLanguage: "japanese",
    learningLanguage: "english",
    location: "Tokyo, Japan",
    isOnboarded: true,
  },
  {
    email: "marie.dubois@example.com",
    fullName: "Marie Dubois",
    password: "123456",
    bio: "French teacher living in Paris. I love sharing French culture and language with students from around the world!",
    profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
    nativeLanguage: "french",
    learningLanguage: "english",
    location: "Paris, France",
    isOnboarded: true,
  },
  {
    email: "luis.fernandez@example.com",
    fullName: "Luis Fernandez",
    password: "123456",
    bio: "Mexican engineer learning Korean due to my company's expansion in Seoul. Love Korean BBQ and want to learn the language!",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
    nativeLanguage: "spanish",
    learningLanguage: "korean",
    location: "Mexico City, Mexico",
    isOnboarded: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
  
    
    // Use create() to trigger pre-save hooks
    console.log("Seeding users...");
    for (const userData of seedUsers) {
      await User.create(userData);
      console.log(`Created user: ${userData.fullName}`);
    }
    
    console.log(`Database seeded successfully with ${seedUsers.length} users`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Call the function
seedDatabase();