const initialState = {
  cards: [],
};

export default function (state = initialState, action) {
  let returnValue = state;

  switch (action.type) {
    case 'GET_CARDS':
      returnValue = {
        cards: action.cards,
      };

      break;

    default:
      break;
  }

  return returnValue;
}
