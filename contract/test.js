const axios = require('axios');

async function getProjects() {
  return axios.request({
    method: "GET",
    baseURL: 'http://127.0.0.1:8991',
    url: "/projects",
    headers: { Accept: "application/json" },
  })
}

const EXPECTED_BODY = [
  {
    id: 1,
    name: "Project 1",
    due: "2016-02-11T09:46:56.023Z",
    tasks: [
      { id: 1, name: "Do the laundry", done: true },
      { id: 2, name: "Do the dishes", done: false },
      { id: 3, name: "Do the backyard", done: false },
      { id: 4, name: "Do nothing", done: false },
    ],
  },
];


describe("and there is a valid user session", () => {
  beforeEach(() =>
    provider.addInteraction({
      // The 'state' field specifies a "Provider State"
      state: "i have a list of projects",
      uponReceiving: "a request for projects",
      withRequest: {
        method: "GET",
        path: "/projects",
        headers: { Accept: "application/json" },
      },
      willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY,
      },
    })
  )

  it("generates a list of TODOs for the main screen", () => {
    return getProjects().then(resp => {
      const { data } = resp;
      expect(data).toBeInstanceOf(Array)
      expect(data).toHaveProperty([0, 'tasks', 0, 'id'], 1)
    }).then(() => provider.verify());
  })
})

