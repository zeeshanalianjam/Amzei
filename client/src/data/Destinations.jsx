// src/data/destinations.js
export const destinations = [
  {
    id: 1,
    name: "Burj Khalifa",
    description: "World's tallest building",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Dubai",
    details: "Standing at 828 meters tall, the Burj Khalifa is the world's tallest building and an iconic symbol of modern Dubai. Visitors can enjoy breathtaking views from the observation decks on the 124th and 148th floors."
  },
  {
    id: 2,
    name: "Dubai Mall",
    description: "World's largest shopping destination",
    image: "",
    location: "Dubai",
    details: "With over 1,200 shops, Dubai Mall is one of the world's largest shopping centers. It also features an aquarium, an ice rink, cinema complex, and numerous dining options."
  },
  {
    id: 3,
    name: "Burj Al Arab",
    description: "Iconic luxury hotel",
    image: "",
    location: "Dubai",
    details: "Shaped like a sail, the Burj Al Arab is one of the world's most luxurious hotels. Standing on an artificial island, it offers unparalleled luxury and service to its guests."
  },
  {
    id: 4,
    name: "Palm Jumeirah",
    description: "Artificial archipelago",
    image: "",
    location: "Dubai",
    details: "Palm Jumeirah is an artificial archipelago in the shape of a palm tree. It's home to luxury hotels, beach resorts, and upscale residences, offering stunning views of the Dubai skyline."
  },
  {
    id: 5,
    name: "Aquaventure Waterpark",
    description: "Thrilling waterpark",
    image: "",
    location: "Dubai",
    details: "Located at the Atlantis Hotel on Palm Jumeirah, Aquaventure Waterpark offers thrilling water slides, a private beach, and unique experiences like swimming with dolphins."
  },
  {
    id: 6,
    name: "Sheikh Zayed Grand Mosque",
    description: "Magnificent mosque in Abu Dhabi",
    image: "",
    location: "Abu Dhabi",
    details: "One of the world's largest mosques, the Sheikh Zayed Grand Mosque features stunning architecture, intricate Islamic designs, and can accommodate over 40,000 worshippers."
  }
];

export const getDestinationById = (id) => {
  return destinations.find(destination => destination.id === parseInt(id));
};