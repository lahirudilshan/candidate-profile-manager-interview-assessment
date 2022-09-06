
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const main = async () => {
    const companies = [
        {
            id: 1,
            name: 'Orel IT',
            logo: '/static/images/company-logo/orel-it.jpeg'
        },
        {
            id: 2,
            name: 'Noon',
            logo: '/static/images/company-logo/noon.png'
        },
        {
            id: 3,
            name: 'Glints',
            logo: '/static/images/company-logo/glints.png'
        }
    ];

    companies.map(async (company) => {
        await prisma.company.create({
            data: {
                name: company.name,
                logo: company.logo
            }
        });
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });