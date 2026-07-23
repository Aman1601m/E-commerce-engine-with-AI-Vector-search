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
  } = query;

  const filter = {};

  // Category Filter
  if (category) {
    filter.category = category;
  }

  // Brand Filter
  if (brand) {
    filter.brand = brand;
  }

  // Price Filter
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // Text Search
  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  // Sorting
  let sortOption = {};

  if (search) {
    sortOption.score = {
      $meta: "textScore",
    };
  } else {
    sortOption.createdAt = -1;
  }

  if (sort) {
    const order = sort.startsWith("-") ? -1 : 1;

    const field = sort.replace("-", "");

    sortOption = {
      [field]: order,
    };
  }

  return {
    filter,
    sortOption,
    page: Number(page),
    limit: Number(limit),
  };
};

export default buildProductQuery;