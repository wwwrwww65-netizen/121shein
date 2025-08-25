import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'password123', // In a real app, this should be hashed
      role: UserRole.ADMIN,
    },
  });

  console.log(`Created user with id: ${user.id}`);

  // Create categories
  const category1 = await prisma.category.create({
    data: { name: 'ملابس نسائية' }, // Women's Clothing
  });
  const category2 = await prisma.category.create({
    data: { name: 'ملابس رجالية' }, // Men's Clothing
  });
  const category3 = await prisma.category.create({
    data: { name: 'أطفال' }, // Kids
  });

  console.log('Created categories...');

  // Create products
  await prisma.product.create({
    data: {
      name: 'فستان صيفي أنيق', // Elegant Summer Dress
      description: 'فستان خفيف ومريح، مثالي لأيام الصيف الحارة.', // Light and comfortable dress, perfect for hot summer days.
      price: 120.5,
      images: ['/images/dress1.jpg', '/images/dress2.jpg'],
      categories: {
        connect: [{ id: category1.id }],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'قميص رجالي كاجوال', // Casual Men's Shirt
      description: 'قميص قطني عالي الجودة، بتصميم عصري.', // High-quality cotton shirt with a modern design.
      price: 79.99,
      images: ['/images/shirt1.jpg'],
      categories: {
        connect: [{ id: category2.id }],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'طقم ملابس أطفال', // Kids' Clothing Set
      description: 'طقم لطيف ومريح للأطفال الصغار.', // Cute and comfortable set for young children.
      price: 55.0,
      images: ['/images/kids1.jpg'],
      categories: {
        connect: [{ id: category3.id }],
      },
    },
  });

  console.log('Created products...');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
