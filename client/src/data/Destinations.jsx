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
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/8c/0c/1a/taken-5-years-ago-it.jpg?w=900&h=500&s=1",
    location: "Dubai",
    details: "With over 1,200 shops, Dubai Mall is one of the world's largest shopping centers. It also features an aquarium, an ice rink, cinema complex, and numerous dining options."
  },
  {
    id: 3,
    name: "Burj Al Arab",
    description: "Iconic luxury hotel",
      image: "https://www.mediaoffice.ae/-/media/2021/may/10-05/02/burj-al-arab-1.jpg",
    location: "Dubai",
    details: "Shaped like a sail, the Burj Al Arab is one of the world's most luxurious hotels. Standing on an artificial island, it offers unparalleled luxury and service to its guests."
  },
  {
    id: 4,
    name: "Palm Jumeirah",
    description: "Artificial archipelago",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/63/84/7c/an-artis-ts-impression.jpg?w=900&h=-1&s=1",
    location: "Dubai",
    details: "Palm Jumeirah is an artificial archipelago in the shape of a palm tree. It's home to luxury hotels, beach resorts, and upscale residences, offering stunning views of the Dubai skyline."
  },
  {
    id: 5,
    name: "Aquaventure Waterpark",
    description: "Thrilling waterpark",
      image: "https://assets.kerzner.com/api/public/content/ca19a689d92f402a8de6cab014ff320c?v=16c7e7b4&t=w2880",
    location: "Dubai",
    details: "Located at the Atlantis Hotel on Palm Jumeirah, Aquaventure Waterpark offers thrilling water slides, a private beach, and unique experiences like swimming with dolphins."
  },
  {
    id: 6,
    name: "Sheikh Zayed Grand Mosque",
    description: "Magnificent mosque in Abu Dhabi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYr7SLq-_YcAp7zZGGnUPfPSfDRwyErrrviA&s",
    location: "Abu Dhabi",
    details: "One of the world's largest mosques, the Sheikh Zayed Grand Mosque features stunning architecture, intricate Islamic designs, and can accommodate over 40,000 worshippers."
  }
];

export const getDestinationById = (id) => {
  return destinations.find(destination => destination.id === parseInt(id));
};