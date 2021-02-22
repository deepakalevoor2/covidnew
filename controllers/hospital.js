const Hospital = require("../models/hospital");
const Patient = require("../models/patient");
const _ = require("lodash");

exports.getHospital = (req, res) => {
  console.log(req.params.hospcode);
  Hospital.findOne({ hospitalCode: req.params.hospcode }).exec(
    (err, hospital) => {
      if (err) {
        return res.status(400).json({ error: "hospital not found" });
      }
      res.json(hospital);
    }
  );
};

exports.getBeds = (req, res) => {
  console.log(req.query);
  let hospitalObj = new Hospital();

  Hospital.findOne({
    $or: [
      { hospitalCode: req.query.hospitalCode },
      { name: req.query.hospitalName },
    ],
  }).exec((err, hospital) => {
    if (err) {
      return res.status(400).json({ error: "hospital not found" });
    }
    //console.log(hospital);
    //res.json(hospital);
    hospitalObj = hospital;

    Patient.aggregate([
      { $match: { discharged: false, hospital: hospitalObj._id } },
      //{ $group: { _id: "$currentStatus", myCount: { $sum: 1 } } },
      { $group: { _id: "$currentStatus", ptCount: { $sum: 1 } } },
    ]).exec((err, patientCount) => {
      if (err) {
        return res.status(400).json({ error: "query not executable" });
      }
      console.log(hospitalObj);
      console.log(patientCount);
      const counts = [];
      const { hospitalCode, name, address, insurance, beds } = hospitalObj;
      // patienttCount.map((item) => {
      //   if (item._id === "Severe") {
      //     counts.push({ Severe: item.ptCount });
      //   } else if (item._id === "Moderate") {
      //     counts.push({ Moderate: item.ptCount });
      //   } else {
      //     counts.push({ Normal: item.ptCount });
      //   }
      // });
      const patientDetails = {};
      patientCount.map((item) => {
        patientDetails[item._id] = item.ptCount;
      });
      console.log("patient details", patientDetails);

      //console.log(counts);
      //const sortedCounts = _.fromPairs(_.sortBy(_.toPairs(counts), 0));
      //const sortedCounts = _.sortBy(patienttCount, (o) => o._id);
      // console.log(sortedCounts);
      //var [normal, moderate, severe] = counts;
      let { Mild, Severe, Moderate } = patientDetails;
      //console.log("Severe is ", Severe);
      //console.log(counts["Severe"]);
      // const mildCount = sortedCounts[0].ptCount;
      // const moderateCount = sortedCounts[1].ptCount;
      // const severeCount = sortedCounts[2].ptCount;
      if (!Mild) {
        Mild = 0;
      }
      if (!Moderate) {
        Moderate = 0;
      }
      if (!Severe) {
        Severe = 0;
      }
      const resp = {
        hospitalCode,
        name,
        address,
        insurance,
        beds,
        Mild,
        Severe,
        Moderate,
      };
      //console.log(normal1);
      // console.log(severe1);
      res.json(resp);
    });
  });
};

exports.getVents = (req, res) => {
  console.log(req.query);
  let hospitalObj = new Hospital();
  Hospital.findOne({
    $or: [
      { hospitalCode: req.query.hospitalCode },
      { name: req.query.hospitalName },
    ],
  }).exec((err, hospital) => {
    if (err) {
      return res.status(400).json({ error: "hospital not found" });
    }
    //res.json(hospital);
    hospitalObj = hospital;

    Patient.aggregate([
      {
        $match: {
          ventilator: true,
          discharged: false,
          hospital: hospitalObj._id,
        },
      },
      //{ $group: { _id: "$currentStatus", myCount: { $sum: 1 } } },
      { $group: { _id: null, ptCount: { $sum: 1 } } },
    ]).exec((err, patientCount) => {
      if (err) {
        return res.status(400).json({ error: "query not executable" });
      }
      let usedVent = { Used: 0 };
      console.log("patient count is", patientCount);
      if (patientCount.length > 0) {
        usedVent["Used"] = patientCount[0].ptCount;
      }
      const { Used } = usedVent;
      //res.json(ptCount);
      const {
        hospitalCode,
        name,
        address,
        insurance,
        ventilators,
      } = hospitalObj;
      const resp = {
        hospitalCode,
        name,
        address,
        insurance,
        ventilators,
        Used,
      };
      res.json(resp);
    });
  });
};

exports.createHospital = (req, res) => {
  //req.body.order.user = req.profile;
  const hospital = new Hospital(req.body);
  console.log(req.body);

  hospital.save((err, hospital) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "failed to save hospital in DB" });
    }
    res.json(hospital);
  });
};
