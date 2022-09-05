const { generateOptions } = require("../utils");
const https = require("https");

const getUser = async (req, res) => {
  const options = generateOptions("/users/dersibcha");

  https
    .get(options, (apiResponse) => {
      apiResponse.pipe(res);
    })
    .on("error", (e) => {
      console.log(e);
      res.status(500).send(constants.error_message);
    });
};

const getRepo = async (req, res) => {
  const reponame = req.params.reponame;
  const options = generateOptions("/repos/dersibcha/" + reponame);

  https
    .get(options, (apiResponse) => {
      apiResponse.pipe(res);
    })
    .on("error", (e) => {
      console.log(e);
      res.status(500).send(constants.error_message);
    });
};

const getRepos = async (req, res) => {
  const options = generateOptions("/users/dersibcha/repos");

  https
    .get(options, (apiResponse) => {
      apiResponse.pipe(res);
    })
    .on("error", (e) => {
      console.log(e);
      res.status(500).send(constants.error_message);
    });
};

module.exports = { getUser, getRepo, getRepos };
