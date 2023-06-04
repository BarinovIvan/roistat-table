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
    let itemData = {...item};

    delete itemData.children;

    result.push(itemData);

    if (item.children && item.children.length > 0) {
      let childrenData = unwrapArray(item.children);

      result = result.concat(childrenData);
    }
  }

  return result;
}
