import categoryRepository from "../repositories/categoryRepository.js";
import { categoryNotFoundError } from "../utils/errorUtils.js";

async function getByIdOrFail(id: number) {
  const category = await categoryRepository.getById(id);
  if (!category) {
    throw categoryNotFoundError();
  }

  return category;
}

async function getAll() {
  const categories = await categoryRepository.getAll();
  return categories;
}

export default { getByIdOrFail, getAll };
