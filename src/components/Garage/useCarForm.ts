import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createCarAction,
  updateCarAction,
  clearEdit,
} from "../../store/garageSlice";
import { validateCarName } from "../../utils/helpers";

export function useCarForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.garage);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const { isRaceActive } = useAppSelector((state) => state.race);
  const handleCreate = useCallback(() => {
    const err = validateCarName(form.createName);
    if (err) {
      setCreateError(err);
      return;
    }
    setCreateError(null);
    dispatch(
      createCarAction({
        name: form.createName.trim(),
        color: form.createColor,
      }),
    );
    dispatch({ type: "garage/setCreateName", payload: "" });
  }, [dispatch, form.createName, form.createColor]);

  const handleUpdate = useCallback(() => {
    if (form.editId === null) return;
    const err = validateCarName(form.editName);
    if (err) {
      setEditError(err);
      return;
    }
    setEditError(null);
    dispatch(
      updateCarAction({
        id: form.editId,
        name: form.editName.trim(),
        color: form.editColor,
      }),
    );
    dispatch(clearEdit());
  }, [dispatch, form.editId, form.editName, form.editColor]);

  return {
    isRaceActive,
    form,
    createError,
    editError,
    setCreateError,
    setEditError,
    handleCreate,
    handleUpdate,
  };
}
