exports.getPlaceholderStringForArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Invalid input");
  }

  // if is array, we'll clone the arr
  // and fill the new array with placeholders
  const placeholders = [...arr];
  return placeholders.fill("?").join(", ").trim();
};

exports.multipleColumnSet = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key} = ?`).join(", ");

  return {
    columnSet,
    values,
  };
};

const getKeyByValue = (obj, value) =>
  Object.keys(obj).find(key => obj[key] === value);

const idIDField = (obj, value) => {
  const key = getKeyByValue(obj, value);
  return key && key == "supplier_id" || key == "project_id" || key == "po_id" || key == "id"
}

exports.searchLikeColumnSet = (object) => {
  if (typeof object !== "object") {
    throw new Error(" searchLikeColumnSet Invalid input");
  }

  const keys = Object.keys(object);

  columnSet = keys
    .map((key) => ((key == "id" || key == "supplier_id") ? `${key} in (?)` : `${key} like ?`))
    .join(" AND ");
  values = Object.values(object).map((value) =>
    (Array.isArray(value) || idIDField(object, value)) ? `${value}` : `%${value}%`
  );
  console.log(values);

  return {
    columnSet,
    values,
  };
};

exports.autoCompleteSearchColumnSet = (object) => {
  if (typeof object !== "object") {
    throw new Error("autoCompelteSearchColumnSet Invalid input");
  }

  const keys = Object.keys(object);

  columnSet = keys
    .filter((query) => query != "q")
    .map((key) => `${key} like ?`)
    .join(" OR ");
  return {
    columnSet,
  };
};
