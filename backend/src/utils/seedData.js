import { Membership } from "../models/index.js";

const membershipData = [
  // Individual Packages
  {
    name: "Daily",
    description: "Single day access",
    category: "individual",
    price: 700,
    duration_months: 0,
    validity_days: 1,
    features: [
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Basic trainer guidance"
    ],
    is_highlighted: true,
  },
  {
    name: "1 Month",
    description: "One month individual membership",
    category: "individual",
    price: 4000,
    duration_months: 1,
    features: [
      "Full gym access",
      "2 Free Guest Coupons",
      "Clean shower & dressing room",
      "Secure parking",
      "Basic trainer guidance"
    ],
    is_highlighted: true,
  },
  {
    name: "3 Month",
    description: "Three months individual membership",
    category: "individual",
    price: 10680,
    duration_months: 3,
    features: [
      "Full gym access",
      "5 Free Guest Coupons",
      "Clean shower & dressing room",
      "Secure parking",
      "Basic trainer guidance"
    ],
    is_highlighted: false,
  },
  {
    name: "6 Month",
    description: "Six months individual membership",
    category: "individual",
    price: 20400,
    duration_months: 6,
    features: [
      "15 free pass days included",
      "10 Free Guest Coupons",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Basic trainer guidance"
    ],
    is_highlighted: false,
  },
  {
    name: "12 Month",
    description: "Twelve months individual membership",
    category: "individual",
    price: 38880,
    duration_months: 12,
    features: [
      "30 free pass days included",
      "10 Free Guest Coupons",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Basic trainer guidance"
    ],
    is_highlighted: false,
  },

  // Group Packages
  {
    name: "3 Month",
    description: "Three months group membership",
    category: "group",
    price: 12000,
    duration_months: 3,
    features: [
      "Full gym access",
      "5 Free Guest Coupons",
      "Clean shower & dressing room",
      "Secure parking",
      "Group training sessions",
      "Community events"
    ],
    is_highlighted: false,
  },
  {
    name: "6 Month",
    description: "Six months group membership",
    category: "group",
    price: 21360,
    duration_months: 6,
    features: [
      "10 Free Guest Coupons",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Group training sessions",
      "Community events",
      "Fitness challenges"
    ],
    is_highlighted: false,
  },
  {
    name: "12 Month",
    description: "Twelve months group membership",
    category: "group",
    price: 40800,
    duration_months: 12,
    features: [
      "20 Free Guest Coupons",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Group training sessions",
      "Community events",
      "Fitness challenges",
      "Nutrition guidance"
    ],
    is_highlighted: false,
  },

  // Family Packages
  {
    name: "3 Month",
    description: "Three months family membership",
    category: "family",
    price: 10300,
    duration_months: 3,
    features: [
      "5 Free Guest Coupons",
      "Full gym access",
      "Secure parking",
      "Basic trainer guidance",
      "Family activities"
    ],
    is_highlighted: false,
  },

  // Personalized Packages
  {
    name: "3 Month",
    description: "Three months personalized membership",
    category: "personalized",
    price: 18690,
    duration_months: 3,
    features: [
      "Personalized training program",
      "5 Free Guest Coupons",
      "One-on-one coaching",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking",
      "Flexible class timing"
    ],
    is_highlighted: false,
  },
  {
    name: "6 Month",
    description: "Six months personalized membership",
    category: "personalized",
    price: 35700,
    duration_months: 6,
    features: [
      "15 free pass days included",
      "10 Free Guest Coupons",
      "Flexible class timing",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking"
    ],
    is_highlighted: false,
  },
  {
    name: "12 Month",
    description: "Twelve months personalized membership",
    category: "personalized",
    price: 68040,
    duration_months: 12,
    features: [
      "0 free pass days included",
      "20 Free Guest Coupons",
      "Flexible class timing",
      "Full gym access",
      "Clean shower & dressing room",
      "Secure parking"
    ],
    is_highlighted: false,
  },
];

export const seedMemberships = async () => {
  try {
    // Clear existing memberships and restart identities to ensure deterministic ids
    await Membership.destroy({ where: {}, truncate: true, restartIdentity: true });

    // We will seed exactly 12 membership records and assign ids 1..12.
    const toSeed = membershipData.slice(0, 12).map((m, idx) => ({
      id: idx + 1,
      name: m.name || m.title || `Membership ${idx + 1}`,
      description: m.description || m.title || '',
      category: m.category || 'individual',
      duration_months: m.duration_months || m.duration || 1,
      price: m.price || 0,
      features: m.features || [],
      is_highlighted: m.is_highlighted || false,
      is_active: true,
    }));

    await Membership.bulkCreate(toSeed, { ignoreDuplicates: true });
    console.log("Membership table reset and seeded with 12 pricing entries (ids 1..12)");
  } catch (error) {
    console.error("Error seeding membership data:", error);
  }
};

export default membershipData;
