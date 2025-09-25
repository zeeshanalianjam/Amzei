// src/data/tours.js
export const tours = [
  {
    id: 1,
    title: "03 Days Dubai City & Desert Safari",
    rating: 4.8,
    price: 2500,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Experience the best of Dubai with city tours and an exciting desert safari.",
    duration: "3 days",
    location: "Dubai",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Dhow Cruise"]
  },
  {
    id: 2,
    title: "05 Days Dubai & Abu Dhabi Explorer",
    rating: 4.9,
    price: 4200,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Explore the iconic landmarks of both Dubai and Abu Dhabi in this comprehensive tour.",
    duration: "5 days",
    location: "Dubai & Abu Dhabi",
    highlights: ["Burj Khalifa", "Sheikh Zayed Mosque", "Louvre Museum", "Ferrari World"]
  },
  {
    id: 3,
    title: "07 Days UAE Grand Tour",
    rating: 4.7,
    price: 6800,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Discover the wonders of all seven emirates in this ultimate UAE experience.",
    duration: "7 days",
    location: "All Emirates",
    highlights: ["All Seven Emirates", "Mountain Safari", "Cultural Sites", "Beach Resorts"]
  },
  {
    id: 4,
    title: "04 Days Dubai Marina & Palm Jumeirah",
    rating: 4.6,
    price: 3500,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Luxury experience focusing on Dubai's modern marvels and coastal attractions.",
    duration: "4 days",
    location: "Dubai",
    highlights: ["Palm Jumeirah", "Dubai Marina", "Atlantis Hotel", "Skydiving"]
  },
  {
    id: 5,
    title: "06 Days Northern Emirates Adventure",
    rating: 4.8,
    price: 5200,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Explore the rugged mountains and cultural heritage of the northern emirates.",
    duration: "6 days",
    location: "Northern Emirates",
    highlights: ["Hatta Mountain", "Fujairah Fort", "Ras Al Khaimah", "Umm Al Quwain"]
  },
  {
    id: 6,
    title: "10 Days Ultimate UAE Experience",
    rating: 4.9,
    price: 9500,
      image: "https://media.easemytrip.com/media/Blog/International/637903044803370839/637903044803370839PvwZOT.jpg",
    description: "The most comprehensive tour covering all major attractions and hidden gems.",
    duration: "10 days",
    location: "All Emirates",
    highlights: ["Desert Safari", "City Tours", "Beach Resorts", "Cultural Experiences"]
  }
];

export const getTourById = (id) => {
  return tours.find(tour => tour.id === parseInt(id));
};