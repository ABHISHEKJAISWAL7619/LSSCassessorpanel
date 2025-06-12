import Input from "../atoms/Input";
import Select from "../atoms/Select";

const AddBatch = ({ onClose }) => {
  return (
    <div className="bg-white rounded-xl space-y-6 p-4">
      <h2 className="text-xl text-center">Add New batch</h2>
      <form className="px-6 space-y-6 text-secondary">
        <Select
          name={"batchname"}
          label={"Batch Name *"}
          options={["PMKVY Course", "PMKVY Course"]}
        />
        <div className="flex justify-between gap-5 ">
          <Input name={"startdate"} label={"Start Date *"} type={"date"} />
          <Input
            name={"batchstrength"}
            label={"Batch Strength *"}
            type={"text"}
            placeholder={"Enter State"}
          />
        </div>
        <div className="flex items-center justify-center gap-12">
          <button
            onClick={onClose}
            className="border-[#D1D5DB] rounded-md py-2 px-4 border"
          >
            Cancel
          </button>
          <button className="bg-primary text-white py-2 px-4 rounded-md">
            Create Batch
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBatch;
