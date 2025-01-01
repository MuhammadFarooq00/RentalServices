export const rentals = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    price: 100 + (i % 300),
    image: `https://picsum.photos/200/300?random=${i + 1}`,
    description: `This is a rental property with amenities for your stay.`,
    rating: (3 + (i % 2)).toFixed(1),
    location: `Location ${i % 10}`,
}));
