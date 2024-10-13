import Person from "./Person";

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.name)}
        ></Person>
      ))}
    </>
  );
};

export default Persons;
