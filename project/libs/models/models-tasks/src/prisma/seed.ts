import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Программирование',
      tasks: {
        create: [
          {
            title: 'Сверстать лендинг',
            description: 'Сверстать лендинг для продажи автомасел',
            userId: '13',
            price: 1000,
            city: 'Moscow',
            status: 'New',
            response: {
              create: {
                message: 'Выполнено отлично!',
                userId: '13',
                estimation: 5
              }
            },
            tags: ['WebDev'],
            comments: {
              create: [
                {
                  message: 'Уточните, пожалуйста, срок исполнения',
                  userId: '22'
                }
              ]
            }
          },
        ]
      },
    }
  });
  await prisma.category.upsert({
    where: { categoryId: 2 },
    update: {},
    create: {
      title: 'Ремонт',
      tasks: {
        create: [
          {
            title: 'Починить телефон',
            description: 'Что-то случилось с экраном телефона',
            userId: '14',
            city: 'Vladivostok',
            status: 'New',
            response: {
              create: {
                message: 'Очень быстро починили телефон',
                userId: '14',
                estimation: 5
              }
            },
            tags: ['Technics'],
            comments: {
              create: [
                {
                  message: 'Уточните адрес',
                  userId: '24'
                },
                {
                  message: 'Уточните марку телефона',
                  userId: '100'
                }
              ]
            },
          },
        ]
      }
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
