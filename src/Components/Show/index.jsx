
const Show = ({children, condition, ifTrue, ifFalse}) => {
  return condition ? children || ifTrue : ifFalse || null;
};

export default Show;
