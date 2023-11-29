import { Prisma, PrismaClient } from '@prisma/client'
import { passwordHashed } from '../src/services/crypto';
const prisma = new PrismaClient()

async function createUsers() {
    await prisma.users.deleteMany();

    const users: Prisma.UsersCreateManyInput[] = [
        {
            username: "janedoe",
            nickname: "Jane Doe",
            email: "janedoe@email.com",
            description: "Olá, sou Jane Doe, futura empresaria e dona de empresa!",
            password: await passwordHashed("123456")
        },
        {
            username: "vinighiraldi",
            nickname: "Vinícius Correia Ghiraldi",
            email: "vinighiraldi@email.com",
            description: "Sou Vinícius Ghiraldi, o desenvolvedor desta rede social. Espero que divirtam-se!",
            password: await passwordHashed("123456")
        },
        {
            username: "lucassilva",
            nickname: "Lucas Silva",
            email: "lucassilva@email.com",
            description: "Meu nome é Lucas Silva, adoro viajar e conhecer lugares novos!",
            password: await passwordHashed("123456")
        },
        {
            username: "renatosantos",
            nickname: "Renato Santos",
            email: "renatosantos@email.com",
            description: "Muito prazer, sou jogador profissional de futebol.",
            password: await passwordHashed("123456")
        }
    ]

    await prisma.users.createMany({
        data: users
    });
}

/* async function createPosts() {
    const posts: Prisma.PostsCreateManyInput[] = [
        {
            title: "Hello, my name is Jane Doe, i'm from United States and i'm 22 years old.",
            userId: "janedoe"
        },
        {
            title: "Bom dia, sou o CEO & Desenvolvedor desta plataforma, que inicia sua trajetória aqui. O que vocês estão achando? Se tiverem sugestões e/ou criticas estou só de ouvidos!",
            userId: "vinighiraldi"
        },
        {
            title: "Estou adorando a experiência de utilizar a Simple Social!!",
            userId: "lucassilva"
        },
        {
            title: "Partiu jogo!! Vamos em busca de +3 pontos!",
            userId: "renatosantos"
        },
        {
            title: "Estou aprendendo português, está sendo difícil mas estou conseguindo!",
            userId: "janedoe"
        },
        {
            title: "Fala pessoal! Se tiverem bugs ou problemas para relatar podem enviar para o nosso email: simplesocial@email.com",
            userId: "vinighiraldi"
        },
        {
            title: "Comecei na faculdade de Harvard! Estou cursando Medicina.",
            userId: "lucassilva"
        },
        {
            title: "Bela partida pessoal, foi acirrada mas saimos com a vitória! Seguimos.",
            userId: "renatosantos"
        }
    ]

    await prisma.posts.createMany({
        data: posts
    });
} */

createUsers().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})