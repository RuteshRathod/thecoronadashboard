import fetch from "node-fetch";

export default async (req, res) => {
  let totalGlobalCases = { confirmed: 0, deaths: 0, recovered: 0, dailySummary:0 };

  if (req.method === "GET") {
    await fetch("https://covid19.mathdro.id/api/confirmed")
      .then(response => {
        return response.json();
      })
      .then(result => {
        result.forEach(item => {
          totalGlobalCases = {
            confirmed: totalGlobalCases.confirmed + item.confirmed,
            deaths: totalGlobalCases.deaths + item.deaths,
            recovered: totalGlobalCases.recovered + item.recovered,
            dailySummary:totalGlobalCases.dailySummary+item.dailySummary
          };
        });
      });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(totalGlobalCases));
  }
};
