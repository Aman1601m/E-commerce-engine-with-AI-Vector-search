isDeleted: {
  type: Boolean,
  default: false,
},

discount: {
  type: Number,
  default: 0,
},

sku: {
  type: String,
  unique: true,
},

tags: [
  {
    type: String,
  },
],