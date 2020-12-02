import axios from 'axios';

const API_BASE = 'https://covid-19-tracer-b6c49.firebaseio.com';

const request = axios.create({
  baseURL: API_BASE
});

function processCaseResponse(data) {
  let cases = [];
  if (data == null)
    data = new Map();
  for (const id in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(id)) {
      cases.push({
        id: id,
        case_id: data[id].ID,
        name: data[id].Name,
        age: data[id].Age,
        gender: data[id].Gender,
        description: data[id].Description,
        date: data[id].Date
      });
    }
  }
  return cases;
}

/**
 * Get all cases
 */
async function getAll() {
  let response = await request.get('/case.json');
  if (response.status !== 200) {
    console.error('Cannot get cases from server.', response);
    await Promise.reject('Cannot get cases from server! Status code: ' + response.code);
  }
  // parse response
  let data = response.data;
  return processCaseResponse(data);
}

/**
 * Add case to server
 * @param obj param
 */
async function create(obj) {
  // Auto increment
  let data = await getAll();
  let nextIdNum = Math.max(Math.max(...data.map((el) => parseInt(el.case_id))), 0) + 1;
  let nextId = ('000' + nextIdNum).slice(-3);
  // Make params
  let param = {
    ID: nextId,
    Name: obj.name,
    Age: obj.age,
    Gender: obj.gender,
    Description: obj.description,
    Date: obj.date
  };
  let response = await request.post('/case.json', param);
  if (response.status !== 200) {
    console.error('Cannot add cases to server.', response);
    await Promise.reject('Cannot add cases to server! Status code: ' + response.code);
  }
  // parse response
  return response.data;
}

/**
 * Delete case record by id
 * @param id case entry id, not case id
 */
async function deleteById(id) {
  let response = await request.delete(`/case/${id}.json`);
  if (response.status !== 200) {
    console.error('Cannot delete case from server.', response);
    await Promise.reject('Cannot delete case from server! Status code: ' + response.code);
  }
  // parse response
  return response.data;
}

/**
 * Modify case entry in server
 * @param obj case data
 */
async function modify(obj) {
  let param = {
    ID: obj.case_id,
    Name: obj.name,
    Age: obj.age,
    Gender: obj.gender,
    Description: obj.description,
    Date: obj.date
  };
  let id = obj.id;
  let response = await request.patch(`/case/${id}.json`, param);
  if (response.status !== 200) {
    console.error('Cannot modify case from server.', response);
    await Promise.reject('Cannot modify case from server! Status code: ' + response.code);
  }
  // parse response
  return response.data;
}

/**
 * find matched case by name from server
 * @param name
 */
async function searchByName(name) {
  let response = await request.get('/case.json', {
    params: {
      orderBy: '"Name"',
      equalTo: `"${name}"`
    }
  });
  if (response.status !== 200) {
    console.error('Cannot find cases from server.', response);
    await Promise.reject('Cannot find cases from server! Status code: ' + response.code);
  }
  // parse response
  let data = response.data;
  return processCaseResponse(data);
}

/**
 * find matched case by ID from server
 * @param id
 */
async function searchById(id) {
  let response = await request.get('/case.json', {
    params: {
      orderBy: '"ID"',
      equalTo: `"${id}"`
    }
  });
  if (response.status !== 200) {
    console.error('Cannot find cases from server.', response);
    await Promise.reject('Cannot find cases from server! Status code: ' + response.code);
  }
  // parse response
  let data = response.data;
  return processCaseResponse(data);
}


export { getAll, create, deleteById, modify, searchByName, searchById };
