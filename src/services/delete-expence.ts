export const deleteExpense = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/expense/${id}`, { method: "DELETE" });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return true;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  