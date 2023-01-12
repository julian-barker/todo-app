
const Show = ({condition, ifTrue, ifFalse}) => {
  return condition ? ifTrue : ifFalse || null;
};

export default Show;
