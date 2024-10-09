import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleClickNext = () => {
    let nextSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextSelected);
  };

  const handleClickVote = () => {
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const getMostVotedIndex = () => {
    let votesCopy = [...votes];
    let mostVotedIndex = 0;
    let mostVotes = 0;
    votesCopy.forEach((vote, index) => {
      if (vote > mostVotes) {
        mostVotedIndex = index;
        mostVotes = vote;
      }
    });
    return mostVotedIndex;
  };

  return (
    <div>
      <Heading text="Anecdote of the day"></Heading>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={handleClickVote}></Button>
      <Button text="next anecdote" onClick={handleClickNext}></Button>
      <Heading text="Anecdote with most votes"></Heading>
      <p>{anecdotes[getMostVotedIndex()]}</p>
      <p>has {votes[getMostVotedIndex()]} votes</p>
    </div>
  );
};

export default App;
