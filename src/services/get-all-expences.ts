export const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/expenses");
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  };
  