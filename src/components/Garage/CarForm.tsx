import { useAppDispatch } from "../../store/hooks";
import {
  setCreateName,
  setCreateColor,
  setEditName,
  setEditColor,
  clearEdit,
} from "../../store/garageSlice";
import { useCarForm } from "./useCarForm";
import "./CarForm.css";

interface FormInputProps {
  id: string;
  value: string;
  placeholder?: string;
  disabled: boolean;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

function FormInput({
  id,
  value,
  placeholder,
  disabled,
  onChange,
  onKeyDown,
}: FormInputProps) {
  return (
    <input
      className="input car-form-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={disabled}
      id={id}
    />
  );
}

interface ColorPickerProps {
  id: string;
  value: string;
  disabled: boolean;
  onChange: (val: string) => void;
}

function ColorPicker({ id, value, disabled, onChange }: ColorPickerProps) {
  return (
    <input
      className="color-picker"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      id={id}
    />
  );
}

interface CreateCarRowProps {
  form: ReturnType<typeof useCarForm>;
  onNameChange: (val: string) => void;
  onColorChange: (val: string) => void;
}

function CreateCarRow({
  form,
  onNameChange,
  onColorChange,
}: CreateCarRowProps) {
  return (
    <div className="car-form-row">
      <span className="car-form-label">Create</span>
      <FormInput
        id="create-car-name"
        value={form.form.createName}
        placeholder="Type car name..."
        disabled={false}
        onChange={onNameChange}
        onKeyDown={(e) => e.key === "Enter" && form.handleCreate()}
      />
      <ColorPicker
        id="create-car-color"
        value={form.form.createColor}
        disabled={false}
        onChange={onColorChange}
      />
      <button
        type="button"
        className="btn btn-green"
        onClick={form.handleCreate}
        disabled={false}
        id="create-car-btn"
      >
        CREATE
      </button>
      {form.createError && (
        <span className="car-form-error">{form.createError}</span>
      )}
    </div>
  );
}

interface CancelButtonProps {
  editId: number | null;
  onClear: () => void;
}

function CancelButton({ editId, onClear }: CancelButtonProps) {
  if (editId === null) return null;
  return (
    <button type="button" className="btn btn-danger btn-sm" onClick={onClear}>
      ✕
    </button>
  );
}

interface UpdateCarRowProps {
  form: ReturnType<typeof useCarForm>;
  onNameChange: (val: string) => void;
  onColorChange: (val: string) => void;
  onClear: () => void;
}

function UpdateCarRow({
  form,
  onNameChange,
  onColorChange,
  onClear,
}: UpdateCarRowProps) {
  const disabled = form.form.editId === null;
  return (
    <div className="car-form-row">
      <span className="car-form-label">Update</span>
      <FormInput
        id="update-car-name"
        value={form.form.editName}
        placeholder={
          form.form.editId ? "Edit car name..." : "Select a car to edit"
        }
        disabled={disabled}
        onChange={onNameChange}
        onKeyDown={(e) => e.key === "Enter" && form.handleUpdate()}
      />
      <ColorPicker
        id="update-car-color"
        value={form.form.editColor}
        disabled={disabled}
        onChange={onColorChange}
      />
      <button
        type="button"
        className="btn btn-magenta"
        onClick={form.handleUpdate}
        disabled={disabled}
        id="update-car-btn"
      >
        UPDATE
      </button>
      <CancelButton editId={form.form.editId} onClear={onClear} />
      {form.editError && (
        <span className="car-form-error">{form.editError}</span>
      )}
    </div>
  );
}

function CarForm() {
  const dispatch = useAppDispatch();
  const form = useCarForm();

  return (
    <div className="car-form-section">
      <CreateCarRow
        form={form}
        onNameChange={(val) => {
          dispatch(setCreateName(val));
          form.setCreateError(null);
        }}
        onColorChange={(val) => dispatch(setCreateColor(val))}
      />
      <UpdateCarRow
        form={form}
        onNameChange={(val) => {
          dispatch(setEditName(val));
          form.setEditError(null);
        }}
        onColorChange={(val) => dispatch(setEditColor(val))}
        onClear={() => dispatch(clearEdit())}
      />
    </div>
  );
}

export default CarForm;
