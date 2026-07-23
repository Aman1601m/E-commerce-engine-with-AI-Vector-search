const buildProductQuery = (query) => {
  const {
    page = 1,
    limit = 10,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
    search,
    fields,
  } = query;

  const filter = {};

  // Category
  if (category) {
    filter.category = category;
  }

  // Brand
  if (brand) {
    filter.brand = brand;
  }

  // Price
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // Search
  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  // Sorting
  let sortOption = search
    ? { score: { $meta: "textScore" } }
    : { createdAt: -1 };

  if (sort) {
    const order = sort.startsWith("-") ? -1 : 1;

    sortOption = {
      [sort.replace("-", "")]: order,
    };
  }

  // Projection
  let projection = "";

  if (fields) {
    projection = fields.split(",").join(" ");
  }

  return {
    filter,
    sortOption,
    projection,
    page: Number(page),
    limit: Number(limit),
  };
};

export default buildProductQuery;