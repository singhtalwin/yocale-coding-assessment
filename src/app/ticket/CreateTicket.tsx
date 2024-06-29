export const CreateTicket = () => {
  return (
    <div>
      <form>
        <label htmlFor="number">Number</label>
        <input type="text" id="number" name="number" />
        <label htmlFor="status">Status</label>
        <input type="text" id="status" name="status" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
