import create from "./repositories/invoice/create";

async function run() {
  const actual = await create({
    userId: 'c85cd251-e126-421c-b288-32a7cd2a4c01',
    bookId: ['518028f7-9ab5-437d-b4a4-1db640c69eda'],
    amount: 18.9,
    userData: {
      name: "Jakub",
      surname: "Ulicny",
      email: "jakub0806@gmail.com",
      phoneNumber: "+421915039206"
    },
    address: {
      street: "Ruska 4",
      city: "Krompachy",
      zipcode: "60111",
      country: "Cesko"
    }
  })
  console.log(actual);
}

run();