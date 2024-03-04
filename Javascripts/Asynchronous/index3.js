function getUsers() {
    return new Promise((resolve) => {
      // simulate network delay
      setTimeout(() => {
        const users = ['John', 'Jack', 'Abigail'];
        resolve(users);
      }, 3000);
    });
  }
  
  async function getUsersAsync() {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  async function usersCallback() {
    try {
      const users = await getUsersAsync();
      console.log(users);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  usersCallback();
  