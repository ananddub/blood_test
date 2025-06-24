import {
    PrismaClient,
    Role,
    TestStatus,
    PaymentStatus,
} from 'libs/common/src/index';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // 3 delivery agents
    const deliveryAgents = await Promise.all(
        Array.from({ length: 3 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    phone: faker.phone.number({ style: 'national' }),
                    password: faker.internet.password(),
                    role: Role.DELIVERY_AGENT,
                },
            }),
        ),
    );

    // 3 labs with admins
    const labs = await Promise.all(
        Array.from({ length: 3 }).map(() => {
            const adminData = {
                name: faker.person.fullName(),
                phone: faker.phone.number({ style: 'national' }),
                password: faker.internet.password(),
                role: Role.LAB_ADMIN,
            };

            return prisma.lab.create({
                data: {
                    name: faker.company.name(),
                    address: faker.location.streetAddress(),
                    coordinates: {
                        lat: faker.location.latitude(),
                        lng: faker.location.longitude(),
                    },
                    licenseNumber: faker.string.uuid(),
                    testTypes: ['Blood', 'Sugar', 'Thyroid'],
                    certifications: ['ISO', 'NABL'],
                    admin: {
                        create: adminData,
                    },
                },
            });
        }),
    );

    // 20 patients
    for (let i = 0; i < 20; i++) {
        const patient = await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number({ style: 'national' }),
                password: faker.internet.password(),
                role: Role.PATIENT,
                address: faker.location.streetAddress(),
                coordinates: {
                    lat: faker.location.latitude(),
                    lng: faker.location.longitude(),
                },
                loyaltyPoints: faker.number.int({ min: 0, max: 100 }),
            },
        });

        // 1-2 blood tests per patient
        const numTests = faker.number.int({ min: 1, max: 2 });
        for (let j = 0; j < numTests; j++) {
            const selectedLab = faker.helpers.arrayElement(labs);
            const selectedAgent = faker.helpers.arrayElement(deliveryAgents);

            const test = await prisma.bloodTest.create({
                data: {
                    patientId: patient.id,
                    labId: selectedLab.id,
                    deliveryAgentId: selectedAgent.id,
                    testType: faker.helpers.arrayElement([
                        'Blood',
                        'Thyroid',
                        'Glucose',
                    ]),
                    packageName: faker.commerce.productName(),
                    status: faker.helpers.arrayElement(
                        Object.values(TestStatus),
                    ),
                    bookingDate: faker.date.past(),
                    collectionDate: faker.date.recent(),
                    collectionAddress: faker.location.streetAddress(),
                    collectionCoordinates: {
                        lat: faker.location.latitude(),
                        lng: faker.location.longitude(),
                    },
                    deliveryDate: faker.date.future(),
                    processedDate: faker.date.future(),
                },
            });

            await prisma.report.create({
                data: {
                    bloodTestId: test.id,
                    s3Url: faker.internet.url(),
                    remarks: faker.lorem.sentence(),
                    results: {
                        hemoglobin: faker.number.float({
                            min: 11.5,
                            max: 16.5,
                        }),
                        sugar: faker.number.float({ min: 70, max: 120 }),
                    },
                },
            });

            await prisma.payment.create({
                data: {
                    userId: patient.id,
                    testId: test.id,
                    amount: faker.number.float({ min: 199, max: 999 }),
                    razorpayOrderId: faker.string.uuid(),
                    razorpayPaymentId: faker.string.uuid(),
                    status: faker.helpers.arrayElement(
                        Object.values(PaymentStatus),
                    ),
                },
            });
        }
    }

    console.log('✅ Seeded 20 patients with full data');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });
