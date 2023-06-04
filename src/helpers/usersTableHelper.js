export const findUserById = (id, users) => {
  for (let user of users) {
    if (user.id === id) return user;

    if (user.children.length > 0) {
      const foundUser = findUserById(id, user.children);

      if (foundUser) {
        return foundUser;
      }
    }
  }
  return null;
}

export const generateId = () => {
  return new Date().getTime();
}

export const unwrapArray = (array) => {
  let result = [];

  for (let item of array) {
    let itemData = removeChildrenFromObject(item);

    result.push(itemData);

    if (item.children && item.children.length > 0) {
      let childrenData = unwrapArray(item.children);

      result = result.concat(childrenData);
    }
  }

  return result;
}

export const removeChildrenFromObject = (object) => {
  let result = {...object};

  delete result.children;

  return result;
}

export const sortObjects = (arr, sortingOption, sortingOrder) => {
  arr.sort((a, b) => {
    const optionA = a[sortingOption];
    const optionB = b[sortingOption];

    const strippedOptionA = optionA.startsWith('+') ? optionA.substring(1) : optionA;
    const strippedOptionB = optionB.startsWith('+') ? optionB.substring(1) : optionB;

    const comparisonValue = strippedOptionA.localeCompare(strippedOptionB);
    return comparisonValue * sortingOrder;
  });

  arr.forEach((obj) => {
    if(obj.children && obj.children.length) {
      sortObjects(obj.children, sortingOption, sortingOrder);
    }
  });
}

export const getDataFromLS = (propertyName) => {
  return JSON.parse(localStorage.getItem(propertyName));
}

export const saveDataToLS = (propertyName, value) => {
  localStorage.setItem(propertyName, value);
}

export const getUsersListPaddingMultiplier= () => {
  const MOBILE_PADDING_MULTIPLIER = 10;
  const DESKTOP_PADDING_MULTIPLIER = 20;

  return window.innerWidth > 768 ?
    DESKTOP_PADDING_MULTIPLIER :
    MOBILE_PADDING_MULTIPLIER;
}
