import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {id, newStatus} = req.body;
        try {
            await prisma.depositRequest.update({
                where: {id},
                data: {status: newStatus},
            });
            res.status(200).json({ message: 'Update Successfull'})
        } catch (error) {
            res.status(500).json({ error: 'Failed to Update'});
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};