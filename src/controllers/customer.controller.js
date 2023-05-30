import axios from "axios";

const baseUrl = "http://localhost:8001/api/customers";

// ============================================== GET ============================================== //

/**
 * Load all data into table
 * @param {Request} req
 * @param {Response} res
 */
async function getAll(req, res) {
  const customers = await axios.get(baseUrl).then((res) => res.data);

  res.render("customers/index", { customers });
}

/**
 * Get data by id
 * @param {URL} baseUrl
 * @param {Number} sId
 * @returns {Object, Boolean}
 */
async function getById(baseUrl, sId) {
  const customer = await axios.get(baseUrl + "/" + sId).then((res) => res.data);

  let isMale = false;
  if (customer.gender === "Male") isMale = true;

  return { customer, isMale };
}

/**
 * Create page
 * @param {Request} req
 * @param {Response} res
 */
function createView(req, res) {
  res.render("customers/create");
}

/**
 * Update page
 * @param {Request} req
 * @param {Response} res
 */
async function viewUpdateById(req, res) {
  const { customer, isMale } = await getById(baseUrl, req.params.id);

  res.render("customers/update", { customer, isMale });
}

/**
 * Delete page
 * @param {Request} req
 * @param {Response} res
 */
async function viewDeleteById(req, res) {
  const { customer, isMale } = await getById(baseUrl, req.params.id);

  res.render("customers/delete", { customer, isMale });
}

// ============================================== POST ============================================== //
/**
 * Create new customer
 * @param {Request} req
 * @param {Response} res
 */
async function create(req, res) {
  const { fullName, birthday, gender, phoneNumber, email } = req.body;

  await axios.post(
    baseUrl,
    {
      fullName,
      birthday,
      gender,
      phoneNumber,
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.redirect("/customers");
}

/**
 * Update a customer by id
 * @param {Request} req
 * @param {Response} res
 */
async function update(req, res, next) {
  const { fullName, birthday, gender, phoneNumber, email } = req.body;

  await axios
    .put(
      baseUrl + "/" + req.params.id,
      { fullName, birthday, gender, phoneNumber, email },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => console.log("status", response.status))
    .catch(next);

  res.redirect("/customers");
}

/**
 * Delete a customer by id
 * @param {Request} req
 * @param {Response} res
 */
async function remove(req, res, next) {
  await axios
    .delete(baseUrl + "/" + req.params.id)
    .then((response) => console.log("status", response.status))
    .catch(next);

  res.redirect("/customers");
}

export {
  getAll,
  createView,
  viewUpdateById,
  viewDeleteById,
  create,
  update,
  remove,
};
