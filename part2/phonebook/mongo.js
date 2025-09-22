import mongoose from "mongoose";

// Ignorar el error si se ejecuta con node
if (process.argv.length < 3) {
  console.log("Provide password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://brunodm99:${password}@notes.glpn4de.mongodb.net/phonebook?retryWrites=true&w=majority&appName=notes`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  console.log("Phonebook:");
  Contact.find({}).then((result) => {
    result.forEach((contact) =>
      console.log(`${contact.name} ${contact.number}`)
    );

    mongoose.connection.close();
  });
} else if (process.argv.length >= 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const contact = new Contact({
    name: name,
    number: number,
  });

  contact.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}
