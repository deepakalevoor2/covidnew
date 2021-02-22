import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Dropdown from "../../components/dropdown/Dropdown";
//import Checkbox from "../../components/checkbox/checkbox";
import { Checkbox } from "@thumbtack/thumbprint-react";
import { createPatient, isAuthenticated } from "../../apis";

import { EntryDiv } from "./entry.styles";

const options = [
  {
    label: "Severe",
    value: "Severe",
  },
  {
    label: "Moderate",
    value: "Moderate",
  },
  {
    label: "Mild",
    value: "Mild",
  },
];

const Entry = () => {
  const [selected, setSelected] = useState(options[0]);
  const [isChecked, setIsChecked] = React.useState(undefined);
  const [success, setSuccess] = React.useState(false);
  const [values, setValues] = useState({
    patientId: "",
    patientName: "",
    bedNo: "",
  });
  const [error, setError] = useState(false);
  const { patientId, patientName, bedNo } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(values, selected.value, isChecked);
    const name = { patientId, patientName, bedNo };
    const currentStatus = selected.value;
    const ventilator = isChecked === undefined ? "false" : isChecked;
    const patient = { ...name, currentStatus, ventilator };
    const { user, token } = isAuthenticated();
    console.log(patient);
    createPatient(user._id, token, patient).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const errorMessage = () => {
    return (
      <div className="column" style={{ display: error ? "" : "none" }}>
        <div className="ui segment">
          <div
            className="ui red message"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="ui segment" style={{ display: success ? "" : "none" }}>
      <h4>Patient created successfully</h4>
    </div>
  );

  return (
    <EntryDiv>
      <form className="entry-form">
        <FormInput
          type="text"
          name="patientId"
          value={patientId}
          onChange={handleChange("patientId")}
          label="Patient ID"
          required
        />
        <FormInput
          type="text"
          name="patientName"
          value={patientName}
          onChange={handleChange("patientName")}
          label="Patient Name"
          required
        />
        <Dropdown
          label="Current Status"
          name="currentStatus"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        <FormInput
          type="text"
          name="bedNo"
          value={bedNo}
          onChange={handleChange("bedNo")}
          label="Bed #"
          required
        />
        {/*<Checkbox
          name="ventilator"
          label="Ventilator"
          checked={isSelected}
          onChange={onCheckboxChange}
          required
        />*/}
        <Checkbox
          name="ventilator"
          isChecked={isChecked}
          onChange={setIsChecked}
        >
          Ventilator
        </Checkbox>
        <CustomButton onClick={onSubmit} type="submit">
          Submit
        </CustomButton>
      </form>
      {successMessage()}
      {errorMessage()}
    </EntryDiv>
  );
};

export default Entry;
