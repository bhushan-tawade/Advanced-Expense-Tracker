import AddExpenseForm from "./AddExpenseForm";
import { ExpenseList } from "./ExpenseList";

export default function Dashboard({
  getLocalData,
  formData,
  setFormData,
  handleDelete,
}) {
  return (
    <div className="Home-Dashbord flex gap-5 justify-center items-center m-2 h-full">
      <AddExpenseForm formData={formData} setFormData={setFormData} />
      <ExpenseList formData={formData} handleDelete={handleDelete} />
    </div>
  );
}
