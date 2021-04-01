// módulo próprio

const moment = require('moment');
const fs = require('fs');
let database = fs.readFileSync('./database.json', 'utf-8');

databases = JSON.parse(database);

const petshop = {
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(database, null, 2);
        fs.writeFileSync('database.json', petsAtualizado, 'utf-8');
    },
    listarPets: () => {

        database.pets.forEach((pet) => {
    
            console.log(`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.Vacinado) ? 'vacinado': 'não vacinado'}`);
        
            pet.servicos.forEach((servico) => {
                console.log(`${servico.data} - ${servico.nome}`);
            })
        })
    },
    vacinarPet: (pet) => {
        if (pet.Vacinado === true) {
            console.log(`${pet.nome} está vacinado`)
        }
        else {
            pet.Vacinado = true;
            console.log(`${pet.nome} foi vacinado com sucesso`)
        }
        
    },
    vacinacaoPets: () => {
        console.log("Campanha de vacina 2021");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;
    
        database.pets = database.pets.map((pet) => {
            if (!pet.Vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }
    
            return pet;
        });
    
        // atualizarBanco();
        console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
    },
    adicionarPet: novoPet => {
        database.pets.push(novoPet);
        atualizarBanco();
        console.log(`${novoPet.nome} foi adicionado com sucesso!`);
    },
    darBanho: pet => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        console.log(`${pet.nome} está de banho tomado!`);
    },
    tosarPet: pet => {
        pet.servicos.push({
            'nome':'tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        console.log(`${pet.nome} está com cabelinho na régua :)`);
    },    
    apararUnhasPet: pet => {
        pet.servicos.push({
            'nome':'corte de unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        console.log(`${pet.nome} está de unhas aparadas!`);
    },    
    atenderCliente: (pet, servicos) => {
        console.log(`Olá, ${pet.nome}!`); 
        servicos(pet);
        console.log(`Tchau. Até mais!`)
    },    
    buscarPet: (nomePet) => {
    
        let petEncontrado = database.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },
    filtrarTipoPet: (tipoPet) => {
        // && E - AND
        // || OU - OR
        // == verifica valores iguais
        // === verifica valores e tipos iguais
        let petsEncontrados = database.pets.filter((pet) => {
            return pet.tipo == tipoPet;
        });
    
        return petsEncontrados;
    },    
    clientePremium: (pet) => {
        let nServicos = pet.servicos.length;
    
        if (nServicos > 5) {
            console.log(`Olá, ${pet.nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${pet.nome}! Você ainda não tem descontos disponiveis!`);
        }
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}
        Contato: ${contato}
        Pet: ${nome}`;
    },    
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    }

}

module.exports = petshop;